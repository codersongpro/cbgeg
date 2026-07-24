/** Shows only the surname (first character), masking the rest: "송동석" -> "송○○". */
export function maskName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 1) return trimmed;
  return trimmed[0] + "○".repeat(trimmed.length - 1);
}
