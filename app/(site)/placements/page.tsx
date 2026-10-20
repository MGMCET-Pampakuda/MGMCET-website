import React from "react";
import type { Metadata } from "next";
import { PlacementsPage } from "@/components/templates/PlacementsPage";
import { placements } from "@/content/placements";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Training & Placement Cell | MGM College of Engineering and Technology",
  description:
    "Explore training programs, recruiting partners, placement statistics, and corporate engagement initiatives at MGMCET Pampakuda.",
  path: "/placements",
});

export default function PlacementsRoute() {
  return (
    <PlacementsPage
      content={placements}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Placements", href: "/placements" },
      ]}
    />
  );
}
