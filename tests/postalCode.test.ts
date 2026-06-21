import { describe, expect, it } from "vitest";
import { validatePostalCode } from "../src";

describe("validatePostalCode", () => {
  it("valid TR postal code", () => {
    expect(validatePostalCode("16000", "TR", "tr").valid).toBe(true);
  });

  it("valid US ZIP code", () => {
    expect(validatePostalCode("90210", "US", "en").valid).toBe(true);
  });

  it("valid GB postal code", () => {
    expect(validatePostalCode("SW1A 1AA", "GB", "en").valid).toBe(true);
  });
});