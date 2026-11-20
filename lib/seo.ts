import type { Metadata } from "next";
import { BASE_URL } from "./constants";

export const DEFAULT_KEYWORDS = [
  "MGM College of Engineering and Technology",
  "MGMCET Pampakuda",
  "MGMCET",
  "MGM Engineering College Pampakuda",
  "Engineering Colleges in Kerala",
  "Top Engineering Colleges in Ernakulam",
  "Best Engineering Colleges in Kochi",
  "KTU Affiliated Engineering Colleges Kerala",
  "APJ Abdul Kalam Technological University",
  "AICTE Approved Engineering Colleges in Kerala",
  "BTech Colleges in Kerala",
  "BTech Admissions Kerala 2025-2026",
  "KEAM College Code MGE",
  "MGM Polytechnic College Pampakuda",
  "Polytechnic Colleges in Ernakulam",
  "Polytechnic Diploma Colleges Kerala",
  "DTE Kerala Polytechnic Admission",
  "MTech Colleges in Kerala",
  "Computer Science and Engineering KTU",
  "Artificial Intelligence and Machine Learning Kerala",
  "Cyber Security Engineering College",
  "Mechanical Engineering College Ernakulam",
  "Electronics and Communication Engineering KTU",
  "Electrical and Electronics Engineering",
  "Muvattupuzha Engineering College",
  "Piravom Engineering College",
  "MGM Group of Institutions",
  "Campus Placements MGMCET",
];

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent page metadata from a content-driven options object.
 * Used by generateMetadata() across all pages for 100% SEO optimization.
 */
export function buildMetadata(options: SeoOptions): Metadata {
  const {
    title,
    description,
    path,
    image,
    imageAlt = "MGM College of Engineering and Technology (MGMCET), Pampakuda, Kerala",
    keywords = [],
    type = "website",
    publishedTime,
    noIndex,
  } = options;

  const url = `${BASE_URL}${path}`;
  const ogImage = image
    ? (image.startsWith("http") ? image : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`)
    : `${BASE_URL}/images/brand/og-image.png`;

  const allKeywords = Array.from(new Set([...keywords, ...DEFAULT_KEYWORDS]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "MGM College of Engineering and Technology (MGMCET)",
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@mgmcet",
      site: "@mgmcet",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
