import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { academics, academicsNavItems } from "@/content/academics";
import { SmartLink } from "@/components/ui/Link";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title:
    "Academics & Quality Assurance | KTU Affiliated Degrees & AICTE Approved Programs | MGMCET",
  description:
    "Discover academic excellence, university curriculum, outcome-based engineering education, and research at MGM College of Engineering and Technology (MGMCET), Pampakuda, affiliated to APJ Abdul Kalam Technological University (KTU).",
  path: "/academics",
  keywords: [
    "MGMCET Academics",
    "KTU Curriculum Engineering",
    "Outcome Based Education Kerala",
    "Engineering Syllabus KTU",
    "Quality Technical Education Kerala",
  ],
});

export default function AcademicsOverviewPage() {
  const content = academics.overview;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics",
  }));

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <PageHero
        title={content.title}
        description={content.description}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
        ]}
        badge={content.badge}
      />

      {/* ── TOP SECTION: Academics Overview & Governance Links ────────────── */}
      <Section tone="canvas" spacing="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Intro & Program Cards */}
            <article className="lg:col-span-8 rounded-2xl bg-surface border border-border p-6 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-3">
                <span className="font-heading text-xs uppercase tracking-widest text-accent-600 font-bold">
                  Academic Framework
                </span>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  {content.introTitle}
                </h2>
                <p className="leading-relaxed text-ink-700 text-body">
                  {content.introBody}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/60">
                {content.programCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border space-y-2 flex flex-col justify-between ${
                      idx === 0
                        ? "bg-brand-50/70 border-brand-200"
                        : idx === 1
                        ? "bg-accent-50/70 border-accent-200"
                        : "bg-surface border-border shadow-xs"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          idx === 2 ? "text-ink-700" : "text-brand-800"
                        }`}
                      >
                        {card.badge}
                      </span>
                      <h3
                        className={`font-heading font-bold text-body ${
                          idx === 2 ? "text-ink-900" : "text-brand-900"
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-xs text-ink-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <SmartLink
                      href={card.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 pt-2"
                    >
                      <span>{card.linkLabel}</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </SmartLink>
                  </div>
                ))}
              </div>
            </article>

            {/* Right: Academics & Governance Navigation */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-4">
                <h2 className="font-heading font-bold text-h4 text-ink-900 border-b border-border pb-3">
                  Academics &amp; Governance
                </h2>
                <nav aria-label="Academics &amp; Governance">
                  <ul className="space-y-1">
                    {sideNavItems.map((item) => (
                      <li key={item.href}>
                        <SmartLink
                          href={item.href}
                          isExternal={item.href.startsWith("http")}
                          className={cn(
                            "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-body-sm font-medium transition-colors",
                            item.active
                              ? "bg-brand-50 text-brand-900 font-semibold border-l-4 border-brand-700"
                              : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
                          )}
                        >
                          <span>{item.label}</span>
                          <span
                            className={cn(
                              "text-xs",
                              item.active ? "text-brand-700" : "text-ink-400"
                            )}
                            aria-hidden="true"
                          >
                            &rarr;
                          </span>
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── SECTION 2: Outcome-Based Education (Full Width) ──────────────── */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            <SectionHeader
              eyebrow="Pedagogical Philosophy"
              title={content.obeTitle}
              description="A learner-centric model ensuring graduates achieve measurable competencies and professional readiness."
            />
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-50/50 border border-brand-100 shadow-xs">
              <p className="text-body text-ink-800 leading-relaxed">
                {content.obeBody}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── SECTION 3: Statutory Governance & Oversight Cells (Full Width) ── */}
      <Section tone="canvas" spacing="default">
        <Container>
          <SectionHeader
            eyebrow="Compliance & Safety"
            title={content.governanceTitle}
            description={content.governanceBody}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.statutoryCells.map((cell, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-surface border border-border p-6 shadow-xs hover:shadow-card transition-shadow space-y-3 flex flex-col"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-brand-50 text-brand-700 shrink-0">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading font-bold text-ink-900 text-body">
                    {cell.name}
                  </h3>
                </div>
                <p className="text-body-sm text-ink-600 leading-relaxed flex-1">
                  {cell.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

