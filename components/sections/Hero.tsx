import { ChevronDown } from "lucide-react";
import { Blob } from "@/components/illustrations/Blob";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] items-center overflow-hidden pt-24"
    >
      <Blob
        className="-left-24 -top-24 h-72 w-72 animate-float-slow sm:h-96 sm:w-96"
        color="var(--color-primary)"
      />
      <Blob
        className="-right-16 top-32 h-56 w-56 animate-float-slower sm:h-80 sm:w-80"
        color="var(--color-amber)"
      />
      <Blob
        className="bottom-0 left-1/3 h-64 w-64 animate-float-slow sm:h-72 sm:w-72"
        color="var(--color-green)"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <Badge variant="primary">Google 공식 협업 교원 커뮤니티</Badge>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-ink sm:text-6xl md:text-7xl">
          {site.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {site.tagline}
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#subgroups">소모임 둘러보기</a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <a href="#join">참여 방법 보기</a>
          </Button>
        </div>

        <a
          href="#about"
          aria-label="아래로 스크롤"
          className="mt-16 flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-border text-ink-muted"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
