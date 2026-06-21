export const GB = {
  country: "GB",
  name: "United Kingdom",
  phone: {
    pattern: /^(\+44|44|0)?7\d{9}$/,
    example: "+447911123456"
  },
  postalCode: {
    pattern: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    example: "SW1A 1AA"
  },
  iban: {
    prefix: "GB",
    length: 22,
    example: "GB82WEST12345698765432"
  }
} as const;