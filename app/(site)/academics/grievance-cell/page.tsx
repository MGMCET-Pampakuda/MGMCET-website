import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { SmartLink } from "@/components/ui/Link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Grievance Redressal Cell | MGMCET",
  description:
    "Student Grievance Redressal Cell procedures, online complaint registration, and redressal mechanisms at MGMCET Pampakuda.",
  path: "/academics/grievance-cell",
});

export default function GrievanceCellPage() {
  const content = academics.grievanceCell;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/grievance-cell",
  }));

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: content.title, href: "/academics/grievance-cell" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Principles of Grievance Redressal
        </h2>
        <div className="text-ink-700 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      </section>

      {content.procedures && content.procedures.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            Redressal Procedure &amp; Timelines
          </h2>
          <div className="space-y-3">
            {content.procedures.map((proc) => (
              <div
                key={proc.step}
                className="p-4 rounded-xl bg-canvas border border-border flex gap-3 items-start"
              >
                <span className="h-7 w-7 rounded-full bg-brand-900 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {proc.step}
                </span>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-ink-900 text-body">
                    {proc.title}
                  </h4>
                  <p className="text-body-sm text-ink-600">
                    {proc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Online Contact / Inquiries
        </h2>
        <p className="text-ink-700 leading-relaxed">
          For urgent administrative inquiries or assistance regarding grievances, contact the College Administration at:
        </p>
        <div className="pt-1">
          <SmartLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-xs transition-colors"
          >
            <span>Contact College Administration &rarr;</span>
          </SmartLink>
        </div>
      </section>
    </ContentPage>
  );
}

