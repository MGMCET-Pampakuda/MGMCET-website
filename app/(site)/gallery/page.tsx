import React from "react";
import type { Metadata } from "next";
import { GalleryView } from "./GalleryView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Campus Photo Gallery | Events, Tech Fests & Student Life | MGMCET Pampakuda",
  description:
    "Explore photo highlights from technical workshops, hackathons, arts fest, sports tournaments, and vibrant student life at MGM College of Engineering and Technology (MGMCET), Pampakuda, Kerala.",
  path: "/gallery",
  keywords: [
    "MGMCET Gallery",
    "Engineering Campus Photos Kerala",
    "Tech Fest MGMCET",
    "College Events Ernakulam",
  ],
});

export default function GalleryPage() {
  return <GalleryView />;
}
