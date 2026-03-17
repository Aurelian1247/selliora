"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, X, Sparkles } from "lucide-react";

import { SiteFooter } from "../../../components/layout/site-footer";
import { getCurrentSession } from "../../../lib/data/session";
import { getCurrentUserUsage, type UserUsage } from "../../../lib/data/usage";

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usage, setUsage] = useState<UserUsage | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { session } = await getCurrentSession();
      const loggedIn = !!session;
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const { usage } = await getCurrentUserUsage();
        setUsage(usage);
      }
    };

    loadData();
  }, []);

  const currentPlan = usage?.plan_type === "pro" ? "Pro" : "Demo";

  const demoHref = isLoggedIn ? "/dashboard/generator" : "/signup";
  const proHref = isLoggedIn ? "/dashboard/billing" : "/signup";
  const creditsHref = isLoggedIn ? "/dashboard/billing" : "/signup";

  return (
    <main className="min-h-screen bg-[#050816] text-white">
     

      {/* HERO */}

      <section className="px-4 pb-6 pt-20 text-center md:px-6">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
          Pricing
        </p>

        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          Choose the right Selliora plan for your product content workflow
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
          Start with a free demo, upgrade to Pro for monthly generation, or buy
          credits when you need more output.
        </p>

        {isLoggedIn && (
          <div className="mx-auto mt-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            Current plan: {currentPlan}
          </div>
        )}
      </section>

      {/* PRICING CARDS (IDENTICE CU HOMEPAGE) */}

      <section className="px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 xl:grid-cols-3">

            {/* DEMO */}

            <div className="flex h-full flex-col rounded-[32px] border border-white/10 bg-white/5 p-8">

              <div className="flex-grow">

                <p className="text-3xl font-semibold text-white">Demo</p>

                <p className="mt-3 text-base leading-7 text-white/60">
                  Best for testing Selliora before upgrading.
                </p>

                <div className="mt-8">
                  <p className="text-5xl font-semibold tracking-tight text-white">
                    Free
                  </p>

                  <p className="mt-3 text-sm text-white/45">
                    Limited trial access
                  </p>
                </div>

                <div className="mt-8 space-y-4">

                  {[
                    "3 product generations",
                    "Manual product generator",
                    "SEO Title + Short + Long description",
                    "Meta Title + Meta Description",
                    "Product Tags",
                    "SEO Keywords",
                    "Instagram Caption generator",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                        <Check className="h-3.5 w-3.5 text-cyan-300" />
                      </div>

                      <p className="text-sm leading-6 text-white/78">{item}</p>
                    </div>
                  ))}

                  {[
                    "CSV bulk generation",
                    "History export",
                    "Shopify export",
                    "WooCommerce export",
                    "Priority AI generation",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 opacity-75">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-red-400/25 bg-red-400/10">
                        <X className="h-3.5 w-3.5 text-red-300" />
                      </div>

                      <p className="text-sm leading-6 text-white/55">{item}</p>
                    </div>
                  ))}

                </div>

              </div>

              <Link
                href={demoHref}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {isLoggedIn ? "Open generator" : "Start free"}
              </Link>

            </div>

            {/* PRO */}

            <div className="relative flex h-full flex-col rounded-[32px] border border-cyan-400/30 bg-cyan-400/10 p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)]">

              <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Most popular
              </div>

              <div className="flex-grow">

                <p className="text-3xl font-semibold text-white">Pro</p>

                <p className="mt-3 max-w-sm text-base leading-7 text-white/78">
                  Built for stores that need a serious AI content workflow every
                  month.
                </p>

                <div className="mt-8">
                  <p className="text-5xl font-semibold tracking-tight text-white">
                    $19/mo
                  </p>

                  <p className="mt-3 text-sm text-white/55">
                    Subscription with automatic renewal
                  </p>
                </div>

                <div className="mt-8 space-y-4">

                  {[
                    "Up to 100 product generations / month",
                    "Manual generator + CSV bulk generator",
                    "SEO Title + Short + Long description",
                    "Meta Title + Meta Description",
                    "Product Tags + SEO Keywords",
                    "Instagram Caption generator",
                    "Generation history",
                    "Search + filter history",
                    "Delete history items",
                    "Export single history items",
                    "Export JSON + TXT",
                    "Shopify-ready export",
                    "WooCommerce-ready export",
                    "Default language + default tone",
                    "Credits fallback after monthly limit",
                    "Priority AI generation quality",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                        <Check className="h-3.5 w-3.5 text-cyan-300" />
                      </div>

                      <p className="text-sm leading-6 text-white/88">{item}</p>
                    </div>
                  ))}

                </div>

              </div>

              <Link
                href={proHref}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                {isLoggedIn ? "Manage billing" : "Get Pro"}
              </Link>

            </div>

            {/* CREDITS */}

            <div className="flex h-full flex-col rounded-[32px] border border-white/10 bg-white/5 p-8">

              <div className="flex-grow">

                <p className="text-3xl font-semibold text-white">
                  Credits Packs
                </p>

                <p className="mt-3 text-base leading-7 text-white/60">
                  Best for flexible, pay-as-you-go generation without a
                  subscription.
                </p>

                <div className="mt-8">
                  <p className="text-5xl font-semibold tracking-tight text-white">
                    from $5
                  </p>

                  <p className="mt-3 text-sm text-white/45">
                    One-time purchase • credits never expire
                  </p>
                </div>

                <div className="mt-8 space-y-4">

                  {[
                    "Buy credits anytime",
                    "Works after Demo or Pro limit is reached",
                    "10 credits consumed per product generation",
                    "Manual generator supported",
                    "CSV bulk generation supported",
                    "Same SEO output quality as paid workflow",
                    "JSON + TXT exports available",
                    "Shopify-ready export",
                    "WooCommerce-ready export",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                        <Check className="h-3.5 w-3.5 text-cyan-300" />
                      </div>

                      <p className="text-sm leading-6 text-white/78">{item}</p>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                      Available packs
                    </p>

                    <div className="mt-3 space-y-2 text-sm text-white/82">
                      <p>$5 → 100 credits</p>
                      <p>$10 → 200 credits</p>
                      <p>$29 → 600 credits</p>
                    </div>
                  </div>

                </div>

              </div>

              <Link
                href={creditsHref}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {isLoggedIn ? "Buy credits" : "Create account"}
              </Link>

            </div>

          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}