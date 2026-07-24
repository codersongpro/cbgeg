import { Mail, FileText, Clock } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
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
            직급도, 학교급도 넘어서
            <br />
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
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>연락처</CardTitle>
                    {site.contact.isPlaceholder && (
                      <Badge variant="amber">
                        <Clock className="h-3 w-3" /> 준비 중
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1">
                    {site.contact.email}
                  </CardDescription>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink-muted">
                <FileText className="h-4 w-4" />
                참여 신청 폼 (준비 중)
              </span>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
