import { EmailLayout } from "./layout";

export function CreditsPurchased({
  credits,
}: {
  credits: number;
}) {
  return (
    <EmailLayout title="Credits added to your account">
      <p style={{ color: "#9ca3af" }}>
        Your purchase was successful.
      </p>

      <p style={{ color: "#ffffff", fontWeight: 600 }}>
        {credits} credits have been added to your account.
      </p>
    </EmailLayout>
  );
}