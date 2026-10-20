import React from "react";
import type { Metadata } from "next";
import { DocumentsPage } from "@/components/templates/DocumentsPage";
import { downloads } from "@/content/downloads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AICTE Approvals & Extension of Approval | MGMCET",
  description:
    "Official AICTE approval letters, Extension of Approval (EoA) documents, and affiliation orders for MGMCET Pampakuda.",
  path: "/academics/aicte-approval",
});

export default function AicteApprovalPage() {
  const approvalDocs = downloads.filter(
    (d) => d.id === "aicte-approval" || d.title.toLowerCase().includes("aicte")
  );

  return (
    <DocumentsPage
      title="AICTE Approval Letters &amp; Extension Orders"
      description="Annual Extension of Approval (EoA) documents granted by the All India Council for Technical Education (AICTE), New Delhi, for UG, PG, and Diploma programs."
      documents={approvalDocs.length > 0 ? approvalDocs : downloads}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "AICTE Approval", href: "/academics/aicte-approval" },
      ]}
      badge="All India Council for Technical Education"
    />
  );
}
