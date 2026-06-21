import { describe, expect, it } from "vitest";
import { formatPhone, maskPhone, validatePhone } from "../src";

describe("phone", () => {
  it("valid TR phone", () => {
    const result = validatePhone("05551112233", "TR", "tr");

    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("+905551112233");
  });

  it("formats TR phone", () => {
    expect(formatPhone("05551112233", "TR")).toBe("+90 555 111 22 33");
  });

  it("masks TR phone", () => {
    expect(maskPhone("05551112233", "TR")).toContain("***");
  });

  it("valid US phone", () => {
    const result = validatePhone("+12125551234", "US", "en");

    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("+12125551234");
  });
});