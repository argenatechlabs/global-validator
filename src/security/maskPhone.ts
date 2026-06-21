import type { CountryCode } from "../types";

import { formatPhone } from "../formatters/phone";

export function maskPhone(
  value: string,
  country: CountryCode,
): string {
  const formatted = formatPhone(
    value,
    country,
  );

  const digits = formatted.replace(
    /\D/g,
    "",
  );

  if (digits.length < 6) {
    return formatted;
  }

  const visibleStart = digits.slice(0, 4);
  const visibleEnd = digits.slice(-2);

  const masked =
    visibleStart +
    "*".repeat(
      digits.length - 6,
    ) +
    visibleEnd;

  let index = 0;

  return formatted.replace(
    /\d/g,
    () => masked[index++],
  );
}

export function maskPhoneSimple(
  value: string,
): string {
  const digits = value.replace(
    /\D/g,
    "",
  );

  if (digits.length < 6) {
    return value;
  }

  return (
    digits.slice(0, 4) +
    "*".repeat(
      digits.length - 6,
    ) +
    digits.slice(-2)
  );
}