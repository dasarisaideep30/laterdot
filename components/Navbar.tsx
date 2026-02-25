"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, CheckCircle, Send, Zap } from "lucide-react"; // Assuming these icons are from lucide-react
import { cn } from "@/lib/utils"; // Kept as it was in the original, though not used in the new Navbar logic
import { Button } from "@/components/ui/button"; // Assuming Button component is from shadcn/ui or similar

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Analyze", href: "/processing" },
        { name: "Batching", href: "/approved" },
        { name: "Live", href: "/published" },
    ];

    return (
        <nav className="sticky top-6 z-50 w-full px-4">
            <div className="container mx-auto bg-white/95 backdrop-blur-md h-20 px-8 flex items-center justify-between rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/20">
                <div className="flex items-center gap-12">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <span className="text-2xl font-black tracking-tighter text-[#2D2E2E]">
                            LATER<span className="text-brand-purple">.</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-black transition-all relative py-2 ${isActive
                                        ? "text-brand-purple"
                                        : "text-[#2D2E2E] hover:text-brand-purple"
                                        }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-later rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="hidden sm:block text-sm font-black text-[#2D2E2E] hover:underline">Sign In</Link>
                    <Button className="btn-coral text-sm">
                        Get Intelligence →
                    </Button>
                </div>
            </div>
        </nav>
    );
}
