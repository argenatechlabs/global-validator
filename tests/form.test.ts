import { describe, expect, it } from "vitest";
import { validateForm } from "../src";

describe("validateForm", () => {
  it("valid form", () => {
    const result = validateForm(
      {
        email: "test@example.com",
        phone: "05551112233"
      },
      {
        email: "email",
        phone: {
          type: "phone",
          country: "TR"
        }
      },
      {
        country: "TR",
        locale: "tr"
      }
    );

    expect(result.valid).toBe(true);
  });

  it("invalid form", () => {
    const result = validateForm(
      {
        email: "",
        phone: "123"
      },
      {
        email: {
          type: "email",
          label: "E-posta"
        },
        phone: {
          type: "phone",
          country: "TR",
          label: "Telefon"
        }
      },
      {
        country: "TR",
        locale: "tr"
      }
    );

    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.phone).toBeDefined();
  });
});