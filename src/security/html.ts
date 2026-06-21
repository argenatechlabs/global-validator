export function escapeHTML(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function stripHTML(value: string): string {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function normalizeText(value: string): string {
  return String(value ?? "")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim();
}