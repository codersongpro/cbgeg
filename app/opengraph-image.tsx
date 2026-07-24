import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "geg-icon.png")
).toString("base64")}`;

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
          <img src={logoDataUrl} width={90} height={84} alt="" />
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
