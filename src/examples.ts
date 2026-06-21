import type {
  CountryCode,
  ValidationType
} from "./types";

export type ExampleMap = Partial<
  Record<ValidationType, string>
>;

const globalExamples: ExampleMap = {
  email: "test@example.com",
  card: "4111111111111111",
  url: "https://example.com",
  file: "logo.png",
  password: "Argena123!",
  username: "argena.tech",
};

const countryExamples: Partial<
  Record<CountryCode, ExampleMap>
> = {
  TR: {
    phone: "+905551112233",
    postalCode: "16000",
    iban: "TR330006100519786457841326",
    nationalId: "10000000146",
    taxId: "1234567890",
    passport: "U12345678",
  },

  US: {
    phone: "+12125551234",
    postalCode: "90210",
    passport: "123456789",
  },

  GB: {
    phone: "+447911123456",
    postalCode: "SW1A 1AA",
    iban: "GB82WEST12345698765432",
    passport: "123456789",
  },

  DE: {
    phone: "+4915112345678",
    postalCode: "10115",
    iban: "DE89370400440532013000",
    passport: "C01X00T47",
  },

  FR: {
    phone: "+33612345678",
    postalCode: "75001",
    iban: "FR1420041010050500013M02606",
    passport: "12AB34567",
  },

  IT: {
    phone: "+393331234567",
    postalCode: "00118",
    iban: "IT60X0542811101000000123456",
    passport: "YA1234567",
  },

  ES: {
    phone: "+34612345678",
    postalCode: "28013",
    iban: "ES9121000418450200051332",
    passport: "AAA123456",
  },

  RU: {
    phone: "+79161234567",
    postalCode: "101000",
    passport: "123456789",
  },

  UA: {
    phone: "+380501234567",
    postalCode: "01001",
    iban: "UA213223130000026007233566001",
    passport: "AB123456",
  },

  AZ: {
    phone: "+994501234567",
    postalCode: "AZ1000",
    iban: "AZ21NABZ00000000137010001944",
    passport: "C12345678",
  },
};

export function getExample(
  type: ValidationType,
  country?: CountryCode
): string | undefined {
  if (country) {
    const countryExample =
      countryExamples[country]?.[type];

    if (countryExample) {
      return countryExample;
    }
  }

  return globalExamples[type];
}

export function getExamples(
  country?: CountryCode
): ExampleMap {
  return {
    ...globalExamples,
    ...(country
      ? countryExamples[country] ?? {}
      : {}),
  };
}

export function getAvailableExampleTypes(
  country?: CountryCode
): ValidationType[] {
  return Object.keys(
    getExamples(country)
  ) as ValidationType[];
}

export function hasExample(
  type: ValidationType,
  country?: CountryCode
): boolean {
  return Boolean(
    getExample(type, country)
  );
}

export function getSupportedExampleCountries(): CountryCode[] {
  return Object.keys(
    countryExamples
  ) as CountryCode[];
}