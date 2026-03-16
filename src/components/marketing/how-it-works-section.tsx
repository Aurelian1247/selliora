"use client";

import { motion } from "framer-motion";
import { FileText, Wand2, CopyCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Enter your product details",
    description:
      "Add product details manually, upload CSV files, or generate content directly from product images.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Generate your AI SEO pack",
    description:
      "Selliora generates SEO titles, descriptions, tags, keywords, and marketing captions in seconds.",
  },
  {
    icon: CopyCheck,
    step: "03",
    title: "Copy, refine, and publish",
    description:
      "Copy content or export it as CSV, JSON, or platform-ready formats for Shopify and WooCommerce.",
  },
];

export function HowItWorksSection() {
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
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-violet-300/80">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            From product idea to publish-ready content in three simple steps
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
                    <Icon className="h-5 w-5 text-violet-300" />
                  </div>
                  <span className="text-sm font-medium tracking-[0.22em] text-white/30">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}