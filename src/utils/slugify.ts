const charMap: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",

  ä: "a",
  Ä: "a",
  ß: "ss",

  ñ: "n",
  Ñ: "n",

  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  å: "a",

  è: "e",
  é: "e",
  ê: "e",
  ë: "e",

  ì: "i",
  í: "i",
  î: "i",
  ï: "i",

  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",

  ù: "u",
  ú: "u",
  û: "u",
};

export function slugify(
  value: string,
  separator = "-",
): string {
  return value
    .trim()
    .split("")
    .map((char) => charMap[char] ?? char)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, separator)
    .replace(
      new RegExp(`${separator}+`, "g"),
      separator,
    )
    .replace(
      new RegExp(
        `^${separator}+|${separator}+$`,
        "g",
      ),
      "",
    );
}

export function slugifyUrl(
  value: string,
): string {
  return slugify(value, "-");
}

export function slugifyFile(
  value: string,
): string {
  return slugify(value, "_");
}