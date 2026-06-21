import { normalizeText, stripHTML } from "./html";

export type SanitizeTextOptions = {
  stripHtml?: boolean;
  removeScripts?: boolean;
  normalize?: boolean;
  trim?: boolean;
};

export function sanitizeText(
  value: string,
  options: SanitizeTextOptions = {},
): string {
  const stripHtml =
    options.stripHtml ?? true;

  const removeScripts =
    options.removeScripts ?? true;

  const normalize =
    options.normalize ?? true;

  const trim =
    options.trim ?? true;

  let result = String(value ?? "");

  if (removeScripts) {
    result = result
      .replace(
        /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        "",
      )
      .replace(/javascript:/gi, "")
      .replace(/vbscript:/gi, "")
      .replace(/data:text\/html/gi, "")
      .replace(/on\w+\s*=/gi, "");
  }

  if (stripHtml) {
    result = stripHTML(result);
  }

  if (normalize) {
    result = normalizeText(result);
  }

  if (trim) {
    result = result.trim();
  }

  return result;
}

export function sanitizeInput(
  value: string,
): string {
  return sanitizeText(value);
}