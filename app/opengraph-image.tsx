import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "French Level Checker — Free CEFR tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>
          French Level Checker
        </div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.9 }}>
          Paste French. Get the CEFR level (A1–C2),
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          difficult words, and a simpler rewrite.
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 28,
            opacity: 0.85,
          }}
        >
          <span>Free</span>
          <span>·</span>
          <span>No signup</span>
          <span>·</span>
          <span>Powered by AI</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
