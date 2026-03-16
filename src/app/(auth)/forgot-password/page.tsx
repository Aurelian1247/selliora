"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setMessage("Check your email for the reset link.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot password
        </h1>

        <p className="mt-3 text-sm text-white/65">
          Enter your email and we will send you a reset link.
        </p>

        <div className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-black"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>

          {message && (
  <div className="text-center text-sm text-green-300">
    {message}
  </div>
)}

        </div>
      </div>
    </main>
  );
}