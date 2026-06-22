import type { CountryCode, LocaleCode, ValidationType } from "../types";
import type {
  GetGuideOptions,
  GuideFormat,
  GuideMeta,
} from "./types";

import { getAvailableCountries, getCountrySummary } from "../countries";
import {
  getAvailableExampleTypes,
  getExamples,
  getSupportedExampleCountries,
} from "../examples";

const locales: LocaleCode[] = [
  "en",
  "tr",
  "de",
  "es",
  "fr",
  "it",
  "ru",
  "uk",
  "az",
];

const validatorTypes: ValidationType[] = [
  "email",
  "phone",
  "postalCode",
  "iban",
  "nationalId",
  "taxId",
  "card",
  "url",
  "file",
  "password",
  "username",
  "passport",
];

const languageNames: Record<LocaleCode, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  ru: "Русский",
  uk: "Українська",
  az: "Azərbaycanca",
};

const section = {
  install: "Installation / Kurulum",
  quickStart: "Quick Start / Hızlı Başlangıç",
  api: "API Reference / API Referansı",
  country: "Country Support / Ülke Desteği",
  form: "Form Validation / Form Doğrulama",
  formatter: "Formatters / Biçimlendiriciler",
  security: "Security Helpers / Güvenlik Yardımcıları",
  examples: "Examples / Örnekler",
  errors: "Result Structure / Sonuç Yapısı",
  best: "Best Practices / En İyi Kullanım",
};

function code(value: string, lang = "ts"): string {
  return `\`\`\`${lang}\n${value.trim()}\n\`\`\``;
}

function toText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>-]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getSafeLocale(locale?: LocaleCode): LocaleCode {
  if (locale && locales.includes(locale)) {
    return locale;
  }

  return "en";
}

function buildValidatorReference(
  country?: CountryCode,
  locale: LocaleCode = "en",
): string {
  const examples = country ? getExamples(country) : getExamples();

  return `
## ${section.api}

### validate()

${code(`
import { validate } from "@argena/global-validator";

validate("test@example.com", {
  type: "email",
  locale: "${locale}"
});
`)}

### Available Validation Types

${code(JSON.stringify(validatorTypes, null, 2), "json")}

### Email

${code(`
validate("test@example.com", {
  type: "email",
  locale: "${locale}"
});
`)}

### Phone

${code(`
validate("${examples.phone ?? "+905551112233"}", {
  type: "phone",
  country: "${country ?? "TR"}",
  locale: "${locale}"
});
`)}

### Postal Code

${code(`
validate("${examples.postalCode ?? "16000"}", {
  type: "postalCode",
  country: "${country ?? "TR"}",
  locale: "${locale}"
});
`)}

### IBAN

${code(`
validate("${examples.iban ?? "TR330006100519786457841326"}", {
  type: "iban",
  locale: "${locale}"
});
`)}

### National ID

${code(`
validate("${examples.nationalId ?? "10000000146"}", {
  type: "nationalId",
  country: "${country ?? "TR"}",
  locale: "${locale}"
});
`)}

### Tax ID

${code(`
validate("${examples.taxId ?? "1234567890"}", {
  type: "taxId",
  country: "${country ?? "TR"}",
  locale: "${locale}"
});
`)}

### Card

${code(`
validate("${examples.card ?? "4111111111111111"}", {
  type: "card",
  locale: "${locale}"
});
`)}

### URL

${code(`
validate("${examples.url ?? "https://example.com"}", {
  type: "url",
  locale: "${locale}"
});
`)}

### File

${code(`
validate(
  {
    name: "logo.png",
    size: 1200,
    type: "image/png"
  },
  {
    type: "file",
    locale: "${locale}",
    file: {
      maxSize: 2_000_000,
      allowedTypes: ["image/png", "image/jpeg"],
      allowedExtensions: ["png", "jpg", "jpeg"]
    }
  }
);
`)}

### Password

${code(`
validate("Argena123!", {
  type: "password",
  locale: "${locale}",
  password: {
    minLength: 8,
    requireSpecial: true,
    minLevel: "medium"
  }
});
`)}

### Username

${code(`
validate("argena.tech", {
  type: "username",
  locale: "${locale}",
  username: {
    allowDot: true,
    allowUnderscore: true,
    allowDash: false
  }
});
`)}

### Passport

${code(`
validate("${examples.passport ?? "U12345678"}", {
  type: "passport",
  country: "${country ?? "TR"}",
  locale: "${locale}"
});
`)}
`.trim();
}

