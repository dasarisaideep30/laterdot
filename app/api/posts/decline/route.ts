import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Post from "@/models/Post";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { postId } = await request.json();

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { status: "DECLINED" },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
