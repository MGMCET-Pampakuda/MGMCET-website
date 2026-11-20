import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SmartLink } from "@/components/ui/Link";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { about } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title:
    "About MGMCET | History, Leadership & Vision | MGM College of Engineering and Technology, Pampakuda",
  description:
    "Learn about MGM College of Engineering and Technology (MGMCET), established under the MGM Group of Institutions in Pampakuda, Ernakulam, Kerala. Discover our 30+ year academic heritage, AICTE approval, KTU affiliation, and leadership.",
  path: "/about",
  keywords: [
    "About MGMCET",
    "MGM College of Engineering and Technology History",
    "MGM Group of Institutions Kerala",
    "Engineering College Pampakuda Ernakulam",
    "KTU Affiliated College Kerala",
  ],
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
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <PageHero
        title={about.hero.title}
        description={about.intro.title}
        badge="About MGMCET"
        breadcrumbItems={about.hero.breadcrumb}
        image={about.hero.image}
      />

      {/* ── TOP SECTION: Institutional Overview + Side Nav ──────────────── */}
      <Section tone="canvas" spacing="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Empowering Minds Intro + Vision & Mission */}
            <article className="lg:col-span-8 rounded-2xl bg-surface border border-border p-6 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-3">
                <span className="font-heading text-xs uppercase tracking-widest text-accent-600 font-bold">
                  Our Foundation
                </span>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  {about.intro.title}
                </h2>
                <p className="leading-relaxed text-ink-700 text-body">
                  {about.intro.body}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/60">
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
            </article>

            {/* Right: Institutional Info Quick Nav */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-4">
                <h2 className="font-heading font-bold text-h4 text-ink-900 border-b border-border pb-3">
                  Institutional Info
                </h2>
                <nav aria-label="Institutional Info">
                  <ul className="space-y-1">
                    {SIDE_NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <SmartLink
                          href={item.href}
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

      {/* ── SECTION 2: Guiding Visionaries (Full Width) ──────────────────── */}
      <Section tone="white" spacing="default">
        <Container>
          <SectionHeader
            eyebrow="Leadership"
            title="Guiding Visionaries"
            description="At MGM College of Engineering & Technology, our growth and success are guided by visionary leaders who bring experience, dedication, and a passion for excellence in education."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {about.visionaries.map((v) => (
              <div
                key={v.name}
                className="bg-surface rounded-2xl border border-border p-6 flex flex-col items-center text-center shadow-xs hover:shadow-card transition-shadow"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-800/20 mb-4 bg-brand-50 shadow-inner">
                  <ImageWithFallback
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="font-heading font-bold text-ink-900 text-h4">
                  {v.name}
                </h3>
                <p className="font-heading text-xs font-semibold text-brand-800 mt-1">
                  {v.role}
                </p>
                <p className="text-xs text-ink-500 mb-3">{v.organization}</p>
                {v.bio && (
                  <p className="text-xs text-ink-600 leading-relaxed text-left border-t border-border/60 pt-4 mt-auto">
                    {v.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── SECTION 3: Meet Our Principals (Full Width) ─────────────────── */}
      <Section tone="canvas" spacing="default">
        <Container>
          <SectionHeader
            eyebrow="Administration"
            title="Meet Our Principals"
            description="Through their vision and dedication, our Principals guide students and faculty alike, shaping an environment of knowledge, discipline, and growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {about.principals.map((p) => (
              <div
                key={p.name}
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-xs hover:shadow-card transition-shadow items-start"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden shrink-0 border border-brand-800/20 bg-brand-50 mx-auto sm:mx-0 shadow-sm">
                  <ImageWithFallback
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="font-heading font-bold text-ink-900 text-h3">
                      {p.name}
                    </h3>
                    <p className="font-heading text-body-sm font-semibold text-brand-800 mt-0.5">
                      {p.role} &bull; {p.organization}
                    </p>
                  </div>
                  {p.bio && (
                    <p className="text-body-sm text-ink-600 leading-relaxed text-pretty">
                      {p.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── SECTION 4: Message from Leadership & Heritage (Full Width) ──── */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="max-w-4xl mx-auto space-y-14">
            {/* Message from Leadership */}
            <div className="space-y-4">
              <span className="font-heading text-xs uppercase tracking-widest text-accent-600 font-bold">
                Director&apos;s Address
              </span>
              <h2 className="font-heading font-bold text-h2 text-ink-900">
                Message from Leadership
              </h2>
              <blockquote className="p-6 sm:p-8 rounded-2xl bg-canvas border-l-4 border-accent-500 italic text-ink-800 text-body sm:text-h4 shadow-xs">
                &ldquo;{about.director.quote}&rdquo;
                <footer className="mt-4 text-body-sm not-italic font-bold text-brand-900">
                  &mdash; {about.director.name},{" "}
                  <span className="font-normal text-ink-600">
                    {about.director.designation}
                  </span>
                </footer>
              </blockquote>
            </div>

            {/* Heritage Timeline */}
            <div className="space-y-8 pt-8 border-t border-border">
              <SectionHeader
                eyebrow="Milestones"
                title="Our Heritage & Milestone Timeline"
                description="Key milestones in MGMCET's journey of technical excellence, continuous growth, and student success."
              />
              <div className="space-y-4">
                {about.timeline.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-5 sm:p-6 rounded-xl bg-canvas border border-border/80 shadow-xs hover:border-brand-300 transition-colors"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-brand-900 text-white font-heading font-bold text-sm shrink-0">
                      {event.year}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-ink-900 text-h4">
                        {event.title}
                      </h4>
                      <p className="text-body-sm text-ink-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
