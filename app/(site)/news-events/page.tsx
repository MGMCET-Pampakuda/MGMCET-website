import React from "react";
import type { Metadata } from "next";
import { NewsEventsView } from "./NewsEventsView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Latest News, Events & Campus Announcements | MGMCET Pampakuda",
  description:
    "Read the latest college announcements, academic news, placement drives, hackathons, and student achievement bulletins from MGM College of Engineering and Technology (MGMCET), Pampakuda, Kerala.",
  path: "/news-events",
  keywords: [
    "MGMCET News",
    "Engineering College Events Kerala",
    "Placement News MGMCET",
    "College Workshops Ernakulam",
  ],
});

export default function NewsEventsPage() {
  return <NewsEventsView />;
}
