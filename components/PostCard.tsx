"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { ExternalLink, Check, X, ShieldCheck, AlertTriangle, Zap, MapPin, Tag, Quote } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
    post: {
        id: string;
        title: string;
        topic: string;
        generatedPost: string;
        source: string;
        sourceUrl: string;
        status: any;
        // New Intelligence Fields
        category?: string;
        importanceScore?: number;
        impactLevel?: string;
        region?: string;
        tags?: string[];
        // New Compliance Fields
        riskLevel?: string;
        safeToPublish?: boolean;
        complianceReason?: string;
    };
    onApprove?: (id: string) => void;
    onDecline?: (id: string) => void;
}

export default function PostCard({ post, onApprove, onDecline }: PostCardProps) {
    const [loading, setLoading] = useState(false);
    const postId = (post as any)._id || post.id;

    const handleAction = async (action: "approve" | "decline") => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${action}`, {
                method: "POST",
                body: JSON.stringify({ postId }),
            });
            if (res.ok) {
                if (action === "approve" && onApprove) onApprove(postId);
                if (action === "decline" && onDecline) onDecline(postId);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score?: number) => {
        if (!score) return "text-gray-400";
        if (score >= 8) return "text-emerald-400";
        if (score >= 6) return "text-blue-400";
        return "text-amber-400";
    };

    return (
        <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-[0_10px_40px_rgba(0,0,0,0.06)] bg-white p-2">
            <div className="p-8 space-y-8">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-[#553C9A]/10 text-[#553C9A] border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                                {post.category || "GENERAL"}
                            </Badge>
                            {post.region && (
                                <span className="text-[10px] font-bold text-[#2D2E2E]/50 flex items-center gap-1 uppercase tracking-wider">
                                    <MapPin className="w-3 h-3" /> {post.region}
                                </span>
                            )}
                        </div>
                        <h3 className="text-3xl font-black text-[#2D2E2E] leading-tight tracking-tight">
                            {post.title}
                        </h3>
                        <p className="text-xs font-bold text-[#2D2E2E]/40 uppercase tracking-widest">
                            Source: {post.source}
                        </p>
                    </div>
                    {post.importanceScore && (
                        <div className="bg-[#FDF8F1] p-4 rounded-3xl text-center min-w-[80px]">
                            <div className="text-[10px] font-black text-[#553C9A] uppercase mb-1">Score</div>
                            <div className="text-3xl font-black text-[#553C9A]">{post.importanceScore}</div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {post.riskLevel && post.riskLevel !== "LOW" && (
                        <div className="bg-rose-50 text-rose-600 p-4 rounded-3xl border border-rose-100 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Compliance Alert: {post.riskLevel}</span>
                                <p className="text-sm font-bold opacity-90">{post.complianceReason}</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-[#FDF8F1] p-6 rounded-[2rem] relative group border border-gray-50">
                        <Quote className="absolute top-4 right-4 h-8 w-8 text-[#553C9A]/10" />
                        <p className="text-md font-bold text-[#2D2E2E] leading-relaxed italic pr-8">
                            {post.generatedPost || "Post generation skipped (Criteria not met)"}
                        </p>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black text-[#553C9A]/70 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                    #{tag.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <Button variant="link" className="text-[#2D2E2E] font-black text-xs hover:text-[#FF6B00] gap-2 p-0 h-auto" asChild>
                        <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
                            Learn more <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </Button>

                    {post.status === "PROCESSING" && (
                        <div className="flex gap-4">
                            <Button
                                variant="ghost"
                                className="rounded-full text-[#EF4444] font-black text-xs hover:bg-rose-50"
                                onClick={() => handleAction("decline")}
                                disabled={loading}
                            >
                                <X className="w-4 h-4 mr-2" /> Decline
                            </Button>
                            <Button
                                className="btn-coral text-xs shadow-none px-6"
                                onClick={() => handleAction("approve")}
                                disabled={loading || !post.generatedPost}
                            >
                                <Check className="w-4 h-4 mr-2" /> Approve Post
                            </Button>
                        </div>
                    )}

                    {post.status !== "PROCESSING" && <StatusBadge status={post.status} />}
                </div>
            </div>
        </Card>
    );
}
