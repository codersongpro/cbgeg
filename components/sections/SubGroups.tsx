import { ArrowRight, Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { subGroupTopics } from "@/lib/content/subgroups";

export function SubGroups() {
  return (
    <section
      id="subgroups"
      className="scroll-mt-24 bg-ink/[0.03] py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-green">
            충북GEG 소모임
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            관심사가 통하는 선생님들끼리,
            <br />
            자유롭게 소모임을 시작해보세요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            정해진 커리큘럼은 없습니다. 관심 있는 주제를 가진 선생님들이 모여
            자발적으로 소모임을 만들고, 원할 때 함께 연구하고 나눕니다.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible"
        >
          {subGroupTopics.map((topic) => (
            <RevealItem key={topic.id} className="w-[80%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <Card className="h-full hover:-translate-y-1 hover:shadow-md">
                <Users className="h-6 w-6 text-green" strokeWidth={1.75} />
                <CardTitle className="mt-3">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
                <Badge variant="green" className="mt-4">
                  참여 문의 <ArrowRight className="h-3 w-3" />
                </Badge>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-surface-elevated p-8 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-ink">
              새로운 소모임을 만들고 싶으신가요?
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              누구나 자유롭게 소모임을 제안할 수 있어요.
            </p>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#join">소모임 만들기</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
