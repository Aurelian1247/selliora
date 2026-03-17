import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI Ecommerce Blog | Product Descriptions, SEO & Shopify Guides | Selliora",
  description:
    "Learn how to generate product descriptions, improve ecommerce SEO, and grow your Shopify or WooCommerce store with AI.",
};
// force rebuild
const posts = [
  {
    title: "Best AI product description generator in 2026",
    slug: "best-ai-product-description-generator",
    description:
      "Discover the best AI tools for generating high-converting product descriptions in 2026.",
  },
  {
    title: "How to write product descriptions for Shopify",
    slug: "shopify-product-description-guide",
    description:
      "Learn how to write product descriptions that convert visitors into customers.",
  },
  {
    title: "AI SEO for ecommerce: Complete guide",
    slug: "ai-seo-for-ecommerce",
    description:
      "Boost your ecommerce traffic with AI-powered SEO strategies.",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      {/* H1 SEO */}
      <h1 className="text-4xl font-bold mb-4">
        Ecommerce AI Blog
      </h1>

      <p className="text-white/60 mb-10 max-w-2xl">
        Learn how to generate high-converting product descriptions, improve SEO,
        and grow your ecommerce business using AI tools like Selliora.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="p-6 border border-white/10 rounded-xl hover:border-white/30 transition cursor-pointer">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-white/60 mt-2">{post.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}