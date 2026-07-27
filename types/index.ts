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

/** One step in "how to join" a featured event (distinct from JoinStep, the
 * community's general membership-join flow). */
export interface EventJoinStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface EventLeague {
  id: string;
  name: string;
  tagline: string;
  approach: string;
  workshop?: string;
  award: string;
}

export interface EventScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface EventAward {
  id: string;
  label: string;
}

export interface EventRoadmapStep {
  id: string;
  year: string;
  yearLabel: string;
  description: string;
}

/**
 * A single big, structured upcoming event — distinct from ActivityItem
 * because it carries multi-section rich content, not a simple
 * date/title/highlights record.
 */
export interface FeaturedEvent {
  id: string;
  year: number;
  name: string;
  aliasName?: string;
  coOrganizer: string;
  audience: string;
  scheduleNote: string;
  venueNote: string;
  premiseIntro: string;
  problems: string[];
  philosophy: string;
  joinSteps: EventJoinStep[];
  leagues: EventLeague[];
  finalRound: { title: string; description: string };
  schedule: EventScheduleItem[];
  judgingSystem: { title: string; description: string };
  awards: EventAward[];
  keyMessages: string[];
  roadmap: EventRoadmapStep[];
}

/** One year's worth of content for the year-tabbed Activities section. */
export interface ActivityYearGroup {
  year: number;
  activities?: ActivityItem[];
  featuredEvent?: FeaturedEvent;
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

export interface AccessCode {
  id: string;
  code: string;
  label: string;
  active: boolean;
  createdAt: string;
}

/** What an unverified visitor sees for a registered sub-group. */
export interface SubGroupPublic {
  id: string;
  topic: string;
  description: string;
  creatorNameMasked: string;
  createdAt: string;
  applicationCount: number;
}

/** What a verified member (or admin) sees for a registered sub-group. */
export interface SubGroupFull extends SubGroupPublic {
  creatorName: string;
  creatorAffiliation: string;
  creatorContact: string;
}

export interface SubGroupApplication {
  id: string;
  subgroupId: string;
  affiliation: string;
  name: string;
  contact: string;
  message: string;
  createdAt: string;
}

export interface BoardPost {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

export interface BoardComment {
  id: string;
  postId: string;
  content: string;
  authorName: string;
  createdAt: string;
}
