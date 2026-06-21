export const DE = {
  country: "DE",
  name: "Germany",
  phone: {
    pattern: /^(\+49|49|0)?1[5-7]\d{8,9}$/,
    example: "+4915112345678"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    example: "10115"
  },
  iban: {
    prefix: "DE",
    length: 22,
    example: "DE89370400440532013000"
  }
} as const;