import React from "react";
import type { Metadata } from "next";
import { ProgramLevelPage } from "@/components/templates/ProgramLevelPage";
import { mtechDepartments } from "@/content/departments";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:
      "M.Tech Postgraduate Engineering Programs | KTU Affiliated | MGMCET Pampakuda",
    description:
      "Two-year advanced research-led Master of Technology (M.Tech) engineering programs in Structural Engineering & Construction Management and Industrial Instrumentation & Control at MGMCET Pampakuda, affiliated to KTU.",
    path: "/departments/mtech",
    keywords: [
      "MTech Colleges in Kerala",
      "KTU MTech Admissions",
      "Structural Engineering MTech Kerala",
      "Industrial Instrumentation Control",
      "PG Engineering Kerala",
      "MGMCET MTech Programs",
    ],
  });
}

/**
 * M.Tech Degree Hub Page using ProgramLevelPage template.
 */
export default function MTechPage() {
  const totalIntake = mtechDepartments.reduce(
    (acc, d) => acc + (d.intake || 18),
    0
  );

  return (
    <ProgramLevelPage
      level="mtech"
      title="M.Tech Postgraduate Programmes"
      description="Two-year advanced research-led Master of Technology programmes specializing in Industrial Automation, Process Control, and Modern Structural Design."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Departments", href: "/departments" },
        { label: "M.Tech", current: true },
      ]}
      badge="Postgraduate Engineering (PG)"
      intro={{
        overview:
          "The Master of Technology (M.Tech) offerings at MGMCET prepare graduate engineers for senior industrial design roles, research organizations, and academic careers. With dedicated departmental research labs and KTU affiliation, students carry out deep project work in industrial automation and sustainable structural engineering.",
        duration: "2 Years (4 Semesters)",
        totalIntake,
        eligibility:
          "Graduation with a B.Tech / B.E. degree in a relevant discipline from an AICTE / UGC approved university with minimum 60% aggregate marks. Valid GATE score preferred.",
        affiliation: "AICTE Approved • APJ Abdul Kalam Technological University (KTU)",
        keyHighlights: [
          "Specialized research laboratories with advanced simulation suites",
          "Guidance from senior doctoral faculty and industry consultants",
          "Opportunities for paper publications in indexed international journals",
          "Industry-sponsored thesis projects and automation internships",
        ],
      }}
      departments={mtechDepartments}
    />
  );
}
