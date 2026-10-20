import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Anti-Ragging Policy & Committee | MGMCET",
  description:
    "Zero tolerance anti-ragging measures, committee regulations, and national emergency helplines at MGMCET Pampakuda.",
  path: "/academics/anti-ragging",
});

export default function AntiRaggingPage() {
  const content = academics.antiRagging;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/anti-ragging",
  }));

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "Anti-Ragging", href: "/academics/anti-ragging" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Strict Prohibition of Ragging
        </h2>
        <div className="text-ink-700 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      </section>

      {content.emergencyCallout && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            Emergency Contact &amp; Reporting Channels
          </h2>
          <div className="p-6 rounded-2xl bg-danger-50 border border-danger-200 space-y-3">
            <h4 className="font-heading font-bold text-danger-900 text-body">
              {content.emergencyCallout.title}
            </h4>
            <p className="text-body-sm text-danger-800 font-semibold">
              {content.emergencyCallout.contactLine}
            </p>
            <p className="text-xs text-danger-700 leading-relaxed">
              {content.emergencyCallout.details}
            </p>
          </div>
        </section>
      )}

      {content.blocks?.map((block, idx) => (
        <section key={idx} className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            {block.title}
          </h2>
          {block.body && (
            <p className="text-ink-700 leading-relaxed">{block.body}</p>
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

