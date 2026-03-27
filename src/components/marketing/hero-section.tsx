"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, FileText, Tags, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const exampleInput = {
  product: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
  features:
    "industry-leading noise cancellation, 30h battery, bluetooth 5.2, premium sound, fast charging",
  tone: "Premium, tech-focused, conversion-optimized",
  language: "English",
};

const exampleOutput = {
  title:
    "Sony WH-1000XM5 Wireless Headphones – Industry Leading Noise Cancelling",
  shortDescription:
    "Experience premium sound and industry-leading noise cancellation with the Sony WH-1000XM5 wireless headphones. Designed for immersive listening, all-day comfort, and crystal-clear calls.",
  metaTitle:
    "Sony WH-1000XM5 Wireless Noise Cancelling Headphones | Premium Audio",
  tags: [
    "sony wh-1000xm5",
    "wireless headphones",
    "noise cancelling headphones",
    "premium audio headphones",
  ],
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.16),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(5,8,22,0.7),#050816)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-4 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
  <div className="max-w-2xl">

    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Badge className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-cyan-200 hover:bg-cyan-400/10">
        Built for Shopify, WooCommerce, Amazon, Etsy & More
      </Badge>

      <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-5 py-1.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]">
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse" />
        <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Now with Shopify integration 
        </span>
      </div>
    </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
          >
            Generate product copy that{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              sells, ranks, and scales
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg"
          >
            Selliora AI creates SEO-ready product titles, descriptions, meta
            data, tags, and marketing copy for modern eCommerce brands in
            seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/signup">
  <Button className="rounded-xl bg-white px-6 text-black hover:bg-white/90">
    Start free 
  </Button>
</Link>

<Link href="#pricing">
  <Button
    variant="ghost"
    className="rounded-xl border border-white/15 bg-white/5 px-6 text-white hover:bg-white/10"
  >
    See pricing
  </Button>
</Link>
<p className="mt-4 text-sm text-white/50">
  No credit card required • 3 free generations • Setup in seconds
</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-10 grid gap-3 text-sm text-white/65 sm:grid-cols-2"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-300" />
              SEO titles, short & long descriptions
            </div>
            <div className="flex items-center gap-2">
              <Tags className="h-4 w-4 text-violet-300" />
              Tags, keywords, meta description
            </div>
            <div className="flex items-center gap-2">
              <SearchCheck className="h-4 w-4 text-cyan-300" />
              Optimized for product discovery
            </div>
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-violet-300" />
              AI-ready outputs in multiple formats
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-white/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-2">
              <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  Input
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Product
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      {exampleInput.product}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Features
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      {exampleInput.features}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Tone
                      </p>
                      <p className="mt-1 text-sm text-white/90">
                        {exampleInput.tone}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Language
                      </p>
                      <p className="mt-1 text-sm text-white/90">
                        {exampleInput.language}
                      </p>
                    </div>
                  </div>

                  {/* GENERATION METHODS */}

<div className="rounded-2xl border border-white/10 bg-black/20 p-3">
  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
    Generation Methods
  </p>

  <div className="mt-2 flex flex-wrap gap-2">
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      Upload CSV
    </span>

    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      Image Generator
    </span>

    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      Bulk Image Generator
    </span>
  </div>
</div>

{/* EXPORT FORMATS */}

<div className="rounded-2xl border border-white/10 bg-black/20 p-3">
  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
    Export Formats
  </p>

  <div className="mt-2 flex flex-wrap gap-2">
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      CSV
    </span>

    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      JSON
    </span>

    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      TXT
    </span>

    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
      Shopify CSV
    </span>

    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
      WooCommerce CSV
    </span>
  </div>
</div>

                </div>
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
                  <Wand2 className="h-4 w-4 text-violet-300" />
                  AI Output
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
                      SEO Title
                    </p>
                    <p className="mt-1 text-sm text-white/95">
                      {exampleOutput.title}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Short Description
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/90">
                      {exampleOutput.shortDescription}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Meta Title
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      {exampleOutput.metaTitle}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Tags
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exampleOutput.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}