import { describe, expect, it } from "vitest";
import { formatIBAN, validateIBAN } from "../src";

describe("IBAN", () => {
  it("valid TR IBAN", () => {
    const result = validateIBAN("TR330006100519786457841326", "tr");

    expect(result.valid).toBe(true);
    expect(result.country).toBe("TR");
  });

  it("valid DE IBAN", () => {
    const result = validateIBAN("DE89370400440532013000", "de");

    expect(result.valid).toBe(true);
    expect(result.country).toBe("DE");
  });

  it("formats IBAN", () => {
    expect(formatIBAN("TR330006100519786457841326")).toBe(
      "TR33 0006 1005 1978 6457 8413 26"
    );
  });
});