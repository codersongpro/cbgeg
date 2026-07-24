import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary",
        amber: "bg-amber/15 text-amber-ink",
        green: "bg-green/10 text-green",
        coral: "bg-coral/10 text-coral",
        neutral: "bg-ink/5 text-ink-muted",
        onDark: "bg-white/15 text-white",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
