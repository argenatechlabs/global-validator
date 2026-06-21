import { describe, expect, it } from "vitest";
import { validateTaxId } from "../src";

describe("validateTaxId", () => {
  it("invalid TR tax id", () => {
    expect(
      validateTaxId(
        "1111111111",
        "TR",
        "tr"
      ).valid
    ).toBe(false);
  });
});