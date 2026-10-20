import React from "react";
import Image from "next/image";
import { ArrowRight, Clock, Users, Award, CheckCircle2 } from "lucide-react";
import type { DepartmentLevel, DepartmentMeta, CTABannerContent } from "@/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { CTABanner } from "@/components/sections/CTABanner";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

export interface ProgramLevelIntro {
  overview: string;
  duration: string;
  totalIntake?: number;
  eligibility?: string;
  affiliation?: string;
  keyHighlights?: string[];
}

export interface ProgramLevelPageProps {
  level: DepartmentLevel;
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  badge?: string;
  intro: ProgramLevelIntro;
  departments: DepartmentMeta[];
  ctaBanner?: CTABannerContent;
  className?: string;
}

/**
 * ProgramLevelPage template for degree level listing pages (B.Tech, M.Tech, Polytechnic).
 * Features PageHero, level overview card with intake & duration stats,
 * a grid of department cards with visual thumbnails, and an admissions CTA banner.
 */
export function ProgramLevelPage({
  level,
  title,
  description,
  breadcrumbItems,
  heroImage,
  badge,
  intro,
  departments,
  ctaBanner = home.ctaBanner,
  className,
}: ProgramLevelPageProps) {
  const levelBadgeMap: Record<DepartmentLevel, string> = {
    btech: "Undergraduate (UG)",
    mtech: "Postgraduate (PG)",
    polytechnic: "Diploma Stream",
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title={title}
        description={description}
        breadcrumbItems={breadcrumbItems}
        image={heroImage}
        badge={badge || levelBadgeMap[level]}
      />

      {/* Intro & Level Highlights Section */}
      <Section tone="canvas" spacing="sm">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Level Overview Narrative */}
            <div className="lg:col-span-8 rounded-2xl bg-surface border border-border p-6 sm:p-10 shadow-xs space-y-4">
              <Badge variant="mint" size="sm">
                PROGRAM OVERVIEW
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900 leading-tight">
                About the {title} Programme
              </h2>
              <p className="text-body text-ink-700 leading-relaxed">
                {intro.overview}
              </p>

              {intro.keyHighlights && intro.keyHighlights.length > 0 && (
                <div className="pt-4 border-t border-border/70 space-y-2.5">
                  <h3 className="font-heading font-semibold text-body-sm text-ink-900">
                    Key Highlights &amp; Features:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {intro.keyHighlights.map((hl, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-body-sm text-ink-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Quick Facts Card */}
            <div className="lg:col-span-4 rounded-2xl bg-brand-900 text-white p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Badge variant="accent" size="sm" pill>
                  QUICK FACTS
                </Badge>
                <h3 className="font-heading font-bold text-h3 text-white">
                  Programme Details
                </h3>

                <ul className="space-y-4 pt-2">
                  <li className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-accent-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-200">Duration</p>
                      <p className="font-heading font-bold text-body text-white">
                        {intro.duration}
                      </p>
                    </div>
                  </li>

                  {intro.totalIntake && (
                    <li className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 text-accent-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-brand-200">Total Sanctioned Intake</p>
                        <p className="font-heading font-bold text-body text-white">
                          {intro.totalIntake} Seats
                        </p>
                      </div>
                    </li>
                  )}

                  <li className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-accent-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-200">Affiliation &amp; Approval</p>
                      <p className="font-heading font-bold text-body text-white">
                        {intro.affiliation || "AICTE Approved • KTU / DTE Kerala"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {intro.eligibility && (
                <div className="p-4 rounded-xl bg-white/10 text-xs text-brand-100 leading-relaxed border border-white/10">
                  <span className="font-bold text-accent-300 block mb-1">
                    Eligibility:
                  </span>
                  {intro.eligibility}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Department Cards Grid */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <Badge variant="mint" size="sm">
                SPECIALIZATIONS ({departments.length})
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900 tracking-tight">
                Available Disciplines in {title}
              </h2>
              <p className="text-body-sm sm:text-body text-ink-600">
                Explore individual department curriculums, laboratories, faculty, and placement outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {departments.map((dept) => (
                <SmartLink
                  key={dept.id}
                  href={dept.href}
                  className="group rounded-2xl bg-surface border border-border hover:border-brand-600 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all flex flex-col overflow-hidden"
                >
                  {/* Department Thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-brand-50 overflow-hidden">
                    <Image
                      src={dept.thumbnail || dept.image}
                      alt={dept.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="dark" size="sm" pill>
                        Intake: {dept.intake || 60}
                      </Badge>
                    </div>
                  </div>

                  {/* Department Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-caption uppercase font-semibold text-accent-700 tracking-wider">
                        {dept.duration}
                      </span>
                      <h3 className="font-heading font-bold text-h4 text-ink-900 group-hover:text-brand-800 transition-colors">
                        {dept.name}
                      </h3>
                      {dept.shortName && (
                        <p className="text-body-sm text-ink-500 font-medium">
                          ({dept.shortName})
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between text-body-sm font-semibold text-brand-700 group-hover:text-brand-900">
                      <span>View Department Details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </SmartLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Admissions CTA */}
      <CTABanner ctaBanner={ctaBanner} />
    </div>
  );
}
