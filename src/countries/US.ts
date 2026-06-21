export const US = {
  country: "US",
  name: "United States",
  phone: {
    pattern: /^(\+1|1)?[2-9]\d{2}[2-9]\d{6}$/,
    example: "+12125551234"
  },
  postalCode: {
    pattern: /^\d{5}(-\d{4})?$/,
    example: "90210"
  },
  iban: null
} as const;