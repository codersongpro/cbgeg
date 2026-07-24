export interface ValueItem {
  id: string;
  title: string;
  description: string;
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  date: string;
  type: "세미나" | "방문" | "워크숍" | "연수";
  title: string;
  highlights: string[];
}

export interface RecurringActivity {
  id: string;
  label: string;
}

export interface SubGroupTopic {
  id: string;
  title: string;
  description: string;
}

/**
 * Leader role card content. Deliberately has no `name` or `school` field —
 * the group's privacy policy requires titles only, never real identities.
 * Do not add personal-identifying fields to this type.
 */
export interface LeaderRole {
  id: string;
  levelLabel: string;
  roleTitle: string;
  description: string;
}

export interface JoinStep {
  id: string;
  step: number;
  title: string;
  description: string;
}
