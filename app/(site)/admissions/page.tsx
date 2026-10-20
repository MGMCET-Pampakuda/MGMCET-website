import React from "react";
import type { Metadata } from "next";
import { AdmissionsPage } from "@/components/templates/AdmissionsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admissions 2026 | MGM College of Engineering and Technology",
  description:
    "Admissions open for B.Tech, M.Tech, and Polytechnic Diploma programs at MGMCET Pampakuda. Explore eligibility criteria, KEAM quota, and scholarships.",
  path: "/admissions",
});

export default function AdmissionsRoute() {
  return (
    <AdmissionsPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Admissions", href: "/admissions" },
      ]}
    />
  );
}
