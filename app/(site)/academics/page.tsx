import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { SmartLink } from "@/components/ui/Link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Academics Overview | MGM College of Engineering and Technology",
  description:
    "Explore academic programs, curriculum frameworks, university affiliation, and quality assurance mechanisms at MGMCET Pampakuda.",
  path: "/academics",
});

export default function AcademicsOverviewPage() {
  const content = academics.overview;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics",
  }));

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          {content.introTitle}
        </h2>
        <p className="leading-relaxed text-ink-700">
          {content.introBody}
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {content.programCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border space-y-2 ${
              idx === 0
                ? "bg-brand-50 border-brand-100"
                : idx === 1
                ? "bg-accent-50 border-accent-200/60"
                : "bg-canvas border-border"
            }`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                idx === 2 ? "text-ink-700" : "text-brand-800"
              }`}
            >
              {card.badge}
            </span>
            <h3
              className={`font-heading font-bold text-h4 ${
                idx === 2 ? "text-ink-900" : "text-brand-900"
              }`}
            >
              {card.title}
            </h3>
            <p className="text-xs text-ink-600">{card.description}</p>
            <SmartLink
              href={card.href}
              className="inline-block text-xs font-semibold text-brand-700 hover:underline pt-1"
            >
              {card.linkLabel}
            </SmartLink>
          </div>
        ))}
      </div>

      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          {content.obeTitle}
        </h2>
        <p className="text-ink-700 leading-relaxed">
          {content.obeBody}
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          {content.governanceTitle}
        </h2>
        <p className="text-ink-700 leading-relaxed">
          {content.governanceBody}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-ink-700">
          {content.statutoryCells.map((cell, idx) => (
            <li key={idx}>
              <strong>{cell.name}:</strong> {cell.description}
            </li>
          ))}
        </ul>
      </section>
    </ContentPage>
  );
}

