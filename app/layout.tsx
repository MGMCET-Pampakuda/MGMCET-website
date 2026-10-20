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

/** Root metadata — overridden per page via generateMetadata */
export const metadata: Metadata = {
  title: {
    default: "MGM College of Engineering and Technology — MGMCET, Pampakuda, Kerala",
    template: "%s | MGMCET",
  },
  description:
    "AICTE Approved, KTU Affiliated engineering college in Pampakuda, Ernakulam, Kerala. Offering B.Tech, M.Tech and Polytechnic programmes in AI/ML, CSE, ECE, Mechanical and more.",
  metadataBase: new URL("https://www.mgmcet.ac.in"),
  openGraph: {
    type: "website",
    siteName: "MGM College of Engineering and Technology",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-body text-ink-900">
        {/* Skip to main content — WCAG 2.4.1 */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
