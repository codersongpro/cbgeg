import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chungbuk-geg.vercel.app"),
  title: "충북 GEG | Google Educator Group Chungbuk",
  description:
    "충북 유·초·중등·특수 교원들이 자발적으로 모인 Google 공식 협업 학습공동체, 충북 GEG를 소개합니다.",
  openGraph: {
    title: "충북 GEG | Google Educator Group Chungbuk",
    description:
      "열린 마음, 자발적, 유쾌함, 트렌디 — 충북 교원들의 에듀테크 학습공동체",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
