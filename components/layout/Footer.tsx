import Image from "next/image";
import { site } from "@/lib/content/site";

export function Footer() {
  const quickLinks = site.navLinks.filter((link) => link.href !== "#join");

  return (
    <footer className="bg-dark-surface text-dark-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/geg-icon.png" alt="" width={32} height={32} className="h-7 w-7 object-contain" />
              <p className="text-xl font-extrabold text-white">{site.name}</p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {site.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/80">바로가기</p>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/80">참여하기</p>
            <a
              href={site.contact.googleFormUrl}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              참여 신청 폼 열기
            </a>
            <p className="mt-3 text-xs text-white/50">
              또는 이메일 {site.contact.email}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/40">
            © {new Date().getFullYear()} {site.name}. Google, Google Educator
            Group은 Google LLC의 상표입니다. 본 웹사이트는 자발적 교원
            커뮤니티가 운영하는 비공식 소개 페이지입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
