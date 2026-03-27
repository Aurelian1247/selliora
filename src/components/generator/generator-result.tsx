"use client";

import { CopyButton } from "../shared/copy-button";
import { supabase } from "../../lib/supabase/client"; // ✅ ADĂUGAT
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react"; // ✅ ADĂUGAT

type GeneratorOutput = {
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  seoKeywords?: string[];
  instagramCaption?: string;
  html?: string; // 🔥 IMPORTANT pentru Shopify
  image?: string; // 🔥 ADAUGĂ LINIA ASTA
};

type GeneratorResultProps = {
  output: GeneratorOutput | null;
};

export function GeneratorResult({ output }: GeneratorResultProps) {

  // ✅ STATE-URI NOI (NU AFECTEAZĂ CE AI)
  const [isExporting, setIsExporting] = useState(false);
  const [hasShopify, setHasShopify] = useState(true);

  // ✅ VERIFICĂ dacă userul are Shopify conectat
  useEffect(() => {
    const checkShopify = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("shopify_connections")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);

      setHasShopify(!!data?.length);
    };

    checkShopify();
  }, []);

  // ✅ FUNCȚIE EXPORT (EXTINSĂ CU LOADING + SHOP DIN BACKEND)
  const handleExportToShopify = async () => {
    try {
      setIsExporting(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !output) {
        toast.error("User or output missing");
        return;
      }

      const res = await fetch("/api/shopify/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: output.seoTitle,
          description: output.html || output.longDescription,
          userId: user.id,
          image: output.image || null, // 🔥 ADĂUGAT
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to export");
        return;
      }

      toast.success("Product pushed to Shopify 🚀");

      // 🔥 DESCHIDE SHOPIFY DINAMIC (NU HARDCODED)
      window.open(`https://${data.shop}/admin/products/${data.productId}`, "_blank");

    } catch (err) {
      console.error(err);
      toast.error("Error exporting product");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">Output preview</h3>

      {!output ? (
        <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-white/50">
          Fill in the product details and click <span className="text-white">Generate content</span>.
        </div>
      ) : (
        <div className="mt-5 space-y-4">

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
                SEO Title
              </p>
              <CopyButton value={output.seoTitle} />
            </div>
            <p className="mt-2 text-sm text-white/95">{output.seoTitle}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                Short Description
              </p>
              <CopyButton value={output.shortDescription} />
            </div>
            <p className="mt-2 text-sm leading-6 text-white/85">
              {output.shortDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                Long Description
              </p>
              <CopyButton value={output.longDescription} />
            </div>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-white/85">
              {output.longDescription}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Meta Title
                </p>
                <CopyButton value={output.metaTitle} />
              </div>
              <p className="mt-2 text-sm text-white/90">{output.metaTitle}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Meta Description
                </p>
                <CopyButton value={output.metaDescription} />
              </div>
              <p className="mt-2 text-sm leading-6 text-white/90">
                {output.metaDescription}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                Tags
              </p>
              <CopyButton value={output.tags.join(", ")} />
            </div>
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

          {output.seoKeywords?.length ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  SEO Keywords
                </p>
                <CopyButton value={output.seoKeywords.join(", ")} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {output.seoKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-violet-400/15 bg-violet-400/10 px-3 py-1 text-xs text-violet-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {output.instagramCaption ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Instagram Caption
                </p>
                <CopyButton value={output.instagramCaption} />
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/90">
                {output.instagramCaption}
              </p>
            </div>
          ) : null}

          {/* 🔥 BUTON PREMIUM */}
          <button
            onClick={handleExportToShopify}
            disabled={isExporting || !hasShopify}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!hasShopify
              ? "Connect Shopify first"
              : isExporting
              ? "Pushing to Shopify..."
              : "Export to Shopify"}
          </button>

        </div>
      )}
    </div>
  );
}