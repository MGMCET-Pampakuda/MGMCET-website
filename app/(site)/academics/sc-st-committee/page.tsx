import React from "react";
import type { Metadata } from "next";
import { DocumentsPage } from "@/components/templates/DocumentsPage";
import { downloads } from "@/content/downloads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "SC-ST Committee & Policies | MGMCET",
  description:
    "SC/ST Committee constitution, welfare policies, grievance redressal, and statutory documentation at MGMCET Pampakuda.",
  path: "/academics/sc-st-committee",
});

export default function ScStCommitteePage() {
  const committeeDocs = downloads.filter(
    (d) => d.id === "sc-st-committee" || d.title.toLowerCase().includes("sc-st")
  );

  return (
    <DocumentsPage
      title="SC-ST Committee &amp; Welfare Cell"
      description="Constitutional and statutory framework ensuring equal opportunity, welfare support, scholarship facilitation, and prevention of discrimination for SC/ST students and staff."
      documents={committeeDocs.length > 0 ? committeeDocs : downloads}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "SC-ST Committee", href: "/academics/sc-st-committee" },
      ]}
      badge="Statutory Welfare Committee"
    />
  );
}
