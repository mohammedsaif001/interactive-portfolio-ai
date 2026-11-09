import { ImageResponse } from "next/og";

export const alt = "Mohammed Saif | Senior Software Engineer in Bangalore, Full-stack and GenAI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card shown when the link is shared on LinkedIn, WhatsApp, X, Slack and similar.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#faf6ec", color: "#1f2430", border: "14px solid #1f2430" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, background: "#ffdf6e", border: "4px solid #1f2430", borderRadius: 999, padding: "8px 28px", alignSelf: "flex-start" }}>Open to immediate joining</div>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 800, marginTop: 36, lineHeight: 1 }}>Mohammed Saif</div>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 700, marginTop: 24 }}>Senior Software Engineer</div>
        <div style={{ display: "flex", fontSize: 38, marginTop: 16, color: "#4a5160" }}>Full-stack · GenAI · Bangalore, India</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 44, color: "#4a5160" }}>React · Next.js · Azure OpenAI · RAG · MCP</div>
      </div>
    ),
    size,
  );
}
