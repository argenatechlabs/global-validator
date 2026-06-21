import type {
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import {
  passwordStrength,
  type PasswordLevel,
} from "../security/passwordStrength";

export type PasswordValidationOptions = {
  minLength?: number;
  maxLength?: number;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumber?: boolean;
  requireSpecial?: boolean;
  minScore?: number;
  minLevel?: PasswordLevel;
  locale?: LocaleCode;
};

const levelScore: Record<PasswordLevel, number> = {
  "very-weak": 0,
  weak: 30,
  medium: 50,
  strong: 70,
  "very-strong": 85,
};

export function validatePassword(
  password: string,
  options: PasswordValidationOptions = {},
): ValidationResult {
  const locale = options.locale ?? "en";

  const minLength = options.minLength ?? 8;
  const maxLength = options.maxLength ?? 128;

  const requireLowercase = options.requireLowercase ?? true;
  const requireUppercase = options.requireUppercase ?? true;
  const requireNumber = options.requireNumber ?? true;
  const requireSpecial = options.requireSpecial ?? false;

  const strength = passwordStrength(password);
  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(t("PASSWORD_TOO_SHORT", locale));
  }

  if (password.length > maxLength) {
    errors.push(t("PASSWORD_TOO_LONG", locale));
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push(t("PASSWORD_NEEDS_LOWERCASE", locale));
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push(t("PASSWORD_NEEDS_UPPERCASE", locale));
  }

  if (requireNumber && !/\d/.test(password)) {
    errors.push(t("PASSWORD_NEEDS_NUMBER", locale));
  }

  if (requireSpecial && !/[^A-Za-z0-9]/.test(password)) {
    errors.push(t("PASSWORD_NEEDS_SPECIAL", locale));
  }

  if (
    typeof options.minScore === "number" &&
    strength.score < options.minScore
  ) {
    errors.push(t("PASSWORD_SCORE_TOO_LOW", locale));
  }

  if (
    options.minLevel &&
    levelScore[strength.level] < levelScore[options.minLevel]
  ) {
    errors.push(t("PASSWORD_LEVEL_TOO_LOW", locale));
  }

  return {
    valid: errors.length === 0,
    type: "password",
    locale,
    normalized: password,
    score: strength.score,
    level: strength.level,
    suggestions: strength.suggestions,
    errors,
    message:
      errors.length === 0
        ? t("VALID_PASSWORD", locale)
        : t("INVALID_PASSWORD", locale),
    code:
      errors.length === 0
        ? undefined
        : "INVALID_PASSWORD",
  };
}