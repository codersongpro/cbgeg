import { describe, expect, it } from "vitest";
import { validateSubGroupInput } from "./subgroup-input";

const valid = {
  topic: "AI 수업 연구",
  description: "함께 연구합니다.",
  creatorName: "홍길동",
  creatorAffiliation: "충북초",
  creatorContact: "teacher@example.com",
};

describe("subgroup input", () => {
  it("trims valid fields", () => {
    expect(validateSubGroupInput({ ...valid, topic: "  AI 수업 연구  " })).toMatchObject({
      topic: "AI 수업 연구",
    });
  });

  it("rejects missing or oversized fields", () => {
    expect(validateSubGroupInput({ ...valid, topic: "" })).toBeNull();
    expect(validateSubGroupInput({ ...valid, description: "a".repeat(501) })).toBeNull();
  });
});
