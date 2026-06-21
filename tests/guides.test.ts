import { describe, expect, it } from "vitest";
import {
  getGuide,
  hasGuide,
} from "../src";

describe("guides", () => {
  it("returns TR guide", () => {
    expect(
      getGuide({
        country: "TR",
        locale: "tr",
      })
    ).toContain("Türkiye");
  });

  it("has guide", () => {
    expect(
      hasGuide("TR", "tr")
    ).toBe(true);
  });
});