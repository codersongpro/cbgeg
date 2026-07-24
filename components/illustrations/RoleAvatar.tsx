import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const palette = [
  "bg-primary/10 text-primary",
  "bg-green/10 text-green",
  "bg-coral/10 text-coral",
  "bg-amber/10 text-amber-ink",
];

interface RoleAvatarProps {
  index?: number;
  className?: string;
}

/** Generic, non-photographic avatar — deliberately not tied to any real person. */
export function RoleAvatar({ index = 0, className }: RoleAvatarProps) {
  return (
    <div
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-full",
        palette[index % palette.length],
        className
      )}
      aria-hidden="true"
    >
      <User className="h-8 w-8" strokeWidth={1.75} />
    </div>
  );
}
