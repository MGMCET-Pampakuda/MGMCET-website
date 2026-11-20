import { IMAGEKIT_URL_ENDPOINT } from "./imagekit";

export interface MediaTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "maintain_ratio" | "force" | "at_least" | "at_max";
  blur?: number;
}

/**
 * Generates an ImageKit optimized URL with optional query transformations.
 * If the input is already a full remote URL, it is returned untouched.
 */
export function getImageKitUrl(
  imagePath: string,
  transformations?: MediaTransformOptions
): string {
  if (!imagePath) return "";

  // If already full external URL (e.g., https://...)
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    if (!imagePath.includes("ik.imagekit.io") || !transformations) {
      return imagePath;
    }
  }

  // Normalize path without double slashes
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const baseUrl = `${IMAGEKIT_URL_ENDPOINT.replace(/\/$/, "")}/${cleanPath}`;

  if (!transformations) {
    return baseUrl;
  }

  const transformParams: string[] = [];

  if (transformations.width) transformParams.push(`w-${transformations.width}`);
  if (transformations.height) transformParams.push(`h-${transformations.height}`);
  if (transformations.quality) transformParams.push(`q-${transformations.quality}`);
  if (transformations.format) transformParams.push(`f-${transformations.format}`);
  if (transformations.blur) transformParams.push(`bl-${transformations.blur}`);
  if (transformations.crop) transformParams.push(`c-${transformations.crop}`);

  if (transformParams.length === 0) {
    return baseUrl;
  }

  const trQuery = `tr=${transformParams.join(",")}`;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${trQuery}`;
}

/**
 * Universal media URL resolver.
 * Handles both local paths and ImageKit paths cleanly.
 */
export function resolveMediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return path;
}
