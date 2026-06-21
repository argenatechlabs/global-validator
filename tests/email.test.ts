import { describe, expect, it } from "vitest";
import { validateEmail } from "../src";

describe("validateEmail", () => {
  it("valid email", () => {
    const result = validateEmail("test@example.com", "en");

    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("test@example.com");
  });

  it("invalid email", () => {
    const result = validateEmail("wrong-email", "tr");

    expect(result.valid).toBe(false);
    expect(result.code).toBe("INVALID_EMAIL");
  });
});