import { describe, expect, it } from "vitest";
import { validateNationalId } from "../src";

describe("validateNationalId", () => {
  it("valid TR national ID", () => {
    const result = validateNationalId("10000000146", "TR", "tr");

    expect(result.valid).toBe(true);
  });

  it("invalid TR national ID", () => {
    const result = validateNationalId("12345678901", "TR", "tr");

    expect(result.valid).toBe(false);
  });
});