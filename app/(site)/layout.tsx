import React from "react";
import { Header, Footer, BackToTop } from "@/components/layout";
import { JsonLd } from "@/components/shared";
import { site } from "@/content/site";
import { BASE_URL } from "@/lib/constants";

/**
 * Site layout wrapping all public pages with sticky header,
 * main landmark, comprehensive institutional footer, and back-to-top button.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const collegeSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: site.name,
    alternateName: site.shortName,
    url: BASE_URL,
    logo: `${BASE_URL}/images/brand/logo.svg`,
    description: site.taglines[1] || site.affiliationText,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: site.contact.district,
      addressRegion: site.contact.state,
      postalCode: site.contact.pincode,
      addressCountry: "IN",
    },
    telephone: site.contact.phones[0],
    email: site.contact.email,
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return (
    <>
      <JsonLd data={collegeSchema} />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
