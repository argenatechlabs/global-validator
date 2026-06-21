import { describe, expect, it } from "vitest";
import { validateCard } from "../src";

describe("validateCard", () => {
  it("valid visa", () => {
    expect(
      validateCard("4111111111111111").valid
    ).toBe(true);
  });

  it("invalid card", () => {
    expect(
      validateCard("123456789")
        .valid
    ).toBe(false);
  });
});