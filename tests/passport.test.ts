import { describe, expect, it } from "vitest";
import { getPassportExample, validatePassport } from "../src";

describe("validatePassport", () => {
  it("valid TR passport", () => {
    const result = validatePassport("U12345678", "TR", "tr");

    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("U12345678");
  });

  it("invalid TR passport", () => {
    const result = validatePassport("123", "TR", "tr");

    expect(result.valid).toBe(false);
  });

  it("gets passport example", () => {
    expect(getPassportExample("TR")).toBe("U12345678");
  });
});