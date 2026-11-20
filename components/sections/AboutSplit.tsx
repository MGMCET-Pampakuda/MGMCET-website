"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import type { AboutSplit as AboutSplitContent } from "@/types";
import { Container } from "@/components/layout/Container";
import { SmartLink } from "@/components/ui/Link";
import { Icon } from "@/components/shared/Icon";
import { IconBox } from "@/components/ui/IconBox";
import { Modal } from "@/components/ui/Modal";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface AboutSplitProps {
  about: AboutSplitContent;
  className?: string;
}

/**
 * 3-Column About Section matching the reference layout:
 * Left: Campus image with play button overlay and Caveat cursive caption.
 * Center: Institutional introduction with Learn More link.
 * Right: Stacked Vision and Mission cards.
 */
export function AboutSplit({ about, className }: AboutSplitProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section
        aria-label="About MGMCET"
        className={cn("py-16 sm:py-24 bg-surface", className)}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* 1. Left Column: Image with Play Overlay & Cursive Caption */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[240px] sm:min-h-[320px] rounded-2xl overflow-hidden shadow-card border border-border group">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-black/20"
                  aria-hidden="true"
                />

                {/* Center Play Button Overlay (only if tour video is available) */}
                {site.tourVideoEmbedUrl && (
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    aria-label="Watch college overview video"
                    className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-white/90 text-brand-900 shadow-pop flex items-center justify-center hover:scale-110 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-accent-500 cursor-pointer"
                  >
                    <Play className="h-6 w-6 fill-current ml-1 text-brand-700" aria-hidden="true" />
                  </button>
                )}

                {/* Bottom Left Script Caption */}
                {about.imageCaption && (
                  <div className="absolute bottom-4 left-5 z-raised">
                    <p className="font-script text-white text-2xl sm:text-3xl tracking-wide drop-shadow-md">
                      {about.imageCaption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Center Column: Narrative Introduction */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-5 py-2">
              <p className="font-heading text-eyebrow font-bold uppercase tracking-widest text-accent-600">
                {about.eyebrow}
              </p>
              <h2 className="font-heading text-h2 font-bold text-ink-900 tracking-tight leading-tight">
                {about.title}
              </h2>
              <p className="text-body text-ink-600 leading-relaxed pt-1">
                {about.description}
              </p>
              <div className="pt-2">
                <SmartLink
                  href={about.cta.href}
                  aria-label="Learn more about MGM College of Engineering and Technology"
                  className="inline-flex items-center gap-2 font-heading font-semibold text-brand-700 hover:text-brand-900 group"
                >
                  <span>{about.cta.label}</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </SmartLink>
              </div>
            </div>

            {/* 3. Right Column: Stacked Vision & Mission Cards */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-4 sm:gap-5">
              {/* Vision Card */}
              {about.vision && (
                <div className="p-4 sm:p-6 rounded-xl bg-brand-50/70 border border-brand-100/90 space-y-2.5 transition-all hover:bg-brand-50 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <IconBox
                      variant="surface"
                      size="sm"
                      shape="rounded"
                      className="text-brand-700 bg-surface shadow-xs"
                    >
                      <Icon name={about.vision.iconName || "Eye"} className="h-4 w-4" />
                    </IconBox>
                    <h3 className="font-heading font-bold text-h4 text-ink-900">
                      {about.vision.title}
                    </h3>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    {about.vision.text}
                  </p>
                </div>
              )}

              {/* Mission Card */}
              {about.mission && (
                <div className="p-4 sm:p-6 rounded-xl bg-brand-50/70 border border-brand-100/90 space-y-2.5 transition-all hover:bg-brand-50 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <IconBox
                      variant="surface"
                      size="sm"
                      shape="rounded"
                      className="text-accent-600 bg-surface shadow-xs"
                    >
                      <Icon name={about.mission.iconName || "Target"} className="h-4 w-4" />
                    </IconBox>
                    <h3 className="font-heading font-bold text-h4 text-ink-900">
                      {about.mission.title}
                    </h3>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    {about.mission.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Overview Video Modal */}
      {site.tourVideoEmbedUrl && (
        <Modal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          title="About MGMCET"
          description="Empowering minds and shaping tomorrow through quality technical education"
          size="xl"
        >
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-brand-950 flex items-center justify-center">
            <iframe
              src={site.tourVideoEmbedUrl}
              title="MGMCET Overview"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal>
      )}
    </>
  );
}
