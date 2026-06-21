import type { CountryCode, LocaleCode } from "../types";

export type GuideFormat = "markdown" | "text";

export type GetGuideOptions = {
  country?: CountryCode;
  locale?: LocaleCode;
  format?: GuideFormat;
};

export type GuideMeta = {
  country?: CountryCode;
  locale: LocaleCode;
  title: string;
  updatedAt: string;
};