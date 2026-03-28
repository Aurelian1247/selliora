import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "../components/layout/site-header";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"; // 👈 ADĂUGAT
import { Toaster } from "react-hot-toast";
import EmailTrigger from "../components/EmailTrigger";

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
  <EmailTrigger />
  {children}
  <Toaster position="top-right" />   {/* 🔥 AICI EXACT */}
  <Analytics />

  {/* 🔥 GOOGLE ADS TAG */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=AW-17937965611"
    strategy="afterInteractive"
  />
  <Script id="google-ads" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17937965611');
    `}
  </Script>

</body>
    </html>
  );
}