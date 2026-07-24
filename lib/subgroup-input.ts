export interface SubGroupInput {
  topic: string;
  description: string;
  creatorName: string;
  creatorAffiliation: string;
  creatorContact: string;
}

function requiredString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

export function validateSubGroupInput(value: unknown): SubGroupInput | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const topic = requiredString(body.topic, 60);
  const description = requiredString(body.description, 500);
  const creatorName = requiredString(body.creatorName, 30);
  const creatorAffiliation = requiredString(body.creatorAffiliation, 60);
  const creatorContact = requiredString(body.creatorContact, 60);
  if (!topic || !description || !creatorName || !creatorAffiliation || !creatorContact) return null;
  return { topic, description, creatorName, creatorAffiliation, creatorContact };
}
