"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function EmailTrigger() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const run = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (user.user_metadata?.welcome_sent) return;

      await fetch("/api/send-welcome", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
      });

      await supabase.auth.updateUser({
        data: { welcome_sent: true },
      });
    };

    run();
  }, []);

  return null;
}