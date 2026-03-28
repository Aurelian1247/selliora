import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await resend.emails.send({
      from: "Selliora AI <support@selliora.app>",
      to: email,
      subject: "Use Selliora on desktop to generate products",
      html: `
<div style="background:#0b0b0f;padding:40px;font-family:Arial;color:white">

  <h2>Welcome to Selliora 👋</h2>

  <p>Hey,</p>

  <p>We noticed you just created your account.</p>

  <p>
  Selliora helps you generate product descriptions, SEO content, and marketing copy in seconds.
  </p>

  <p><b>Quick note:</b> The generator works best on desktop.</p>

  <p>
  Open Selliora from your laptop or PC and start creating your first products instantly.
  </p>

  <a href="https://selliora.app"
     style="display:inline-block;margin-top:20px;padding:12px 20px;
     background:#3533cd;color:white;text-decoration:none;border-radius:8px;">
     Open Selliora →
  </a>

  <p style="margin-top:30px;font-size:12px;opacity:0.6">
    If you have any questions, just reply to this email.
  </p>

</div>
`,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}