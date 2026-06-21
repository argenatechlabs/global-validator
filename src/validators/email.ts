import type {
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";

export function validateEmail(
  email: string,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = email
    .trim()
    .toLowerCase();

  if (!normalized) {
    return fail({
      type: "email",
      locale,
      message: t("INVALID_EMAIL", locale),
      code: "INVALID_EMAIL",
    });
  }

  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!pattern.test(normalized)) {
    return fail({
      type: "email",
      locale,
      message: t("INVALID_EMAIL", locale),
      code: "INVALID_EMAIL",
    });
  }

  return success({
    type: "email",
    locale,
    normalized,
    message: t("VALID_EMAIL", locale),
  });
}