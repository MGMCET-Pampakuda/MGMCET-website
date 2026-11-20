import React from "react";
import type { Metadata } from "next";
import { CheckCircle2, Award, Mail } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { IqacCommitteeTable } from "@/components/sections/IqacCommitteeTable";
import { academics, academicsNavItems } from "@/content/academics";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Internal Quality Assurance Cell (IQAC) | MGMCET",
  description:
    "Details of the Internal Quality Assurance Cell (IQAC) at MGMCET, focusing on NAAC directives, academic audits, accreditation, and institutional excellence.",
  path: "/academics/iqac",
});

export default function IqacPage() {
  const content = academics.iqac;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/iqac",
  }));

  const objectives = content.objectives || [
    "To develop a quality system for conscious, consistent and catalytic programmed action to improve the academic and administrative performance.",
    "To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.",
  ];

  const functionsList = content.functions || [];

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
      sideNavTitle="Academics & Governance"
      sideNavItems={sideNavItems}
    >
      {/* 1. NAAC Institutional Mandate & Core Objectives */}
      <section className="space-y-6">
        <div className="p-6 sm:p-7 rounded-2xl bg-brand-50/70 border border-brand-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-brand-200/40 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900 mb-2">
            <Award className="w-4 h-4 text-accent-600 shrink-0" />
            <span>NAAC Directives & Quality Mandate</span>
          </div>

          <p className="text-ink-800 text-body leading-relaxed font-normal">
            In conformation with the NAAC directives to maintain momentum of quality consciousness
            in Higher Education Institutions, MGM College of Engineering &amp; Technology has
            constituted an Internal Quality Assurance Cell (IQAC). The IQAC channelizes and
            systematizes the efforts and measures of the Institution towards academic excellence
            with the following core objectives:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-brand-200/70">
            {objectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-brand-200/60 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-900 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-800" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800 block mb-1">
                    Objective {i + 1}
                  </span>
                  <p className="text-body-sm text-ink-700 leading-snug">{obj}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Committee Members (Real-Time Reactive Table) */}
      <section className="pt-6 border-t border-border">
        <IqacCommitteeTable />
      </section>

      {/* 3. Functions of the IQAC Wing */}
      {functionsList.length > 0 && (
        <section className="pt-8 border-t border-border space-y-5">
          <div>
            <h3 className="font-heading font-bold text-h4 text-ink-900">
              Functions of the IQAC Wing
            </h3>
            <p className="text-body-sm text-ink-600 mt-1">
              Key operational mandates and continuous improvement protocols implemented at MGM
              College of Engineering &amp; Technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {functionsList.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface border border-border/80 shadow-xs flex items-start gap-3 hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <span className="w-7 h-7 rounded-lg bg-canvas text-brand-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-body-sm text-ink-700 leading-relaxed font-normal pt-0.5">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Quality Coordination & Contact Callout */}
      <section className="pt-6 border-t border-border">
        <div className="p-5 rounded-xl bg-canvas border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-ink-900 text-body">
              IQAC Documentation &amp; AQAR Reports
            </h4>
            <p className="text-body-sm text-ink-600">
              For annual reports, stakeholder feedback surveys, or accreditation queries, contact
              the IQAC cell.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:iqac@mgmcet.ac.in"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-900 text-white font-medium text-xs hover:bg-brand-950 transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>iqac@mgmcet.ac.in</span>
            </a>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
