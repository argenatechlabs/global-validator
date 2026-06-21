export function formatIBAN(
  value: string,
): string {
  return value
    .replace(/\s/g, "")
    .toUpperCase()
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function unformatIBAN(
  value: string,
): string {
  return value
    .replace(/\s/g, "")
    .toUpperCase();
}

export function maskIBAN(
  value: string,
): string {
  const iban = unformatIBAN(value);

  if (iban.length < 8) {
    return iban;
  }

  return (
    iban.slice(0, 4) +
    "*".repeat(iban.length - 8) +
    iban.slice(-4)
  );
}

export function getIBANCountry(
  value: string,
): string | undefined {
  const iban = unformatIBAN(value);

  if (iban.length < 2) {
    return undefined;
  }

  return iban.slice(0, 2);
}