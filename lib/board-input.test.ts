import { describe, expect, it } from "vitest";
import { validateBoardComment, validateBoardPost } from "./board-input";

describe("board input", () => {
  it("accepts and trims a valid post", () => {
    expect(
      validateBoardPost({
        title: "  수업 자료를 나눕니다  ",
        content: "함께 활용해주세요.",
        authorName: "김교사",
      })
    ).toMatchObject({ title: "수업 자료를 나눕니다", authorName: "김교사" });
  });

  it("rejects empty and oversized post fields", () => {
    expect(validateBoardPost({ title: "", content: "내용", authorName: "이름" })).toBeNull();
    expect(
      validateBoardPost({ title: "제목", content: "a".repeat(5001), authorName: "이름" })
    ).toBeNull();
  });

  it("accepts valid comments and rejects oversized comments", () => {
    expect(validateBoardComment({ content: " 좋은 의견입니다. ", authorName: "박교사" })).toEqual({
      content: "좋은 의견입니다.",
      authorName: "박교사",
    });
    expect(
      validateBoardComment({ content: "a".repeat(1001), authorName: "박교사" })
    ).toBeNull();
  });
});
