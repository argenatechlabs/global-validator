export const IT = {
  country: "IT",
  name: "Italy",
  phone: {
    pattern: /^(\+39|39)?3\d{8,9}$/,
    example: "+393331234567"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    example: "00118"
  },
  iban: {
    prefix: "IT",
    length: 27,
    example: "IT60X0542811101000000123456"
  }
} as const;