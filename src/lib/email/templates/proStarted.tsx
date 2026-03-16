import { EmailLayout } from "./layout";

export function ProStarted() {
  return (
    <EmailLayout title="Welcome to Selliora Pro">
      <p style={{ color: "#9ca3af" }}>
        Your Pro subscription is now active.
      </p>

      <p style={{ color: "#9ca3af" }}>
        You now have access to full AI generation features.
      </p>
    </EmailLayout>
  );
}