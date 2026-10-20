import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 * Drop-in for `clsx` + `tailwind-merge` combined.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
