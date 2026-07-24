import { describe, expect, it } from "vitest";
import {
  hashCreatorContact,
  hashManagePassword,
  normalizeCreatorContact,
  validateManagePassword,
  verifyManagePassword,
} from "./manage-credentials";

describe("manage credentials", () => {
  it("accepts any password with at least four characters", () => {
    expect(validateManagePassword("1234")).toBe("1234");
    expect(validateManagePassword("가나다라")).toBe("가나다라");
    expect(validateManagePassword("a !?")).toBe("a !?");
  });

  it("rejects short or non-string passwords", () => {
    expect(validateManagePassword("123")).toBeNull();
    expect(validateManagePassword(null)).toBeNull();
  });

  it("normalizes creator contacts before deterministic lookup hashing", () => {
    expect(normalizeCreatorContact("  TEST@Example.COM ")).toBe("test@example.com");
    expect(hashCreatorContact(" TEST@Example.COM")).toBe(hashCreatorContact("test@example.com"));
  });

  it("salts password hashes and verifies without exposing plaintext", async () => {
    const first = await hashManagePassword("가나다라");
    const second = await hashManagePassword("가나다라");

    expect(first).not.toBe(second);
    expect(first).not.toContain("가나다라");
    await expect(verifyManagePassword("가나다라", first)).resolves.toBe(true);
    await expect(verifyManagePassword("틀린암호", first)).resolves.toBe(false);
  });
});
