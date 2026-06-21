export const FR = {
  country: "FR",
  name: "France",
  phone: {
    pattern: /^(\+33|33|0)?[67]\d{8}$/,
    example: "+33612345678"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    example: "75001"
  },
  iban: {
    prefix: "FR",
    length: 27,
    example: "FR1420041010050500013M02606"
  }
} as const;