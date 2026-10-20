import React from "react";
import type { Metadata } from "next";
import { DocumentsPage } from "@/components/templates/DocumentsPage";
import { downloads } from "@/content/downloads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NIRF Data & Reports | MGM College of Engineering and Technology",
  description:
    "National Institutional Ranking Framework (NIRF) data and submission reports for MGMCET Pampakuda.",
  path: "/academics/nirf",
});

export default function NirfPage() {
  const nirfDocs = downloads.filter(
    (d) => d.id === "nirf-report" || d.title.toLowerCase().includes("nirf")
  );

  return (
    <DocumentsPage
      title="National Institutional Ranking Framework (NIRF)"
      description="Official institutional data submitted to the Ministry of Education, Government of India, under the National Institutional Ranking Framework (NIRF)."
      documents={nirfDocs.length > 0 ? nirfDocs : downloads}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "NIRF", href: "/academics/nirf" },
      ]}
      badge="Ministry of Education • NIRF"
    />
  );
}
