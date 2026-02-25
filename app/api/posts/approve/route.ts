import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Post from "@/models/Post";
import axios from "axios";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { postId } = await request.json();

        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Update status to APPROVED
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { status: "APPROVED" },
            { new: true }
        );

        // Send webhook to n8n
        if (process.env.N8N_WEBHOOK_URL) {
            try {
                await axios.post(process.env.N8N_WEBHOOK_URL, {
                    postId: post._id,
                    content: post.generatedPost,
                    title: post.title,
                    topic: post.topic,
                });
            } catch (webhookError) {
                console.error("n8n Webhook Error:", webhookError);
                // Note: We still return success as the post was approved in our DB
            }
        }

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
