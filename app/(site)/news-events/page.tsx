import React from "react";
import type { Metadata } from "next";
import { NewsEventsView } from "./NewsEventsView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "News & Events | MGM College of Engineering and Technology",
  description:
    "Read the latest college news, event announcements, workshop schedules, and student achievement bulletins from MGMCET Pampakuda.",
  path: "/news-events",
});

export default function NewsEventsPage() {
  return <NewsEventsView />;
}
