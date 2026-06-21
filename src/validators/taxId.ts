import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";

function validateTRTaxId(value: string): boolean {
  const tax = value.trim();

  if (!/^\d{10}$/.test(tax)) {
    return false;
  }

  const digits = tax.split("").map(Number);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let temp = (digits[i] + 9 - i) % 10;

    temp = (temp * Math.pow(2, 9 - i)) % 9;

    if (temp === 0 && digits[i] !== 0) {
      temp = 9;
    }

    sum += temp;
  }

  const check = (10 - (sum % 10)) % 10;

  return check === digits[9];
}

export function validateTaxId(
  value: string,
  country: CountryCode,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = value.replace(/\s/g, "");

  if (!normalized) {
    return fail({
      type: "taxId",
      country,
      locale,
      message: t("INVALID_TAX_ID", locale),
      code: `INVALID_TAX_ID_${country}`,
    });
  }

  if (country === "TR") {
    const valid = validateTRTaxId(normalized);

    if (!valid) {
      return fail({
        type: "taxId",
        country,
        locale,
        message: t("INVALID_TAX_ID", locale),
        code: "INVALID_TAX_ID_TR",
      });
    }

    return success({
      type: "taxId",
      country,
      locale,
      normalized,
      message: t("VALID_TAX_ID", locale),
    });
  }

  return fail({
    type: "taxId",
    country,
    locale,
    message: `Tax ID validation is not supported for ${country}`,
    code: `UNSUPPORTED_TAX_ID_${country}`,
  });
}