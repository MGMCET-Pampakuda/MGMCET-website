import React from "react";
import type { Metadata } from "next";
import { FacultyView } from "./FacultyView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Distinguished Faculty Directory | Professors & Department Heads | MGMCET Pampakuda",
  description:
    "Meet the experienced faculty members, heads of departments, and professors across engineering disciplines at MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam, Kerala.",
  path: "/faculty",
  keywords: [
    "MGMCET Faculty",
    "Engineering Professors Kerala",
    "KTU Engineering Faculty Ernakulam",
    "Heads of Department MGMCET",
  ],
});

export default function FacultyPage() {
  return <FacultyView />;
}
