import React from "react";
import type { Metadata } from "next";
import { GalleryView } from "./GalleryView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Photo Gallery | MGM College of Engineering and Technology",
  description:
    "Explore photo highlights from academic workshops, campus events, cultural festivals, sports meets, and student life at MGMCET.",
  path: "/gallery",
});

export default function GalleryPage() {
  return <GalleryView />;
}
