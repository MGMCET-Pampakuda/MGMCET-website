import React from "react";
import { ArrowRight } from "lucide-react";
import type { ProgramCard } from "@/types";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SmartLink } from "@/components/ui/Link";
import { Icon } from "@/components/shared/Icon";
import { IconBox } from "@/components/ui/IconBox";
import { cn } from "@/lib/cn";

export interface ProgramCardsProps {
  programs: ProgramCard[];
  className?: string;
}

/**
 * Academic Programs card grid displaying the 3 official program levels:
 * B.Tech (5 programs), M.Tech (2 programs), and Polytechnic / Diploma (8 programs).
 */
export function ProgramCards({ programs, className }: ProgramCardsProps) {
  return (
    <section
      aria-labelledby="academic-programs-heading"
      className={cn("py-16 sm:py-24 bg-canvas", className)}
    >
      <Container>
        <SectionHeader
          eyebrow="COURSES WE OFFER"
          title="Academic Programs"
          description="Choose from a range of industry-aligned undergraduate, postgraduate, and diploma programmes designed to shape your engineering career."
          action={
            <SmartLink
              href="/departments"
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-brand-700 hover:text-brand-900 group"
            >
              <span>View All Programs</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </SmartLink>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program) => (
            <SmartLink
              key={program.id}
              href={program.href}
              className="group block rounded-card bg-surface p-7 sm:p-8 border border-border shadow-xs hover:border-brand-600 hover:shadow-pop hover:-translate-y-1 transition-all"
            >
              <div className="flex flex-col h-full justify-between space-y-8">
                <div className="space-y-5">
                  <IconBox
                    variant="mint"
                    size="md"
                    shape="rounded"
                    className="group-hover:bg-brand-700 group-hover:text-white transition-colors"
                  >
                    <Icon
                      name={program.iconName || "GraduationCap"}
                      className="h-6 w-6"
                    />
                  </IconBox>

                  <div>
                    <h3 className="font-heading text-h3 font-bold text-ink-900 group-hover:text-brand-800 transition-colors">
                      {program.level}
                    </h3>
                    <p className="font-heading text-body-sm font-semibold text-brand-700 mt-1">
                      {program.title}
                    </p>
                    <p className="text-caption text-ink-500 mt-1">
                      {program.duration} • {program.programCount} Specializations
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <span className="font-heading text-xs uppercase tracking-wider font-semibold text-ink-400 group-hover:text-brand-700 transition-colors">
                    Explore Details
                  </span>
                  <div className="h-8 w-8 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
