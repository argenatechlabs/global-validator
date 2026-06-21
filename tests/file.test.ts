import { describe, expect, it } from "vitest";
import { validateFile } from "../src";

describe("validateFile", () => {
  it("valid file", () => {
    expect(
      validateFile({
        name: "test.png",
        size: 1000,
        type: "image/png",
      }).valid
    ).toBe(true);
  });

  it("file too large", () => {
    expect(
      validateFile(
        {
          name: "test.png",
          size: 10000000,
        },
        {
          maxSize: 1000,
        }
      ).valid
    ).toBe(false);
  });
});