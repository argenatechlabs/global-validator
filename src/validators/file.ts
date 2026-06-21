import type {
  LocaleCode,
  ValidationResult,
} from "../types";

import { t } from "../locales";
import { fail, success } from "../utils/result";

export type FileLike = {
  name?: string;
  size?: number;
  type?: string;
};

export type FileValidationOptions = {
  maxSize?: number;
  allowedTypes?: string[];
  allowedExtensions?: string[];
};

function getExtension(name?: string): string {
  if (!name || !name.includes(".")) {
    return "";
  }

  return (
    name
      .split(".")
      .pop()
      ?.toLowerCase() ?? ""
  );
}

export function validateFile(
  file: FileLike,
  options: FileValidationOptions = {},
  locale: LocaleCode = "en",
): ValidationResult {
  if (!file) {
    return fail({
      type: "file",
      locale,
      message: t("REQUIRED_FILE", locale),
      code: "REQUIRED_FILE",
    });
  }

  const extension = getExtension(file.name);

  if (
    options.maxSize &&
    typeof file.size === "number" &&
    file.size > options.maxSize
  ) {
    return fail({
      type: "file",
      locale,
      message: t("FILE_TOO_LARGE", locale),
      code: "FILE_TOO_LARGE",
    });
  }

  if (
    options.allowedTypes &&
    file.type &&
    !options.allowedTypes.includes(file.type)
  ) {
    return fail({
      type: "file",
      locale,
      message: t("FILE_TYPE_NOT_ALLOWED", locale),
      code: "FILE_TYPE_NOT_ALLOWED",
    });
  }

  if (
    options.allowedExtensions &&
    extension
  ) {
    const normalizedExtensions =
      options.allowedExtensions.map((ext) =>
        ext
          .replace(".", "")
          .toLowerCase(),
      );

    if (
      !normalizedExtensions.includes(
        extension,
      )
    ) {
      return fail({
        type: "file",
        locale,
        message: t(
          "FILE_EXTENSION_NOT_ALLOWED",
          locale,
        ),
        code: "FILE_EXTENSION_NOT_ALLOWED",
      });
    }
  }

  return success({
    type: "file",
    locale,
    normalized: file.name,
    message: t("VALID_FILE", locale),
  });
}