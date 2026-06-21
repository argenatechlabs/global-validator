# 🌍 Argena Global Validator

<div align="center">

Global Validation • Formatting • Security • Localization Toolkit

TypeScript & JavaScript için dünyanın her yerinde kullanılabilecek profesyonel doğrulama paketi.

![npm](https://img.shields.io/npm/v/@argena/global-validator)
![downloads](https://img.shields.io/npm/dm/@argena/global-validator)
![license](https://img.shields.io/npm/l/@argena/global-validator)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)
![coverage](https://img.shields.io/badge/Tested-Vitest-green)

</div>

---

# 🚀 Why Argena Global Validator?

Most validator libraries only validate.

**Argena Global Validator validates, formats, localizes, sanitizes, documents and teaches.**

Built for:

* SaaS Platforms
* Enterprise Applications
* Government Systems
* Banking Applications
* E-Commerce
* CRM Systems
* ERP Systems
* Mobile Applications
* React / Next.js Projects
* Node.js APIs

---

# ✨ Features

## Validation

### Identity

* National ID Validation
* Tax ID Validation
* Passport Validation

### Contact

* Email Validation
* Phone Validation
* URL Validation

### Financial

* IBAN Validation
* Credit Card Validation
* Luhn Validation

### Files

* File Validation
* MIME Type Validation
* Extension Validation
* File Size Validation

### Authentication

* Password Validation
* Password Strength Analysis
* Username Validation

### Forms

* Single Field Validation
* Multi Field Validation
* Form Schema Validation

---

# 🌎 Supported Countries

| Country | Phone | Postal Code | IBAN | National ID | Tax ID | Passport |
| ------- | ----- | ----------- | ---- | ----------- | ------ | -------- |
| TR      | ✅     | ✅           | ✅    | ✅           | ✅      | ✅        |
| US      | ✅     | ✅           | ❌    | ❌           | ❌      | ✅        |
| GB      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |
| DE      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |
| FR      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |
| IT      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |
| ES      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |
| RU      | ✅     | ✅           | ❌    | ❌           | ❌      | ✅        |
| UA      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |
| AZ      | ✅     | ✅           | ✅    | ❌           | ❌      | ✅        |

More countries coming soon.

---

# 🌐 Supported Languages

* English
* Türkçe
* Deutsch
* Français
* Español
* Italiano
* Русский
* Українська
* Azərbaycanca

---

# 📦 Installation

## npm

```bash
npm install @argena/global-validator
```

## pnpm

```bash
pnpm add @argena/global-validator
```

## yarn

```bash
yarn add @argena/global-validator
```

---

# ⚡ Quick Start

```ts
import { validate } from "@argena/global-validator";

const result = validate("test@example.com", {
  type: "email",
  locale: "en"
});

console.log(result);
```

Output:

```ts
{
  valid: true,
  type: "email",
  normalized: "test@example.com",
  message: "Valid email address."
}
```

---

# 📧 Email Validation

```ts
import { validateEmail } from "@argena/global-validator";

validateEmail("test@example.com", "en");
```

---

# 📱 Phone Validation

Turkey

```ts
validatePhone(
  "05551112233",
  "TR",
  "tr"
);
```

United States

```ts
validatePhone(
  "+12125551234",
  "US",
  "en"
);
```

Germany

```ts
validatePhone(
  "+4915112345678",
  "DE",
  "de"
);
```

---

# 🏦 IBAN Validation

```ts
validateIBAN(
  "TR330006100519786457841326",
  "tr"
);
```

```ts
validateIBAN(
  "DE89370400440532013000",
  "de"
);
```

---

# 🪪 Passport Validation

```ts
validatePassport(
  "U12345678",
  "TR",
  "tr"
);
```

---

# 🔐 Password Validation

```ts
validatePassword(
  "Argena123!",
  {
    requireSpecial: true,
    minLength: 8,
    locale: "tr"
  }
);
```

Result:

```ts
{
  valid: true,
  score: 85,
  level: "very-strong"
}
```

---

# 👤 Username Validation

```ts
validateUsername(
  "argena.tech",
  {
    locale: "tr",
    allowDot: true
  }
);
```

---

# 📄 Form Validation

```ts
validateForm(
  {
    email: "test@example.com",
    phone: "05551112233",
    username: "argena.tech"
  },
  {
    email: "email",
    phone: {
      type: "phone",
      country: "TR"
    },
    username: {
      type: "username"
    }
  },
  {
    locale: "tr",
    country: "TR"
  }
);
```

---

# 🎨 Formatters

## Phone

```ts
formatPhone(
  "05551112233",
  "TR"
);

// +90 555 111 22 33
```

## IBAN

```ts
formatIBAN(
  "TR330006100519786457841326"
);

// TR33 0006 1005 1978 6457 8413 26
```

## Currency

```ts
formatCurrency(
  1500,
  {
    country: "TR",
    locale: "tr"
  }
);
```

Output:

```txt
₺1.500,00
```

## Date

```ts
formatDate(
  new Date(),
  {
    locale: "tr",
    dateStyle: "long"
  }
);
```

---

# 🛡 Security Helpers

## Email Masking

```ts
maskEmail(
  "osman@example.com"
);

// o********n@example.com
```

## Phone Masking

```ts
maskPhone(
  "05551112233",
  "TR"
);

// +90 555 **** 33
```

## Sanitize Text

```ts
sanitizeText(
  "<script>alert(1)</script>Hello"
);

// Hello
```

## Escape HTML

```ts
escapeHTML(
  "<div>Hello</div>"
);

// &lt;div&gt;Hello&lt;/div&gt;
```

---

# 📚 Guide System

One of the most unique features.

Generate country-specific documentation directly from the library.

```ts
import { getGuide } from "@argena/global-validator";

getGuide({
  country: "TR",
  locale: "tr"
});
```

```ts
getGuide({
  country: "DE",
  locale: "de"
});
```

```ts
getGuide({
  country: "AZ",
  locale: "az"
});
```

---

# 🧪 Testing

```bash
npm run test
```

Coverage includes:

* Email
* Phone
* Postal Code
* IBAN
* Passport
* National ID
* Password
* Username
* Security Helpers
* Formatters
* Guides
* Examples
* Forms

---

# 🏗 Roadmap

## v1.1

* JSON Schema Generator
* Zod Adapter
* React Hook Form Adapter
* Vue Form Adapter

## v1.2

* 50+ Countries
* 20+ Languages
* Banking Validation Suite

## v2.0

* AI Generated Validation Rules
* Dynamic Country Packs
* Enterprise Validation Engine

---

# 🤝 Contributing

Pull requests, suggestions and issues are welcome.

---

# 📄 License

MIT License

Copyright © Argena Tech Labs

---

Made with ❤️ by Argena Tech Labs
