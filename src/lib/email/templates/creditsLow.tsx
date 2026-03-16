import { EmailLayout } from "./layout";

export function CreditsLow({ credits }: { credits: number }) {
  return (
    <EmailLayout title="Your credits are running low">
      <p style={{ color: "#9ca3af" }}>
        You currently have {credits} credits remaining.
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
        Buy credits
      </a>
    </EmailLayout>
  );
}