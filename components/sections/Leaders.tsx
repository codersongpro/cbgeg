import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoleAvatar } from "@/components/illustrations/RoleAvatar";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { leaders } from "@/lib/content/leaders";
import { site } from "@/lib/content/site";

export function Leaders() {
  return (
    <section id="members" className="scroll-mt-24 bg-ink/[0.03] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:items-center md:gap-12">
          <Reveal className="md:col-span-1">
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              멤버 · 운영진
            </span>
            <p className="mt-4 text-6xl font-extrabold text-ink">
              <CountUp value={Number(site.memberCount)} suffix="+" />
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink-muted">
              {site.founded}년 20여 명으로 시작해, 지금은 학교급과 직급을 넘어선{" "}
              {site.memberCount}명 이상의 충북 교원이 함께하고 있어요.
            </p>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2 md:col-span-2">
            {leaders.map((leader, index) => (
              <RevealItem key={leader.id}>
                <Card className="h-full hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <RoleAvatar index={index} />
                    <div>
                      <Badge variant="neutral">{leader.levelLabel}</Badge>
                      <CardTitle className="mt-2">{leader.roleTitle}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{leader.description}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
