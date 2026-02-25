"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Send } from "lucide-react";

export default function PublishedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/posts?status=PUBLISHED");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="w-full bg-later-purple min-h-screen pt-20 pb-40">
            <div className="container mx-auto px-4 space-y-12">
                <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h1 className="later-massive text-white">Distributed <span className="text-brand-coral">insights.</span></h1>
                    <p className="text-white/70 font-bold text-xl">
                        Archival history of your published Web3 intelligence.
                    </p>
                </div>

                {loading ? (
                    <div className="grid gap-8">
                        {[1, 2].map((i) => (
                            <Skeleton key={i} className="h-64 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard key={(post as any)._id} post={post} />
                            ))
                        ) : (
                            <div className="content-block text-center py-20 space-y-6">
                                <div className="h-20 w-20 bg-brand-purple/5 rounded-full flex items-center justify-center mx-auto">
                                    <Send className="h-10 w-10 text-brand-purple/20" />
                                </div>
                                <h3 className="text-2xl font-black text-[#2D2E2E]">History is empty.</h3>
                                <p className="text-[#2D2E2E]/40 font-bold">Successfully published campaigns will appear in this archive.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
