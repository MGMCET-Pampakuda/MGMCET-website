import React from "react";
import type { Metadata } from "next";
import { DocumentsPage } from "@/components/templates/DocumentsPage";
import { downloads } from "@/content/downloads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Downloads & Official Documents | AICTE Approvals, NIRF & Prospectus | MGMCET Pampakuda",
  description:
    "Download official regulatory filings, AICTE approval orders, NIRF reports, mandatory disclosures, and prospectus of MGM College of Engineering and Technology (MGMCET), Pampakuda.",
  path: "/downloads",
  keywords: [
    "MGMCET Downloads",
    "AICTE Approval Letter MGMCET",
    "NIRF Report MGMCET",
    "College Prospectus Kerala Engineering",
  ],
});

export default function DownloadsRoute() {
  return (
    <DocumentsPage
      title="Downloads &amp; Official Documents"
      description="Access official institutional filings, regulatory disclosures, college prospectus, application forms, and statutory committee reports."
      documents={downloads}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Downloads", href: "/downloads" },
      ]}
      badge="Student &amp; Public Resources"
    />
  );
}
