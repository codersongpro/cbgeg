import { describe, expect, it } from "vitest";
import { parseCreatorScopes } from "./subgroup-access";

describe("creator subgroup scopes", () => {
  it("keeps only unique non-empty subgroup ids", () => {
    expect(parseCreatorScopes({ role: "creator", subgroupIds: ["a", "", "a", "b"] })).toEqual([
      "a",
      "b",
    ]);
  });

  it("rejects malformed or non-creator payloads", () => {
    expect(parseCreatorScopes({ role: "admin", subgroupIds: ["a"] })).toEqual([]);
    expect(parseCreatorScopes({ role: "creator", subgroupIds: "a" })).toEqual([]);
    expect(parseCreatorScopes(null)).toEqual([]);
  });
});
