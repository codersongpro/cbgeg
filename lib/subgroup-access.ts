export function parseCreatorScopes(payload: unknown): string[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { role?: unknown; subgroupIds?: unknown };
  if (data.role !== "creator" || !Array.isArray(data.subgroupIds)) return [];
  return [...new Set(data.subgroupIds.filter((id): id is string => typeof id === "string" && !!id))];
}
