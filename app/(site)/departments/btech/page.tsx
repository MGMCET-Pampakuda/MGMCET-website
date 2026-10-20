import React from "react";
import type { Metadata } from "next";
import { ProgramLevelPage } from "@/components/templates/ProgramLevelPage";
import { btechDepartments } from "@/content/departments";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "B.Tech Programmes | MGM College of Engineering and Technology",
    description:
      "Explore 4-year B.Tech undergraduate engineering degrees in AI & ML, Computer Science, Cyber Security, ECE, and Mechanical Engineering at MGMCET Pampakuda.",
    path: "/departments/btech",
  });
}

/**
 * B.Tech Degree Hub Page using ProgramLevelPage template.
 */
export default function BTechPage() {
  const totalIntake = btechDepartments.reduce(
    (acc, d) => acc + (d.intake || 60),
    0
  );

  return (
    <ProgramLevelPage
      level="btech"
      title="B.Tech Undergraduate Programmes"
      description="Four-year KTU-affiliated undergraduate engineering degrees designed with industry-aligned tracks, hands-on laboratories, and proven placement records."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Departments", href: "/departments" },
        { label: "B.Tech", current: true },
      ]}
      badge="Undergraduate Engineering (UG)"
      intro={{
        overview:
          "The Bachelor of Technology (B.Tech) programmes at MGM College of Engineering and Technology provide a strong mathematical and scientific foundation coupled with advanced engineering training. Students engage in project-based learning, faculty-mentored research, and industry internships to prepare for modern engineering careers.",
        duration: "4 Years (8 Semesters)",
        totalIntake,
        eligibility:
          "Passed 10+2 / Higher Secondary Examination with Physics, Chemistry and Mathematics with a minimum 45% marks combined (40% for reserved categories). Valid KEAM rank required for merit allotments.",
        affiliation: "AICTE Approved • APJ Abdul Kalam Technological University (KTU)",
        keyHighlights: [
          "Curriculum aligned with KTU credit structure and industry trends",
          "Dedicated Innovation & Entrepreneurship Development Centre (IEDC)",
          "Over 40+ leading recruiters including TCS, Infosys, and Cognizant",
          "State-of-the-art specialized computing and mechanical workshops",
        ],
      }}
      departments={btechDepartments}
    />
  );
}
