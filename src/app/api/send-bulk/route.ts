import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔥 IMPORTANT
);

export async function GET() {
  const { data: users, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  for (const user of users.users) {
    if (!user.email) continue;

    try {
      await resend.emails.send({
        from: "Selliora AI <hello@selliora.app>",
        to: user.email,
        subject: "Start using Selliora on desktop",
        html: `
          <div style="background:#0b0b0f;padding:40px;font-family:Arial;color:white">
            <h2>Welcome back 👋</h2>

            <p>We’ve improved Selliora.</p>

            <p>
            You can now generate product descriptions, SEO content and more — instantly.
            </p>

            <p><b>Best experience is on desktop.</b></p>

            <a href="https://selliora.app"
               style="display:inline-block;margin-top:20px;padding:12px 20px;
               background:#3533cd;color:white;text-decoration:none;border-radius:8px;">
               Open Selliora →
            </a>

            <p style="margin-top:30px;font-size:12px;opacity:0.6">
              Selliora AI
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.log("Error sending to:", user.email);
    }
  }

  return Response.json({ success: true });
}