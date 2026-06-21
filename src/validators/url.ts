import type {
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";

export function validateURL(
  value: string,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = value.trim();

  if (!normalized) {
    return fail({
      type: "url",
      locale,
      message: t("INVALID_URL", locale),
      code: "INVALID_URL",
    });
  }

  try {
    const url = new URL(normalized);

    if (!["http:", "https:"].includes(url.protocol)) {
      return fail({
        type: "url",
        locale,
        message: t("INVALID_URL_PROTOCOL", locale),
        code: "INVALID_URL_PROTOCOL",
      });
    }

    if (!url.hostname) {
      return fail({
        type: "url",
        locale,
        message: t("INVALID_URL", locale),
        code: "INVALID_URL",
      });
    }

    return success({
      type: "url",
      locale,
      normalized: url.toString(),
      message: t("VALID_URL", locale),
    });
  } catch {
    return fail({
      type: "url",
      locale,
      message: t("INVALID_URL", locale),
      code: "INVALID_URL",
    });
  }
}