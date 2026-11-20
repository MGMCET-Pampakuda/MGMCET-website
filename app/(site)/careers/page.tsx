import React from "react";
import type { Metadata } from "next";
import { CareersView } from "./CareersView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Careers & Faculty Openings | Job Vacancies & Teaching Positions | MGMCET Pampakuda",
  description:
    "Explore teaching faculty and administrative staff job openings at MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam. Join a prestigious engineering institution.",
  path: "/careers",
  keywords: [
    "MGMCET Careers",
    "Engineering Faculty Jobs Kerala",
    "Assistant Professor Vacancy KTU",
    "College Teaching Jobs Ernakulam",
  ],
});

export default function CareersPage() {
  return <CareersView />;
}
