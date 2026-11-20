import React from "react";
import { ArrowRight, Download } from "lucide-react";
import type { CTABannerContent } from "@/types";
import { Container } from "@/components/layout/Container";
import { SmartLink } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface CTABannerProps {
  ctaBanner: CTABannerContent;
  className?: string;
}

/**
 * Institutional CTA Banner inspiring prospective students to join MGMCET.
 * Features dark forest green container, gold Apply Now button, and prospectus download.
 */
export function CTABanner({ ctaBanner, className }: CTABannerProps) {
  return (
    <section aria-label="Admissions Call to Action" className={cn("py-12 sm:py-16 bg-surface", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-brand-900 text-white p-5 sm:p-10 lg:p-12 shadow-pop border border-brand-800">
          {/* Subtle decorative background gradient */}
          <div
            className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-brand-700/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-raised flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
            {/* Left Narrative */}
            <div className="space-y-2.5 sm:space-y-3 text-center lg:text-left max-w-2xl">
              <p className="font-heading text-eyebrow font-bold uppercase tracking-widest text-accent-400">
                {ctaBanner.eyebrow}
              </p>
              <h2 className="font-heading text-h2 font-bold text-white tracking-tight leading-tight">
                {ctaBanner.title}
              </h2>
              <p className="text-body-sm sm:text-body-lg text-brand-100/90 leading-relaxed max-w-xl">
                {ctaBanner.description}
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 shrink-0">
              {ctaBanner.primaryCta && (
                <SmartLink href={ctaBanner.primaryCta.href} isExternal>
                  <Button
                    variant="accent"
                    size="md"
                    pill
                    className="font-bold tracking-wide shadow-md group text-xs sm:text-body-sm"
                  >
                    <span>{ctaBanner.primaryCta.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </SmartLink>
              )}

              {ctaBanner.secondaryCta && ctaBanner.secondaryCta.href && (
                <SmartLink href={ctaBanner.secondaryCta.href} isPdf download>
                  <Button
                    variant="outline-light"
                    size="md"
                    pill
                    className="font-medium tracking-wide group text-xs sm:text-body-sm"
                  >
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span>{ctaBanner.secondaryCta.label}</span>
                  </Button>
                </SmartLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
