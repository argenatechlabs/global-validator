import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
} from "../types";

import { countries } from "../countries";
import { t } from "../locales";
import { fail, success } from "../utils/result";

export function validatePostalCode(
  value: string,
  country: CountryCode,
  locale: LocaleCode = "en",
): ValidationResult {
  const rules = countries[country];

  if (!rules) {
    return fail({
      type: "postalCode",
      country,
      locale,
      message: `Postal code validation is not supported for ${country}`,
      code: `UNSUPPORTED_POSTAL_CODE_${country}`,
    });
  }

  const normalized = value.trim();

  if (!normalized) {
    return fail({
      type: "postalCode",
      country,
      locale,
      message: t("INVALID_POSTAL_CODE", locale),
      code: `INVALID_POSTAL_CODE_${country}`,
    });
  }

  if (!rules.postalCode.pattern.test(normalized)) {
    return fail({
      type: "postalCode",
      country,
      locale,
      message: t("INVALID_POSTAL_CODE", locale),
      code: `INVALID_POSTAL_CODE_${country}`,
    });
  }

  return success({
    type: "postalCode",
    country,
    locale,
    normalized,
    message: t("VALID_POSTAL_CODE", locale),
  });
}