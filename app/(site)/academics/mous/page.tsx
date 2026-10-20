import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industry MoUs & Collaborations | MGMCET",
  description:
    "Institutional partnerships, Memoranda of Understanding (MoUs), and industrial collaboration initiatives at MGMCET Pampakuda.",
  path: "/academics/mous",
});

export default function MousPage() {
  const content = academics.mous;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/mous",
  }));

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: content.title, href: "/academics/mous" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Industry-Academia Linkages
        </h2>
        <div className="text-ink-700 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      </section>

      {content.focusAreas && content.focusAreas.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            Benefits to Students &amp; Faculty
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-canvas border border-border space-y-1.5"
              >
                <h4 className="font-heading font-bold text-ink-900 text-body">
                  {area.title}
                </h4>
                <p className="text-body-sm text-ink-600">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </ContentPage>
  );
}

