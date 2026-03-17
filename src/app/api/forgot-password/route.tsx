import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { sendEmail } from "../../../lib/email/sendEmail";
import { ForgotPassword } from "../../../lib/email/templates/forgotPassword";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { data, error } =
     await supabase.auth.admin.generateLink({
  type: "recovery",
  email,
  options: {
    redirectTo: "https://selliora.app/reset-password",
  },
} as any);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const resetLink =
      data?.properties?.action_link ||
      "https://selliora.app";

    await sendEmail({
      to: email,
      subject: "Reset your Selliora password",
      react: <ForgotPassword link={resetLink} />,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}