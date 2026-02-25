import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital South Trust | Web3 Intelligence",
  description: "Automated LinkedIn publishing for Web3 news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen wavy-bg text-foreground selection:bg-brand-coral selection:text-white`}
      >
        <Navbar />
        <main className="relative z-10 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
