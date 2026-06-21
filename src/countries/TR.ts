export const TR = {
  country: "TR",
  name: "Türkiye",
  phone: {
    pattern: /^(\+90|90|0)?5\d{9}$/,
    example: "+905551112233"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    example: "16000"
  },
  iban: {
    prefix: "TR",
    length: 26,
    example: "TR330006100519786457841326"
  }
} as const;