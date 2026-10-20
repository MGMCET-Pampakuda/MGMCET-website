import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CampusLifeSection } from "@/types";
import { Container } from "@/components/layout/Container";
import { SmartLink } from "@/components/ui/Link";
import { Icon } from "@/components/shared/Icon";
import { IconBox } from "@/components/ui/IconBox";
import { cn } from "@/lib/cn";

export interface CampusLifeSplitProps {
  campusLife: CampusLifeSection;
  className?: string;
}

/**
 * Campus Life Section matching the reference layout:
 * Left: Big rounded campus life photo with "Where Life Meets MGM" Caveat script caption.
 * Middle: Narrative with "Explore Campus Life" link and 4 activity stats.
 * Right: Hairline-separated vertical link list for clubs, sports, hostel, events, and gallery.
 */
export function CampusLifeSplit({ campusLife, className }: CampusLifeSplitProps) {
  return (
    <section
      aria-labelledby="campus-life-heading"
      className={cn("py-16 sm:py-24 bg-canvas overflow-hidden", className)}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column (5 cols): Photo with Corner Accents & Cursive Caption */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-card border border-border group">
              <Image
                src={campusLife.image}
                alt={campusLife.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-black/20"
                aria-hidden="true"
              />

              {/* Decorative gold corner accent */}
              <div
                className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent-400/80 rounded-tl-lg pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom Script Caption */}
              {campusLife.imageCaption && (
                <div className="absolute bottom-5 left-6 z-raised">
                  <p className="font-script text-white text-3xl sm:text-4xl tracking-wide drop-shadow-md">
                    {campusLife.imageCaption}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column (4 cols): Narrative & 4 Activity Stats */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-5 py-2">
            <p className="font-heading text-eyebrow font-bold uppercase tracking-widest text-accent-600">
              {campusLife.eyebrow}
            </p>
            <h2
              id="campus-life-heading"
              className="font-heading text-h2 font-bold text-ink-900 tracking-tight leading-tight text-balance"
            >
              {campusLife.title}
            </h2>
            <p className="text-body text-ink-600 leading-relaxed">
              {campusLife.description}
            </p>
            <div className="pt-1">
              <SmartLink
                href={campusLife.cta.href}
                className="inline-flex items-center gap-2 font-heading font-semibold text-brand-700 hover:text-brand-900 group"
              >
                <span>{campusLife.cta.label}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </SmartLink>
            </div>

            {/* 4 Activity Stats Grid */}
            {campusLife.stats && (
              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-border">
                {campusLife.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="font-heading text-h3 font-bold text-brand-800">
                      {stat.value}
                    </p>
                    <p className="text-caption text-ink-500 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (3 cols): Vertical Link List */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="rounded-2xl bg-surface border border-border shadow-card divide-y divide-border/80 overflow-hidden">
              {campusLife.quickLinks.map((link) => (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-4 sm:p-4.5 hover:bg-brand-50/70 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <IconBox
                      variant="mint"
                      size="sm"
                      shape="rounded"
                      className="group-hover:bg-brand-700 group-hover:text-white transition-colors"
                    >
                      <Icon
                        name={link.iconName || "Sparkles"}
                        className="h-4 w-4"
                      />
                    </IconBox>
                    <span className="font-heading text-body-sm font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 text-ink-400 group-hover:text-brand-700 group-hover:translate-x-1 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
