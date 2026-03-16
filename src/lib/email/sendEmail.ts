import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailProps = {
  to: string;
  subject: string;
  react: React.ReactElement;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  react,
  from = "Selliora <support@selliora.app>",
}: SendEmailProps) {
  return await resend.emails.send({
    from,
    to,
    subject,
    react,
  });
}