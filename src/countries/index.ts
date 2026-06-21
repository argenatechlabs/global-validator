import type { CountryCode } from "../types";

import { TR } from "./TR";
import { US } from "./US";
import { GB } from "./GB";
import { DE } from "./DE";
import { FR } from "./FR";
import { IT } from "./IT";
import { ES } from "./ES";
import { RU } from "./RU";
import { UA } from "./UA";
import { AZ } from "./AZ";

export const countries = {
  TR,
  US,
  GB,
  DE,
  FR,
  IT,
  ES,
  RU,
  UA,
  AZ,
} as const;

export type SupportedCountry = keyof typeof countries;

export function getCountryRules(country: CountryCode) {
  return countries[country];
}

export function getAvailableCountries(): CountryCode[] {
  return Object.keys(countries) as CountryCode[];
}

export function isCountrySupported(
  country: string,
): country is CountryCode {
  return country in countries;
}

export function getCountrySummary(country: CountryCode) {
  const rules = countries[country];

  return {
    country: rules.country,
    name: rules.name,
    supported: {
      phone: Boolean(rules.phone),
      postalCode: Boolean(rules.postalCode),
      iban: Boolean(rules.iban),
      nationalId: country === "TR",
      taxId: country === "TR",
      passport: true,
    },
  };
}

export function getSupportedCountryCount(): number {
  return getAvailableCountries().length;
}