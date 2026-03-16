import { EmailLayout } from "./layout";

export function LimitReachedEmail({ name }: { name: string }) {
  return (
    <EmailLayout title="You reached your free generation limit">
      <p style={{ color: "#9ca3af" }}>
        Hi {name || "there"},
      </p>

      <p style={{ color: "#9ca3af" }}>
        You have reached the limit of <b>3 product generations</b> in the free plan.
      </p>

      <p style={{ color: "#9ca3af" }}>
        Upgrade to Pro or buy credits to continue generating AI product
        descriptions for your store.
      </p>

      <a
        href="https://selliora.app/pricing"
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
        Upgrade to Pro
      </a>
    </EmailLayout>
  );
}