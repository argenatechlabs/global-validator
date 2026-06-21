import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
  ValidationType,
} from "../types";

import { t } from "../locales";

import { validateEmail } from "./email";
import { validatePhone } from "./phone";
import { validatePostalCode } from "./postalCode";
import { validateIBAN } from "./iban";
import { validateNationalId } from "./nationalId";
import { validateTaxId } from "./taxId";
import { validateCard } from "./card";
import { validateURL } from "./url";
import {
  validateFile,
  type FileLike,
  type FileValidationOptions,
} from "./file";
import { validatePassword, type PasswordValidationOptions } from "./password";
import { validateUsername, type UsernameValidationOptions } from "./username";
import { validatePassport } from "./passport";

export type ValidateOptions = {
  type: ValidationType;
  country?: CountryCode;
  locale?: LocaleCode;
  required?: boolean;
  file?: FileValidationOptions;
  password?: Omit<PasswordValidationOptions, "locale">;
  username?: Omit<UsernameValidationOptions, "locale">;
};

export function validate(
  value: unknown,
  options: ValidateOptions,
): ValidationResult {
  const required = options.required ?? true;
  const locale = options.locale ?? "en";

  if (options.type === "file") {
    if (!value) {
      return {
        valid: false,
        type: "file",
        country: options.country,
        locale,
        message: t("REQUIRED_FILE", locale),
        code: "REQUIRED_FILE",
      };
    }

    return validateFile(value as FileLike, options.file, locale);
  }

  const stringValue = String(value ?? "").trim();

  if (required && !stringValue) {
    return {
      valid: false,
      type: options.type,
      country: options.country,
      locale,
      message: t("REQUIRED_FIELD", locale),
      code: "REQUIRED_FIELD",
    };
  }

  if (!required && !stringValue) {
    return {
      valid: true,
      type: options.type,
      country: options.country,
      locale,
      normalized: "",
      message: `${options.type} is optional`,
    };
  }

  switch (options.type) {
    case "email":
      return validateEmail(stringValue, locale);

    case "phone":
      return validatePhone(
        stringValue,
        options.country ?? "TR",
        locale,
      );

    case "postalCode":
      return validatePostalCode(
        stringValue,
        options.country ?? "TR",
        locale,
      );

    case "iban":
      return validateIBAN(stringValue, locale);

    case "nationalId":
      return validateNationalId(
        stringValue,
        options.country ?? "TR",
        locale,
      );

    case "taxId":
      return validateTaxId(
        stringValue,
        options.country ?? "TR",
        locale,
      );

    case "card":
      return validateCard(stringValue, locale);

    case "url":
      return validateURL(stringValue, locale);

    case "password":
      return validatePassword(stringValue, {
        ...options.password,
        locale,
      });

    case "username":
      return validateUsername(stringValue, {
        ...options.username,
        locale,
      });

    case "passport":
      return validatePassport(
        stringValue,
        options.country ?? "TR",
        locale,
      );

    default:
      return {
        valid: false,
        type: options.type,
        country: options.country,
        locale,
        message: `Unsupported validation type: ${options.type}`,
        code: "UNSUPPORTED_VALIDATION_TYPE",
      };
  }
}