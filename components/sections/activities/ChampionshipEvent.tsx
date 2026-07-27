import {
  CalendarClock,
  MapPin,
  Users2,
  Trophy,
  ArrowRight,
  Sparkles,
  Gavel,
} from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { FeaturedEvent } from "@/types";

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">{children}</p>
  );
}

const leagueAccent: Record<string, { badge: "green" | "primary"; ring: string }> = {
  rookie: { badge: "green", ring: "border-green/30" },
  master: { badge: "primary", ring: "border-primary/30" },
};

export function ChampionshipEvent({ event }: { event: FeaturedEvent }) {
  return (
    <div className="flex flex-col gap-10">
      {/* 1. Header */}
      <Reveal>
        <Card className="border-primary/20">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="amber">
              <CalendarClock className="h-3 w-3" /> 예정
            </Badge>
            <Badge variant="neutral">{event.coOrganizer} 공동주관</Badge>
          </div>
          <CardTitle className="mt-4 text-2xl sm:text-3xl">{event.name}</CardTitle>
          {event.aliasName && (
            <p className="mt-1 text-sm text-ink-muted">{event.aliasName}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4 text-primary" /> {event.scheduleNote}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> {event.venueNote}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users2 className="h-4 w-4 text-primary" /> {event.audience}
            </span>
          </div>
        </Card>
      </Reveal>

      {/* 2. Premise */}
      <Reveal>
        <SubLabel>위기 상황</SubLabel>
        <Card className="mt-3">
          <p className="text-base font-bold text-coral">{event.premiseIntro}</p>
          <RevealGroup as="ul" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {event.problems.map((problem) => (
              <RevealItem key={problem} as="li">
                <span className="block rounded-xl bg-ink/[0.04] px-3 py-2 text-center text-xs font-semibold text-ink-muted">
                  {problem}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-4 rounded-xl bg-primary/5 px-4 py-3 text-sm font-bold text-primary">
            &ldquo;{event.philosophy}&rdquo;
          </p>
        </Card>
      </Reveal>

      {/* 3. Join steps */}
      <div>
        <SubLabel>어떻게 참여하나요</SubLabel>
        <RevealGroup className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {event.joinSteps.map((step) => (
            <RevealItem key={step.id}>
              <Card className="h-full">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {step.step}
                </span>
                <p className="mt-3 text-sm font-bold text-ink">{step.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* 4. Leagues */}
      <div>
        <SubLabel>리그 소개</SubLabel>
        <RevealGroup className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {event.leagues.map((league) => {
            const accent = leagueAccent[league.id] ?? leagueAccent.rookie;
            return (
              <RevealItem key={league.id}>
                <Card className={`h-full ${accent.ring}`}>
                  <Badge variant={accent.badge}>{league.name}</Badge>
                  <CardTitle className="mt-3">{league.tagline}</CardTitle>
                  <CardDescription>{league.approach}</CardDescription>
                  {league.workshop && (
                    <p className="mt-3 rounded-xl bg-ink/[0.04] px-3 py-2 text-xs leading-relaxed text-ink-muted">
                      {league.workshop}
                    </p>
                  )}
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
                    <Trophy className="h-4 w-4 text-amber-ink" /> {league.award}
                  </p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-4">
          <div className="rounded-2xl border border-dashed border-border p-5 text-center">
            <p className="text-sm font-bold text-ink">{event.finalRound.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{event.finalRound.description}</p>
          </div>
        </Reveal>
      </div>

      {/* 5. Schedule */}
      <div>
        <SubLabel>당일 일정</SubLabel>
        <RevealGroup
          as="ul"
          className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-elevated"
        >
          {event.schedule.map((row) => (
            <RevealItem key={row.id} as="li">
              <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="shrink-0 text-sm font-bold text-primary sm:w-16">
                  {row.time}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{row.title}</p>
                  <p className="text-xs text-ink-muted">{row.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* 6. Judging system */}
      <Reveal>
        <Card className="border-none bg-ink/[0.03]">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ink">
            <Gavel className="h-4 w-4 text-primary" /> {event.judgingSystem.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {event.judgingSystem.description}
          </p>
        </Card>
      </Reveal>

      {/* 7. Awards */}
      <div>
        <SubLabel>시상 · 패자 없는 리그</SubLabel>
        <RevealGroup className="mt-3 flex flex-wrap gap-2">
          {event.awards.map((award) => (
            <RevealItem key={award.id}>
              <Badge variant={award.label.includes("전원 발급") ? "primary" : "neutral"}>
                {award.label}
              </Badge>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* 8. Key messages */}
      <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {event.keyMessages.map((message) => (
          <RevealItem key={message}>
            <div className="flex h-full items-center justify-center rounded-2xl bg-primary/5 px-4 py-5 text-center">
              <p className="text-sm font-semibold text-primary">&ldquo;{message}&rdquo;</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* 9. Roadmap */}
      <div>
        <SubLabel>로드맵</SubLabel>
        <RevealGroup className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
          {event.roadmap.map((step, index) => (
            <RevealItem key={step.id} className="flex flex-1 items-center gap-2">
              <div className="flex-1 rounded-2xl border border-border bg-surface-elevated p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold text-ink">
                    {step.year} <span className="text-ink-muted">· {step.yearLabel}</span>
                  </p>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
              {index < event.roadmap.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-muted sm:block" />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
