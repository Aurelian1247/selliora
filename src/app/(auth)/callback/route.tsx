import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { sendEmail } from "../../../lib/email/sendEmail";
import { WelcomeEmail } from "../../../lib/email/templates/welcome";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");
  const name = searchParams.get("name") || "there";

  if (email) {
    await sendEmail({
      to: email,
      subject: "Welcome to Selliora 🚀",
      react: <WelcomeEmail name={name} />,
    });
  }

  return NextResponse.redirect("https://selliora.app/dashboard");
}