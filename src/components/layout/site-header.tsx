"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { getCurrentSession } from "../../lib/data/session";
import { supabase } from "../../lib/supabase/client";

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const { session } = await getCurrentSession();
      setIsLoggedIn(!!session);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <Sparkles className="h-4 w-4 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Selliora AI</p>
            <p className="text-xs text-white/45">AI SEO Product Pack</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/features" className="text-sm text-white/65 transition hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-white/65 transition hover:text-white">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/billing"
                className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Billing
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}