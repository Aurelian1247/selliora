import { EmailLayout } from "./layout";

export function CreditsExhausted() {
  return (
    <EmailLayout title="Your credits are exhausted">
      <p style={{ color: "#9ca3af" }}>
        You have used all available credits.
      </p>

      <a
        href="https://selliora.app/billing"
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
        Purchase credits
      </a>
    </EmailLayout>
  );
}