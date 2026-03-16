"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { supabase } from "../../../lib/supabase/client";
import { CopyButton } from "../../../components/shared/copy-button";

type HistoryRow = {
  id: string;
  product_name: string;
  seo_title: string;
  short_description: string;
  long_description: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
  seo_keywords: string[];
  instagram_caption: string | null;
  usage_type: string;
  generation_source: string;
  created_at: string;
};

export default function HistoryPage() {
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<HistoryRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [usageFilter, setUsageFilter] = useState("all");
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("You must be logged in to view history.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("generation_history")
        .select(
          `
            id,
            product_name,
            seo_title,
            short_description,
            long_description,
            meta_title,
            meta_description,
            tags,
            seo_keywords,
            instagram_caption,
            usage_type,
            generation_source,
            created_at
          `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const historyRows = (data || []) as HistoryRow[];
      setRows(historyRows);
      setSelectedRow(null);
      setLoading(false);
    };

    loadHistory();
  }, []);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !query ||
        row.product_name.toLowerCase().includes(query) ||
        row.seo_title.toLowerCase().includes(query) ||
        row.meta_title.toLowerCase().includes(query);

      const matchesSource =
        sourceFilter === "all" || row.generation_source === sourceFilter;

      const matchesUsage =
        usageFilter === "all" || row.usage_type === usageFilter;

      return matchesSearch && matchesSource && matchesUsage;
    });
  }, [rows, search, sourceFilter, usageFilter]);

  useEffect(() => {
    if (!filteredRows.length) {
      setSelectedRow(null);
      return;
    }

    if (!selectedRow) {
      setSelectedRow(filteredRows[0]);
    }
  }, [filteredRows]);

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

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const exportSelectedJson = () => {
    if (!selectedRow) return;
    const json = JSON.stringify(selectedRow, null, 2);
    downloadFile(
      json,
      `${slugify(selectedRow.product_name)}-history-item.json`,
      "application/json"
    );
  };

  const exportSelectedTxt = () => {
    if (!selectedRow) return;

    const text = `Product Name: ${selectedRow.product_name}
SEO Title: ${selectedRow.seo_title}
Short Description: ${selectedRow.short_description}
Long Description: ${selectedRow.long_description}
Meta Title: ${selectedRow.meta_title}
Meta Description: ${selectedRow.meta_description}
Tags: ${(selectedRow.tags || []).join(", ")}
SEO Keywords: ${(selectedRow.seo_keywords || []).join(", ")}
Instagram Caption: ${selectedRow.instagram_caption || ""}
Usage Type: ${selectedRow.usage_type}
Source: ${selectedRow.generation_source}
Created: ${new Date(selectedRow.created_at).toLocaleString()}
`;

    downloadFile(
      text,
      `${slugify(selectedRow.product_name)}-history-item.txt`,
      "text/plain;charset=utf-8;"
    );
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this history item?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    const { error } = await supabase
      .from("generation_history")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      setDeletingId(null);
      return;
    }

    setRows((prev) => prev.filter((row) => row.id !== id));

    if (selectedRow?.id === id) {
      const remaining = rows.filter((row) => row.id !== id);
      setSelectedRow(remaining[0] || null);
    }

    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-violet-300/80">
          History
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Generation history
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Review previously generated products and inspect the full AI output for each item.
        </p>
      </section>

      {error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <section className="rounded-[30px] border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or SEO title"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Source
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All sources</option>
              <option value="manual">Manual</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Usage type
            </label>
            <select
              value={usageFilter}
              onChange={(e) => setUsageFilter(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All usage types</option>
              <option value="demo">Demo</option>
              <option value="pro">Pro</option>
              <option value="credits">Credits</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-white/55">
          Showing {filteredRows.length} of {rows.length} items
        </div>
      </section>

      <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
        {loading ? (
          <div className="text-sm text-white/60">Loading history...</div>
        ) : filteredRows.length === 0 ? (
          <div className="text-sm text-white/60">No matching generations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-white/75">
              <thead>
                <tr className="border-b border-white/10 text-white/45">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">SEO Title</th>
                  <th className="px-4 py-3 font-medium">Usage</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-white/5 ${
                      selectedRow?.id === row.id ? "bg-white/5" : ""
                    }`}
                  >
                    <td className="px-4 py-4">{row.product_name}</td>
                    <td className="px-4 py-4 text-white/70">{row.seo_title}</td>
                    <td className="px-4 py-4 capitalize">{row.usage_type}</td>
                    <td className="px-4 py-4 capitalize">{row.generation_source}</td>
                    <td className="px-4 py-4 text-white/60">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
  onClick={() => {
    setSelectedRow(row);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }}
                          className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/15"
                        >
                          View details
                        </button>

                        <button
                          onClick={() => handleDelete(row.id)}
                          disabled={deletingId === row.id}
                          className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-400/15 disabled:opacity-70"
                        >
                          {deletingId === row.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRow ? (
        <section
  ref={detailsRef}
  className="rounded-[30px] border border-white/10 bg-white/5 p-6"
>
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {selectedRow.product_name}
              </h3>
              <p className="mt-2 text-sm text-white/55">
                Full generated output for the selected history item.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportSelectedJson}
                className="rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-400/15"
              >
                Export JSON
              </button>

              <button
                onClick={exportSelectedTxt}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Export TXT
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
                  SEO Title
                </p>
                <CopyButton value={selectedRow.seo_title} />
              </div>
              <p className="mt-2 text-sm text-white/95">{selectedRow.seo_title}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Short Description
                </p>
                <CopyButton value={selectedRow.short_description} />
              </div>
              <p className="mt-2 text-sm leading-6 text-white/85">
                {selectedRow.short_description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Long Description
                </p>
                <CopyButton value={selectedRow.long_description} />
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-white/85">
                {selectedRow.long_description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Meta Title
                  </p>
                  <CopyButton value={selectedRow.meta_title} />
                </div>
                <p className="mt-2 text-sm text-white/90">{selectedRow.meta_title}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Meta Description
                  </p>
                  <CopyButton value={selectedRow.meta_description} />
                </div>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  {selectedRow.meta_description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Tags
                </p>
                <CopyButton value={(selectedRow.tags || []).join(", ")} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedRow.tags?.map((tag) => (
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
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  SEO Keywords
                </p>
                <CopyButton value={(selectedRow.seo_keywords || []).join(", ")} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedRow.seo_keywords?.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-violet-400/15 bg-violet-400/10 px-3 py-1 text-xs text-violet-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {selectedRow.instagram_caption ? (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Instagram Caption
                  </p>
                  <CopyButton value={selectedRow.instagram_caption} />
                </div>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/90">
                  {selectedRow.instagram_caption}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}