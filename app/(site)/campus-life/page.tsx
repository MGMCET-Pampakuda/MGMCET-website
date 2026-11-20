import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { UnderDevelopment } from "@/components/shared";
import { Users2, Shield, Library, FlaskConical, Home, Bus, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Campus Life & Student Facilities | Hostels, Library, Labs & Bus Transit | MGMCET Pampakuda",
  description:
    "Experience campus life at MGM College of Engineering and Technology, Pampakuda: modern library, advanced laboratories, safe boys & girls hostels, college bus transportation across Ernakulam, and active student clubs.",
  path: "/campus-life",
  keywords: [
    "Campus Life MGMCET",
    "Engineering College Hostel Ernakulam",
    "College Bus Facility Pampakuda",
    "Engineering College Labs Kerala",
    "MGMCET Library",
  ],
});

export default function CampusLifePage() {
  const activeCampusPortals = [
    {
      title: "Clubs & Department Associations",
      description: "Active technical clubs, coding community (Et Cetera), and departmental academic bodies.",
      href: "/campus-life/associations-and-clubs",
      icon: Users2,
      badge: "Active",
    },
    {
      title: "Women's Cell",
      description: "Flagship awareness sessions, health and hygiene seminars, and legal literacy workshops.",
      href: "/campus-life/women-cell",
      icon: Shield,
      badge: "Active",
    },
    {
      title: "Central Library",
      description: "Extensive collections of engineering handbooks, digital e-journals, and quiet study halls.",
      href: "/campus-life/library",
      icon: Library,
      badge: "Available",
    },
    {
      title: "Laboratories & Workshops",
      description: "Equipped CNC bays, advanced computing suites, hydraulic test benches, and VLSI circuitry.",
      href: "/campus-life/labs-and-workshops",
      icon: FlaskConical,
      badge: "Available",
    },
    {
      title: "Hostel Facilities",
      description: "Comfortable residential boarding for boys and girls with 24/7 security and dining mess.",
      href: "/campus-life/hostel",
      icon: Home,
      badge: "Available",
    },
    {
      title: "Campus Transportation",
      description: "Dependable college transit buses connecting Pampakuda across Ernakulam and nearby towns.",
      href: "/campus-life/transportation",
      icon: Bus,
      badge: "Available",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Campus Life &amp; Student Ecosystem"
        description="Experience an enriching college life that nurtures leadership, creativity, sportsmanship, and technical innovation at MGMCET."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
        ]}
        image="/images/hero/campus-main.webp"
        badge="Will Be Back Soon"
      />

      <Section tone="canvas" spacing="default">
        <Container>
          <div className="space-y-12">
            {/* Under Development Banner */}
            <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-border shadow-xs text-center">
              <UnderDevelopment
                title="Campus Life Section is Being Revamped"
                subtitle="We are actively updating our student life gallery, sports tournament archives, and club documentation. We will be back soon with fresh media and interactive features!"
                backHref="/"
                backLabel="Return to Homepage"
              />
            </div>

            {/* Currently Active Campus Portals */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                  Available Campus Portals
                </span>
                <h3 className="font-heading font-bold text-h3 text-ink-900">
                  Explore Active Portals &amp; Facilities
                </h3>
                <p className="text-body-sm text-ink-600">
                  While our main campus life galleries are being refreshed, you can explore the following live sections:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCampusPortals.map((portal) => {
                  const Icon = portal.icon;
                  return (
                    <Link
                      key={portal.href}
                      href={portal.href}
                      className="p-6 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {portal.badge}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-h4 text-ink-900 group-hover:text-brand-800 transition-colors">
                          {portal.title}
                        </h4>
                        <p className="text-body-sm text-ink-600 leading-relaxed">
                          {portal.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-2 border-t border-border flex items-center gap-1 text-xs font-bold text-brand-700 group-hover:text-brand-900">
                        <span>View Portal</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
