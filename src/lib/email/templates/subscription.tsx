import { EmailLayout } from "./layout";

export function SubscriptionEmail({
  name,
  plan,
}: {
  name: string;
  plan: string;
}) {
  return (
    <EmailLayout title="Your Selliora AI plan is active 🚀">
      <p style={{ color: "#9ca3af" }}>
        Hi {name || "there"},
      </p>

      <p style={{ color: "#9ca3af" }}>
        Your subscription has been successfully activated.
      </p>

      <p style={{ color: "#9ca3af" }}>
        <strong>Plan:</strong> {plan}
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
        Go to dashboard
      </a>
    </EmailLayout>
  );
}