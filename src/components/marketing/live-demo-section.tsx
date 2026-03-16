"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Copy,
  CheckCircle2,
  Loader2,
} from "lucide-react";

type DemoPreset = {
  id: string;
  name: string;
  product: string;
  features: string;
  tone: string;
  language: string;
};

const presets: DemoPreset[] = [
  {
    id: "headphones",
    name: "Wireless Headphones",
    product: "Premium Wireless Headphones",
    features:
      "Bluetooth 5.3, active noise cancelling, 40h battery, premium sound",
    tone: "Premium, tech-focused, conversion-optimized",
    language: "English",
  },
  {
    id: "serum",
    name: "Skincare Serum",
    product: "Vitamin C Glow Serum",
    features:
      "Brightening formula, hyaluronic acid, lightweight texture, daily use",
    tone: "Clean, premium, beauty-focused",
    language: "English",
  },
  {
    id: "backpack",
    name: "Leather Backpack",
    product: "Urban Leather Backpack",
    features:
      "Genuine leather, laptop compartment, water-resistant lining, travel-ready",
    tone: "Elegant, modern, premium lifestyle",
    language: "English",
  },
];

function buildOutput(
  product: string,
  features: string,
  tone: string,
  language: string
) {
  const primaryFeature = features.split(",")[0]?.trim() || "premium features";
  const secondFeature = features.split(",")[1]?.trim() || "optimized design";

  return {
    seoTitle: `${product} – ${primaryFeature} ${secondFeature}`.slice(0, 68),

    shortDescription: `Discover ${product.toLowerCase()} designed with ${features.toLowerCase()}. Created in a ${tone.toLowerCase()} style for brands that want stronger product pages and faster conversions.`,

    longDescription: `${product} combines modern design with powerful performance. Built with ${features.toLowerCase()}, this product is crafted to deliver both reliability and premium user experience. Designed in a ${tone.toLowerCase()} tone, the description structure is optimized for ecommerce platforms, helping brands create engaging product pages that improve visibility and conversions.`,

    metaTitle: `${product} | AI-Optimized Product Listing`.slice(0, 60),

    metaDescription: `Generate sales-ready content for ${product.toLowerCase()} with SEO structure, clear messaging, and ${language.toLowerCase()} output built for eCommerce.`,

    tags: [
      product.toLowerCase(),
      primaryFeature.toLowerCase(),
      secondFeature.toLowerCase(),
      "ecommerce product copy",
    ],

    keywords: [
      `${product.toLowerCase()} online`,
      `${primaryFeature.toLowerCase()} product`,
      `${product.toLowerCase()} seo listing`,
    ],

    instagramCaption: `Meet ${product} ✨ Built with ${features.toLowerCase()} and written in a ${tone.toLowerCase()} voice. Launch faster with Selliora AI.`,
  };
}

export function LiveDemoSection() {
  const [product, setProduct] = useState(presets[0].product);
  const [features, setFeatures] = useState(presets[0].features);
  const [tone, setTone] = useState(presets[0].tone);
  const [language, setLanguage] = useState(presets[0].language);
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  const output = useMemo(
    () => buildOutput(product, features, tone, language),
    [product, features, tone, language]
  );

  const handlePreset = (preset: DemoPreset) => {
    setActivePreset(preset.id);
    setProduct(preset.product);
    setFeatures(preset.features);
    setTone(preset.tone);
    setLanguage(preset.language);

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* TITLE */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Live demo
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            See how Selliora transforms one product input into a complete content pack
          </h2>

          <p className="mt-5 text-base leading-7 text-white/65 md:text-lg">
            Try sample products and preview how AI generates descriptions,
            metadata, tags and marketing content instantly.
          </p>
        </motion.div>

        {/* PRESETS */}

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {presets.map((preset) => {
            const isActive = activePreset === preset.id;

            return (
              <button
                key={preset.id}
                onClick={() => handlePreset(preset)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* GRID */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* INPUT */}

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Demo input
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                Preview only
              </div>
            </div>

            {/* CSV */}

            <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40 mb-3">
                CSV Upload
              </p>

              <div className="flex flex-wrap gap-2">
                <button className="cursor-not-allowed rounded-xl bg-white px-3 py-2 text-xs font-medium text-black opacity-70">
                  Upload CSV
                </button>

                <button className="cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                  Download sample CSV
                </button>

                <button className="cursor-not-allowed rounded-xl bg-cyan-500 px-3 py-2 text-xs text-black opacity-70">
                  Generate all rows
                </button>

                <button className="cursor-not-allowed rounded-xl bg-white px-3 py-2 text-xs font-medium text-black opacity-70">
                  Image Generator
                </button>

                <button className="cursor-not-allowed rounded-xl bg-white px-3 py-2 text-xs font-medium text-black opacity-70">
                  Bulk Image Generator
                </button>

              </div>
            </div>

            {/* INPUT FIELDS */}

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
                  Product
                </label>

                <input
                  value={product}
                  readOnly
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
                  Features
                </label>

                <textarea
                  value={features}
                  readOnly
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
                    Tone
                  </label>

                  <input
                    value={tone}
                    readOnly
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
                    Language
                  </label>

                  <input
                    value={language}
                    readOnly
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* OUTPUT */}

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Wand2 className="h-4 w-4 text-violet-300" />
                AI output preview
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Generated instantly
              </div>
            </div>

            <AnimatePresence mode="wait">

              {isGenerating ? (

                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[300px] items-center justify-center"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
                </motion.div>

              ) : (

                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >

                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
                      SEO Title
                    </p>
                    <p className="mt-2 text-sm text-white">{output.seoTitle}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Short Description
                    </p>
                    <p className="mt-2 text-sm text-white">{output.shortDescription}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Long Description
                    </p>
                    <p className="mt-2 text-sm text-white">{output.longDescription}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Meta Title
                      </p>
                      <p className="mt-2 text-sm text-white">{output.metaTitle}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Meta Description
                      </p>
                      <p className="mt-2 text-sm text-white">{output.metaDescription}</p>
                    </div>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Tags
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {output.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      SEO Keywords
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {output.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Instagram Caption
                      </p>

                      <button className="flex items-center gap-1 text-xs text-white/60 hover:text-white">
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </button>
                    </div>

                    <p className="mt-2 text-sm text-white">
                      {output.instagramCaption}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                      Export formats
                    </p>

                    <div className="flex flex-wrap gap-2">

                      <button className="cursor-not-allowed rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        CSV
                      </button>

                      <button className="cursor-not-allowed rounded-full border border-white/10 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                        JSON
                      </button>

                      <button className="cursor-not-allowed rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        TXT
                      </button>

                      <button className="cursor-not-allowed rounded-full border border-white/10 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                        Shopify CSV
                      </button>

                      <button className="cursor-not-allowed rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                        WooCommerce CSV
                      </button>

                    </div>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}