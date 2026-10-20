import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDepartmentDetails, getDepartment } from "@/content/departments";
import { DepartmentPage } from "@/components/templates/DepartmentPage";
import { buildMetadata } from "@/lib/seo";

interface DepartmentRouteParams {
  level: string;
  slug: string;
}

interface PageProps {
  params: Promise<DepartmentRouteParams>;
}

/**
 * Generate static params for all 15 departments registered in the content registry:
 * 5 B.Tech, 2 M.Tech, and 8 Polytechnic Diploma programmes.
 */
export function generateStaticParams(): DepartmentRouteParams[] {
  return allDepartmentDetails.map((dept) => ({
    level: dept.level,
    slug: dept.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level, slug } = await params;
  const dept = getDepartment(level, slug);

  if (!dept) {
    return buildMetadata({
      title: "Department Not Found | MGMCET",
      description: "The requested academic department could not be found.",
      path: "/departments",
    });
  }

  const levelDisplay =
    dept.level === "btech"
      ? "B.Tech"
      : dept.level === "mtech"
      ? "M.Tech"
      : "Polytechnic Diploma";

  return buildMetadata({
    title: `${dept.name} (${levelDisplay}) | MGMCET Pampakuda`,
    description:
      dept.tagline ||
      `${dept.name} at MGM College of Engineering and Technology, Pampakuda. Duration: ${dept.duration}, Intake: ${dept.intake || 60}. AICTE Approved.`,
    path: dept.href,
  });
}

/**
 * Individual Department Detail Page statically generated for all 15 departments.
 */
export default async function DepartmentDetailPage({ params }: PageProps) {
  const { level, slug } = await params;
  const dept = getDepartment(level, slug);

  if (!dept) {
    notFound();
  }

  const levelInfoMap: Record<string, { label: string; href: string }> = {
    btech: { label: "B.Tech", href: "/departments/btech" },
    mtech: { label: "M.Tech", href: "/departments/mtech" },
    polytechnic: { label: "Polytechnic", href: "/departments/polytechnic" },
  };

  const levelInfo = levelInfoMap[dept.level] || {
    label: dept.level.toUpperCase(),
    href: "/departments",
  };

  return (
    <DepartmentPage
      department={dept}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Departments", href: "/departments" },
        { label: levelInfo.label, href: levelInfo.href },
        { label: dept.shortName || dept.name, current: true },
      ]}
    />
  );
}
