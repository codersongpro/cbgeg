import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <svg
          viewBox="0 0 120 100"
          width="28"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14,40 C20,58 35,72 50,82" stroke="#F4B400" strokeWidth="10" strokeLinecap="round" />
          <path d="M36,18 C38,42 48,64 56,82" stroke="#4285F4" strokeWidth="10" strokeLinecap="round" />
          <path d="M64,10 C60,36 62,60 62,82" stroke="#EA4335" strokeWidth="11" strokeLinecap="round" />
          <path d="M106,40 C100,58 85,72 70,82" stroke="#34A853" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
