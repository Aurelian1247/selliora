"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully.");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
            Selliora AI
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Set a new password
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/65">
            Enter your new password below.
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              New password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Confirm password
            </label>

            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
            />
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
            onClick={handleReset}
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update password"}
          </button>

        </div>
      </div>
    </main>
  );
}