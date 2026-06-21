import { describe, expect, it } from "vitest";
import { validatePassword } from "../src";

describe("validatePassword", () => {
  it("valid password", () => {
    const result = validatePassword("Argena123!", {
      requireSpecial: true,
      locale: "tr"
    });

    expect(result.valid).toBe(true);
  });

  it("invalid password", () => {
    const result = validatePassword("123", {
      requireSpecial: true,
      locale: "tr"
    });

    expect(result.valid).toBe(false);
    expect(result?.errors?.length).toBeGreaterThan(0);
  });
});