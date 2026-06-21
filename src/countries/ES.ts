export const ES = {
  country: "ES",
  name: "Spain",
  phone: {
    pattern: /^(\+34|34)?[67]\d{8}$/,
    example: "+34612345678"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    example: "28013"
  },
  iban: {
    prefix: "ES",
    length: 24,
    example: "ES9121000418450200051332"
  }
} as const;