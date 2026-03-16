import { EmailLayout } from "./layout";

export function VerifyEmail({ link }: { link: string }) {
  return (
    <EmailLayout title="Verify your email">
      <p style={{ color: "#9ca3af" }}>
        Please confirm your email to activate your Selliora account.
      </p>

      <a
        href={link}
        style={{
          display: "inline-block",
          background: "#06b6d4",
          color: "#000",
          padding: "12px 22px",
          borderRadius: 8,
          textDecoration: "none",
          marginTop: 20,
        }}
      >
        Verify email
      </a>
    </EmailLayout>
  );
}