"use client";

import { useEffect, useState } from "react";
import { ManualGeneratorForm } from "../../../components/generator/manual-generator-form";
import { GeneratorResult } from "../../../components/generator/generator-result";
import {
  CsvUploadPanel,
  type CsvRow,
} from "../../../components/generator/csv-upload-panel";
import { getCurrentUserUsage, type UserUsage } from "../../../lib/data/usage";
import { BulkImageGenerator } from "../../../components/generator/bulk-image-generator";

type GeneratorOutput = {
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  seoKeywords?: string[];
  instagramCaption?: string;
};

type GeneratorTab = "text" | "image" | "csv" | "bulk-image";

export default function GeneratorPage() {
  const [output, setOutput] = useState<GeneratorOutput | null>(null);
  const [selectedRow, setSelectedRow] = useState<CsvRow | undefined>(undefined);
  const [usage, setUsage] = useState<UserUsage | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<GeneratorTab>("text");

  useEffect(() => {
    const loadUsage = async () => {
      const { usage } = await getCurrentUserUsage();
      setUsage(usage);
      setLoading(false);
    };

    loadUsage();
  }, []);

  const remainingDemo = usage ? Math.max(0, 3 - usage.demo_generations_used) : 0;

  const monthlyRemaining = usage
    ? Math.max(0, usage.monthly_product_limit - usage.monthly_products_used)
    : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
          Generator
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Product content generator
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Generate SEO titles, product descriptions, long descriptions, and metadata using AI.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            {loading ? "Loading usage..." : `Demo remaining: ${remainingDemo} / 3`}
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            {loading
              ? "Loading plan..."
              : `Plan: ${usage?.plan_type === "pro" ? "Pro" : "Demo"}`}
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            {loading
              ? "Loading monthly..."
              : `Monthly remaining: ${monthlyRemaining}`}
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            {loading
              ? "Loading credits..."
              : `Credits: ${usage?.credits_balance ?? 0}`}
          </div>
        </div>
      </section>

      {/* TABS */}

      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("text")}
          className={`px-4 py-2 text-sm rounded-lg transition ${
            activeTab === "text"
              ? "bg-white text-black"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          TEXT GENERATOR
        </button>

        <button
          onClick={() => setActiveTab("image")}
          className={`px-4 py-2 text-sm rounded-lg transition ${
            activeTab === "image"
              ? "bg-white text-black"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          IMAGE GENERATOR
        </button>

        <button
  onClick={() => setActiveTab("bulk-image")}
  className={`px-4 py-2 text-sm rounded-lg transition ${
    activeTab === "bulk-image"
      ? "bg-white text-black"
      : "bg-white/5 text-white/70 hover:bg-white/10"
  }`}
>
  BULK IMAGE GENERATOR
</button>

        <button
          onClick={() => setActiveTab("csv")}
          className={`px-4 py-2 text-sm rounded-lg transition ${
            activeTab === "csv"
              ? "bg-white text-black"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          CSV BULK GENERATOR
        </button>
      </div>

      {/* CSV GENERATOR */}

      {activeTab === "csv" && (
        <CsvUploadPanel onSelectRow={setSelectedRow} />
      )}
      
      {/* BULK IMAGE GENERATOR */}

{activeTab === "bulk-image" && (
  <BulkImageGenerator />
)}

      {/* TEXT GENERATOR */}

      {activeTab === "text" && (
        <div className="grid gap-6 xl:grid-cols-2">
          <ManualGeneratorForm
            mode="text"
            onGenerate={setOutput}
            initialValues={selectedRow}
            onSuccessfulGeneration={async () => {
              const { usage } = await getCurrentUserUsage();
              setUsage(usage);
            }}
          />

          <GeneratorResult output={output} />
        </div>
      )}

      {/* IMAGE GENERATOR */}

      {activeTab === "image" && (
        <div className="grid gap-6 xl:grid-cols-2">
          <ManualGeneratorForm
            mode="image"
            onGenerate={setOutput}
            onSuccessfulGeneration={async () => {
              const { usage } = await getCurrentUserUsage();
              setUsage(usage);
            }}
          />

          <GeneratorResult output={output} />
        </div>
      )}
    </div>
  );
}