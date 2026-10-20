import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { about } from "@/content/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us | MGM College of Engineering and Technology",
  description:
    "Learn about MGMCET, established in 1994 in Pampakuda, Ernakulam. Discover our history, vision, mission, and academic leadership.",
  path: "/about",
});

const SIDE_NAV_ITEMS = [
  { label: "About MGMCET", href: "/about", active: true },
  { label: "Academics", href: "/academics" },
  { label: "IQAC", href: "/academics/iqac" },
  { label: "NIRF", href: "/academics/nirf" },
  { label: "Anti-Ragging", href: "/academics/anti-ragging" },
  { label: "Placements", href: "/placements" },
  { label: "Faculty", href: "/faculty" },
  { label: "Contact Us", href: "/contact" },
];

export default function AboutPage() {
  return (
    <ContentPage
      title={about.hero.title}
      description={about.intro.title}
      badge="About MGMCET"
      breadcrumbItems={about.hero.breadcrumb}
      heroImage={about.hero.image}
      sideNavTitle="Institutional Info"
      sideNavItems={SIDE_NAV_ITEMS}
    >
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          {about.intro.title}
        </h2>
        <p className="leading-relaxed text-ink-700">
          {about.intro.body}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-xl bg-brand-50/60 border border-brand-100 space-y-3">
          <h3 className="font-heading font-bold text-h4 text-brand-900">
            {about.vision.title}
          </h3>
          <p className="text-body-sm text-ink-700 leading-relaxed">
            {about.vision.text}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-accent-50/60 border border-accent-200/60 space-y-3">
          <h3 className="font-heading font-bold text-h4 text-brand-900">
            {about.mission.title}
          </h3>
          <p className="text-body-sm text-ink-700 leading-relaxed">
            {about.mission.text}
          </p>
        </div>
      </div>

      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Message from Leadership
        </h2>
        <blockquote className="p-6 rounded-xl bg-canvas border-l-4 border-accent-500 italic text-ink-700 text-body">
          &ldquo;{about.director.quote}&rdquo;
          <footer className="mt-3 text-body-sm not-italic font-semibold text-ink-900">
            — {about.director.name}, {about.director.designation}
          </footer>
        </blockquote>
      </section>

      <section className="space-y-6 pt-4 border-t border-border">
        <h2 className="font-heading font-bold text-h3 text-ink-900">
          Our Heritage &amp; Milestone Timeline
        </h2>
        <div className="space-y-4">
          {about.timeline.map((event, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <span className="px-3 py-1 rounded-full bg-brand-900 text-white font-heading font-bold text-xs shrink-0 mt-0.5">
                {event.year}
              </span>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-ink-900 text-body">
                  {event.title}
                </h4>
                <p className="text-body-sm text-ink-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
