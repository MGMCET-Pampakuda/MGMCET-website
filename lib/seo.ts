import type { Metadata } from "next";
import { BASE_URL } from "./constants";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent page metadata from a content-driven options object.
 * Used by generateMetadata() in each page.
 */
export function buildMetadata(options: SeoOptions): Metadata {
  const { title, description, path, image, noIndex } = options;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || "/images/brand/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: `${BASE_URL}${ogImage}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}${ogImage}`],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
