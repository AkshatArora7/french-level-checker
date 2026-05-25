import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "French Level Checker — Free CEFR Level Checker for French Text";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #ecfdf5 0%, #ffffff 45%, #f0fdf4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            FL
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#064e3b" }}>
              French Level Checker
            </div>
            <div style={{ fontSize: 20, color: "#047857" }}>
              french.aatechax.com
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Free CEFR level checker
            <br />
            for any French text.
          </div>
          <div style={{ fontSize: 30, color: "#334155", lineHeight: 1.3 }}>
            Paste text → get A1-C2 level, hard words highlighted, and a simpler version.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((lv) => (
            <div
              key={lv}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                background: "#059669",
                color: "white",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {lv}
            </div>
          ))}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: "#047857",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#10b981",
              }}
            />
            No signup · Free
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
