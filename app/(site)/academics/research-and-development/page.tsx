import React from "react";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { SmartLink } from "@/components/ui/Link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Research and Development (R&D) | MGMCET",
  description:
    "Explore applied research, innovation ecosystem, patent filings, and technical project collaborations at MGMCET Pampakuda.",
  path: "/academics/research-and-development",
});

export default function ResearchAndDevelopmentPage() {
  const content = academics.researchAndDevelopment;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/research-and-development",
  }));

  const iedcLink = content.relatedLinks?.[0];

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: content.title, href: "/academics/research-and-development" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Research Vision &amp; Ecosystem
        </h2>
        <div className="text-ink-700 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      </section>

      {content.focusAreas && content.focusAreas.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            Key Focus Areas
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

      {iedcLink && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            Innovation &amp; Entrepreneurship Development Centre (IEDC)
          </h2>
          <p className="text-ink-700 leading-relaxed">
            In partnership with Kerala Startup Mission (KSUM), the IEDC at MGMCET provides incubation support, prototype grants, and patent facilitation to transform student ideas into viable commercial startups.
          </p>
          <div className="pt-2">
            <SmartLink
              href={iedcLink.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm transition-colors"
            >
              <span>{iedcLink.label}</span>
              <ExternalLink className="h-4 w-4" />
            </SmartLink>
          </div>
        </section>
      )}
    </ContentPage>
  );
}

