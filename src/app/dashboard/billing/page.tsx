"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import { getCurrentUserUsage, type UserUsage } from "../../../lib/data/usage";

type CheckoutType = "pro" | "credits_100" | "credits_200" | "credits_600";

export default function BillingPage() {
  const [loadingType, setLoadingType] = useState<CheckoutType | null>(null);
  const [message, setMessage] = useState("");
  const [usage, setUsage] = useState<UserUsage | null>(null);

  useEffect(() => {
    const loadUsage = async () => {
      const { usage } = await getCurrentUserUsage();
      setUsage(usage);
    };

    loadUsage();
  }, []);

  const handleCheckout = async (checkoutType: CheckoutType) => {
    setLoadingType(checkoutType);
    setMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setMessage("You must be logged in.");
        setLoadingType(null);
        return;
      }

      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkoutType,
          accessToken: session.access_token,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || "Failed to create checkout.");
        setLoadingType(null);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setMessage("No checkout URL returned.");
    } catch {
      setMessage("Unexpected error while creating checkout.");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
          Billing
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Plans and usage
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Manage your subscription, buy credits, and monitor your product generation capacity.
        </p>
      </section>

      {message ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {message}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Current plan</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {usage?.plan_type === "pro" ? "Pro" : "Demo"}
          </p>
          <p className="mt-2 text-sm text-white/60">Current active plan</p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Demo used</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {usage ? `${usage.demo_generations_used} / 3` : "—"}
          </p>
          <p className="mt-2 text-sm text-white/60">Free generations used</p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Monthly used</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {usage ? `${usage.monthly_products_used} / ${usage.monthly_product_limit}` : "—"}
          </p>
          <p className="mt-2 text-sm text-white/60">Products used this month</p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Credits</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {usage?.credits_balance ?? "—"}
          </p>
          <p className="mt-2 text-sm text-white/60">Available credits balance</p>
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold text-white">Upgrade options</h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Pro plan — $19/month</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Includes up to 100 products per month with automatic monthly renewal.
            </p>
            <button
              onClick={() => handleCheckout("pro")}
              disabled={loadingType === "pro"}
              className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-70"
            >
              {loadingType === "pro" ? "Redirecting..." : "Upgrade to Pro"}
            </button>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Credits Pack — $5</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Adds 100 credits. Each generated product costs 10 credits.
            </p>
            <button
              onClick={() => handleCheckout("credits_100")}
              disabled={loadingType === "credits_100"}
              className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
            >
              {loadingType === "credits_100" ? "Redirecting..." : "Buy 100 credits"}
            </button>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Credits Pack — $10</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Adds 200 credits. Better value for heavier generation workflows.
            </p>
            <button
              onClick={() => handleCheckout("credits_200")}
              disabled={loadingType === "credits_200"}
              className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
            >
              {loadingType === "credits_200" ? "Redirecting..." : "Buy 200 credits"}
            </button>
          </div>

          <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-sm font-medium text-white">Credits Pack — $29</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Adds 600 credits. Best value for frequent bulk generation.
            </p>
            <button
              onClick={() => handleCheckout("credits_600")}
              disabled={loadingType === "credits_600"}
              className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-70"
            >
              {loadingType === "credits_600" ? "Redirecting..." : "Buy 600 credits"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}