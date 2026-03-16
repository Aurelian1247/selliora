"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Logged in successfully.");
    setLoading(false);

    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
            Selliora AI
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Log in to access your dashboard, generation history, and billing.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
            />
          </div>
          
<div className="flex justify-center">
  <Link
    href="/forgot-password"
    className="text-xs text-cyan-300 transition hover:text-cyan-200"
  >
    Forgot password?
  </Link>
</div>

          {error ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        <p className="mt-6 text-sm text-white/55">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyan-300 transition hover:text-cyan-200">
            Start free
          </Link>
        </p>
      </div>
    </main>
  );
}