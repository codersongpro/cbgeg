import { cn } from "@/lib/utils";

interface GegLogoProps {
  className?: string;
}

/** The GEG "open book" mark in Google's four brand colors. */
export function GegLogo({ className }: GegLogoProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={cn("h-8 w-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14,40 C20,58 35,72 50,82"
        stroke="#F4B400"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M36,18 C38,42 48,64 56,82"
        stroke="#4285F4"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M64,10 C60,36 62,60 62,82"
        stroke="#EA4335"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M106,40 C100,58 85,72 70,82"
        stroke="#34A853"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
