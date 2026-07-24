export interface BoardPostInput {
  title: string;
  content: string;
  authorName: string;
}

export interface BoardCommentInput {
  content: string;
  authorName: string;
}

function requiredString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

export function validateBoardPost(value: unknown): BoardPostInput | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const title = requiredString(body.title, 100);
  const content = requiredString(body.content, 5000);
  const authorName = requiredString(body.authorName, 30);
  return title && content && authorName ? { title, content, authorName } : null;
}

export function validateBoardComment(value: unknown): BoardCommentInput | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const content = requiredString(body.content, 1000);
  const authorName = requiredString(body.authorName, 30);
  return content && authorName ? { content, authorName } : null;
}
