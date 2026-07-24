import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { valueIconMap } from "@/components/illustrations/ValueIcons";
import { values } from "@/lib/content/values";
import { goals } from "@/lib/content/goals";
import { site } from "@/lib/content/site";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="grid gap-14 md:grid-cols-2 md:gap-12">
        <Reveal>
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            GEG란?
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            자발적으로 모인 교원들의
            <br />
            에듀테크 학습공동체
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            충북 GEG는 {site.founded}년, 충청북도 유·초·중등·특수 교원들이
            직급과 학교급을 초월해 자발적으로 결성한 학습공동체입니다. Google과의
            공식 협업을 기반으로 다양한 에듀테크 기업과 비영리 공동 수업 연구를
            이어오고 있습니다.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            20여 명으로 시작해 매년 자발적으로 참여하는 교원들이 늘어나, 현재{" "}
            <strong className="font-bold text-ink">{site.memberCount}여 명</strong>의
            충북 교원들이 함께하고 있습니다.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-4">
          {values.map((value) => {
            const Icon = valueIconMap[value.id];
            return (
              <RevealItem key={value.id}>
                <Card className="h-full hover:-translate-y-1 hover:shadow-md">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  <CardTitle className="mt-3">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <RevealGroup className="mt-20 grid gap-6 md:grid-cols-3">
        {goals.map((goal) => (
          <RevealItem key={goal.id}>
            <Card className="h-full border-none bg-ink/[0.03] hover:-translate-y-1 hover:shadow-md">
              <CardTitle>{goal.title}</CardTitle>
              <CardDescription>{goal.description}</CardDescription>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
