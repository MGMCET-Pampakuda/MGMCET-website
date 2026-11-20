import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { WomenCellSection } from "@/components/sections/WomenCellSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Women's Cell | Empowerment & Health Programs | MGMCET Pampakuda",
  description:
    "Empowering women students and faculty through health awareness, legal literacy, entrepreneurship, and cyber safety workshops at MGM College of Engineering and Technology (MGMCET), Pampakuda.",
  path: "/campus-life/women-cell",
  keywords: [
    "Women Cell MGMCET",
    "Women in Engineering Kerala",
    "Campus Safety and Inclusion",
    "Legal Awareness Kerala Engineering",
  ],
});

export default function WomenCellPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Women's Cell"
        description="Fostering gender equity, leadership, and comprehensive wellness through structured awareness programs and developmental workshops at MGMCET."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Women's Cell", href: "/campus-life/women-cell" },
        ]}
        badge="Empowerment &amp; Inclusion"
        image="/images/hero/campus-main.webp"
      />

      <Section tone="canvas" spacing="default">
        <Container>
          <WomenCellSection />
        </Container>
      </Section>
    </div>
  );
}
