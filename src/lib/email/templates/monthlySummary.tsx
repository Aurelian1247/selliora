import { EmailLayout } from "./layout";

export function MonthlySummary({
  generated,
}: {
  generated: number;
}) {
  return (
    <EmailLayout title="Your monthly usage report">
      <p style={{ color: "#9ca3af" }}>
        This month you generated:
      </p>

      <p style={{ color: "#ffffff", fontWeight: 600 }}>
        {generated} product descriptions
      </p>
    </EmailLayout>
  );
}