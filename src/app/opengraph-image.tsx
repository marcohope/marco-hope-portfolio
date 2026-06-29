import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

// Programmatic Open Graph card (Next 16 file convention). Statically generated
// at build time. Mirrors the site's dark + electric-blue palette.
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 78% 18%, #14233f 0%, #08080a 55%)",
          color: "#f6f6f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              border: "2px solid rgba(255,255,255,0.18)",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            MH
          </div>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#8aa0c8",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "104px", fontWeight: 800, letterSpacing: "-3px" }}>
            {SITE_NAME}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "70px", height: "6px", background: "#2f80ff", borderRadius: "3px" }} />
            <div style={{ fontSize: "40px", color: "#c4ccda" }}>{SITE_TAGLINE}</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
