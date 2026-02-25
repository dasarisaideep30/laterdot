import { NextResponse } from "next/server";
import { fetchWeb3News } from "@/lib/newsFetcher";
import { generateLinkedInPost, classifyIntelligence, checkCompliance } from "@/lib/gemini";
import connectDB from "@/lib/mongoose";
import Post from "@/models/Post";

export async function GET() {
    try {
        await connectDB();
        const newsArticles = await fetchWeb3News();
        let createdCount = 0;
        let generatedPostsCount = 0;

        for (const article of newsArticles) {
            // Check for duplicate URLs to avoid redundant posts
            const existing = await Post.findOne({ sourceUrl: article.url });

            if (!existing) {
                // 1. Run Classification Layer
                const classification = await classifyIntelligence({
                    title: article.title,
                    content: article.content,
                });

                // 2. Run Compliance Layer
                const compliance = await checkCompliance({
                    title: article.title,
                    content: article.content,
                });

                // 3. Create Initial Post Record with Intelligence & Compliance Metadata
                const postRecord = await Post.create({
                    topic: article.topic,
                    title: article.title,
                    sourceUrl: article.url,
                    source: article.source,
                    content: article.content,
                    status: "PROCESSING",

                    // Intelligence metadata
                    category: classification.category,
                    importanceScore: classification.importanceScore,
                    impactLevel: classification.impactLevel,
                    region: classification.region,
                    tags: classification.tags,
                    publishRecommended: classification.publishRecommended,

                    // Compliance metadata
                    riskLevel: compliance.riskLevel,
                    safeToPublish: compliance.safeToPublish,
                    complianceReason: compliance.complianceReason,
                    complianceStatus: compliance.safeToPublish ? "APPROVED" : "REJECTED"
                });

                createdCount++;

                // 4. Apply Filtering Logic for Post Generation
                // Only generate posts if importanceScore >= 6 AND safeToPublish AND publishRecommended
                if (
                    classification.importanceScore >= 6 &&
                    compliance.safeToPublish &&
                    classification.publishRecommended
                ) {
                    try {
                        const generatedPost = await generateLinkedInPost(article);

                        await Post.findByIdAndUpdate(postRecord._id, {
                            generatedPost,
                            // status remains PROCESSING until admin reviews/publishes
                        });
                        generatedPostsCount++;
                    } catch (genError) {
                        console.error(`Post Generation Failed for ${article.title}:`, genError);
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            summary: {
                totalFetched: newsArticles.length,
                newArticlesStored: createdCount,
                postsGenerated: generatedPostsCount
            }
        });
    } catch (error: any) {
        console.error("Cron Job Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
