import { Mail, FileText, ArrowRight } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { joinSteps } from "@/lib/content/join";
import { site } from "@/lib/content/site";

export function JoinCta() {
  return (
    <section
      id="join"
      className="relative scroll-mt-24 overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-green))",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl text-white">
          <span className="text-sm font-bold uppercase tracking-wider text-white/80">
            가입 · 참여 방법
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            직급도, 학교급도 넘어서{" "}
            <br className="hidden sm:block" />
            누구나 환영합니다
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/85">
            충북 도내 유·초·중등·특수 교원이라면 누구나 참여할 수 있어요.
            부담 없이 문을 두드려주세요.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {joinSteps.map((step) => (
            <RevealItem key={step.id}>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  {step.step}
                </span>
                <p className="mt-4 text-lg font-bold">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10">
          <Card className="border-none bg-white/95 shadow-lg">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </span>
                <div>
                  <CardTitle>참여 신청 폼</CardTitle>
                  <CardDescription className="mt-1">
                    1~2분이면 신청 완료 · 개인정보는 최소한만 받습니다
                  </CardDescription>
                </div>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={site.contact.googleFormUrl} target="_blank" rel="noopener">
                  구글폼으로 참여하기 <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.15} className="mt-4">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-5 text-center text-white backdrop-blur-sm sm:flex-row sm:justify-center sm:gap-3 sm:text-left">
            <Mail className="h-5 w-5 shrink-0 text-white/80" />
            <p className="text-sm leading-relaxed text-white/85">
              구글폼이 불편하다면{" "}
              <a href={`mailto:${site.contact.email}`} className="font-bold underline underline-offset-2">
                {site.contact.email}
              </a>
              로 소속·이름·핸드폰 연락처를 보내주셔도 충북GEG 가입 신청이 가능해요.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
