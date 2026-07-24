import { CalendarClock, Video, BadgeCheck, Building2, Presentation, Users2 } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { activities, recurringActivities } from "@/lib/content/activities";

const recurringIcons: Record<string, typeof CalendarClock> = {
  quarterly: CalendarClock,
  online: Video,
  certification: BadgeCheck,
  expo: Building2,
};

const typeVariant: Record<string, "primary" | "amber" | "green" | "coral"> = {
  세미나: "primary",
  방문: "amber",
  워크숍: "green",
  연수: "coral",
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
          정기 세미나부터 기업 방문, 워크숍까지 — 충북 GEG가 한 해 동안 함께한
          활동들입니다.
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

      <div className="relative mt-14">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-border sm:left-20" />

        <ul className="space-y-10">
          {activities.map((activity) => (
            <Reveal key={activity.id} as="li" className="relative pl-10 sm:pl-32">
              <span className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-surface sm:left-20" />
              <span className="absolute left-0 top-0 hidden text-sm font-bold text-ink-muted sm:block sm:w-14">
                {activity.date}
              </span>

              <Card className="hover:-translate-y-1 hover:shadow-md">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={typeVariant[activity.type]}>{activity.type}</Badge>
                  <span className="text-sm font-semibold text-ink-muted sm:hidden">
                    {activity.date}
                  </span>
                </div>
                <CardTitle className="mt-3">{activity.title}</CardTitle>
                <ul className="mt-3 space-y-1.5">
                  {activity.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm leading-relaxed text-ink-muted before:mr-2 before:content-['·']"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
