import React from "react";
import type { Metadata } from "next";
import { PlacementsPage } from "@/components/templates/PlacementsPage";
import { placements } from "@/content/placements";
import { buildMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title:
    "Training & Placements Cell | Top Recruiters & Career Opportunities | MGMCET Pampakuda",
  description:
    "Explore campus placement statistics, top recruiting companies, and industry training programs at MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam. Leading tech recruiters include Infosys, TCS, Wipro, Cognizant, Toyota, and more.",
  path: "/placements",
  keywords: [
    "MGMCET Placements",
    "Engineering College Placements Kerala",
    "Top Placement Engineering Colleges Ernakulam",
    "Campus Recruiters MGMCET",
    "Placement Training Kerala Engineering",
  ],
});

export default function PlacementsRoute() {
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Placements", path: "/placements" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PlacementsPage
        content={placements}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Placements", href: "/placements" },
        ]}
      />
    </>
  );
}
