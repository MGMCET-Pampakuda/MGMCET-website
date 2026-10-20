import React from "react";
import type { Metadata } from "next";
import { FacultyView } from "./FacultyView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Faculty Directory | MGM College of Engineering and Technology",
  description:
    "Explore the experienced faculty, heads of department, and professors across engineering disciplines at MGMCET Pampakuda.",
  path: "/faculty",
});

export default function FacultyPage() {
  return <FacultyView />;
}
