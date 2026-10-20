import React from "react";
import { ArrowRight } from "lucide-react";
import type { WhySection } from "@/types";
import { Container } from "@/components/layout/Container";
import { SmartLink } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/shared/Icon";
import { IconBox } from "@/components/ui/IconBox";
import { cn } from "@/lib/cn";

export interface FeatureGridProps {
  why: WhySection;
  className?: string;
}

/**
 * "Why MGM" Section featuring a mint background with decorative ribbon accents,
 * institutional narrative on the left, and a 2x3 hairline-separated feature grid on the right.
 */
export function FeatureGrid({ why, className }: FeatureGridProps) {
  return (
    <section
      aria-labelledby="why-mgm-heading"
      className={cn("relative py-16 sm:py-24 bg-brand-50 overflow-hidden", className)}
    >
      {/* Decorative Gold & Green Ribbon Shape at right edge */}
      <div
        className="absolute top-0 right-0 w-48 sm:w-80 h-full pointer-events-none opacity-40 select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 320 800"
          fill="none"
          className="absolute top-0 right-0 w-full h-full object-cover"
        >
          <path
            d="M320 0L80 800H320V0Z"
            fill="url(#ribbon-gold)"
          />
          <path
            d="M320 180L140 800H260L320 450V180Z"
            fill="var(--color-brand-700)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="ribbon-gold" x1="80" y1="0" x2="320" y2="800" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-accent-500)" stopOpacity="0.45" />
              <stop offset="1" stopColor="var(--color-accent-600)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Container className="relative z-raised">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-5 space-y-5">
            <p className="font-heading text-eyebrow font-bold uppercase tracking-widest text-accent-600">
              {why.eyebrow}
            </p>
            <h2
              id="why-mgm-heading"
              className="font-heading text-h2 font-bold text-ink-900 tracking-tight leading-tight text-balance"
            >
              {why.title}
            </h2>
            <p className="text-body text-ink-600 leading-relaxed max-w-lg">
              {why.description}
            </p>
            <div className="pt-2">
              <SmartLink href={why.cta.href}>
                <Button variant="accent" size="lg" pill className="font-bold shadow-sm group">
                  <span>{why.cta.label}</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </SmartLink>
            </div>
          </div>

          {/* Right Column: 2x3 Hairline Feature Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl bg-surface/90 border border-brand-100/90 shadow-card divide-y sm:divide-y-0 sm:divide-x divide-border/80 overflow-hidden">
              {/* Left Column (Items 0, 1, 2) */}
              <div className="divide-y divide-border/80">
                {why.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-6 sm:p-7 space-y-3">
                    <IconBox
                      variant="mint"
                      size="sm"
                      shape="rounded"
                      className="bg-brand-50 text-brand-700"
                    >
                      <Icon name={item.iconName || "Users"} className="h-5 w-5" />
                    </IconBox>
                    <h3 className="font-heading font-bold text-body text-ink-900">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-ink-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column (Items 3, 4, 5) */}
              <div className="divide-y divide-border/80">
                {why.items.slice(3, 6).map((item) => (
                  <div key={item.id} className="p-6 sm:p-7 space-y-3">
                    <IconBox
                      variant="mint"
                      size="sm"
                      shape="rounded"
                      className="bg-brand-50 text-brand-700"
                    >
                      <Icon name={item.iconName || "Home"} className="h-5 w-5" />
                    </IconBox>
                    <h3 className="font-heading font-bold text-body text-ink-900">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-ink-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
