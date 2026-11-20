import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { btechDepartments, getDepartment } from "@/content/departments";
import { DepartmentPage } from "@/components/templates/DepartmentPage";
import { buildMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

interface DepartmentRouteParams {
  level: string;
  slug: string;
}

interface PageProps {
  params: Promise<DepartmentRouteParams>;
}

/**
 * Generate static params only for B.Tech departments.
 * M.Tech and Polytechnic programmes are presented via their respective degree hub pages.
 */
export function generateStaticParams(): DepartmentRouteParams[] {
  return btechDepartments.map((dept) => ({
    level: "btech",
    slug: dept.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level, slug } = await params;
  if (level !== "btech") {
    return buildMetadata({
      title: "Department Not Found | MGMCET",
      description: "The requested academic department could not be found.",
      path: "/departments",
    });
  }

  const dept = getDepartment(level, slug);

  if (!dept) {
    return buildMetadata({
      title: "Department Not Found | MGMCET",
      description: "The requested academic department could not be found.",
      path: "/departments",
    });
  }

  return buildMetadata({
    title: `${dept.name} (B.Tech) | MGM College of Engineering and Technology (MGMCET), Pampakuda`,
    description: `Study B.Tech in ${dept.name} at MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam. KTU affiliated, AICTE approved curriculum with advanced laboratories, industry collaborations, and top placement training.`,
    path: dept.href,
    image: dept.image,
    keywords: [
      `B.Tech ${dept.name}`,
      `KTU ${dept.name} Syllabus`,
      `Engineering College Kerala ${dept.name}`,
      `MGMCET ${dept.name}`,
      "Engineering Admissions Ernakulam",
      "Top BTech Colleges Kerala",
    ],
  });
}

/**
 * Individual Department Detail Page statically generated for B.Tech departments.
 */
export default async function DepartmentDetailPage({ params }: PageProps) {
  const { level, slug } = await params;
  if (level !== "btech") {
    notFound();
  }

  const dept = getDepartment(level, slug);

  if (!dept) {
    notFound();
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `B.Tech in ${dept.name}`,
    description:
      dept.tagline ||
      `4-year KTU affiliated undergraduate degree program in ${dept.name} at MGMCET Pampakuda.`,
    provider: {
      "@type": "CollegeOrUniversity",
      name: "MGM College of Engineering and Technology",
      url: "https://mgmcet.ac.in",
    },
    educationalCredentialAwarded: "Bachelor of Technology (B.Tech)",
    timeToComplete: "P4Y",
    courseCode: dept.shortName || dept.name,
  };

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Departments", path: "/departments" },
    { name: "B.Tech", path: "/departments/btech" },
    { name: dept.name, path: dept.href },
  ]);

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DepartmentPage
        department={dept}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
          { label: "B.Tech", href: "/departments/btech" },
          { label: dept.shortName || dept.name, current: true },
        ]}
      />
    </>
  );
}
