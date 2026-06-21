import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";

export type PassportRule = {
  pattern: RegExp;
  example: string;
};

const passportRules: Partial<
  Record<CountryCode, PassportRule>
> = {
  TR: {
    pattern: /^[A-Z]\d{8}$/,
    example: "U12345678",
  },

  US: {
    pattern: /^[A-Z0-9]{6,9}$/,
    example: "123456789",
  },

  GB: {
    pattern: /^\d{9}$/,
    example: "123456789",
  },

  DE: {
    pattern: /^[A-Z0-9]{9}$/,
    example: "C01X00T47",
  },

  FR: {
    pattern: /^\d{2}[A-Z]{2}\d{5}$/,
    example: "12AB34567",
  },

  IT: {
    pattern: /^[A-Z]{2}\d{7}$/,
    example: "YA1234567",
  },

  ES: {
    pattern: /^[A-Z0-9]{9}$/,
    example: "AAA123456",
  },

  RU: {
    pattern: /^\d{9}$/,
    example: "123456789",
  },

  UA: {
    pattern: /^[A-Z]{2}\d{6}$/,
    example: "AB123456",
  },

  AZ: {
    pattern: /^[A-Z]\d{8}$/,
    example: "C12345678",
  },
};

export function validatePassport(
  value: string,
  country: CountryCode,
  locale: LocaleCode = "en",
): ValidationResult {
  const normalized = value
    .replace(/\s/g, "")
    .toUpperCase();

  const rule = passportRules[country];

  if (!rule) {
    return fail({
      type: "passport",
      country,
      locale,
      normalized,
      message: `Passport validation is not supported for ${country}`,
      code: `UNSUPPORTED_PASSPORT_${country}`,
    });
  }

  if (!normalized) {
    return fail({
      type: "passport",
      country,
      locale,
      normalized,
      message: t("INVALID_PASSPORT", locale),
      code: `INVALID_PASSPORT_${country}`,
    });
  }

  if (!rule.pattern.test(normalized)) {
    return fail({
      type: "passport",
      country,
      locale,
      normalized,
      message: t("INVALID_PASSPORT", locale),
      code: `INVALID_PASSPORT_${country}`,
    });
  }

  return success({
    type: "passport",
    country,
    locale,
    normalized,
    message: t("VALID_PASSPORT", locale),
  });
}

export function getPassportExample(
  country: CountryCode,
): string | undefined {
  return passportRules[country]?.example;
}

export function getSupportedPassportCountries(): CountryCode[] {
  return Object.keys(
    passportRules,
  ) as CountryCode[];
}