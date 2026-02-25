import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Post from "@/models/Post";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const statusLine = searchParams.get("status");

    try {
        await connectDB();
        const posts = await Post.find(statusLine ? { status: statusLine } : {})
            .sort({ createdAt: -1 });

        return NextResponse.json(posts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
