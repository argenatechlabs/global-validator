import type {
  CountryCode,
  LocaleCode,
  ValidationResult,
  ValidationType,
} from "../types";

export function success(params: {
  type: ValidationType;
  country?: CountryCode;
  locale?: LocaleCode;
  normalized?: string;
  message: string;
  code?: string;
  score?: number;
  level?: string;
  suggestions?: string[];
  errors?: string[];
}): ValidationResult {
  return {
    valid: true,
    ...params,
  };
}

export function fail(params: {
  type: ValidationType;
  country?: CountryCode;
  locale?: LocaleCode;
  normalized?: string;
  message: string;
  code?: string;
  score?: number;
  level?: string;
  suggestions?: string[];
  errors?: string[];
}): ValidationResult {
  return {
    valid: false,
    ...params,
  };
}