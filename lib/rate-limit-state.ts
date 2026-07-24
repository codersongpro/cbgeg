const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export interface LoginAttemptState {
  count: number;
  resetAt: number;
}

export function nextLoginAttempt(
  previous: LoginAttemptState | null,
  now: number
): LoginAttemptState & { allowed: boolean } {
  if (!previous || previous.resetAt <= now) {
    return { allowed: true, count: 1, resetAt: now + WINDOW_MS };
  }
  if (previous.count >= MAX_ATTEMPTS) {
    return { allowed: false, ...previous };
  }
  return { allowed: true, count: previous.count + 1, resetAt: previous.resetAt };
}
