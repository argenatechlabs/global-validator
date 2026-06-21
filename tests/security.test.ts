import { describe, expect, it } from "vitest";
import {
  escapeHTML,
  normalizeText,
  sanitizeText,
  stripHTML
} from "../src";

describe("security helpers", () => {
  it("escapes HTML", () => {
    const result = escapeHTML("<div>Hello</div>");

    expect(result).toBe("&lt;div&gt;Hello&lt;/div&gt;");
  });

  it("strips HTML", () => {
    const result = stripHTML("<b>Hello</b>");

    expect(result).toBe("Hello");
  });

  it("normalizes text", () => {
    const result = normalizeText("  hello     world  ");

    expect(result).toBe("hello world");
  });

  it("sanitizes script text", () => {
    const result = sanitizeText("<script>alert(1)</script><b>Hello</b>");

    expect(result).toBe("Hello");
  });
});