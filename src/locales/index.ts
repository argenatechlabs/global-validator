import type { LocaleCode } from "../types";

import { en } from "./en";
import { tr } from "./tr";
import { de } from "./de";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { ru } from "./ru";
import { uk } from "./uk";
import { az } from "./az";

export const locales = {
  en,
  tr,
  de,
  es,
  fr,
  it,
  ru,
  uk,
  az,
} as const;

export type MessageCode = keyof typeof en;

export function t(code: MessageCode, locale: LocaleCode = "en"): string {
  const table = locales[locale] ?? locales.en;
  return table[code] ?? locales.en[code] ?? code;
}

export function getAvailableMessageLocales(): LocaleCode[] {
  return Object.keys(locales) as LocaleCode[];
}

export function hasLocale(locale: string): locale is LocaleCode {
  return locale in locales;
}

export function getMessages(locale: LocaleCode = "en") {
  return locales[locale] ?? locales.en;
}