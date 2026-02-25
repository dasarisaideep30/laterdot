import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        source: { type: String, required: true },
        sourceUrl: { type: String, required: true },
        content: { type: String, required: true },
        generatedPost: { type: String },
        topic: { type: String },
        status: {
            type: String,
            enum: ["PROCESSING", "APPROVED", "DECLINED", "PUBLISHED"],
            default: "PROCESSING",
        },
        publishedAt: { type: Date },

        // Intelligence Layer
        category: { type: String },
        importanceScore: { type: Number },
        impactLevel: { type: String },
        region: { type: String },
        tags: [{ type: String }],
        publishRecommended: { type: Boolean, default: true },

        // Compliance Layer
        riskLevel: { type: String },
        complianceStatus: { type: String, default: "PENDING" },
        safeToPublish: { type: Boolean, default: true },
        complianceReason: { type: String },
    },
    { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
