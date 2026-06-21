import { describe, expect, it } from "vitest";
import { validateURL } from "../src";

describe("validateURL", () => {
  it("valid https", () => {
    expect(
      validateURL("https://google.com")
        .valid
    ).toBe(true);
  });

  it("invalid protocol", () => {
    expect(
      validateURL("ftp://google.com")
        .valid
    ).toBe(false);
  });
});