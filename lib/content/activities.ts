import type { ActivityItem, RecurringActivity } from "@/types";

export const recurringActivities: RecurringActivity[] = [
  { id: "quarterly", label: "분기별 정기 세미나" },
  { id: "online", label: "수시 온라인 세미나" },
  { id: "certification", label: "Google 인증 교육자 지원" },
  { id: "expo", label: "교육박람회 단체 참석" },
];

export const activities: ActivityItem[] = [
  {
    id: "2025-05-30",
    date: "5.30",
    type: "세미나",
    title: "비전 나눔 · 사례 나눔",
    highlights: [
      "첫 모임 및 비전 나눔",
      "느린 학습자를 위한 디지털 기반 지원 사례",
      "바이브 코딩으로 만드는 수업 프로그램",
      "구글 노트북LM 활용 수업 사례",
    ],
  },
  {
    id: "2025-07-28",
    date: "7.28",
    type: "방문",
    title: "기업 방문 · 사례 나눔",
    highlights: [
      "구글코리아 방문 및 기업 투어",
      "생성형 AI 활용 수업 사례",
      "AI 세대를 위한 디지털 기반 수업 디자인",
      "Gemini Academy",
    ],
  },
  {
    id: "2025-08-09",
    date: "8.9",
    type: "워크숍",
    title: "사례 나눔 · 워크숍",
    highlights: [
      "피지컬 에듀테크 — 체육 수업 AI·에듀테크 연구",
      "생성형 AI 활용 \"어디서나 몸활동, 어디서나 운동장\" 자료 제작",
    ],
  },
  {
    id: "2025-09-11",
    date: "9.11",
    type: "세미나",
    title: "수업사례 나눔",
    highlights: ["자체 수업사례 공유회 개최"],
  },
  {
    id: "2025-11-06",
    date: "11.6",
    type: "연수",
    title: "역량강화 연수",
    highlights: ["바이브 코딩 챌린지"],
  },
];
