import type { Metadata } from "next";
import { Poppins, Inter, Caveat } from "next/font/google";
import "./globals.css";

/**
 * Heading font — Poppins (400, 600, 700)
 * Exposed as CSS var --font-poppins for use in @theme token --font-heading.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Body font — Inter variable
 * Exposed as CSS var --font-inter for use in @theme token --font-body.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Script/accent font — Caveat (used sparingly for overlay captions)
 * Exposed as CSS var --font-caveat for use in @theme token --font-script.
 */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

import { DEFAULT_KEYWORDS } from "@/lib/seo";
import { getCollegeJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

/** Root metadata — overridden per page via generateMetadata */
export const metadata: Metadata = {
  title: {
    default:
      "MGM College of Engineering and Technology (MGMCET) | Pampakuda, Ernakulam, Kerala | KTU Affiliated",
    template: "%s | MGM College of Engineering and Technology (MGMCET), Pampakuda",
  },
  description:
    "MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam, Kerala is an AICTE-approved, KTU-affiliated premier engineering institution offering B.Tech in CSE, AI & ML, Cyber Security, Mechanical, ECE; M.Tech; and Polytechnic Diploma courses. KEAM Code: MGE.",
  keywords: DEFAULT_KEYWORDS,
  metadataBase: new URL("https://mgmcet.ac.in"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "MGM College of Engineering and Technology (MGMCET)",
    locale: "en_IN",
    url: "https://mgmcet.ac.in",
    title:
      "MGM College of Engineering and Technology (MGMCET) | Pampakuda, Ernakulam, Kerala",
    description:
      "Premier KTU affiliated, AICTE approved engineering and polytechnic college in Ernakulam, Kerala. Admissions open for B.Tech, M.Tech, and Diploma programs.",
    images: [
      {
        url: "https://mgmcet.ac.in/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "MGM College of Engineering and Technology Campus, Pampakuda, Kerala",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MGM College of Engineering and Technology (MGMCET) | Pampakuda, Ernakulam, Kerala",
    description:
      "AICTE approved, KTU affiliated premier engineering and polytechnic college in Kerala. Admissions open 2025-26.",
    images: ["https://mgmcet.ac.in/images/brand/og-image.png"],
    site: "@mgmcet",
    creator: "@mgmcet",
  },
  robots: {
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
  alternates: {
    canonical: "https://mgmcet.ac.in",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const collegeSchema = getCollegeJsonLd();

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={collegeSchema} />
      </head>
      <body
        className="flex min-h-full flex-col bg-surface font-body text-ink-900"
        suppressHydrationWarning
      >
        {/* Skip to main content — WCAG 2.4.1 */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
