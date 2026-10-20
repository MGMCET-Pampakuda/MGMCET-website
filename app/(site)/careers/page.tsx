import React from "react";
import type { Metadata } from "next";
import { CareersView } from "./CareersView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers & Openings | MGM College of Engineering and Technology",
  description:
    "Explore faculty and staff career openings, academic positions, and application procedures at MGMCET Pampakuda.",
  path: "/careers",
});

export default function CareersPage() {
  return <CareersView />;
}
