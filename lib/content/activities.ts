import type { ActivityItem, ActivityYearGroup, FeaturedEvent, RecurringActivity } from "@/types";

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
    title: "왓슈?! 1차 — 비전 나눔 · 사례 나눔",
    highlights: [
      "첫 모임 및 비전 나눔",
      "느린 학습자를 위한 디지털 연계 초기 문해력 지도 사례",
      "땅커벨 · 구글 NotebookLM 활용 수업 사례",
      "생성형 AI로 수업 활용 프로그램 제작하기",
    ],
  },
  {
    id: "2025-07-05",
    date: "7.5",
    type: "워크숍",
    title: "왓슈?! 2차 — 부트캠프 · 바이브 코딩 입문",
    highlights: [
      "새 세대를 위한 AI 수업 디자인",
      "바이브 코딩의 기초 다지기",
      "바이브 코딩으로 수업 활용 앱 제작하기",
    ],
  },
  {
    id: "2025-07-28",
    date: "7.28",
    type: "방문",
    title: "왓슈?! 3차 — 구글코리아 방문",
    highlights: [
      "구글코리아 방문 및 Google Tour",
      "Gemini Academy 참여",
      "충북 GEG 사례 나눔",
    ],
  },
  {
    id: "2025-11-22",
    date: "11.22",
    type: "연수",
    title: "잘 왔슈! 4차 — 바이브 코딩 챌린지",
    highlights: [
      "통찰이 있는 프롬프트 작성법",
      "Vibe Coding Challenge 실습",
      "참가자 결과물 공유",
    ],
  },
  {
    id: "2025-sports",
    date: "번외",
    type: "워크숍",
    title: "뛰러 왔슈?! — 체육 에듀테크 번외 모임",
    highlights: [
      "체육 교과 관련 AI·에듀테크 활용 수업 사례",
      "네트형 게임 등 실습",
      "회비 미지원 · 희망 교원 대상 자율 모임",
    ],
  },
];

export const activities2026: ActivityItem[] = [
  {
    id: "2026-05",
    date: "5월",
    type: "세미나",
    title: "1차 워크숍 — 느린 학습자를 위한 생성형 AI",
    highlights: [
      "아이들의 속도에 맞춘 디지털 학습 지원 사례",
      "느린 학습자를 위한 생성형 AI 활용 아이디어 나눔",
    ],
  },
  {
    id: "2026-07",
    date: "7.11",
    type: "워크숍",
    title: "2차 워크숍 — 바이브 코딩 실전",
    highlights: [
      "바이브 코딩 기초부터 배포까지",
      "수업에 활용 가능한 게임 앱 제작 실습",
      "프롬프트 기본 전략 공유",
    ],
  },
];

export const championship2026: FeaturedEvent = {
  id: "2026-ai-champ",
  year: 2026,
  name: "충북GEG AI몬 배틀 트레이너 챔피언십",
  aliasName: "충북GEG AI 트레이너 챔피언십",
  coOrganizer: "메이커교사 연구회",
  audience: "충청북도 모든 교원",
  scheduleNote: "일정 협의 중",
  venueNote: "장소 추후 공지",
  premiseIntro: "충북 교육 현장에 위기가 출현했습니다",
  problems: [
    "수업 준비 부족형",
    "업무 폭주형",
    "평가 피드백 난제형",
    "학부모 소통 긴급형",
    "디지털 윤리 혼란형",
  ],
  philosophy: "내일 학교에서 바로 쓸 수 있는가?",
  joinSteps: [
    {
      id: "step-1",
      step: 1,
      title: "내 AI몬 방향 정하기",
      description: "가장 힘든 업무가 뭔지부터 생각해보세요",
    },
    {
      id: "step-2",
      step: 2,
      title: "나에게 맞는 방식 선택",
      description: "프롬프트형(루키 추천) · 바이브코딩형(마스터 추천) · 도구 조합형(구글시트·Canva·뤼튼 등)",
    },
    {
      id: "step-3",
      step: 3,
      title: "AI몬 훈련 & 진화",
      description: "D-3 사전 워크숍에서 멘토 교사의 도움을 받을 수 있어요",
    },
    {
      id: "step-4",
      step: 4,
      title: "리그 도전!",
      description: "당일 공개되는 과제에 AI몬을 투입하고, 전체 참가자 실시간 투표로 승자를 가려요",
    },
  ],
  leagues: [
    {
      id: "rookie",
      name: "루키 리그",
      tagline: "AI 처음인 트레이너도 완주 가능",
      approach: "프롬프트·챗봇·도구 조합 등 자유로운 방식으로 AI몬을 만들어요",
      workshop: "D-3 사전 워크숍(2시간) — 다양한 AI 도구 체험 + 제작 템플릿 제공 + GEG 멘토 교사 1:1 매칭",
      award: "루키 챔피언 상",
    },
    {
      id: "master",
      name: "마스터 리그",
      tagline: "바이브코딩으로 AI몬을 직접 만드는 트레이너",
      approach: "코드 한 줄 없이 AI에게 말로 지시해 앱·웹·도구를 만들어요",
      award: "마스터 챔피언 상",
    },
  ],
  finalRound: {
    title: "파이널",
    description: "루키 챔피언 vs 마스터 챔피언이 격돌합니다",
  },
  schedule: [
    { id: "s1", time: "09:00", title: "리그 개막식", description: "AI몬 카드 공개, 참가자 소개(1인 1분 특기 발표), 대진표 공개" },
    { id: "s2", time: "09:30", title: "R1 수업 즉석 제작 배틀", description: "100자 제한 · 전원 투표 · 60분" },
    { id: "s3", time: "10:30", title: "R2 업무 효율화 배틀", description: "200자 제한 · 전원 투표 · 60분" },
    { id: "s4", time: "11:30", title: "R3 교육 논쟁 배틀 (찬반)", description: "150자 제한 · 전원 투표 · 60분" },
    { id: "s5", time: "12:30", title: "FINAL 즉석 과제 배틀", description: "80자 제한 · 상위 4팀 결선 · 60분" },
    { id: "s6", time: "13:30", title: "프롬프트 공개", description: "챔피언 AI몬 제작 방법 공개 발표, 전원 수상" },
  ],
  judgingSystem: {
    title: "전원 심판 시스템",
    description:
      "참가자 전원이 스마트폰으로 실시간 A/B 투표에 참여합니다. 득표율이 즉시 집계되고, 글자 수를 넘기면 감점돼요.",
  },
  awards: [
    { id: "a1", label: "AI 챔피언 트레이너 상" },
    { id: "a2", label: "전설의 2인자 상" },
    { id: "a3", label: "새싹몬 반란 상" },
    { id: "a4", label: "개성폭발 AI몬 상" },
    { id: "a5", label: "투표자 혼돈 유발 상" },
    { id: "a6", label: "AI 트레이너 인증서 (전원 발급)" },
  ],
  keyMessages: [
    "AI 리터러시는 '사용'이 아니라 '설계'에서 시작한다",
    "교사의 전문성은 AI가 등장할수록 더 선명해진다",
    "대회 이후가 진짜 시작이다",
  ],
  roadmap: [
    { id: "r1", year: "2026", yearLabel: "1년차", description: "챔피언십 1회 개최 + 레시피북 배포" },
    { id: "r2", year: "2027", yearLabel: "2년차", description: "학교별 적용" },
    { id: "r3", year: "2028", yearLabel: "3년차", description: "전국 교원 공유, 연수 표준화" },
  ],
};

export const activityYears: ActivityYearGroup[] = [
  { year: 2025, activities },
  { year: 2026, activities: activities2026, featuredEvent: championship2026 },
];
