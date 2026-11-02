/**
 * Indian mobile numbers: 10 digits starting 6–9, optionally prefixed with +91, 91 or 0
 * and written with spaces or dashes. Returns the bare 10-digit number, or null if invalid.
 */
export function normaliseIndianMobile(raw: string) {
  if (/[^\d\s+\-()]/.test(raw)) return null;
  const digits = raw.replace(/\D/g, "");
  const local =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  // Placeholder-style junk such as 9999999999.
  if (/^(\d)\1{9}$/.test(local)) return null;
  return local;
}

/** Error message for a phone value, or undefined when it is empty or valid. */
export function phoneError(raw: string) {
  const value = raw.trim();
  if (!value || normaliseIndianMobile(value)) return undefined;
  return "Enter a valid 10-digit Indian mobile number.";
}
