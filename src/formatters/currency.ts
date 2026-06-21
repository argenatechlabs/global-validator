import type {
  CountryCode,
  LocaleCode,
} from "../types";

export type CurrencyCode =
  | "TRY"
  | "USD"
  | "EUR"
  | "GBP"
  | "RUB"
  | "UAH"
  | "AZN";

const localeMap: Record<
  LocaleCode,
  string
> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
  ru: "ru-RU",
  uk: "uk-UA",
  az: "az-AZ",
};

const countryCurrencyMap: Partial<
  Record<CountryCode, CurrencyCode>
> = {
  TR: "TRY",
  US: "USD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  RU: "RUB",
  UA: "UAH",
  AZ: "AZN",
};

export type FormatCurrencyOptions = {
  locale?: LocaleCode;
  currency?: CurrencyCode;
  country?: CountryCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {},
): string {
  const locale =
    options.locale ?? "en";

  const intlLocale =
    localeMap[locale] ?? "en-US";

  const currency =
    options.currency ??
    (options.country
      ? countryCurrencyMap[
          options.country
        ]
      : undefined) ??
    "USD";

  return new Intl.NumberFormat(
    intlLocale,
    {
      style: "currency",
      currency,
      minimumFractionDigits:
        options.minimumFractionDigits ??
        2,
      maximumFractionDigits:
        options.maximumFractionDigits ??
        2,
    },
  ).format(value);
}

export function getDefaultCurrency(
  country: CountryCode,
): CurrencyCode | undefined {
  return countryCurrencyMap[country];
}

export function getSupportedCurrencies(): CurrencyCode[] {
  return [
    "TRY",
    "USD",
    "EUR",
    "GBP",
    "RUB",
    "UAH",
    "AZN",
  ];
}