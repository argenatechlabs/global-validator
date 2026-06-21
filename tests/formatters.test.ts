import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatDate,
  formatRelativeDate,
  getDefaultCurrency
} from "../src";

describe("formatters", () => {
  it("gets default currency", () => {
    expect(getDefaultCurrency("TR")).toBe("TRY");
    expect(getDefaultCurrency("US")).toBe("USD");
  });

  it("formats currency", () => {
    const result = formatCurrency(1500, {
      country: "TR",
      locale: "tr"
    });

    expect(result).toContain("₺");
  });

  it("formats date", () => {
    const result = formatDate("2026-06-21", {
      locale: "tr",
      dateStyle: "long"
    });

    expect(result).toContain("2026");
  });

  it("formats relative date", () => {
    const result = formatRelativeDate("2026-06-22", {
      now: "2026-06-21",
      locale: "tr"
    });

    expect(typeof result).toBe("string");
  });
});