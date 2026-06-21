export function maskEmail(
  email: string,
): string {
  const [name, domain] =
    email.split("@");

  if (!name || !domain) {
    return email;
  }

  if (name.length === 1) {
    return `*@${domain}`;
  }

  if (name.length === 2) {
    return `${name[0]}*@${domain}`;
  }

  return (
    name[0] +
    "*".repeat(
      Math.max(3, name.length - 2),
    ) +
    name[name.length - 1] +
    "@" +
    domain
  );
}

export function maskEmailDomain(
  email: string,
): string {
  const [name, domain] =
    email.split("@");

  if (!name || !domain) {
    return email;
  }

  const domainParts =
    domain.split(".");

  const host =
    domainParts[0];

  const ext =
    domainParts.slice(1).join(".");

  return `${name[0]}***@${
    host[0]
  }***.${ext}`;
}