function buildFormGuide(
  country?: CountryCode,
  locale: LocaleCode = "en",
): string {
  const examples = country ? getExamples(country) : getExamples("TR");

  return `
## ${section.form}

${code(`
import { validateForm } from "@argena/global-validator";

const result = validateForm(
  {
    email: "test@example.com",
    phone: "${examples.phone ?? "+905551112233"}",
    postalCode: "${examples.postalCode ?? "16000"}",
    username: "argena.tech",
    password: "Argena123!"
  },
  {
    email: "email",
    phone: {
      type: "phone",
      country: "${country ?? "TR"}",
      label: "Phone"
    },
    postalCode: {
      type: "postalCode",
      country: "${country ?? "TR"}"
    },
    username: {
      type: "username",
      username: {
        allowDot: true
      }
    },
    password: {
      type: "password",
      password: {
        minLength: 8,
        requireSpecial: true
      }
    }
  },
  {
    country: "${country ?? "TR"}",
    locale: "${locale}"
  }
);

console.log(result.valid);
console.log(result.errors);
console.log(result.fields);
`)}
`.trim();
}

function buildFormatterGuide(
  country?: CountryCode,
  locale: LocaleCode = "en",
): string {
  const examples = country ? getExamples(country) : getExamples("TR");

  return `
## ${section.formatter}

${code(`
import {
  formatPhone,
  formatIBAN,
  formatCurrency,
  formatDate,
  formatRelativeDate
} from "@argena/global-validator";

formatPhone("${examples.phone ?? "+905551112233"}", "${country ?? "TR"}");

formatIBAN("${examples.iban ?? "TR330006100519786457841326"}");

formatCurrency(1500, {
  country: "${country ?? "TR"}",
  locale: "${locale}"
});

formatDate(new Date(), {
  locale: "${locale}",
  dateStyle: "long"
});

formatRelativeDate("2026-06-22", {
  now: "2026-06-21",
  locale: "${locale}"
});
`)}
`.trim();
}

function buildSecurityGuide(country?: CountryCode): string {
  const examples = country ? getExamples(country) : getExamples("TR");

  return `
## ${section.security}

${code(`
import {
  maskEmail,
  maskPhone,
  sanitizeText,
  escapeHTML,
  stripHTML,
  normalizeText,
  slugify
} from "@argena/global-validator";

maskEmail("osman@example.com");

maskPhone("${examples.phone ?? "+905551112233"}", "${country ?? "TR"}");

sanitizeText("<script>alert(1)</script><b>Hello</b>");

escapeHTML("<div>Hello</div>");

stripHTML("<b>Hello</b>");

normalizeText("  hello    world  ");

slugify("Türkçe Başlık Deneme");
`)}
`.trim();
}

function buildCountryTable(): string {
  const rows = getAvailableCountries()
    .map((country) => {
      const summary = getCountrySummary(country);

      return `| ${country} | ${summary.name} | ${summary.supported.phone ? "✅" : "❌"} | ${summary.supported.postalCode ? "✅" : "❌"} | ${summary.supported.iban ? "✅" : "❌"} | ${summary.supported.nationalId ? "✅" : "❌"} | ${summary.supported.taxId ? "✅" : "❌"} | ${summary.supported.passport ? "✅" : "❌"} |`;
    })
    .join("\n");

  return `
## ${section.country}

| Country | Name | Phone | Postal Code | IBAN | National ID | Tax ID | Passport |
|---|---|---:|---:|---:|---:|---:|---:|
${rows}
`.trim();
}

