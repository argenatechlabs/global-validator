export const RU = {
  country: "RU",
  name: "Russia",
  phone: {
    pattern: /^(\+7|7|8)?9\d{9}$/,
    example: "+79161234567"
  },
  postalCode: {
    pattern: /^\d{6}$/,
    example: "101000"
  },
  iban: null
} as const;