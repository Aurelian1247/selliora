import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { sendEmail } from "../../../lib/email/sendEmail";
import { VerifyEmail } from "../../../lib/email/templates/verifyEmail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password, fullName } = await req.json();

    // 1️⃣ Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // 2️⃣ Generate verification link
const { data: linkData, error: linkError } =
  await supabase.auth.admin.generateLink({
    type: "signup",
    email: email,
  } as any);

if (linkError) {
  return NextResponse.json(
    { error: linkError.message },
    { status: 400 }
  );
}

const verifyLink =
  linkData?.properties?.action_link ||
  "https://selliora.app";

    // 3️⃣ Send verification email
    await sendEmail({
      to: email,
      subject: "Verify your Selliora account",
      react: <VerifyEmail link={verifyLink} />,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}