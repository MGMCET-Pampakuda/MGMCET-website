"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  FlaskConical,
  Mail,
  ArrowRight,
  FileDown,
} from "lucide-react";
import type { DepartmentDetail } from "@/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { Avatar } from "@/components/ui/Avatar";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface DepartmentPageProps {
  department: DepartmentDetail;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "vision-mission", label: "Vision & Mission" },
  { id: "outcomes", label: "Outcomes & PEOs" },
  { id: "curriculum", label: "Curriculum" },
  { id: "labs", label: "Labs & Facilities" },
  { id: "faculty", label: "Faculty" },
  { id: "contact", label: "Contact" },
];

/**
 * DepartmentPage template rendering a comprehensive department profile.
 * Features an institutional hero with key badges, sticky anchored navigation tabs,
 * curriculum links, laboratory facilities, faculty profiles, and admissions CTA.
 */
export function DepartmentPage({
  department,
  breadcrumbItems,
  className,
}: DepartmentPageProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const outcomes = department.programOutcomes || [];
  const curriculum = department.curriculumLinks || [];
  const labs = department.labs || [];
  const hasFaculty = !!(department.faculty && department.faculty.length > 0);
  const hod = hasFaculty ? (department.faculty?.find((f) => f.isHOD) || department.faculty?.[0]) : null;
  const otherFaculty = hasFaculty ? (department.faculty?.filter((f) => f.id !== hod?.id) || []) : [];
  const hasCurriculum = curriculum.length > 0;
  const hasLabs = labs.length > 0;
  const hasVisionMission = !!(department.vision || department.mission);
  const hasOutcomes = outcomes.length > 0;

  const activeTabs = TABS.filter((t) => {
    if (t.id === "faculty") return hasFaculty;
    if (t.id === "curriculum") return hasCurriculum;
    if (t.id === "labs") return hasLabs;
    if (t.id === "vision-mission") return hasVisionMission;
    if (t.id === "outcomes") return hasOutcomes;
    return true;
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = activeTabs.length - 1; i >= 0; i--) {
        const tab = activeTabs[i];
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(tab.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTabs]);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* 1. Department Hero */}
      <PageHero
        title={department.name}
        description={department.tagline || department.overview.slice(0, 180) + "..."}
        breadcrumbItems={breadcrumbItems}
        image={department.image}
      />

      {/* Hero Badges Strip */}
      <div className="bg-brand-900 border-b border-brand-800 text-white py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs sm:text-body-sm">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent-400" />
                <span>
                  <strong>Duration:</strong> {department.duration}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent-400" />
                <span>
                  <strong>Intake:</strong> {department.intake || 60} Seats / Year
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-accent-400" />
                <span>
                  <strong>Approval:</strong> AICTE Approved • Affiliated to KTU
                </span>
              </span>
            </div>
            {department.shortName && (
              <Badge variant="accent" size="sm">
                Dept Code: {department.shortName}
              </Badge>
            )}
          </div>
        </Container>
      </div>

      {/* 2. Sticky Section Anchor Navigation */}
      {activeTabs.length > 1 && (
        <div className="sticky top-[56px] sm:top-[64px] z-30 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
          <Container>
            <nav
              aria-label="Department sections"
              className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none"
            >
              {activeTabs.map((tab) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-brand-900 text-white shadow-xs"
                      : "text-ink-600 hover:text-brand-900 hover:bg-brand-50"
                  )}
                >
                  {tab.label}
                </a>
              ))}
            </nav>
          </Container>
        </div>
      )}

      {/* 3. Overview Section */}
      <Section id="overview" tone="white" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
        <Container>
          <div className="max-w-4xl space-y-4">
            <Badge variant="mint" size="sm">
              DEPARTMENT OVERVIEW
            </Badge>
            <h2 className="font-heading font-bold text-h2 text-ink-900">
              About the Department
            </h2>
            <p className="text-body-lg text-ink-700 leading-relaxed text-pretty">
              {department.overview}
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. Vision & Mission Section */}
      {hasVisionMission && (
        <Section id="vision-mission" tone="mint" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {department.vision && (
                <div className="rounded-2xl bg-surface border border-brand-200/80 p-8 shadow-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <Badge variant="mint" size="sm">
                      OUR VISION
                    </Badge>
                    <h3 className="font-heading font-bold text-h3 text-brand-900">
                      Department Vision
                    </h3>
                    <p className="text-body text-ink-700 leading-relaxed">
                      {department.vision}
                    </p>
                  </div>
                </div>
              )}

              {department.mission && (
                <div className="rounded-2xl bg-surface border border-accent-300/80 p-8 shadow-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <Badge variant="accent" size="sm">
                      OUR MISSION
                    </Badge>
                    <h3 className="font-heading font-bold text-h3 text-brand-900">
                      Department Mission
                    </h3>
                    <p className="text-body text-ink-700 leading-relaxed">
                      {department.mission}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. Program Outcomes (POs) & PEOs */}
      {hasOutcomes && (
        <Section id="outcomes" tone="white" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
          <Container>
            <div className="space-y-8">
              <div className="max-w-3xl space-y-2">
                <Badge variant="mint" size="sm">
                  ACADEMIC OBJECTIVES
                </Badge>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  Program Outcomes &amp; Educational Objectives
                </h2>
                <p className="text-body text-ink-600">
                  Graduates of this program develop specific competencies aligned with national regulatory bodies:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {outcomes.map((po) => (
                  <div
                    key={po.code}
                    className="rounded-2xl bg-surface border border-border p-6 shadow-xs hover:border-brand-500 hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-brand-50 text-brand-800 border border-brand-200 inline-block">
                        {po.code}
                      </span>
                      <p className="text-body-sm text-ink-700 leading-relaxed">
                        {po.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. Curriculum & Syllabus Section */}
      {hasCurriculum && (
        <Section id="curriculum" tone="canvas" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
          <Container>
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <Badge variant="mint" size="sm">
                  SYLLABUS &amp; SCHEME
                </Badge>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  Curriculum &amp; Course Regulations
                </h2>
                <p className="text-body text-ink-600">
                  Official syllabus and scheme documents prescribed by APJ Abdul Kalam Technological University (KTU) / Directorate of Technical Education (DTE).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {curriculum.map((curr, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-surface border border-border p-5 shadow-xs flex items-center justify-between gap-4 hover:border-brand-600 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-lg bg-brand-50 text-brand-700 shrink-0">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading font-semibold text-body-sm text-ink-900 truncate">
                          {curr.label}
                        </h4>
                        {curr.year && (
                          <p className="text-xs text-ink-500">Scheme Year: {curr.year}</p>
                        )}
                      </div>
                    </div>
                    <SmartLink
                      href={curr.href}
                      className="p-2 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-800 hover:text-white transition-colors shrink-0"
                      aria-label={`Open ${curr.label}`}
                    >
                      <FileDown className="h-5 w-5" />
                    </SmartLink>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 7. Labs & Facilities Section */}
      {hasLabs && (
        <Section id="labs" tone="white" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
          <Container>
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <Badge variant="mint" size="sm">
                  HANDS-ON INFRASTRUCTURE
                </Badge>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  Laboratories &amp; Research Facilities
                </h2>
                <p className="text-body text-ink-600">
                  Equipped with cutting-edge hardware, specialized software packages, and industrial workstations:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {labs.map((lab, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-canvas border border-border p-5 space-y-2 hover:border-brand-500 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-brand-700">
                      <FlaskConical className="h-5 w-5 shrink-0" />
                      <h3 className="font-heading font-bold text-body text-ink-900">
                        {lab.name}
                      </h3>
                    </div>
                    {lab.description && (
                      <p className="text-body-sm text-ink-600 leading-relaxed">
                        {lab.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 8. Faculty Profiles Section */}
      {hasFaculty && (
        <Section id="faculty" tone="mint" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
          <Container>
            <div className="space-y-8">
              <div className="max-w-3xl space-y-2">
                <Badge variant="mint" size="sm">
                  DEPARTMENT FACULTY
                </Badge>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  Experienced Academicians &amp; Mentors
                </h2>
                <p className="text-body text-ink-600">
                  Our faculty members bring distinguished academic qualifications, research publications, and hands-on industrial expertise.
                </p>
              </div>

              {/* HOD Card Highlight */}
              {hod && (
                <div className="rounded-2xl bg-surface border border-accent-300/80 p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-2xl">
                  <Avatar
                    src={hod.image}
                    name={hod.name}
                    size="xl"
                    className="shrink-0 border-2 border-accent-400"
                  />
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <Badge variant="accent" size="sm" pill>
                      Head of Department (HOD)
                    </Badge>
                    <h3 className="font-heading font-bold text-h3 text-ink-900">
                      {hod.name}
                    </h3>
                    <p className="text-body-sm text-brand-700 font-semibold">
                      {hod.designation}
                    </p>
                    {hod.qualification && (
                      <p className="text-caption text-ink-500">
                        Qualification: {hod.qualification}
                      </p>
                    )}
                    {hod.experience && (
                      <p className="text-caption text-ink-500">
                        Experience: {hod.experience}
                      </p>
                    )}
                    {hod.email && (
                      <div className="pt-2">
                        <a
                          href={`mailto:${hod.email}`}
                          className="inline-flex items-center gap-1.5 text-xs text-brand-800 font-medium hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>{hod.email}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Faculty Grid */}
              {otherFaculty.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherFaculty.map((fac) => (
                    <div
                      key={fac.id}
                      className="rounded-xl bg-surface border border-border p-5 shadow-xs flex items-start gap-4 hover:border-brand-500 transition-colors"
                    >
                      <Avatar
                        src={fac.image}
                        name={fac.name}
                        size="lg"
                        className="shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-heading font-bold text-body text-ink-900 truncate">
                          {fac.name}
                        </h4>
                        <p className="text-xs text-brand-700 font-medium">
                          {fac.designation}
                        </p>
                        {fac.qualification && (
                          <p className="text-xs text-ink-500 truncate">
                            {fac.qualification}
                          </p>
                        )}
                        {fac.experience && (
                          <p className="text-xs text-ink-400">
                            Exp: {fac.experience}
                          </p>
                        )}
                        {fac.email && (
                          <a
                            href={`mailto:${fac.email}`}
                            className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-brand-800 pt-1"
                          >
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{fac.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* 9. Department Contact */}
      <Section id="contact" tone="white" spacing="sm" className="scroll-mt-28 sm:scroll-mt-36">
        <Container>
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <Badge variant="mint" size="sm">
                GET IN TOUCH
              </Badge>
              <h3 className="font-heading font-bold text-h3 text-ink-900">
                Department Inquiries &amp; Admissions
              </h3>
              <p className="text-body-sm text-ink-600">
                Have specific questions about curriculum, admission criteria, or laboratory research in {department.name}? Reach out directly to our admissions &amp; departmental team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              {department.contact?.email && (
                <a
                  href={`mailto:${department.contact.email}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-pill bg-brand-50 text-brand-900 font-semibold text-body-sm border border-brand-200 hover:bg-brand-100 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{department.contact.email}</span>
                </a>
              )}
              <SmartLink
                href={site.applyNowUrl}
                isExternal
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill bg-accent-500 text-ink-900 font-bold text-body-sm hover:bg-accent-600 transition-colors shadow-sm"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
