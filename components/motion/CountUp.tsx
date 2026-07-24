"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 24, stiffness: 90 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const displayed = latest >= value - 0.5 ? value : Math.floor(latest);
        ref.current.textContent = `${displayed}${suffix}`;
      }
    });
  }, [springValue, suffix, value]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
