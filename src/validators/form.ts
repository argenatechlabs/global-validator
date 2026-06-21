import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
  ValidationType,
} from "../types";

import {
  validate,
  type ValidateOptions,
} from "./validate";

export type FieldRule =
  | ValidationType
  | {
      type: ValidationType;
      country?: CountryCode;
      locale?: LocaleCode;
      required?: boolean;
      label?: string;
      file?: ValidateOptions["file"];
      password?: ValidateOptions["password"];
      username?: ValidateOptions["username"];
    };

export type FormSchema = Record<string, FieldRule>;

export type ValidateFormOptions = {
  country?: CountryCode;
  locale?: LocaleCode;
};

export type FormResult = {
  valid: boolean;
  errors: Record<string, ValidationResult>;
  fields: Record<string, ValidationResult>;
};

function normalizeRule(rule: FieldRule): Exclude<FieldRule, ValidationType> {
  if (typeof rule === "string") {
    return {
      type: rule,
      required: true,
    };
  }

  return {
    required: true,
    ...rule,
  };
}

export function validateField(
  value: unknown,
  rule: FieldRule,
  options: ValidateFormOptions = {},
): ValidationResult {
  const config = normalizeRule(rule);

  const result = validate(value, {
    type: config.type,
    country: config.country ?? options.country ?? "TR",
    locale: config.locale ?? options.locale ?? "en",
    required: config.required,
    file: config.file,
    password: config.password,
    username: config.username,
  });

  if (!result.valid && config.label) {
    return {
      ...result,
      message: `${config.label}: ${result.message}`,
    };
  }

  return result;
}

export function validateForm(
  data: Record<string, unknown>,
  schema: FormSchema,
  options: ValidateFormOptions = {},
): FormResult {
  const fields: Record<string, ValidationResult> = {};
  const errors: Record<string, ValidationResult> = {};

  for (const key of Object.keys(schema)) {
    const result = validateField(
      data[key],
      schema[key],
      options,
    );

    fields[key] = result;

    if (!result.valid) {
      errors[key] = result;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    fields,
  };
}

export function validateMany(
  data: Record<string, unknown>,
  schema: FormSchema,
  options: ValidateFormOptions = {},
): FormResult {
  return validateForm(data, schema, options);
}