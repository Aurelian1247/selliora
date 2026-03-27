"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

type Stats = {
  total: number;
  csv: number;
  image: number;
  manual: number;
};

type HistoryItem = {
  id: string;
  product_name: string;
  generation_source: string;
  created_at: string;
};

export default function DashboardOverview() {

  // 🔥 ADAUGAT — NU AFECTEAZĂ NIMIC EXISTENT
  async function connectShopify() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("You are not logged in.");
    return;
  }

  const shop = "selliora-test.myshopify.com";

  window.location.href = `/api/shopify?shop=${shop}&userId=${user.id}`;
}

  const [stats, setStats] = useState<Stats>({
    total: 0,
    csv: 0,
    image: 0,
    manual: 0,
  });

  const [recent, setRecent] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("generation_history")
        .select("id, product_name, generation_source, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const rows = data || [];

      setStats({
        total: rows.length,
        csv: rows.filter((r) => r.generation_source === "csv").length,
        image: rows.filter((r) => r.generation_source === "image").length,
        manual: rows.filter((r) => r.generation_source === "manual").length,
      });

      setRecent(rows.slice(0, 5));
      setLoading(false);
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-violet-300/80">
          Overview
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Selliora AI dashboard
        </h2>

        {/* 🔥 ADAUGAT — BUTON CONNECT SHOPIFY */}
        <button
          onClick={connectShopify}
          className="mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Connect Shopify
        </button>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Track your product generation activity, imports and AI usage.
        </p>
      </section>

      {loading ? (
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Total generations
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.total}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                CSV imports
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.csv}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Image generations
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.image}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Manual generations
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.manual}
              </p>
            </div>

          </div>

          <section className="rounded-[30px] border border-white/10 bg-white/5 p-6">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Recent generations
              </h3>
            </div>

            {recent.length === 0 ? (
              <p className="text-sm text-white/60">
                No generations yet.
              </p>
            ) : (
              <div className="space-y-3">

                {recent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-white">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-white/50">
                        {item.generation_source}
                      </p>
                    </div>

                    <p className="text-xs text-white/50">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}

              </div>
            )}

          </section>
        </>
      )}
    </div>
  );
}