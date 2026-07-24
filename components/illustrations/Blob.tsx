import { cn } from "@/lib/utils";

interface BlobProps {
  className?: string;
  color?: string;
}

export function Blob({ className, color = "var(--color-primary)" }: BlobProps) {
  return (
    <svg
      className={cn("absolute -z-10 blur-2xl opacity-40", className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M52.4,-62.5C67.4,-52.9,79,-36.8,83.6,-19.1C88.2,-1.5,85.8,17.7,76.9,32.9C68,48.1,52.7,59.3,35.9,66.8C19.1,74.3,0.8,78.1,-17.9,76.4C-36.7,74.7,-55.9,67.5,-67.6,53.7C-79.3,39.9,-83.5,19.6,-82.1,0.4C-80.7,-18.9,-73.7,-37.1,-61.1,-47.1C-48.6,-57.1,-30.6,-58.9,-13.2,-62.1C4.1,-65.3,26.2,-72.1,52.4,-62.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
