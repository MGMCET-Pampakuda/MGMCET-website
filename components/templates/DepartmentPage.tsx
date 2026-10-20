"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  FlaskConical,
  Briefcase,
  Trophy,
  Mail,
  Phone,
  FileDown,
  Target,
  Compass,
} from "lucide-react";
import type { DepartmentDetail } from "@/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { Avatar } from "@/components/ui/Avatar";
import { CTABanner } from "@/components/sections/CTABanner";
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
  { id: "placements", label: "Placements" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const DEFAULT_POS = [
  {
    code: "PO1",
    description:
      "Engineering Knowledge: Apply knowledge of mathematics, science, engineering fundamentals, and specialized engineering concepts to solve complex engineering challenges.",
  },
  {
    code: "PO2",
    description:
      "Problem Analysis: Identify, formulate, and analyze complex technical challenges reaching substantiated conclusions using foundational analytical principles.",
  },
  {
    code: "PO3",
    description:
      "Design & Development: Design solutions for complex engineering problems and design system components or processes that meet specified societal and environmental requirements.",
  },
  {
    code: "PO4",
    description:
      "Modern Tool Usage: Select and apply appropriate techniques, resources, and modern IT and engineering tools including prediction and modeling.",
  },
  {
    code: "PO5",
    description:
      "Ethics & Responsibility: Commit to professional ethics, societal responsibilities, environmental safety, and norms of engineering practice.",
  },
  {
    code: "PO6",
    description:
      "Life-long Learning: Recognize the need for, and have the preparation and ability to engage in independent and continuous learning in modern technological domains.",
  },
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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const outcomes =
    department.programOutcomes && department.programOutcomes.length > 0
      ? department.programOutcomes
      : DEFAULT_POS;

  const curriculum = department.curriculumLinks || [];

  const labs =
    department.labs && department.labs.length > 0
      ? department.labs
      : [
          {
            name: `${department.shortName || "Department"} Core Laboratory`,
            description: "Equipped with industry-standard workstations and modern equipment.",
          },
          {
            name: "Advanced Computing & Project Lab",
            description: "High-speed network and specialized simulation software packages.",
          },
        ];

  const hod = department.faculty?.find((f) => f.isHOD) || department.faculty?.[0] || {
    id: `${department.slug}-hod`,
    name: "Head of Department",
    designation: "Professor & Head of Department",
    qualification: "M.Tech, Ph.D",
    experience: "15+ Years",
    image: "/images/faculty/placeholder-avatar.svg",
    email: `${department.slug}.hod@mgmcet.ac.in`,
    isHOD: true,
  };
  const otherFaculty = department.faculty?.filter((f) => f.id !== hod?.id) || [];

  const levelNameMap = {
    btech: "B.Tech Undergraduate Programme",
    mtech: "M.Tech Postgraduate Programme",
    polytechnic: "Polytechnic Diploma Programme",
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* 1. Department Hero */}
      <PageHero
        title={department.name}
        description={department.tagline || department.overview.slice(0, 180) + "..."}
        breadcrumbItems={breadcrumbItems}
        image={department.image}
        badge={levelNameMap[department.level]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <SmartLink
              href={site.applyNowUrl}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm shadow-card transition-all"
            >
              Apply for this Course
            </SmartLink>
            {department.curriculumLinks && department.curriculumLinks.length > 0 && (
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-body-sm border border-white/20 transition-all"
              >
                View Syllabus
              </a>
            )}
          </div>
        }
      />

      {/* Hero Badges Strip */}
      <div className="bg-brand-900 border-b border-brand-800 text-white py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 text-body-sm">
            <div className="flex flex-wrap items-center gap-6">
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
                  <strong>Approval:</strong> AICTE Approved
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
      <div className="sticky top-20 z-sticky bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
        <Container>
          <nav
            aria-label="Department sections"
            className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none"
          >
            {TABS.map((tab) => (
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

      {/* 3. Overview Section */}
      <Section id="overview" tone="white" spacing="sm">
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
      <Section id="vision-mission" tone="mint" spacing="sm">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision */}
            <div className="rounded-2xl bg-surface border border-brand-100 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-700">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <Badge variant="mint" size="sm">
                    ASPIRATION
                  </Badge>
                  <h3 className="font-heading font-bold text-h3 text-ink-900">
                    Department Vision
                  </h3>
                </div>
              </div>
              <p className="text-body text-ink-600 leading-relaxed">
                {department.vision ||
                  "To emerge as a center of excellence in engineering education and research, producing globally competent professionals with strong technical foundation, ethical values, and leadership capabilities."}
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-2xl bg-surface border border-accent-100 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-accent-50 text-accent-700">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <Badge variant="accent" size="sm">
                    COMMITMENT
                  </Badge>
                  <h3 className="font-heading font-bold text-h3 text-ink-900">
                    Department Mission
                  </h3>
                </div>
              </div>
              <p className="text-body text-ink-600 leading-relaxed">
                {department.mission ||
                  "To provide high-quality education through innovative teaching methodologies, hands-on laboratory experiences, and active industry collaboration, nurturing problem-solving and entrepreneurial mindsets."}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Outcomes & PEOs Section */}
      <Section id="outcomes" tone="white" spacing="sm">
        <Container>
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <Badge variant="mint" size="sm">
                ACADEMIC STANDARDS
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900">
                Programme Outcomes (POs)
              </h2>
              <p className="text-body text-ink-600">
                Graduates of the {department.name} programme are expected to demonstrate proficiency across these core engineering competencies:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {outcomes.map((po) => (
                <div
                  key={po.code}
                  className="rounded-xl bg-canvas border border-border p-5 space-y-2 hover:border-brand-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-900 text-white">
                      {po.code}
                    </span>
                  </div>
                  <p className="text-body-sm text-ink-700 leading-relaxed">
                    {po.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Program Educational Objectives (PEOs) if defined */}
            {department.programEducationalObjectives &&
              department.programEducationalObjectives.length > 0 && (
                <div className="pt-6 border-t border-border space-y-4">
                  <h3 className="font-heading font-bold text-h3 text-ink-900">
                    Programme Educational Objectives (PEOs)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {department.programEducationalObjectives.map((peo) => (
                      <div
                        key={peo.code}
                        className="rounded-xl bg-surface border border-accent-200 p-5 space-y-2"
                      >
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent-600 text-white">
                          {peo.code}
                        </span>
                        <p className="text-body-sm text-ink-700 leading-relaxed">
                          {peo.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </Container>
      </Section>

      {/* 6. Curriculum & Syllabus Section */}
      <Section id="curriculum" tone="canvas" spacing="sm">
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
                    aria-label={`Download ${curr.label}`}
                  >
                    <FileDown className="h-5 w-5" />
                  </SmartLink>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Labs & Facilities Section */}
      <Section id="labs" tone="white" spacing="sm">
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

      {/* 8. Faculty Profiles Section */}
      <Section id="faculty" tone="mint" spacing="sm">
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

      {/* 9. Placements & Career Section */}
      <Section id="placements" tone="white" spacing="sm">
        <Container>
          <div className="rounded-2xl bg-brand-900 text-white p-6 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="accent" size="sm" pill>
                CAREER OUTCOMES
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-white">
                Placements &amp; Industry Connect
              </h2>
              <p className="text-body text-brand-100 leading-relaxed">
                {department.placements?.description ||
                  `Graduates of ${department.name} are trained rigorously through campus placement drives, technical aptitude workshops, and mock interviews, securing placements across leading technology MNCs and core industries.`}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/10 rounded-xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-accent-300 font-heading font-bold text-body-sm">
                <Briefcase className="h-5 w-5" />
                <span>Top Recruiting Partners</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {(
                  department.placements?.topRecruiters || [
                    "TCS",
                    "Infosys",
                    "Wipro",
                    "Cognizant",
                    "L&T Technology Services",
                    "QBurst",
                    "Sutherland",
                  ]
                ).map((rec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-white"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. Achievements Section */}
      <Section id="achievements" tone="canvas" spacing="sm">
        <Container>
          <div className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <Badge variant="accent" size="sm">
                DEPARTMENT HONOURS
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900">
                Student &amp; Faculty Achievements
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(
                department.achievements || [
                  {
                    title: "University KTU Top Ranks",
                    year: "2024-2025",
                    description: "Students secured top ranks with distinction in university examinations.",
                  },
                  {
                    title: "State Hackathon Finalists",
                    year: "2025",
                    description: "Department innovation teams won awards at Kerala State Hackathons and IEDC summits.",
                  },
                  {
                    title: "Research Publications",
                    year: "2025",
                    description: "Faculty and students published technical papers in peer-reviewed national & international journals.",
                  },
                ]
              ).map((ach, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-3 hover:border-brand-500 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-accent-50 text-accent-700 inline-block">
                    <Trophy className="h-6 w-6" />
                  </div>
                  {ach.year && (
                    <span className="block text-xs font-mono font-bold text-brand-700">
                      {ach.year}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-h4 text-ink-900">
                    {ach.title}
                  </h3>
                  {ach.description && (
                    <p className="text-body-sm text-ink-600 leading-relaxed">
                      {ach.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 11. Contact Section */}
      <Section id="contact" tone="white" spacing="sm">
        <Container>
          <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="mint" size="sm">
                GET IN TOUCH
              </Badge>
              <h3 className="font-heading font-bold text-h3 text-ink-900">
                Department Office &amp; Helpdesk
              </h3>
              <p className="text-body-sm text-ink-600">
                For curriculum queries, academic counseling, or lab visits:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-body-sm font-semibold text-brand-900">
              <a
                href={`mailto:${department.contact?.email || site.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border hover:bg-brand-100 transition-colors"
              >
                <Mail className="h-4 w-4 text-brand-700" />
                <span>{department.contact?.email || site.contact.email}</span>
              </a>
              <a
                href={`tel:${department.contact?.phone || site.contact.phones[0]}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border hover:bg-brand-100 transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-700" />
                <span>{department.contact?.phone || site.contact.phones[0]}</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* 12. Admissions CTA */}
      <CTABanner
        ctaBanner={{
          eyebrow: "ADMISSIONS OPEN FOR 2026",
          title: `Join ${department.name} at MGMCET`,
          description: `Kickstart your engineering career with world-class faculty, modern laboratories, and proven placement records at MGMCET Pampakuda.`,
          primaryCta: { label: "Apply Now", href: site.applyNowUrl },
          secondaryCta: { label: "Contact Admissions", href: "/contact" },
        }}
      />
    </div>
  );
}
