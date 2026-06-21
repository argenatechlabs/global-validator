export const AZ = {
  country: "AZ",
  name: "Azerbaijan",
  phone: {
    pattern: /^(\+994|994|0)?(50|51|55|70|77|99)\d{7}$/,
    example: "+994501234567"
  },
  postalCode: {
    pattern: /^AZ\d{4}$/i,
    example: "AZ1000"
  },
  iban: {
    prefix: "AZ",
    length: 28,
    example: "AZ21NABZ00000000137010001944"
  }
} as const;