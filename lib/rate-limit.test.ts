import { describe, expect, it } from "vitest";
import { nextLoginAttempt } from "./rate-limit-state";

describe("login rate limit", () => {
  it("blocks the sixth attempt inside the window", () => {
    const now = 1_000_000;
    expect(nextLoginAttempt({ count: 5, resetAt: now + 1000 }, now).allowed).toBe(false);
  });

  it("resets after the window expires", () => {
    const now = 1_000_000;
    expect(nextLoginAttempt({ count: 5, resetAt: now - 1 }, now)).toMatchObject({
      allowed: true,
      count: 1,
    });
  });
});
