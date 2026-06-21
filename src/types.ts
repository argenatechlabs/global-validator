export type CountryCode =
  | "TR"
  | "US"
  | "GB"
  | "DE"
  | "FR"
  | "IT"
  | "ES"
  | "RU"
  | "UA"
  | "AZ";

export type LocaleCode =
  | "en"
  | "tr"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "ru"
  | "uk"
  | "az";

export type ValidationType =
  | "email"
  | "phone"
  | "postalCode"
  | "iban"
  | "nationalId"
  | "taxId"
  | "card"
  | "url"
  | "file"
  | "password"
  | "username"
  | "passport";

export type ValidationResult = {
  valid: boolean;
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
};