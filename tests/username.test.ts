import { describe, expect, it } from "vitest";
import { validateUsername } from "../src";

describe("validateUsername", () => {
  it("valid username", () => {
    const result = validateUsername("argena.tech", {
      locale: "tr"
    });

    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("argena.tech");
  });

  it("invalid username with space", () => {
    const result = validateUsername("argena tech", {
      locale: "tr"
    });

    expect(result.valid).toBe(false);
    expect(result?.errors?.length).toBeGreaterThan(0);
  });

  it("reserved username", () => {
    const result = validateUsername("admin", {
      locale: "tr"
    });

    expect(result.valid).toBe(false);
  });
});