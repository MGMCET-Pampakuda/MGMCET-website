import React from "react";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { academics, academicsNavItems } from "@/content/academics";
import { SmartLink } from "@/components/ui/Link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AICTE Feedback Facility | MGMCET",
  description:
    "AICTE online feedback facility for students and faculty of MGM College of Engineering and Technology, Pampakuda.",
  path: "/academics/aicte-feedback",
});

export default function AicteFeedbackPage() {
  const content = academics.aicteFeedback;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/aicte-feedback",
  }));

  const portalLink = content.relatedLinks?.[0];

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: content.title, href: "/academics/aicte-feedback" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics &amp; Governance"
      sideNavItems={sideNavItems}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          About the Online Feedback Facility
        </h2>
        <div className="text-ink-700 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      </section>

      {portalLink && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            Access the Official AICTE Portal
          </h2>
          <p className="text-ink-700 leading-relaxed">
            Stakeholders can register their feedback or check grievance resolution status using their registered student/faculty IDs directly on the Central AICTE Portal:
          </p>
          <div className="pt-2">
            <SmartLink
              href={portalLink.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-body-sm transition-colors"
            >
              <span>{portalLink.label}</span>
              <ExternalLink className="h-4 w-4" />
            </SmartLink>
          </div>
        </section>
      )}

      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Internal College Grievance Mechanisms
        </h2>
        <p className="text-ink-700 text-body-sm leading-relaxed">
          In addition to the central AICTE portal, MGMCET maintains an active internal Grievance Redressal Cell and Anti-Ragging Committee on campus for immediate resolution of student concerns.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <SmartLink
            href="/academics/grievance-cell"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-brand-50 text-brand-900 hover:bg-brand-100 transition-colors"
          >
            Visit Grievance Cell &rarr;
          </SmartLink>
          <SmartLink
            href="/academics/anti-ragging"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-brand-50 text-brand-900 hover:bg-brand-100 transition-colors"
          >
            Anti-Ragging Committee &rarr;
          </SmartLink>
        </div>
      </section>
    </ContentPage>
  );
}

