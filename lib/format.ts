/**
 * Utility functions for formatting data.
 * All functions are pure and framework-agnostic.
 */

/**
 * Format an ISO date string to a human-readable date.
 * @example formatDate("2026-09-22") → "22 September 2026"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a phone number for display.
 * @example formatPhone("9946485111") → "+91 9946 485 111"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

/**
 * Format phone number as a tel: href value.
 * @example toTelHref("9946485111") → "tel:+919946485111"
 */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+91${digits}`;
}

/**
 * Slugify a string to kebab-case.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
