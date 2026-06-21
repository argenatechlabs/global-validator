import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
} from "../types";

import { countries, isCountrySupported } from "../countries";
import { t } from "../locales";
import { fail, success } from "../utils/result";

function mod97(iban: string): number {
  const rearranged =
    iban.slice(4) + iban.slice(0, 4);

  const converted = rearranged
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String(code - 55);
      }

      return char;
    })
    .join("");

  let remainder = "";

  for (const digit of converted) {
    remainder = String(
      Number(remainder + digit) % 97,
    );
  }

  return Number(remainder);
}

export function validateIBAN(
  value: string,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = value
    .replace(/\s/g, "")
    .toUpperCase();

  if (!normalized) {
    return fail({
      type: "iban",
      locale,
      message: t("INVALID_IBAN_FORMAT", locale),
      code: "INVALID_IBAN_FORMAT",
    });
  }

  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(normalized)) {
    return fail({
      type: "iban",
      locale,
      message: t("INVALID_IBAN_FORMAT", locale),
      code: "INVALID_IBAN_FORMAT",
    });
  }

  const rawCountryCode =
    normalized.slice(0, 2);

  const country: CountryCode | undefined =
    isCountrySupported(rawCountryCode)
      ? rawCountryCode
      : undefined;

  const countryRules =
    country ? countries[country] : undefined;

  if (countryRules?.iban) {
    if (normalized.length !== countryRules.iban.length) {
      return fail({
        type: "iban",
        country,
        locale,
        message: t("INVALID_IBAN_LENGTH", locale),
        code: `INVALID_IBAN_LENGTH_${rawCountryCode}`,
      });
    }
  }

  if (mod97(normalized) !== 1) {
    return fail({
      type: "iban",
      country,
      locale,
      message: t("INVALID_IBAN_CHECKSUM", locale),
      code: "INVALID_IBAN_CHECKSUM",
    });
  }

  return success({
    type: "iban",
    country,
    locale,
    normalized,
    message: t("VALID_IBAN", locale),
  });
}