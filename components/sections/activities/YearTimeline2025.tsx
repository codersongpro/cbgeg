import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import type { ActivityItem } from "@/types";

const typeVariant: Record<string, "primary" | "amber" | "green" | "coral"> = {
  세미나: "primary",
  방문: "amber",
  워크숍: "green",
  연수: "coral",
};

export function YearTimeline2025({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="relative">
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
  );
}
