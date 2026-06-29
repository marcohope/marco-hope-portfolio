import { ImageResponse } from "next/og";

// Apple touch icon (Next 16 file convention), generated at build time.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080a",
          color: "#f6f6f8",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: "-4px",
          fontFamily: "sans-serif",
        }}
      >
        MH
      </div>
    ),
    { ...size },
  );
}
