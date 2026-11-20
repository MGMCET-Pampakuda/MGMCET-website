import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ClubsAssociationsSection } from "@/components/sections/ClubsAssociationsSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Student Activity Clubs & Department Associations | Et Cetera Coding Club | MGMCET Pampakuda",
  description:
    "Explore student leadership, technical societies, Et Cetera coding club, and academic associations at MGM College of Engineering and Technology, Pampakuda, Ernakulam.",
  path: "/campus-life/associations-and-clubs",
  keywords: [
    "MGMCET Clubs",
    "Et Cetera Coding Club",
    "College Associations Kerala",
    "Campus Life MGMCET",
    "Student Chapters Engineering Kerala",
  ],
});

export default function ClubsAndAssociationsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Clubs &amp; Department Associations"
        description="Discover active student communities, creative societies, technical coding forums, and departmental academic associations fostering leadership and innovation at MGMCET."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Clubs & Associations", href: "/campus-life/associations-and-clubs" },
        ]}
        badge="Vibrant Student Ecosystem"
        image="/images/hero/campus-main.webp"
      />

      <Section tone="canvas" spacing="default">
        <Container>
          <ClubsAssociationsSection />
        </Container>
      </Section>
    </div>
  );
}
