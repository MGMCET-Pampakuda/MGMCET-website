import React from "react";
import type { Metadata } from "next";
import { AdmissionsPage } from "@/components/templates/AdmissionsPage";
import { buildMetadata } from "@/lib/seo";
import { getAdmissionsFaqJsonLd, getBreadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Admissions 2025-2026 | B.Tech, M.Tech & Polytechnic | MGMCET Pampakuda",
  description:
    "Admissions open for B.Tech, M.Tech, and Polytechnic Diploma programs at MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam. KEAM Code: MGE. Explore eligibility, KTU curriculum, merit scholarships, and direct admission.",
  path: "/admissions",
  keywords: [
    "MGMCET Admissions 2025",
    "B.Tech Admissions Kerala 2025",
    "KEAM College Code MGE",
    "KTU Engineering College Admission Ernakulam",
    "Polytechnic Admission Pampakuda",
    "Direct Engineering Admission Kerala",
    "Mammootty Vidyamrutham Scholarship",
  ],
});

export default function AdmissionsRoute() {
  const faqSchema = getAdmissionsFaqJsonLd();
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Admissions", path: "/admissions" },
  ]);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AdmissionsPage
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
        ]}
      />
    </>
  );
}
