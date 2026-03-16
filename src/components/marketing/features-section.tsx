"use client";

import { motion } from "framer-motion";
import {
  Search,
  Languages,
  PackageSearch,
  Sparkles,
  Tags,
  FileOutput,
  Upload,
  Image,
  History,
  Megaphone,
} from "lucide-react";

const features = [
  {
  icon: Sparkles,
  title: "AI product descriptions",
  description:
    "Generate conversion-focused short and long product descriptions tailored for modern eCommerce stores."
},
{
  icon: Search,
  title: "SEO-ready metadata",
  description:
    "Instantly create SEO titles, meta descriptions, and optimized product copy built for search visibility."
},
{
  icon: Tags,
  title: "Smart product tags",
  description:
    "Generate relevant tags and keyword clusters that improve product discovery and category organization."
},
{
  icon: Languages,
  title: "Multi-language output",
  description:
    "Generate product content in multiple languages for international stores and marketplace listings."
},
{
  icon: Upload,
  title: "Bulk generation via CSV",
  description:
    "Import product data using CSV and generate hundreds of SEO-ready product descriptions in seconds."
},
{
  icon: Image,
  title: "Image-to-product AI",
  description:
    "Generate product descriptions directly from images using AI vision and structured content generation."
},
{
  icon: FileOutput,
  title: "Export-ready formats",
  description:
    "Export generated content as CSV, JSON, TXT, Shopify CSV, or WooCommerce-ready product data."
},
{
  icon: History,
  title: "Generation history",
  description:
    "Access, reuse, and export previously generated product content from your generation history."
},
{
  icon: Megaphone,
  title: "AI marketing captions",
  description:
    "Generate ready-to-use marketing captions for social media, product launches, and promotional campaigns."
},
];

export function FeaturesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Features
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Everything you need to turn one product input into a complete AI SEO pack
          </h2>
          <p className="mt-5 text-base leading-7 text-white/65 md:text-lg">
            Selliora helps eCommerce teams create polished, searchable, sales-ready
            product content without wasting hours writing manually.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.10)]">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>

                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}