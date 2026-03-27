"use client";

import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase/client";
import { toast } from "react-hot-toast";

export function BulkImageGenerator() {
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  const [tone, setTone] = useState("Premium, conversion-focused");
  const [language, setLanguage] = useState("English");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles(Array.from(fileList));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const handleGenerate = async () => {
    if (files.length === 0) {
      setError("Please upload images.");
      return;
    }

    setError("");
    setIsGenerating(true);

    setProgress(0);
    setTotal(files.length);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setError("Not authenticated.");
        setIsGenerating(false);
        return;
      }

      let completed = 0;

      const promises = files.map(async (file) => {
        const base64 = await toBase64(file);

        const res = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64,
            generationSource: "image",
            tone,
            language,
            accessToken: session.access_token,
          }),
        });

        const data = await res.json();

        completed += 1;
        setProgress(completed);

        if (!res.ok) return null;

        // 🔥 IMPORTANT: atașăm imaginea la rezultat
        return {
          ...data,
          image: base64,
        };
      });

      const outputs = (await Promise.all(promises)).filter(Boolean);

      setResults(outputs);
    } catch {
      setError("Bulk generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  // 🔥🔥🔥 NOU — EXPORT BULK SHOPIFY
  const handleExportAllToShopify = async () => {
    if (results.length === 0) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("User not authenticated");
        return;
      }

       let shopDomain = ""; // 🔥 salvăm shop-ul

    for (const item of results) {
      const res = await fetch("/api/shopify/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.seoTitle,
          description: item.longDescription,
          image: item.image,
          userId: user.id,
        }),
      });

      const data = await res.json();

      // 🔥 luăm shop doar o dată
      if (!shopDomain && data.shop) {
        shopDomain = data.shop;
      }
    }

    toast.success("All products exported to Shopify 🚀");

    // 🔥 DESCHIDE SHOPIFY PRODUCTS PAGE
    if (shopDomain) {
      window.open(`https://${shopDomain}/admin/products`, "_blank");
    }

  } catch (err) {
    console.error(err);
    toast.error("Bulk export failed");
  }
};

  const clean = (text: string) =>
    (text || "")
      .replace(/\n/g, " ")
      .replace(/\r/g, " ")
      .replace(/"/g, '""');

  const downloadFile = (content: string, filename: string, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const exportShopifyCSV = () => {
    if (results.length === 0) return;

    const headers = [
      "Title",
      "Body (HTML)",
      "Tags",
      "SEO Title",
      "SEO Description",
    ];

    const rows = results.map((r) =>
      [
        `"${clean(r.seoTitle)}"`,
        `"${clean(r.longDescription)}"`,
        `"${clean((r.tags || []).join(", "))}"`,
        `"${clean(r.metaTitle)}"`,
        `"${clean(r.metaDescription)}"`,
      ].join(",")
    );

    const csv = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");

    downloadFile(csv, "shopify-products.csv", "text/csv");
  };

  const exportWooCSV = () => {
    if (results.length === 0) return;

    const headers = [
      "Name",
      "Description",
      "Short description",
      "Tags",
      "Meta title",
      "Meta description",
    ];

    const rows = results.map((r) =>
      [
        `"${clean(r.seoTitle)}"`,
        `"${clean(r.longDescription)}"`,
        `"${clean(r.shortDescription)}"`,
        `"${clean((r.tags || []).join(", "))}"`,
        `"${clean(r.metaTitle)}"`,
        `"${clean(r.metaDescription)}"`,
      ].join(",")
    );

    const csv = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");

    downloadFile(csv, "woocommerce-products.csv", "text/csv");
  };

  const exportJSON = () => {
    if (results.length === 0) return;

    const json = JSON.stringify(results, null, 2);

    downloadFile(json, "products.json", "application/json");
  };

  const exportHTML = () => {
    if (results.length === 0) return;

    const html = results
      .map(
        (r) => `
<h2>${r.seoTitle}</h2>
<p>${r.shortDescription}</p>
<div>${r.longDescription}</div>
<p><strong>Tags:</strong> ${(r.tags || []).join(", ")}</p>
<hr/>
`
      )
      .join("\n");

    downloadFile(html, "products.html", "text/html");
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">
          Bulk Image Generator PRO
        </h3>

        <p className="text-sm text-white/60 mt-2">
          Upload multiple product images and generate SEO product content automatically.
        </p>
      </div>

      {/* Tone & Language selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/40 mb-1 block">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-xl bg-[#0f172a] border border-white/10 px-3 py-2 text-sm text-white appearance-none"
          >
            <option>Premium, conversion-focused</option>
            <option>Luxury</option>
            <option>Minimal</option>
            <option>Technical</option>
            <option>SEO optimized</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-white/40 mb-1 block">Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Enter language (e.g. English, Romanian, German, Spanish)"
            className="w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        className="w-full border-2 border-dashed border-white/20 rounded-2xl p-10 text-center text-white/60 cursor-pointer hover:border-white/40"
      >
        Drag & drop images here or click to upload
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="text-sm text-white/60">
          {files.length} images selected
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black"
      >
        {isGenerating ? "Generating..." : "Generate content"}
      </button>

      {isGenerating && total > 0 && (
        <div className="w-full mt-2">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>Processing {progress} / {total}</span>
            <span>{Math.round((progress / total) * 100)}%</span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all"
              style={{ width: `${(progress / total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-300 text-sm">{error}</div>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="text-sm text-white/60">
              {results.length} products generated
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportAllToShopify}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white text-sm"
              >
                🚀 Export ALL to Shopify
              </button>

              <button
                onClick={exportShopifyCSV}
                className="rounded-xl bg-white px-4 py-2 text-black text-sm"
              >
                Export Shopify CSV
              </button>

              <button
                onClick={exportWooCSV}
                className="rounded-xl bg-white px-4 py-2 text-black text-sm"
              >
                Export WooCommerce CSV
              </button>

              <button
                onClick={exportJSON}
                className="rounded-xl bg-white/10 px-4 py-2 text-white text-sm"
              >
                Export JSON
              </button>

              <button
                onClick={exportHTML}
                className="rounded-xl bg-white/10 px-4 py-2 text-white text-sm"
              >
                Export HTML
              </button>
            </div>
          </div>

          {results.map((r, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl p-5 text-white text-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold">{r.seoTitle}</div>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(r, null, 2)
                    )
                  }
                  className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
                >
                  Copy
                </button>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">
                  Short Description
                </div>
                <div className="text-white/80">{r.shortDescription}</div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">
                  Long Description
                </div>
                <div className="text-white/70">{r.longDescription}</div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">
                  Meta Title
                </div>
                <div>{r.metaTitle}</div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">
                  Meta Description
                </div>
                <div>{r.metaDescription}</div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">
                  Tags
                </div>
                <div>{(r.tags || []).join(", ")}</div>
              </div>

              {r.instagramCaption && (
                <div>
                  <div className="text-xs text-white/40 mb-1">
                    Instagram Caption
                  </div>
                  <div>{r.instagramCaption}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}