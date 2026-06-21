import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
} from "../types";

import { countries } from "../countries";
import { t } from "../locales";
import { fail, success } from "../utils/result";
import { normalizePhone } from "../formatters/phone";

export function validatePhone(
  value: string,
  country: CountryCode,
  locale: LocaleCode = "en",
): ValidationResult {
  const rules = countries[country];
  const raw = value.replace(/[\s-]/g, "");

  if (!rules) {
    return fail({
      type: "phone",
      country,
      locale,
      message: `Phone validation is not supported for ${country}`,
      code: `UNSUPPORTED_PHONE_${country}`,
    });
  }

  if (!raw) {
    return fail({
      type: "phone",
      country,
      locale,
      message: t("INVALID_PHONE", locale),
      code: `INVALID_PHONE_${country}`,
    });
  }

  if (!rules.phone.pattern.test(raw)) {
    return fail({
      type: "phone",
      country,
      locale,
      message: t("INVALID_PHONE", locale),
      code: `INVALID_PHONE_${country}`,
    });
  }

  return success({
    type: "phone",
    country,
    locale,
    normalized: normalizePhone(value, country),
    message: t("VALID_PHONE", locale),
  });
}