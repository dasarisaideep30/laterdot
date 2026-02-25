"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, Send, Zap, Globe, LayoutDashboard, Quote } from "lucide-react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("network");
    const [stats, setStats] = useState({
        total: 1240,
        processing: 14,
        approved: 86,
        published: 1140,
        highImportance: 12,
        complianceRisks: 3,
        impressions: "22M",
        roi: "2.8X",
        gmv: "$391k",
    });

    // The original useEffect was for fetching dynamic stats, but the new stats are hardcoded.
    // Keeping it commented out in case dynamic fetching is re-introduced later.
    /*
    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/posts");
                const posts = await res.json();
                const regions: Record<string, number> = {};
                const categories: Record<string, number> = {};
                posts.forEach((p: any) => {
                    const reg = p.region || "Global";
                    const cat = p.category || "General";
                    regions[reg] = (regions[reg] || 0) + 1;
                    categories[cat] = (categories[cat] || 0) + 1;
                });
                const topRegion = Object.entries(regions).sort((a, b) => b[1] - a[1])[0]?.[0] || "Global";
                const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || "General";
                setStats({
                    total: posts.length,
                    processing: posts.filter((p: any) => p.status === "PROCESSING").length,
                    approved: posts.filter((p: any) => p.status === "APPROVED").length,
                    published: posts.filter((p: any) => p.status === "PUBLISHED").length,
                    highImportance: posts.filter((p: any) => (p.importanceScore || 0) >= 8).length,
                    complianceRisks: posts.filter((p: any) => p.riskLevel === "HIGH" || p.riskLevel === "MEDIUM").length,
                    topRegion,
                    topCategory,
                });
            } catch (err) { console.error(err); }
        }
        fetchStats();
    }, []);
    */

    return (
        <div className="space-y-0 -mt-12 md:-mt-20 overflow-x-hidden">
            {/* HERO SECTION - Skewed Hero */}
            <section className="bg-brand-cream pt-32 pb-60 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/20 via-transparent to-brand-purple/10 diagonal-skew h-[120%]" />
                <div className="container mx-auto relative z-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-12">
                            <h1 className="later-massive text-[#2D2E2E] leading-tight">
                                Other brands <br />
                                are <span className="text-gradient-vibrant">guessing.</span><br />
                                You don't.
                            </h1>
                            <p className="text-[#2D2E2E]/80 text-2xl font-bold max-w-xl leading-relaxed">
                                Later EdgeAI looks at creator behavior, what's trending, and what people actually buy, so campaigns are built with confidence.
                            </p>
                            <div className="flex gap-6 pt-4">
                                <Button className="btn-coral px-12 text-lg h-16">
                                    Start your intelligence →
                                </Button>
                                <Button variant="link" className="text-brand-coral font-black text-xl hover:underline">
                                    Learn more →
                                </Button>
                            </div>
                        </div>

                        {/* Hero Visual - Floating Telemetry Cards */}
                        <div className="relative h-[600px] hidden lg:block">
                            <div className="absolute top-0 right-0 w-80 bg-white rounded-3xl p-6 shadow-hard-3d floating-3d-slow">
                                <div className="text-5xl font-black text-brand-purple">{stats.gmv}</div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">GMV Tracking</div>
                            </div>
                            <div className="absolute top-40 right-40 w-80 bg-white rounded-3xl p-6 shadow-hard-3d floating-3d-slow" style={{ animationDelay: "1s" }}>
                                <div className="text-5xl font-black text-brand-purple">{stats.impressions}</div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">Annual Impressions</div>
                            </div>
                            <div className="absolute bottom-20 right-10 w-64 bg-[#7C3AED] text-white rounded-3xl p-6 shadow-hard-3d floating-3d-slow" style={{ animationDelay: "2s" }}>
                                <div className="text-4xl font-black">{stats.roi} ROI</div>
                                <div className="text-xs font-bold opacity-60 uppercase tracking-widest mt-2">Performance Yield</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HYPE SECTION - Hard Shadows */}
            <section className="bg-gradient-later pt-32 pb-40 px-4 relative z-20">
                <div className="container mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter">The hype is real.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {[
                            { label: "creators analyzed across platforms", value: "16M+", icon: Globe },
                            { label: "annual impressions from social posts", value: "136B", icon: Zap },
                            { label: "Link in Bio transactions tracked", value: "1B+", icon: LayoutDashboard },
                            { label: "in verified influencer-driven purchases", value: "$2B+", icon: CheckCircle },
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-10 rounded-sm shadow-hard-3d border-4 border-black relative group">
                                <card.icon className="h-10 w-10 text-black mb-10 group-hover:scale-110 transition-transform" />
                                <div className="text-6xl font-black text-black tracking-tighter mb-4">{card.value}</div>
                                <p className="text-sm font-bold text-black/60 leading-tight uppercase tracking-wide">{card.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CREATOR SELECTION SECTION - Profiling UI */}
            <section className="bg-brand-cream pt-40 pb-40 px-4 overflow-hidden">
                <div className="container mx-auto text-center space-y-20">
                    <h2 className="text-6xl md:text-8xl font-black text-[#2D2E2E] max-w-5xl mx-auto leading-tight">
                        You don't need more creators. You need the <span className="text-brand-purple">right ones.</span>
                    </h2>

                    <div className="flex justify-center items-center gap-4 py-20 -mx-20 overflow-x-auto no-scrollbar">
                        {[
                            { name: "Audrey Ross", color: "from-blue-400 to-purple-500", delay: "0s" },
                            { name: "Cj Kirwan", color: "from-indigo-500 to-purple-600", delay: "0.2s" },
                            { name: "Lakisha Grant", color: "from-purple-600 to-pink-500", delay: "0.4s", large: true },
                            { name: "Taylor Moore", color: "from-pink-500 to-orange-400", delay: "0.6s" },
                            { name: "Ivan Hall", color: "from-orange-400 to-red-500", delay: "0.8s" },
                        ].map((profile, i) => (
                            <div
                                key={i}
                                className={`flex-shrink-0 bg-gradient-to-br ${profile.color} rounded-[2rem] p-1 shadow-2xl transition-all hover:-translate-y-4 hover:rotate-2 group ${profile.large ? 'w-80 h-[480px] z-10' : 'w-64 h-[400px] opacity-60 scale-90'}`}
                                style={{ animationDelay: profile.delay }}
                            >
                                <div className="bg-white/10 w-full h-full rounded-[1.8rem] p-6 flex flex-col justify-end backdrop-blur-sm border border-white/20">
                                    <div className="text-white font-black text-2xl mb-1">{profile.name}</div>
                                    <div className="text-white/60 font-bold text-xs uppercase tracking-widest">Verified Creator</div>
                                    <div className="mt-4 flex gap-2">
                                        <div className="h-6 px-3 bg-white/20 rounded-full text-[10px] font-black text-white flex items-center">MARKET</div>
                                        <div className="h-6 px-3 bg-white/20 rounded-full text-[10px] font-black text-white flex items-center">WEB3</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-12">
                        <Button className="btn-coral px-16 h-20 text-xl shadow-hard-3d">
                            Get started for free
                        </Button>
                    </div>
                </div>
            </section>
            {/* MARQUEE TICKER */}
            <section className="bg-black py-8 border-y border-white/10 overflow-hidden">
                <div className="marquee-container">
                    <div className="marquee-content gap-20">
                        {[
                            { text: "MAIN FEED ENERGY", icon: Zap },
                            { text: "IYKYK", icon: Globe },
                            { text: "CAMPAIGN LOADING", icon: LayoutDashboard },
                            { text: "INTERNET-APPROVED", icon: CheckCircle },
                            { text: "MAIN FEED ENERGY", icon: Zap },
                            { text: "IYKYK", icon: Globe },
                            { text: "CAMPAIGN LOADING", icon: LayoutDashboard },
                            { text: "INTERNET-APPROVED", icon: CheckCircle },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <item.icon className="h-6 w-6 text-white" />
                                <span className="text-2xl font-black text-white tracking-widest uppercase">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR WORK SECTION - Vertical Brand Selector */}
            <section className="bg-black py-40 px-4">
                <div className="container mx-auto">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-4">
                            <span className="text-brand-coral font-black text-sm uppercase tracking-widest">Our Work</span>
                            <div className="space-y-6">
                                {[
                                    { name: "At Home", active: false },
                                    { name: "El Pollo Loco", active: true },
                                    { name: "Crumbl", active: false },
                                    { name: "Tapatio", active: false },
                                    { name: "Habit Burger & Grill", active: false },
                                ].map((brand) => (
                                    <h3
                                        key={brand.name}
                                        className={`text-6xl md:text-7xl font-black tracking-tighter cursor-pointer transition-all ${brand.active ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                                    >
                                        {brand.name}
                                    </h3>
                                ))}
                            </div>
                            <Button variant="link" className="text-white font-black text-xl hover:underline p-0 pt-10">
                                View all case studies →
                            </Button>
                        </div>

                        <div className="relative group">
                            <div className="aspect-[4/5] bg-gray-800 rounded-[3rem] overflow-hidden shadow-massive-3d border-4 border-black relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-white/20 font-black text-8xl rotate-12">CASE STUDY</div>
                                </div>
                                <div className="absolute bottom-10 left-10 z-20 space-y-4">
                                    <div className="text-6xl font-black text-white leading-none">46.7M</div>
                                    <div className="text-sm font-bold text-white/60 uppercase tracking-widest">Total campaign impressions</div>
                                </div>
                            </div>
                            {/* Floating Quote Card */}
                            <div className="absolute top-10 -right-10 w-80 bg-gradient-later p-10 rounded-[2.5rem] shadow-hard-3d z-30 hidden xl:block">
                                <Quote className="h-12 w-12 text-white/40 mb-6" />
                                <p className="text-xl font-bold text-white leading-relaxed mb-8">
                                    "Later enables us to be at the forefront of culture, ensuring every dollar works hard to drive results."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-white/20 rounded-full" />
                                    <div>
                                        <div className="text-sm font-black text-white">Gabe Alonso</div>
                                        <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">VP Marketing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESOURCE GRID - Latest from Later */}
            <section className="bg-brand-cream py-40 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-24 space-y-6">
                        <h2 className="text-7xl md:text-8xl font-black text-[#2D2E2E] tracking-tighter leadings-tight">The latest <br /> from Later.</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Featured Resource */}
                        <div className="bg-gradient-later rounded-[3rem] p-1 shadow-hard-3d group cursor-pointer">
                            <div className="bg-white rounded-[2.8rem] h-full p-12 space-y-8 flex flex-col justify-end relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-later opacity-10 blur-3xl -mr-20 -mt-20 group-hover:opacity-20 transition-opacity" />
                                <div className="inline-block px-4 py-1 border-2 border-brand-purple text-brand-purple rounded-lg text-[10px] font-black uppercase tracking-widest self-start">Report</div>
                                <h3 className="text-5xl font-black text-[#2D2E2E] leading-tight">The Strategic <br /> Turning Point: 2025 <br /> Influencer Marketing</h3>
                                <p className="text-[#2D2E2E]/60 text-xl font-bold">Predicting the shift in creator economy and AI impact.</p>
                                <Button className="btn-coral w-fit mt-4">Read the report →</Button>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 gap-12">
                            {[
                                { type: "Webinar", title: "From Influence to Impact with Predictive AI", color: "from-brand-purple to-indigo-600" },
                                { type: "Blog", title: "Twenty 2026 Creator Economy Predictions", color: "from-brand-coral to-orange-600" },
                            ].map((res, i) => (
                                <div key={i} className={`bg-gradient-to-br ${res.color} rounded-[2.5rem] p-1 shadow-hard-3d group cursor-pointer`}>
                                    <div className="bg-white rounded-[2.3rem] h-full p-10 flex flex-col justify-between items-start">
                                        <div className="inline-block px-3 py-1 border-2 border-black/10 text-[#2D2E2E]/40 rounded-lg text-[10px] font-black uppercase tracking-widest">{res.type}</div>
                                        <h4 className="text-3xl font-black text-[#2D2E2E] leading-tight mt-6 group-hover:text-brand-purple transition-colors">{res.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="relative py-60 px-4 overflow-hidden bg-black">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                    {/* Placeholder for high-impact background image */}
                    <div className="w-full h-full bg-gray-900 group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="container mx-auto relative z-20 text-center space-y-12">
                    <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
                        When you get it right, it's <br />
                        <span className="text-gradient-vibrant">impossible to ignore.</span>
                    </h2>
                    <div className="pt-10">
                        <Button className="btn-coral px-20 h-24 text-2xl shadow-massive-3d">
                            Start your campaign →
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
