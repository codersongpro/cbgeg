import type { JoinStep } from "@/types";

export const joinSteps: JoinStep[] = [
  {
    id: "check",
    step: 1,
    title: "관심 활동 확인",
    description: "위 활동 목록과 소모임 주제를 살펴보고 관심 가는 분야를 찾아보세요.",
  },
  {
    id: "contact",
    step: 2,
    title: "참여 폼 작성",
    description: "아래 구글폼 또는 이메일로 참여 의사를 편하게 알려주세요. 소속·직급 상관없이 환영합니다.",
  },
  {
    id: "attend",
    step: 3,
    title: "정기 세미나부터 참여",
    description: "가장 가까운 분기별 정기 세미나에 참여하며 자연스럽게 합류하시면 됩니다.",
  },
];
