"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import { getUserDefaults } from "../../lib/data/defaults";

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

type InitialValues = {
  productName: string;
  features: string;
  tone: string;
  language: string;
};

type ManualGeneratorFormProps = {
  onGenerate: (output: GeneratorOutput) => void;
  initialValues?: InitialValues;
  onSuccessfulGeneration?: () => void;
  mode?: "text" | "image";
};

export function ManualGeneratorForm({
  onGenerate,
  initialValues,
  onSuccessfulGeneration,
  mode = "text",
}: ManualGeneratorFormProps) {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("");
  const [language, setLanguage] = useState("English");
  const [keywords, setKeywords] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDefaults = async () => {
      const { defaults } = await getUserDefaults();

      if (!defaults) return;

      setLanguage(defaults.default_language || "English");
      setTone(defaults.default_tone || "Premium, conversion-focused");
    };

    loadDefaults();
  }, []);

  useEffect(() => {
    if (!initialValues) return;

    setProductName(initialValues.productName || "");
    setFeatures(initialValues.features || "");
    setTone(initialValues.tone || tone);
    setLanguage(initialValues.language || language);
  }, [initialValues]);

  const handleImageUpload = (file: File) => {
    setImageFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!imageBase64 && (!productName.trim() || !features.trim())) {
      setError("Product name and features are required unless using image.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setError("You must be logged in to generate content.");
        setIsGenerating(false);
        return;
      }

      let generationSource: "manual" | "csv" | "image" = "manual";

      if (initialValues) generationSource = "csv";
      if (imageBase64) generationSource = "image";

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          features,
          tone,
          language,
          keywords,
          image: imageBase64,
          accessToken: session.access_token,
          generationSource,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to generate content.");
        setIsGenerating(false);
        return;
      }

      onGenerate(data);
      onSuccessfulGeneration?.();
    } catch {
      setError("Unexpected error while generating content.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Manual input</h3>
        <p className="mt-2 text-sm text-white/55">
          Enter product details manually, upload an image, or load from CSV.
        </p>
      </div>

      <div className="space-y-5">

        {mode === "image" && (
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Product image (required)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
            />

            {imageFile && (
              <div className="mt-3">
                <img
                  src={imageBase64 || ""}
                  className="max-h-40 rounded-xl border border-white/10"
                />
              </div>
            )}
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
            Product name
          </label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            placeholder={
              mode === "text"
                ? "Enter the product name (e.g. Luxury Leather Handbag)"
                : "Optional: product name if known"
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
            Features
          </label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            placeholder={
              mode === "text"
                ? "Enter key product attributes (e.g. material, color, size, fabric, technology, capacity)"
                : "Optional: add product details if known (material, color, size, etc.)"
            }
          />
        </div>

        {/* TONE + LANGUAGE */}

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Tone
            </label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a] border border-white/10 px-3 py-3 text-sm text-white appearance-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            >
              <option className="bg-[#0f172a] text-white">
                Premium, conversion-focused
              </option>
              <option className="bg-[#0f172a] text-white">
                Luxury
              </option>
              <option className="bg-[#0f172a] text-white">
                Minimal
              </option>
              <option className="bg-[#0f172a] text-white">
                Technical
              </option>
              <option className="bg-[#0f172a] text-white">
                SEO optimized
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Language
            </label>
            <input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              placeholder="English"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
            Keywords (optional)
          </label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            placeholder={
              mode === "text"
                ? "Enter SEO keywords separated by commas (e.g. luxury handbag, leather bag, designer purse)"
                : "Optional SEO keywords"
            }
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? "Generating with AI..." : "Generate content"}
        </button>
      </div>
    </div>
  );
}