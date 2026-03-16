import React from "react";

export function EmailLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "#050816",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          background: "#0B0F2A",
          borderRadius: "14px",
          padding: "32px",
          border: "1px solid #1f2937",
        }}
      >
        <h1 style={{ color: "#ffffff", marginBottom: 16 }}>{title}</h1>

        {children}

        <div
          style={{
            marginTop: 40,
            borderTop: "1px solid #1f2937",
            paddingTop: 16,
            fontSize: 13,
            color: "#9ca3af",
          }}
        >
          Selliora AI  
          <br />
          AI SEO Product Pack  
          <br />
          https://selliora.app
        </div>
      </div>
    </div>
  );
}