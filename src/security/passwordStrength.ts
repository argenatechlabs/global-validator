export type PasswordLevel =
  | "very-weak"
  | "weak"
  | "medium"
  | "strong"
  | "very-strong";

export type PasswordStrengthResult = {
  score: number;
  level: PasswordLevel;
  suggestions: string[];
};

export function passwordStrength(
  password: string,
): PasswordStrengthResult {
  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) {
    score += 20;
  } else {
    suggestions.push("Use at least 8 characters.");
  }

  if (password.length >= 12) {
    score += 15;
  } else {
    suggestions.push("Use 12 or more characters for better security.");
  }

  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    suggestions.push("Add lowercase letters.");
  }

  if (/[A-Z]/.test(password)) {
    score += 15;
  } else {
    suggestions.push("Add uppercase letters.");
  }

  if (/\d/.test(password)) {
    score += 15;
  } else {
    suggestions.push("Add numbers.");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 20;
  } else {
    suggestions.push("Add special characters.");
  }

  if (/(.)\1{2,}/.test(password)) {
    score -= 10;
    suggestions.push("Avoid repeated characters.");
  }

  if (/^(123456|password|qwerty|admin)/i.test(password)) {
    score -= 25;
    suggestions.push("Avoid common passwords.");
  }

  score = Math.max(0, Math.min(score, 100));

  let level: PasswordLevel = "very-weak";

  if (score >= 85) {
    level = "very-strong";
  } else if (score >= 70) {
    level = "strong";
  } else if (score >= 50) {
    level = "medium";
  } else if (score >= 30) {
    level = "weak";
  }

  return {
    score,
    level,
    suggestions,
  };
}