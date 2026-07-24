import type { LeaderRole } from "@/types";

/** Titles only — no real names or school affiliations, by group policy. */
export const leaders: LeaderRole[] = [
  {
    id: "elementary-lead",
    levelLabel: "초등",
    roleTitle: "초등 리더",
    description: "초등 현장의 눈높이로 모임을 이끌고, 초등 교원들의 참여를 살펴요.",
  },
  {
    id: "secondary-lead",
    levelLabel: "중등",
    roleTitle: "중등 리더",
    description: "중등 현장의 관점에서 세미나와 활동을 기획하고 이끌어요.",
  },
];
