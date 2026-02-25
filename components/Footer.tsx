"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin, Youtube, Facebook, Mail } from "lucide-react";

export default function Footer() {
    const sections = [
        {
            title: "Products + services",
            links: ["Full-service programs", "Influencer marketing platform", "Social media management", "Mavely for Creators"]
        },
        {
            title: "For enterprise brands",
            links: ["Influence marketing overview", "Campaign services", "Platform access", "Our work"]
        },
        {
            title: "For social media managers",
            links: ["Social media scheduler overview", "Features", "Pricing", "Integrations"]
        }
    ];

    return (
        <footer className="bg-black text-white pt-20 pb-10 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-8">
                        <div className="text-4xl font-black tracking-tighter">LATER.</div>
                        <p className="text-white/60 font-bold max-w-xs">
                            The world's leading Web3 intelligence and creator marketing platform.
                        </p>
                    </div>
                    {sections.map((s) => (
                        <div key={s.title} className="space-y-6">
                            <h4 className="font-black text-sm uppercase tracking-widest">{s.title}</h4>
                            <ul className="space-y-4">
                                {s.links.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-white/60 hover:text-white font-bold transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-8 text-xs font-bold text-white/40 uppercase tracking-widest">
                        <span>© 2026 LATER. ALL RIGHTS RESERVED.</span>
                        <Link href="#" className="hover:text-white">SITEMAP</Link>
                        <Link href="#" className="hover:text-white">TERMS</Link>
                        <Link href="#" className="hover:text-white">PRIVACY POLICY</Link>
                    </div>
                    <div className="flex gap-6">
                        {[Instagram, Twitter, Linkedin, Youtube, Facebook].map((Icon, i) => (
                            <Link key={i} href="#" className="text-white/60 hover:text-white transition-colors">
                                <Icon className="w-5 h-5" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Massive Animated Logo Section */}
                <div className="mt-40 overflow-hidden select-none pb-20">
                    <div className="text-[25vw] font-black leading-none tracking-tighter text-white shadow-massive-3d border-b-0 inline-block px-10">
                        LATER.
                    </div>
                </div>
            </div>
        </footer>
    );
}
