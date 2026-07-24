export interface CreatorScopeCandidate {
  id: string;
  passwordHash?: string;
}

export async function resolveCreatorScopeIds(
  candidates: CreatorScopeCandidate[],
  verify: (passwordHash: string) => Promise<boolean>
): Promise<string[]> {
  const results = await Promise.all(
    candidates.map((candidate) =>
      candidate.passwordHash ? verify(candidate.passwordHash) : Promise.resolve(false)
    )
  );
  return results.some(Boolean) ? candidates.map((candidate) => candidate.id) : [];
}
