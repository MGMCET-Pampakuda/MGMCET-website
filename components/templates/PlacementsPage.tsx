import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { PlacementsContent } from "@/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Icon } from "@/components/shared/Icon";
import { CTABanner } from "@/components/sections/CTABanner";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface PlacementsPageProps {
  content: PlacementsContent;
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  className?: string;
}

/**
 * PlacementsPage template for the Training & Placement Cell.
 * Features placement performance metrics, corporate recruiters gallery,
 * placement preparation process roadmap, past drives table, and cell contact.
 */
export function PlacementsPage({
  content,
  breadcrumbItems,
  heroImage,
  className,
}: PlacementsPageProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title="Training &amp; Placement Cell"
        description={content.description}
        breadcrumbItems={breadcrumbItems}
        image={heroImage}
        badge="Career Development &amp; Placements"
      />

      {/* 1. Placement Stats Strip */}
      <Section tone="canvas" spacing="sm">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-surface border border-border p-6 shadow-xs flex items-center gap-4 hover:border-brand-500 transition-colors"
              >
                <IconBox
                  variant="mint"
                  size="lg"
                  shape="rounded"
                  className="bg-brand-50 text-brand-700 shrink-0"
                >
                  <Icon name={stat.iconName || "Briefcase"} className="h-6 w-6" />
                </IconBox>
                <div>
                  <p className="font-heading text-h2 font-bold text-ink-900 leading-none">
                    {stat.value}
                  </p>
                  <p className="text-body-sm font-medium text-ink-600 mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Corporate Recruiters Grid */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="space-y-8 text-center max-w-3xl mx-auto">
            <Badge variant="accent" size="sm">
              INDUSTRY PARTNERS
            </Badge>
            <h2 className="font-heading font-bold text-h2 text-ink-900">
              Our Leading Campus Recruiters
            </h2>
            <p className="text-body text-ink-600">
              MGMCET graduates are employed across prestigious multi-national corporations, government enterprises, and innovative engineering firms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 pt-10">
            {content.recruiters.map((recruiter, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-surface border border-border p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-brand-500 hover:shadow-card transition-all aspect-[4/3]"
              >
                <div className="relative h-12 w-28 mb-2">
                  <Image
                    src={recruiter.logo}
                    alt={recruiter.name}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <span className="font-heading font-semibold text-xs text-ink-800">
                  {recruiter.name}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. 4-Step Placement Process Roadmap */}
      <Section tone="mint" spacing="default">
        <Container>
          <div className="space-y-8 max-w-3xl">
            <Badge variant="mint" size="sm">
              TRAINING ROADMAP
            </Badge>
            <h2 className="font-heading font-bold text-h2 text-ink-900">
              Campus Placement Process &amp; Training
            </h2>
            <p className="text-body text-ink-600">
              From the first year onwards, students undergo continuous aptitude training, soft-skills grooming, mock interviews, and industry-tailored coding bootcamps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {content.process.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl bg-surface border border-brand-100 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-accent-700 bg-accent-100/70 px-3 py-1 rounded-full inline-block">
                    STEP {step.step}
                  </span>
                  <div className="p-3 rounded-xl bg-brand-50 text-brand-700 inline-block">
                    <Icon name={step.iconName || "CheckCircle2"} className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-h4 text-ink-900">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Past Drives Table */}
      {content.pastDrives && content.pastDrives.length > 0 && (
        <Section tone="white" spacing="default">
          <Container>
            <div className="space-y-6">
              <div className="max-w-2xl space-y-2">
                <Badge variant="mint" size="sm">
                  RECRUITMENT DRIVES
                </Badge>
                <h2 className="font-heading font-bold text-h2 text-ink-900">
                  Recent Placement Drives &amp; Offers
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-xs">
                <table className="w-full text-left text-body-sm">
                  <thead className="bg-canvas border-b border-border text-xs uppercase tracking-wider text-ink-500 font-heading">
                    <tr>
                      <th className="px-6 py-4">Company Name</th>
                      <th className="px-6 py-4">Academic Year</th>
                      <th className="px-6 py-4">Students Placed</th>
                      <th className="px-6 py-4">Package (LPA)</th>
                      <th className="px-6 py-4">Drive Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/80">
                    {content.pastDrives.map((drive, idx) => (
                      <tr key={idx} className="hover:bg-brand-50/40 transition-colors">
                        <td className="px-6 py-4 font-heading font-bold text-ink-900">
                          {drive.company}
                        </td>
                        <td className="px-6 py-4 text-ink-600 font-mono text-xs">
                          {drive.year}
                        </td>
                        <td className="px-6 py-4 font-semibold text-brand-800">
                          {drive.studentsPlaced ? `${drive.studentsPlaced} Offers` : "—"}
                        </td>
                        <td className="px-6 py-4 text-accent-700 font-bold">
                          {drive.package || "As per industry norms"}
                        </td>
                        <td className="px-6 py-4 text-ink-500 text-xs">
                          {drive.description || "On-Campus Recruitment Drive"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 5. Placement Cell Contact */}
      <Section tone="canvas" spacing="sm">
        <Container size="narrow">
          <div className="rounded-2xl bg-brand-900 text-white p-6 sm:p-10 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="accent" size="sm" pill>
                CORPORATE INVITATIONS
              </Badge>
              <h3 className="font-heading font-bold text-h3 text-white">
                Partner with MGMCET for Campus Hiring
              </h3>
              <p className="text-body-sm text-brand-100">
                Contact our Training &amp; Placement Officer to schedule campus recruitment drives:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${content.teamContact?.email || site.contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Email Placement Cell</span>
              </a>
              <a
                href={`tel:${content.teamContact?.phone || site.contact.phones[0]}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-body-sm border border-white/20 transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Call Helpdesk</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner ctaBanner={home.ctaBanner} />
    </div>
  );
}
