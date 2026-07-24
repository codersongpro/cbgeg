import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3B6FE0, #1DB874)",
          fontSize: 96,
          fontWeight: 800,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 160,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            marginBottom: 32,
          }}
        >
          <svg viewBox="0 0 120 100" width="90" height="75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14,40 C20,58 35,72 50,82" stroke="#F4B400" strokeWidth="9" strokeLinecap="round" />
            <path d="M36,18 C38,42 48,64 56,82" stroke="#4285F4" strokeWidth="9" strokeLinecap="round" />
            <path d="M64,10 C60,36 62,60 62,82" stroke="#EA4335" strokeWidth="10" strokeLinecap="round" />
            <path d="M106,40 C100,58 85,72 70,82" stroke="#34A853" strokeWidth="9" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: "flex" }}>충북 GEG</div>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 500, marginTop: 20, opacity: 0.85 }}>
          Google Educator Group Chungbuk
        </div>
      </div>
    ),
    { ...size }
  );
}
