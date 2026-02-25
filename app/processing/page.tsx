"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

export default function ProcessingPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts?status=PROCESSING");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const removePost = (id: string) => {
        setPosts((prev) => prev.filter((p: any) => p._id !== id));
    };

    // New functions for handling approve/decline, assuming they also remove the post
    const handleApprove = (id: string) => {
        // Add logic for approving the post, then remove it from the list
        removePost(id);
    };

    const handleDecline = (id: string) => {
        // Add logic for declining the post, then remove it from the list
        removePost(id);
    };

    return (
        <div className="w-full bg-later-purple min-h-screen pt-20 pb-40">
            <div className="container mx-auto px-4 space-y-12">
                <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h1 className="later-massive text-white">Capture the <span className="text-brand-coral">intelligence.</span></h1>
                    <p className="text-white/70 font-bold text-xl">
                        Review and calibrate your daily Web3 news assets and strategic insights.
                    </p>
                </div>

                {loading ? ( // Re-added loading state handling
                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2].map((i) => (
                            <Skeleton key={i} className="h-64 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard
                                    key={(post as any)._id}
                                    post={post}
                                    onApprove={handleApprove}
                                    onDecline={handleDecline}
                                />
                            ))
                        ) : (
                            <div className="content-block text-center py-20 space-y-6">
                                <div className="h-20 w-20 bg-brand-purple/5 rounded-full flex items-center justify-center mx-auto">
                                    <FileText className="h-10 w-10 text-brand-purple/20" />
                                </div>
                                <h3 className="text-2xl font-black text-[#2D2E2E]">Queue is empty.</h3>
                                <p className="text-[#2D2E2E]/40 font-bold">New intelligence assets will appear here as they are captured.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
