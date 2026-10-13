import { describe, it, expect } from "vitest";
import { validateTitle, validateBody } from "./validation";

describe("validateTitle", () => {
  it("空文字はエラー", () => {
    expect(validateTitle("")).not.toBeNull();
  });

  it("1文字は有効", () => {
    expect(validateTitle("あ")).toBeNull();
  });

  it("50文字は有効", () => {
    expect(validateTitle("あ".repeat(50))).toBeNull();
  });

  it("51文字はエラー", () => {
    expect(validateTitle("あ".repeat(51))).not.toBeNull();
  });
});

describe("validateBody", () => {
  it("9文字はエラー", () => {
    expect(validateBody("あ".repeat(9))).not.toBeNull();
  });

  it("10文字は有効", () => {
    expect(validateBody("あ".repeat(10))).toBeNull();
  });

  it("2000文字は有効", () => {
    expect(validateBody("あ".repeat(2000))).toBeNull();
  });

  it("2001文字はエラー", () => {
    expect(validateBody("あ".repeat(2001))).not.toBeNull();
  });
});
