import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import {
  btechDepartments,
  mtechDepartments,
  polytechnicDepartments,
} from "@/content/departments";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { buildMetadata } from "@/lib/seo";
import type { DepartmentMeta } from "@/types";
import { cn } from "@/lib/cn";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title:
      "Engineering & Polytechnic Departments | MGM College of Engineering and Technology (MGMCET)",
    description:
      "Explore AICTE approved engineering departments and courses at MGM College of Engineering and Technology, Pampakuda, Ernakulam. Offering KTU-affiliated B.Tech (CSE, AI/ML, Cyber Security, Mechanical, ECE), M.Tech, and Polytechnic Diploma programs.",
    path: "/departments",
    keywords: [
      "Engineering Courses Kerala",
      "KTU BTech Branches",
      "Computer Science Engineering KTU",
      "AI & Machine Learning Engineering Kerala",
      "Polytechnic Diploma Courses Ernakulam",
      "Mechanical Engineering College Kerala",
      "MGMCET Departments",
    ],
  });
}

function DepartmentCardGrid({ items }: { items: DepartmentMeta[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {items.map((dept) => {
        const isBtech = dept.level === "btech";
        const CardWrapper = isBtech ? SmartLink : "div";
        const wrapperProps = isBtech
          ? {
              href: dept.href,
              className:
                "group rounded-2xl bg-surface border border-border hover:border-brand-600 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all flex flex-col overflow-hidden",
            }
          : {
              className:
                "rounded-2xl bg-surface border border-border shadow-xs flex flex-col overflow-hidden",
            };

        return (
          // @ts-expect-error dynamic wrapper element
          <CardWrapper key={dept.id} {...wrapperProps}>
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] w-full bg-brand-50 overflow-hidden">
              <Image
                src={dept.thumbnail || dept.image}
                alt={dept.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-cover object-center",
                  isBtech &&
                    "group-hover:scale-105 transition-transform duration-500"
                )}
              />
              {isBtech && (
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              )}
              <div className="absolute top-3 right-3">
                <Badge variant="brand-dark" size="sm" pill>
                  Intake: {dept.intake || 60}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-caption uppercase font-semibold text-accent-700 tracking-wider">
                  {dept.duration}
                </span>
                <h3
                  className={cn(
                    "font-heading font-bold text-h4 text-ink-900",
                    isBtech && "group-hover:text-brand-800 transition-colors"
                  )}
                >
                  {dept.name}
                </h3>
                {dept.shortName && (
                  <p className="text-body-sm text-ink-500 font-medium">
                    ({dept.shortName})
                  </p>
                )}
              </div>

              {isBtech ? (
                <div className="pt-4 border-t border-border flex items-center justify-between text-body-sm font-semibold text-brand-700 group-hover:text-brand-900">
                  <span>Explore Curriculum &amp; Labs</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              ) : (
                <div className="pt-4 border-t border-border flex items-center justify-between text-body-sm text-ink-600 font-medium">
                  <span>Approved Specialization</span>
                </div>
              )}
            </div>
          </CardWrapper>
        );
      })}
    </div>
  );
}

/**
 * Departments Overview Page featuring tabs for B.Tech (5), M.Tech (2), and Polytechnic (8).
 */
export default function DepartmentsOverviewPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Explore Our Departments"
        description="MGMCET offers 15 specialized academic departments across B.Tech Undergraduate, M.Tech Postgraduate, and Polytechnic Diploma disciplines."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Departments" },
        ]}
        badge="Academic Disciplines &amp; Specializations"
      />

      {/* Program Summary Cards */}
      <Section tone="canvas" spacing="sm">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-brand-50 text-brand-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-h2 font-bold text-ink-900">
                  {btechDepartments.length}
                </p>
                <p className="text-body-sm font-medium text-ink-600">
                  B.Tech Specializations
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-brand-50 text-brand-700">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-h2 font-bold text-ink-900">
                  {mtechDepartments.length}
                </p>
                <p className="text-body-sm font-medium text-ink-600">
                  M.Tech Programmes
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-accent-50 text-accent-700">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-h2 font-bold text-ink-900">
                  {polytechnicDepartments.length}
                </p>
                <p className="text-body-sm font-medium text-ink-600">
                  Polytechnic Streams
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Tabs Section */}
      <Section tone="white" spacing="default">
        <Container>
          <Tabs defaultValue="btech" variant="pills">
            <TabsList ariaLabel="Department levels">
              <TabsTrigger value="btech">
                B.Tech Programmes ({btechDepartments.length})
              </TabsTrigger>
              <TabsTrigger value="mtech">
                M.Tech Programmes ({mtechDepartments.length})
              </TabsTrigger>
              <TabsTrigger value="polytechnic">
                Polytechnic Diploma ({polytechnicDepartments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="btech">
              <div className="space-y-6 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-brand-50 border border-brand-100">
                  <div>
                    <h3 className="font-heading font-bold text-h3 text-ink-900">
                      Four-Year Undergraduate Engineering
                    </h3>
                    <p className="text-body-sm text-ink-600 mt-1">
                      KTU affiliated, AICTE approved Bachelor of Technology degrees with industry-tailored tracks.
                    </p>
                  </div>
                  <SmartLink
                    href="/departments/btech"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface border border-border text-brand-700 hover:text-brand-900 font-heading text-body-sm font-semibold transition-colors shrink-0"
                  >
                    <span>View B.Tech Hub</span>
                    <ArrowRight className="h-4 w-4" />
                  </SmartLink>
                </div>
                <DepartmentCardGrid items={btechDepartments} />
              </div>
            </TabsContent>

            <TabsContent value="mtech">
              <div className="space-y-6 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-brand-50 border border-brand-100">
                  <div>
                    <h3 className="font-heading font-bold text-h3 text-ink-900">
                      Two-Year Postgraduate Engineering
                    </h3>
                    <p className="text-body-sm text-ink-600 mt-1">
                      Advanced research-led M.Tech degrees in industrial automation and structural design.
                    </p>
                  </div>
                  <SmartLink
                    href="/departments/mtech"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface border border-border text-brand-700 hover:text-brand-900 font-heading text-body-sm font-semibold transition-colors shrink-0"
                  >
                    <span>View M.Tech Hub</span>
                    <ArrowRight className="h-4 w-4" />
                  </SmartLink>
                </div>
                <DepartmentCardGrid items={mtechDepartments} />
              </div>
            </TabsContent>

            <TabsContent value="polytechnic">
              <div className="space-y-6 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-brand-50 border border-brand-100">
                  <div>
                    <h3 className="font-heading font-bold text-h3 text-ink-900">
                      Three-Year Technical Diploma Streams
                    </h3>
                    <p className="text-body-sm text-ink-600 mt-1">
                      Direct hands-on engineering diploma education approved by AICTE &amp; SBTET/DTE Kerala.
                    </p>
                  </div>
                  <SmartLink
                    href="/departments/polytechnic"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface border border-border text-brand-700 hover:text-brand-900 font-heading text-body-sm font-semibold transition-colors shrink-0"
                  >
                    <span>View Polytechnic Hub</span>
                    <ArrowRight className="h-4 w-4" />
                  </SmartLink>
                </div>
                <DepartmentCardGrid items={polytechnicDepartments} />
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </div>
  );
}
