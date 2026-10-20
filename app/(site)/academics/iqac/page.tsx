import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Internal Quality Assurance Cell (IQAC) | MGMCET",
  description:
    "Details of the Internal Quality Assurance Cell (IQAC) at MGMCET, focusing on academic audits, accreditation, and institutional excellence.",
  path: "/academics/iqac",
});

export default function IqacPage() {
  const content = academics.iqac;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/iqac",
  }));

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "IQAC", href: "/academics/iqac" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Objectives of IQAC
        </h2>
        <div className="text-ink-700 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      </section>

      {content.blocks?.map((block, idx) => (
        <section key={idx} className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            {block.title}
          </h2>
          {block.body && (
            <p className="text-ink-700 text-body-sm leading-relaxed">
              {block.body}
            </p>
          )}
          {block.items && (
            <ul className="list-disc pl-6 space-y-2 text-ink-700">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </ContentPage>
  );
}

