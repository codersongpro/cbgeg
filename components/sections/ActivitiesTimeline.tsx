import { CalendarClock, Video, BadgeCheck, Building2, Presentation, Users2 } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { activityYears, recurringActivities } from "@/lib/content/activities";
import { YearTabs } from "@/components/sections/activities/YearTabs";

const recurringIcons: Record<string, typeof CalendarClock> = {
  quarterly: CalendarClock,
  online: Video,
  certification: BadgeCheck,
  expo: Building2,
};

const highlightTiles = [
  { id: "seminar", label: "정기 세미나 현장", icon: Presentation, color: "text-primary", bg: "bg-primary/10" },
  { id: "visit", label: "기업 방문 · 투어", icon: Building2, color: "text-amber-ink", bg: "bg-amber/15" },
  { id: "workshop", label: "함께 만드는 워크숍", icon: Users2, color: "text-green", bg: "bg-green/10" },
];

export function ActivitiesTimeline() {
  return (
    <section id="activities" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal className="max-w-2xl">
        <span className="text-sm font-bold uppercase tracking-wider text-coral">
          활동 · 이벤트
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
          꾸준히, 그러나 유쾌하게
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          정기 세미나부터 기업 방문, 워크숍까지 — 그리고 2026년의 새로운
          도전까지. 연도별로 만나보세요.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 flex flex-wrap gap-3">
        {recurringActivities.map((item) => {
          const Icon = recurringIcons[item.id];
          return (
            <RevealItem key={item.id}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-ink-muted">
                <Icon className="h-4 w-4 text-primary" />
                {item.label}
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlightTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <RevealItem key={tile.id}>
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface-elevated">
                <span className={`flex h-14 w-14 items-center justify-center rounded-full ${tile.bg} ${tile.color}`}>
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold text-ink-muted">{tile.label}</p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <YearTabs years={activityYears} />
    </section>
  );
}
