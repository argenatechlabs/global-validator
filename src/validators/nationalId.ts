import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";

function validateTRNationalId(value: string): boolean {
  const id = value.trim();

  if (!/^[1-9]\d{10}$/.test(id)) {
    return false;
  }

  const digits = id.split("").map(Number);

  const oddSum =
    digits[0] +
    digits[2] +
    digits[4] +
    digits[6] +
    digits[8];

  const evenSum =
    digits[1] +
    digits[3] +
    digits[5] +
    digits[7];

  const digit10 =
    (oddSum * 7 - evenSum) % 10;

  const digit11 =
    digits
      .slice(0, 10)
      .reduce((total, digit) => total + digit, 0) % 10;

  return (
    digit10 === digits[9] &&
    digit11 === digits[10]
  );
}

export function validateNationalId(
  value: string,
  country: CountryCode,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = value.replace(/\s/g, "");

  if (!normalized) {
    return fail({
      type: "nationalId",
      country,
      locale,
      message: t("INVALID_NATIONAL_ID", locale),
      code: `INVALID_NATIONAL_ID_${country}`,
    });
  }

  if (country === "TR") {
    const valid =
      validateTRNationalId(normalized);

    if (!valid) {
      return fail({
        type: "nationalId",
        country,
        locale,
        message: t("INVALID_NATIONAL_ID", locale),
        code: "INVALID_NATIONAL_ID_TR",
      });
    }

    return success({
      type: "nationalId",
      country,
      locale,
      normalized,
      message: t("VALID_NATIONAL_ID", locale),
    });
  }

  return fail({
    type: "nationalId",
    country,
    locale,
    message: `National ID validation is not supported for ${country}`,
    code: `UNSUPPORTED_NATIONAL_ID_${country}`,
  });
}