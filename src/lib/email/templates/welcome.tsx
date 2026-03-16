import { EmailLayout } from "./layout";

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <EmailLayout title="Welcome to Selliora AI 🚀">
      <p style={{ color: "#9ca3af" }}>Hi {name},</p>

      <p style={{ color: "#9ca3af" }}>
        Your AI-powered product content engine is ready.
      </p>

      <a
        href="https://selliora.app/dashboard"
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
        Open Dashboard
      </a>
    </EmailLayout>
  );
}