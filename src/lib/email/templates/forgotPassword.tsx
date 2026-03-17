import { EmailLayout } from "./layout";

export function ForgotPassword({ link }: { link: string }) {
  return (
    <EmailLayout title="Reset your password">
      <p style={{ color: "#9ca3af" }}>
        Click the button below to reset your password.
      </p>

      <a
        href={`${link}&redirect_to=https://selliora.app/reset-password`}
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
        Reset password
      </a>
    </EmailLayout>
  );
}