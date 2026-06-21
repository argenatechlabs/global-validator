import type { LocaleCode } from "../types";

const localeMap: Record<LocaleCode, string> = {
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

export type DateFormatStyle =
  | "short"
  | "medium"
  | "long"
  | "full";

export type FormatDateOptions = {
  locale?: LocaleCode;
  dateStyle?: DateFormatStyle;
  timeStyle?: DateFormatStyle;
  includeTime?: boolean;
};

function toDate(
  value: Date | string | number,
): Date | null {
  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatDate(
  value: Date | string | number,
  options: FormatDateOptions = {},
): string {
  const date = toDate(value);

  if (!date) {
    return "";
  }

  const locale = options.locale ?? "en";
  const intlLocale =
    localeMap[locale] ?? "en-US";

  return new Intl.DateTimeFormat(
    intlLocale,
    {
      dateStyle: options.dateStyle ?? "long",
      timeStyle: options.includeTime
        ? options.timeStyle ?? "short"
        : undefined,
    },
  ).format(date);
}

export function formatRelativeDate(
  value: Date | string | number,
  options: {
    locale?: LocaleCode;
    now?: Date | string | number;
  } = {},
): string {
  const date = toDate(value);
  const now = options.now
    ? toDate(options.now)
    : new Date();

  if (!date || !now) {
    return "";
  }

  const locale = options.locale ?? "en";
  const intlLocale =
    localeMap[locale] ?? "en-US";

  const diffMs =
    date.getTime() - now.getTime();

  const diffSeconds =
    Math.round(diffMs / 1000);

  const diffMinutes =
    Math.round(diffSeconds / 60);

  const diffHours =
    Math.round(diffMinutes / 60);

  const diffDays =
    Math.round(diffHours / 24);

  const formatter =
    new Intl.RelativeTimeFormat(
      intlLocale,
      {
        numeric: "auto",
      },
    );

  if (Math.abs(diffSeconds) < 60) {
    return formatter.format(
      diffSeconds,
      "second",
    );
  }

  if (Math.abs(diffMinutes) < 60) {
    return formatter.format(
      diffMinutes,
      "minute",
    );
  }

  if (Math.abs(diffHours) < 24) {
    return formatter.format(
      diffHours,
      "hour",
    );
  }

  return formatter.format(
    diffDays,
    "day",
  );
}