"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import { supabase } from "../../lib/supabase/client";

export type CsvRow = {
  productName: string;
  features: string;
  tone: string;
  language: string;
};

type BulkGeneratedRow = {
  productName: string;
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string;
  tags: string;
  instagramCaption: string;
};

type CsvUploadPanelProps = {
  onSelectRow: (row: CsvRow) => void;
};

export function CsvUploadPanel({ onSelectRow }: CsvUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [bulkResults, setBulkResults] = useState<BulkGeneratedRow[]>([]);
  const [error, setError] = useState("");
  const [isGeneratingBulk, setIsGeneratingBulk] = useState(false);

  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  const handleFileChange = (file: File) => {
    setError("");
    setBulkResults([]);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows: CsvRow[] = (results.data || [])
          .map((row) => ({
            productName: String(
              row.productName || row.ProductName || row.product || ""
            ).trim(),
            features: String(row.features || row.Features || "").trim(),
            tone: String(row.tone || row.Tone || "").trim(),
            language:
              String(row.language || row.Language || "English").trim() || "English",
          }))
          .filter((row) => row.productName && row.features);

        if (!parsedRows.length) {
          setRows([]);
          setError(
            "No valid rows found. Use columns: productName, features, tone, language."
          );
          return;
        }

        setRows(parsedRows);
      },
      error: () => {
        setError("Failed to parse CSV file.");
      },
    });
  };

  const generateAllRows = async () => {
    setError("");
    setIsGeneratingBulk(true);

    setProgress(0);
    setTotal(rows.length);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setError("You must be logged in to generate bulk content.");
        setIsGeneratingBulk(false);
        return;
      }

      let completed = 0;

      const promises = rows.map(async (row) => {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: row.productName,
            features: row.features,
            tone: row.tone,
            language: row.language,
            generationSource: "csv",
            accessToken: session.access_token,
          }),
        });

        const data = await res.json();

        completed += 1;
        setProgress(completed);

        if (!res.ok) return null;

        return {
          productName: row.productName,
          ...data,
        };
      });

      const outputs = (await Promise.all(promises)).filter(Boolean) as BulkGeneratedRow[];

      setBulkResults(outputs);
    } catch {
      setError("Unexpected error while generating bulk content.");
    } finally {
      setIsGeneratingBulk(false);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const downloadGeneratedCsv = () => {
    if (!bulkResults.length) return;

    const csv = Papa.unparse(
      bulkResults.map((row) => ({
        productName: row.productName,
        seoTitle: row.seoTitle,
        shortDescription: row.shortDescription,
        longDescription: row.longDescription,
        metaTitle: row.metaTitle,
        metaDescription: row.metaDescription,
        seoKeywords: row.seoKeywords,
        tags: row.tags,
        instagramCaption: row.instagramCaption,
      }))
    );

    downloadFile(csv, "selliora-generated-results.csv", "text/csv;charset=utf-8;");
  };

  const downloadGeneratedJson = () => {
    if (!bulkResults.length) return;

    const json = JSON.stringify(bulkResults, null, 2);
    downloadFile(json, "selliora-generated-results.json", "application/json");
  };

  const downloadGeneratedTxt = () => {
    if (!bulkResults.length) return;

    const text = bulkResults
      .map(
        (row, index) => `PRODUCT ${index + 1}
Product Name: ${row.productName}
SEO Title: ${row.seoTitle}
Short Description: ${row.shortDescription}
Long Description: ${row.longDescription}
Meta Title: ${row.metaTitle}
Meta Description: ${row.metaDescription}
SEO Keywords: ${row.seoKeywords}
Tags: ${row.tags}
Instagram Caption: ${row.instagramCaption}
----------------------------------------`
      )
      .join("\n\n");

    downloadFile(text, "selliora-generated-results.txt", "text/plain;charset=utf-8;");
  };

  const downloadShopifyCsv = () => {
    if (!bulkResults.length) return;

    const csv = Papa.unparse(
      bulkResults.map((row) => ({
        Title: row.productName,
        "Body (HTML)": `<p>${row.shortDescription}</p><p>${row.longDescription}</p>`,
        Tags: row.tags,
        "SEO Title": row.metaTitle,
        "SEO Description": row.metaDescription,
      }))
    );

    downloadFile(csv, "selliora-shopify-export.csv", "text/csv;charset=utf-8;");
  };

  const downloadWooCommerceCsv = () => {
    if (!bulkResults.length) return;

    const csv = Papa.unparse(
      bulkResults.map((row) => ({
        Name: row.productName,
        "Short description": row.shortDescription,
        Description: row.longDescription,
        Tags: row.tags,
        "_yoast_wpseo_title": row.metaTitle,
        "_yoast_wpseo_metadesc": row.metaDescription,
      }))
    );

    downloadFile(
      csv,
      "selliora-woocommerce-export.csv",
      "text/csv;charset=utf-8;"
    );
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">CSV upload</h3>
        <p className="mt-2 text-sm text-white/55">
          Upload a CSV with productName, features, tone, and language.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Upload CSV
        </button>

        <a
          href="/sample-products.csv"
          download
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Download sample CSV
        </a>

        {rows.length > 0 && (
          <button
            onClick={generateAllRows}
            disabled={isGeneratingBulk}
            className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-cyan-300 disabled:opacity-70"
          >
            {isGeneratingBulk ? "Generating bulk..." : "Generate all rows"}
          </button>
        )}

        {bulkResults.length > 0 && (
          <>
            <button
              onClick={downloadGeneratedCsv}
              className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/15"
            >
              Download CSV
            </button>

            <button
              onClick={downloadGeneratedJson}
              className="rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-400/15"
            >
              Download JSON
            </button>

            <button
              onClick={downloadGeneratedTxt}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Download TXT
            </button>

            <button
              onClick={downloadShopifyCsv}
              className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15"
            >
              Shopify CSV
            </button>

            <button
              onClick={downloadWooCommerceCsv}
              className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-200 transition hover:bg-amber-400/15"
            >
              WooCommerce CSV
            </button>
          </>
        )}
      </div>

      {isGeneratingBulk && total > 0 && (
        <div className="mt-4 w-full">
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

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
      />

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}