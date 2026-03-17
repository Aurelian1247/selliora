import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "../components/layout/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selliora AI",
  description:
    "AI SEO Product Pack for eCommerce. Generate product descriptions, SEO metadata, tags, and sales-ready copy in seconds.",
 verification: {
    google: "3n78KLcoo4tvDO60mSyanmhlcXno8D1SR8otmZKEoEI",  
  },

  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050816] font-sans text-white antialiased`}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}