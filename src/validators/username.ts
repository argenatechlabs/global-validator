import type {
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";

export type UsernameValidationOptions = {
  minLength?: number;
  maxLength?: number;
  allowDot?: boolean;
  allowUnderscore?: boolean;
  allowDash?: boolean;
  allowNumbers?: boolean;
  reserved?: string[];
  locale?: LocaleCode;
};

export function validateUsername(
  username: string,
  options: UsernameValidationOptions = {},
): ValidationResult {
  const locale = options.locale ?? "en";

  const minLength = options.minLength ?? 3;
  const maxLength = options.maxLength ?? 24;

  const allowDot = options.allowDot ?? true;
  const allowUnderscore = options.allowUnderscore ?? true;
  const allowDash = options.allowDash ?? false;
  const allowNumbers = options.allowNumbers ?? true;

  const normalized = username.trim().toLowerCase();
  const errors: string[] = [];

  if (normalized.length < minLength) {
    errors.push(t("USERNAME_TOO_SHORT", locale));
  }

  if (normalized.length > maxLength) {
    errors.push(t("USERNAME_TOO_LONG", locale));
  }

  if (/\s/.test(normalized)) {
    errors.push(t("USERNAME_NO_SPACES", locale));
  }

  if (!allowDot && normalized.includes(".")) {
    errors.push(t("USERNAME_DOT_NOT_ALLOWED", locale));
  }

  if (!allowUnderscore && normalized.includes("_")) {
    errors.push(t("USERNAME_UNDERSCORE_NOT_ALLOWED", locale));
  }

  if (!allowDash && normalized.includes("-")) {
    errors.push(t("USERNAME_DASH_NOT_ALLOWED", locale));
  }

  if (!allowNumbers && /\d/.test(normalized)) {
    errors.push(t("USERNAME_NUMBER_NOT_ALLOWED", locale));
  }

  let allowedPattern = "a-z";

  if (allowNumbers) allowedPattern += "0-9";
  if (allowDot) allowedPattern += "\\.";
  if (allowUnderscore) allowedPattern += "_";
  if (allowDash) allowedPattern += "\\-";

  const usernameRegex = new RegExp(`^[${allowedPattern}]+$`);

  if (!usernameRegex.test(normalized)) {
    errors.push(t("USERNAME_INVALID_CHARACTERS", locale));
  }

  const reserved = (
    options.reserved ?? [
      "admin",
      "root",
      "system",
      "support",
      "null",
      "undefined",
      "api",
      "auth",
      "login",
      "register",
    ]
  ).map((item) => item.toLowerCase());

  if (reserved.includes(normalized)) {
    errors.push(t("USERNAME_RESERVED", locale));
  }

  return {
    valid: errors.length === 0,
    type: "username",
    locale,
    normalized,
    errors,
    message:
      errors.length === 0
        ? t("VALID_USERNAME", locale)
        : t("INVALID_USERNAME", locale),
    code:
      errors.length === 0
        ? undefined
        : "INVALID_USERNAME",
  };
}