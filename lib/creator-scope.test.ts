import { describe, expect, it } from "vitest";
import { resolveCreatorScopeIds } from "./creator-scope";

describe("creator management scope", () => {
  it("returns every group for the contact when one password matches", async () => {
    const candidates = [
      { id: "first", passwordHash: "old-password" },
      { id: "second", passwordHash: "new-password" },
    ];

    await expect(
      resolveCreatorScopeIds(candidates, async (hash) => hash === "new-password")
    ).resolves.toEqual(["first", "second"]);
  });

  it("returns no groups when none of the passwords match", async () => {
    await expect(
      resolveCreatorScopeIds(
        [{ id: "first", passwordHash: "stored-password" }],
        async () => false
      )
    ).resolves.toEqual([]);
  });
});
