/** Digits only, normalized to 7XXXXXXXXXX (max 11). */
export function normalizePhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.length > 0 && !digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
}

/** Formats as +7 (999) 123-45-67 while typing. */
export function formatPhoneMask(value: string): string {
  const digits = normalizePhoneDigits(value);
  if (!digits) return "";

  const local = digits.slice(1);
  let result = "+7";

  if (local.length === 0) return result;

  result += ` (${local.slice(0, 3)}`;
  if (local.length <= 3) return result;

  result += `) ${local.slice(3, 6)}`;
  if (local.length <= 6) return result;

  result += `-${local.slice(6, 8)}`;
  if (local.length <= 8) return result;

  return `${result}-${local.slice(8, 10)}`;
}

export function isCompletePhone(value: string): boolean {
  return normalizePhoneDigits(value).length === 11;
}
