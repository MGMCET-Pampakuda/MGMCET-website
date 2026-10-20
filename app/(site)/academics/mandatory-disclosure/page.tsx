import React from "react";
import type { Metadata } from "next";
import { DocumentsPage } from "@/components/templates/DocumentsPage";
import { downloads } from "@/content/downloads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AICTE Mandatory Disclosure | MGMCET",
  description:
    "Official AICTE Mandatory Disclosure details including governance, academic programmes, faculty list, infrastructure, and fee structure for MGMCET Pampakuda.",
  path: "/academics/mandatory-disclosure",
});

export default function MandatoryDisclosurePage() {
  const disclosureDocs = downloads.filter(
    (d) => d.id === "mandatory-disclosure" || d.title.toLowerCase().includes("disclosure")
  );

  return (
    <DocumentsPage
      title="AICTE Mandatory Disclosure"
      description="Mandatory public disclosure published in accordance with AICTE regulations, containing verified details of governance, faculty credentials, academic facilities, admissions, and audited financial statements."
      documents={disclosureDocs.length > 0 ? disclosureDocs : downloads}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "Mandatory Disclosure", href: "/academics/mandatory-disclosure" },
      ]}
      badge="Public Regulatory Filing"
    />
  );
}
