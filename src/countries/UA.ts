export const UA = {
  country: "UA",
  name: "Ukraine",
  phone: {
    pattern: /^(\+380|380|0)?\d{9}$/,
    example: "+380501234567"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    example: "01001"
  },
  iban: {
    prefix: "UA",
    length: 29,
    example: "UA213223130000026007233566001"
  }
} as const;