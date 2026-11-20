import React from "react";
import type { Metadata } from "next";
import { Handshake, Mail, Award, Briefcase, GraduationCap, Laptop } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { MousPartnerSection } from "@/components/sections/MousPartnerSection";
import { academics, academicsNavItems } from "@/content/academics";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industry MoUs & Corporate Collaborations | MGMCET",
  description:
    "Institutional partnerships, Memoranda of Understanding (MoUs), and industrial collaboration initiatives at MGM College of Engineering and Technology.",
  path: "/academics/mous",
});

export default function MousPage() {
  const content = academics.mous;
  const sideNavItems = academicsNavItems.map((item) => ({
    ...item,
    active: item.href === "/academics/mous",
  }));

  const benefitPillars = [
    {
      icon: Briefcase,
      title: "Internships & Live Projects",
      description: "Direct industry exposure through semester internships, technical assignments, and real client projects.",
    },
    {
      icon: Laptop,
      title: "Hands-on Technical Training",
      description: "Certification workshops in advanced CAD, MEP design, robotics, and cyber security conducted by corporate experts.",
    },
    {
      icon: GraduationCap,
      title: "Curriculum Alignment",
      description: "Continuous inputs from industry leaders ensuring curriculum relevancy and emerging technology adoption.",
    },
    {
      icon: Award,
      title: "Placement Facilitation",
      description: "Preferred recruitment pipelines and pool drives exclusively for MGMCET undergraduate and polytechnic graduates.",
    },
  ];

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "MoUs", href: "/academics/mous" },
      ]}
      badge={content.badge}
      sideNavTitle="Academics & Governance"
      sideNavItems={sideNavItems}
    >
      {/* 1. Intro Callout Banner */}
      <section className="space-y-6">
        <div className="p-6 sm:p-7 rounded-2xl bg-brand-50/70 border border-brand-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-brand-200/40 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900 mb-2">
            <Handshake className="w-4 h-4 text-accent-600 shrink-0" />
            <span>Industry-Academia Interface</span>
          </div>

          <p className="text-ink-800 text-body leading-relaxed font-normal">
            MGMCET has entered into formal Memorandums of Understanding (MoUs) with leading
            corporates, research institutions, and technology providers. These strategic linkages
            bridge academic theory and practical industrial application, empowering students with
            hands-on industry skill sets, live project exposure, and high-value career pathways.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 pt-4 border-t border-brand-200/70">
            {benefitPillars.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-brand-200/60 shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-brand-800" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-brand-900 leading-snug">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-ink-600 mt-0.5 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Dynamic MoUs Partners Section (Subscribes to Firestore) */}
      <section className="pt-6 border-t border-border">
        <MousPartnerSection />
      </section>

      {/* 3. Corporate Collaboration Callout */}
      <section className="pt-6 border-t border-border">
        <div className="p-5 rounded-2xl bg-canvas border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-ink-900 text-body">
              Partner with MGMCET
            </h4>
            <p className="text-body-sm text-ink-600">
              Corporates and organizations interested in establishing academic MoUs, research
              linkages, or campus recruitments are invited to connect with our Corporate Relations Cell.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:placements@mgmcet.ac.in"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-900 text-white font-medium text-xs hover:bg-brand-950 transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>placements@mgmcet.ac.in</span>
            </a>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
