"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ActivityYearGroup } from "@/types";
import { YearTimeline } from "@/components/sections/activities/YearTimeline";
import { ChampionshipEvent } from "@/components/sections/activities/ChampionshipEvent";

export function YearTabs({ years }: { years: ActivityYearGroup[] }) {
  const [active, setActive] = useState(years[0]?.year);
  const current = years.find((y) => y.year === active) ?? years[0];

  return (
    <div className="mt-10">
      <div className="inline-flex rounded-full border border-border bg-surface-elevated p-1">
        {years.map((y) => (
          <button
            key={y.year}
            type="button"
            onClick={() => setActive(y.year)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-bold transition-all duration-200",
              active === y.year
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {y.year}
            {y.featuredEvent && (
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  active === y.year ? "bg-white/20" : "bg-amber/20 text-amber-ink"
                )}
              >
                예정
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {current?.activities && <YearTimeline activities={current.activities} />}
        {current?.featuredEvent && <ChampionshipEvent event={current.featuredEvent} />}
      </div>
    </div>
  );
}
