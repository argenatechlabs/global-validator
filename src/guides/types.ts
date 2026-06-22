import type { CountryCode, LocaleCode } from "../types";

export type GuideFormat = "markdown" | "text";

export type GetGuideOptions = {
  country?: CountryCode;
  locale?: LocaleCode;
  format?: GuideFormat;
  autoSave?: boolean;
};

export type GuideMeta = {
  country?: CountryCode;
  locale: LocaleCode;
  format: GuideFormat;
  fileName: string;
  title: string;
  updatedAt: string;
};