function buildExamplesSection(country?: CountryCode): string {
  const examples = country ? getExamples(country) : getExamples();

  const availableTypes = country
    ? getAvailableExampleTypes(country)
    : getAvailableExampleTypes();

  return `
## ${section.examples}

### Available example types

${code(JSON.stringify(availableTypes, null, 2), "json")}

### Examples

${code(JSON.stringify(examples, null, 2), "json")}

### API

${code(`
import {
  getExample,
  getExamples,
  hasExample,
  getAvailableExampleTypes,
  getSupportedExampleCountries
} from "@argena/global-validator";

getExample("email");
getExample("phone", "${country ?? "TR"}");
getExamples("${country ?? "TR"}");
hasExample("passport", "${country ?? "TR"}");
getAvailableExampleTypes("${country ?? "TR"}");
getSupportedExampleCountries();
`)}
`.trim();
}

function buildResultStructure(): string {
  return `
## ${section.errors}

Every validator returns a consistent result object.

${code(`
type ValidationResult = {
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
`)}

### Success

${code(`
{
  "valid": true,
  "type": "phone",
  "country": "TR",
  "locale": "tr",
  "normalized": "+905551112233",
  "message": "Geçerli telefon numarası."
}
`, "json")}

### Error

${code(`
{
  "valid": false,
  "type": "phone",
  "country": "TR",
  "locale": "tr",
  "message": "Geçersiz telefon numarası.",
  "code": "INVALID_PHONE_TR"
}
`, "json")}
`.trim();
}

function buildBestPractices(): string {
  return `
## ${section.best}

- Use \`validate()\` for simple one-field validation.
- Use \`validateForm()\` for forms.
- Use \`country\` for country-specific rules.
- Use \`locale\` for translated messages.
- Use \`normalized\` values before saving data.
- IBAN validation checks checksum.
- Passport validation is format-based.
- National ID and Tax ID rules differ by country.
- Do not rely only on frontend validation for critical financial or legal workflows.
- Always revalidate sensitive data on the server.
`.trim();
}

function buildAutoGuideInfo(): string {
  return `
## Automatic Guide File

When \`getGuide()\` runs, the package automatically creates a guide file.

### Node.js

${code(`
getGuide({
  country: "TR",
  locale: "tr"
});

// Automatically creates:
// docs/TR-tr-guide.md
`)}

### Browser

${code(`
getGuide({
  country: "TR",
  locale: "tr"
});

// Automatically downloads:
// TR-tr-guide.md
`)}

No extra create function is required.
`.trim();
}

function buildCommonGuide(locale: LocaleCode): string {
  return `
# Argena Global Validator Guide

Language: **${languageNames[locale]}**

A global, country-aware and locale-aware validation toolkit for TypeScript and JavaScript.

## ${section.install}

${code(`
npm install @argena/global-validator
`, "bash")}

## ${section.quickStart}

${code(`
import {
  validate,
  validateForm,
  getGuide,
  getExample
} from "@argena/global-validator";

const email = validate("test@example.com", {
  type: "email",
  locale: "${locale}"
});

const guide = getGuide({
  locale: "${locale}"
});
`)}

${buildCountryTable()}

${buildValidatorReference(undefined, locale)}

${buildFormGuide(undefined, locale)}

${buildFormatterGuide(undefined, locale)}

${buildSecurityGuide(undefined)}

${buildExamplesSection(undefined)}

${buildResultStructure()}

${buildAutoGuideInfo()}

${buildBestPractices()}
`.trim();
}

function buildCountryGuide(
  country: CountryCode,
  locale: LocaleCode,
): string {
  const summary = getCountrySummary(country);

  return `
# ${country} Guide - Argena Global Validator

Language: **${languageNames[locale]}**

## Country Summary

${code(JSON.stringify(summary, null, 2), "json")}

${buildValidatorReference(country, locale)}

${buildFormGuide(country, locale)}

${buildFormatterGuide(country, locale)}

${buildSecurityGuide(country)}

${buildExamplesSection(country)}

${buildResultStructure()}

${buildAutoGuideInfo()}

${buildBestPractices()}
`.trim();
}

function getGuideFileName(options: {
  country?: CountryCode;
  locale: LocaleCode;
  format: GuideFormat;
}): string {
  const extension = options.format === "text" ? "txt" : "md";

  if (options.country) {
    return `${options.country}-${options.locale}-guide.${extension}`;
  }

  return `common-${options.locale}-guide.${extension}`;
}

function isBrowser(): boolean {
  return (
    typeof globalThis !== "undefined" &&
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  );
}

function downloadGuideInBrowser(fileName: string, content: string): void {
  try {
    const blob = new Blob([content], {
      type: fileName.endsWith(".md")
        ? "text/markdown;charset=utf-8"
        : "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch {
    // Silent fail.
  }
}

function saveGuideInNode(fileName: string, content: string): void {
  try {
    const dynamicImport = new Function(
      "specifier",
      "return import(specifier)",
    ) as (specifier: string) => Promise<{
      mkdir: (
        path: string,
        options?: { recursive?: boolean },
      ) => Promise<void>;
      writeFile: (
        path: string,
        data: string,
        encoding: "utf-8",
      ) => Promise<void>;
    }>;

    dynamicImport("node:fs/promises")
      .then(async (fs) => {
        await fs.mkdir("docs", {
          recursive: true,
        });

        await fs.writeFile(
          `docs/${fileName}`,
          content,
          "utf-8",
        );
      })
      .catch(() => {
        // Silent fail.
      });
  } catch {
    // Silent fail.
  }
}

function autoSaveGuide(options: {
  content: string;
  country?: CountryCode;
  locale: LocaleCode;
  format: GuideFormat;
  autoSave?: boolean;
}): void {
  if (options.autoSave === false) {
    return;
  }

  const fileName = getGuideFileName({
    country: options.country,
    locale: options.locale,
    format: options.format,
  });

  if (isBrowser()) {
    downloadGuideInBrowser(fileName, options.content);
    return;
  }

  saveGuideInNode(fileName, options.content);
}

export function getGuide(options: GetGuideOptions = {}): string {
  const locale = getSafeLocale(options.locale);
  const format = options.format ?? "markdown";

  const guide = options.country
    ? buildCountryGuide(options.country, locale)
    : buildCommonGuide(locale);

  const content = format === "text" ? toText(guide) : guide;

  autoSaveGuide({
    content,
    country: options.country,
    locale,
    format,
    autoSave: options.autoSave,
  });

  return content;
}

export function getAvailableGuideCountries(): CountryCode[] {
  return getAvailableCountries();
}

export function getAvailableGuideLocales(): LocaleCode[] {
  return locales;
}

export function hasGuide(
  country?: CountryCode,
  locale: LocaleCode = "en",
): boolean {
  if (!locales.includes(locale)) {
    return false;
  }

  if (!country) {
    return true;
  }

  return getAvailableCountries().includes(country);
}

export function getGuideMeta(
  country?: CountryCode,
  locale: LocaleCode = "en",
): GuideMeta {
  const safeLocale = getSafeLocale(locale);
  const format: GuideFormat = "markdown";

  return {
    country,
    locale: safeLocale,
    format,
    fileName: getGuideFileName({
      country,
      locale: safeLocale,
      format,
    }),
    title: country
      ? `${country} guide (${safeLocale})`
      : `Common guide (${safeLocale})`,
    updatedAt: "2026-06-22",
  };
}