"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

export function DashboardProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<"loading" | "allowed">("loading");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/login";
        return;
      }

      setStatus("allowed");
    };

    checkUser();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
          Checking session...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}