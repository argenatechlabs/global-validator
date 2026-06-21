import { describe, expect, it } from "vitest";
import {
  getAvailableExampleTypes,
  getExample,
  getExamples
} from "../src";

describe("examples", () => {
  it("gets global example", () => {
    expect(getExample("email")).toBe("test@example.com");
  });

  it("gets country example", () => {
    expect(getExample("phone", "TR")).toBe("+905551112233");
  });

  it("gets all examples for country", () => {
    const examples = getExamples("TR");

    expect(examples.email).toBe("test@example.com");
    expect(examples.phone).toBe("+905551112233");
  });

  it("gets available example types", () => {
    const types = getAvailableExampleTypes("TR");

    expect(types).toContain("email");
    expect(types).toContain("phone");
  });
});