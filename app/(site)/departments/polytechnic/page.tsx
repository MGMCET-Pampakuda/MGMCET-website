import React from "react";
import type { Metadata } from "next";
import { ProgramLevelPage } from "@/components/templates/ProgramLevelPage";
import { polytechnicDepartments } from "@/content/departments";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Polytechnic Diploma Programmes | MGM College of Engineering and Technology",
    description:
      "Three-year technical diploma courses in AI & ML, Automobile, Civil, CSE, ECE, EEE, Electrical & EV, and Mechanical Engineering at MGMCET Pampakuda.",
    path: "/departments/polytechnic",
  });
}

/**
 * Polytechnic Diploma Degree Hub Page using ProgramLevelPage template.
 */
export default function PolytechnicPage() {
  const totalIntake = polytechnicDepartments.reduce(
    (acc, d) => acc + (d.intake || 60),
    0
  );

  return (
    <ProgramLevelPage
      level="polytechnic"
      title="Polytechnic Diploma Programmes"
      description="Three-year industry-focused technical diploma education providing hands-on practical skills across 8 core and emerging engineering streams."
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Departments", href: "/departments" },
        { label: "Polytechnic", current: true },
      ]}
      badge="Technical Diploma (8 Streams)"
      intro={{
        overview:
          "The Polytechnic Diploma stream at MGM College of Engineering and Technology equips students with practical vocational competence, workshop fabrication skills, and industrial machinery operations. Our programmes emphasize laboratory immersion, state-of-the-art testing equipment, and direct pathways to industry employment or B.Tech lateral entry.",
        duration: "3 Years (6 Semesters)",
        totalIntake,
        eligibility:
          "Pass in Class 10 / SSLC examination with Mathematics, Science, and English. Direct 2nd Year Lateral Entry available for ITI (2 Years) and +2 Science/Vocational passed students.",
        affiliation: "AICTE Approved • Directorate of Technical Education (DTE), Kerala",
        keyHighlights: [
          "Hands-on workshop training in electrical vehicles, machining, and electronics",
          "Dedicated placement assistance for technician and junior engineer roles",
          "Eligibility for Kerala B.Tech Lateral Entry Entrance (LET)",
          "Extensive industry visits, field surveys, and software design training",
        ],
      }}
      departments={polytechnicDepartments}
    />
  );
}
