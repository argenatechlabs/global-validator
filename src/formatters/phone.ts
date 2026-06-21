import type { CountryCode } from "../types";

type PhoneRule = {
  countryCode: string;
  removePrefix?: string[];
  localLength: number | number[];
  formatter: (digits: string) => string;
};

const phoneRules: Record<CountryCode, PhoneRule> = {
  TR: {
    countryCode: "90",
    removePrefix: ["90", "0"],
    localLength: 10,
    formatter: (d) =>
      `+90 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`,
  },
  US: {
    countryCode: "1",
    removePrefix: ["1"],
    localLength: 10,
    formatter: (d) =>
      `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`,
  },
  GB: {
    countryCode: "44",
    removePrefix: ["44", "0"],
    localLength: 10,
    formatter: (d) =>
      `+44 ${d.slice(2, 6)} ${d.slice(6, 9)} ${d.slice(9)}`,
  },
  DE: {
    countryCode: "49",
    removePrefix: ["49", "0"],
    localLength: [10, 11],
    formatter: (d) =>
      `+49 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`,
  },
  FR: {
    countryCode: "33",
    removePrefix: ["33", "0"],
    localLength: 9,
    formatter: (d) =>
      `+33 ${d.slice(2, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)} ${d.slice(9)}`,
  },
  IT: {
    countryCode: "39",
    removePrefix: ["39"],
    localLength: [9, 10],
    formatter: (d) =>
      `+39 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`,
  },
  ES: {
    countryCode: "34",
    removePrefix: ["34"],
    localLength: 9,
    formatter: (d) =>
      `+34 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`,
  },
  RU: {
    countryCode: "7",
    removePrefix: ["7", "8"],
    localLength: 10,
    formatter: (d) =>
      `+7 ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`,
  },
  UA: {
    countryCode: "380",
    removePrefix: ["380", "0"],
    localLength: 9,
    formatter: (d) =>
      `+380 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`,
  },
  AZ: {
    countryCode: "994",
    removePrefix: ["994", "0"],
    localLength: 9,
    formatter: (d) =>
      `+994 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`,
  },
};

function isValidLength(
  length: number,
  expected: number | number[],
): boolean {
  return Array.isArray(expected)
    ? expected.includes(length)
    : length === expected;
}

export function normalizePhone(
  value: string,
  country: CountryCode,
): string {
  const rule = phoneRules[country];

  if (!rule) {
    return value;
  }

  let raw = value.replace(/\D/g, "");

  for (const prefix of rule.removePrefix ?? []) {
    if (raw.startsWith(prefix)) {
      raw = raw.slice(prefix.length);
      break;
    }
  }

  if (!isValidLength(raw.length, rule.localLength)) {
    return value;
  }

  return `+${rule.countryCode}${raw}`;
}

export function formatPhone(
  value: string,
  country: CountryCode,
): string {
  const normalized = normalizePhone(value, country);
  const digits = normalized.replace(/\D/g, "");
  const rule = phoneRules[country];

  if (!rule) {
    return value;
  }

  if (!digits.startsWith(rule.countryCode)) {
    return value;
  }

  return rule.formatter(digits);
}

export function getPhoneCountryCode(
  country: CountryCode,
): string {
  return phoneRules[country].countryCode;
}