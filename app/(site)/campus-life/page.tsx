import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { Icon } from "@/components/shared/Icon";
import { campusLife } from "@/content/campus-life";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Campus Life & Facilities | MGM College of Engineering and Technology",
  description:
    "Discover life at MGMCET: state-of-the-art libraries, high-tech labs, hostels, college transport, NSS, arts, sports, and dynamic student associations.",
  path: "/campus-life",
});

export default function CampusLifePage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Campus Life &amp; Student Ecosystem"
        description="Experience an enriching college life that nurtures leadership, creativity, sportsmanship, and technical innovation through comprehensive campus infrastructure."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
        ]}
        image="/images/campus/campus-main.svg"
        badge="Vibrant Student Life"
      />

      {/* 1. Activity Statistics */}
      <Section tone="canvas" spacing="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {campusLife.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface border border-border text-center shadow-xs space-y-1"
              >
                <span className="font-heading font-extrabold text-h2 text-brand-900 block">
                  {stat.value}
                </span>
                <span className="text-body-sm font-medium text-ink-600 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Facilities & Student Communities Grid */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge variant="mint" size="sm">
              FACILITIES &amp; COMMUNITIES
            </Badge>
            <h2 className="font-heading font-bold text-h2 text-ink-900">
              Explore Everything MGMCET Has to Offer
            </h2>
            <p className="text-body text-ink-600 leading-relaxed">
              From cutting-edge academic resources and comfortable residential quarters to competitive athletics and community outreach squads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campusLife.features.map((feature) => (
              <div
                key={feature.slug}
                className="group rounded-2xl overflow-hidden bg-surface border border-border shadow-xs hover:shadow-card hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-surface/90 backdrop-blur-xs text-brand-900 shadow-xs">
                    <Icon name={feature.iconName} className="h-5 w-5" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-h4 text-ink-900 group-hover:text-brand-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-body-sm text-ink-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/80">
                    <SmartLink
                      href={feature.href}
                      className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
                    >
                      <span>Learn more about {feature.title}</span>
                      <span>&rarr;</span>
                    </SmartLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
