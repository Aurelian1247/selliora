"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "Who is Selliora AI built for?",
    answer:
      "Selliora is designed for eCommerce brands, product marketers, Shopify and WooCommerce stores, marketplace sellers, and teams that need product content at scale.",
  },
  {
    question: "What does the AI generate?",
    answer:
      "Selliora generates complete AI product content including SEO titles, short and long descriptions, meta tags, keywords, product tags, and marketing captions. It can also generate product images and bulk content using CSV imports.",
  },
  {
    question: "Can I test it before paying?",
    answer:
      "Yes. The demo plan lets you generate content for up to 3 products so you can experience the workflow before upgrading.",
  },
  {
    question: "Does Selliora support bulk product generation?",
    answer:
      "Yes. You can upload a CSV file with multiple products and generate hundreds of SEO-ready product descriptions in seconds using the bulk generator.",
  },
  {
    question: "Does Selliora generate product images?",
    answer:
      "Yes. Selliora includes an AI image generator that can create product visuals directly from descriptions. Bulk image generation is also supported in paid plans.",
  },
  {
    question: "How do credits work?",
    answer:
      "Credits allow you to generate content without a subscription. Each product generation consumes credits, and credits never expire. They can be used after the Demo or Pro limits are reached.",
  },
  {
    question: "What platforms can I export to?",
    answer:
      "You can export generated content in multiple formats including JSON, TXT, Shopify-ready CSV, and WooCommerce-ready CSV.",
  },
];

export function FAQSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-violet-300/80">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Common questions about Selliora AI
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-medium text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}