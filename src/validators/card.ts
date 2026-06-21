import type {
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";
import { luhnCheck } from "../utils/luhn";

export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "unknown";

function detectCardBrand(value: string): CardBrand {
  const digits = value.replace(/\D/g, "");

  if (/^4/.test(digits)) {
    return "visa";
  }

  if (/^5[1-5]/.test(digits)) {
    return "mastercard";
  }

  if (/^3[47]/.test(digits)) {
    return "amex";
  }

  if (/^6(?:011|5)/.test(digits)) {
    return "discover";
  }

  return "unknown";
}

export function validateCard(
  value: string,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = value.replace(/\D/g, "");
  const brand = detectCardBrand(normalized);

  if (!normalized) {
    return fail({
      type: "card",
      locale,
      message: t("INVALID_CARD_FORMAT", locale),
      code: "INVALID_CARD_FORMAT",
    });
  }

  if (!/^\d{12,19}$/.test(normalized)) {
    return fail({
      type: "card",
      locale,
      normalized,
      message: t("INVALID_CARD_FORMAT", locale),
      code: "INVALID_CARD_FORMAT",
    });
  }

  if (!luhnCheck(normalized)) {
    return fail({
      type: "card",
      locale,
      normalized,
      message: t("INVALID_CARD_CHECKSUM", locale),
      code: "INVALID_CARD_CHECKSUM",
    });
  }

  return success({
    type: "card",
    locale,
    normalized,
    message: `${t("VALID_CARD", locale)} Brand: ${brand}`,
  });
}