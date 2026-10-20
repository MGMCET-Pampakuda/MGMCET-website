import React from "react";
import type { Metadata } from "next";
import { DocumentsPage } from "@/components/templates/DocumentsPage";
import { downloads } from "@/content/downloads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Downloads & Documents | MGM College of Engineering and Technology",
  description:
    "Access mandatory disclosures, NIRF reports, AICTE approvals, college prospectus, and academic documents from MGMCET.",
  path: "/downloads",
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
