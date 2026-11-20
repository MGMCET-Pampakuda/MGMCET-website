"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, Volume2, VolumeX, Maximize2, Play, X } from "lucide-react";
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
 * Left: Big rounded campus life video card with "Where Life Meets MGM" Caveat script caption.
 *       Autoplays (muted) when scrolled into view, pauses when out of view.
 *       Clicking video opens full-size modal player with audio and native controls.
 * Middle: Narrative with "Explore Campus Life" link and 4 activity stats.
 * Right: Hairline-separated vertical link list for clubs, sports, hostel, events, and gallery.
 */
export function CampusLifeSplit({ campusLife, className }: CampusLifeSplitProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay strictly when scrolled into view, pause when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Browser policy may require user interaction
                });
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px",
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle escape key to close video modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <section
        aria-labelledby="campus-life-heading"
        className={cn("py-12 sm:py-20 lg:py-24 bg-canvas overflow-hidden", className)}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* Left Column (5 cols): Campus Intro Video with Corner Accents & Cursive Caption */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[360px] rounded-2xl overflow-hidden shadow-card border border-border group bg-brand-950 cursor-pointer"
                title="Click to watch full video"
              >
                <video
                  ref={videoRef}
                  src="/video/mgmintrovideo.mp4"
                  poster={campusLife.image}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay for readability of script text */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-black/30 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Decorative gold corner accent */}
                <div
                  className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 border-t-2 border-l-2 border-accent-400/80 rounded-tl-lg pointer-events-none z-raised"
                  aria-hidden="true"
                />

                {/* Center hover play button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-900/90 text-white flex items-center justify-center shadow-card border border-white/20 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-ink-900 transition-all">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Top Controls: Expand Badge + Audio Toggle Control */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-raised flex items-center gap-2">
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 text-white/90 text-xs backdrop-blur-xs group-hover:bg-accent-500 group-hover:text-ink-900 transition-colors font-medium">
                    <Maximize2 className="h-3 w-3" />
                    <span>Watch Full Video</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="p-2 rounded-full bg-black/55 text-white/90 hover:bg-black/80 hover:text-white backdrop-blur-xs transition-colors focus-visible:outline-2 focus-visible:outline-accent-400"
                    aria-label={isMuted ? "Unmute campus intro video" : "Mute campus intro video"}
                    title={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Bottom Script Caption */}
                {campusLife.imageCaption && (
                  <div className="absolute bottom-4 sm:bottom-5 left-5 sm:left-6 z-raised pointer-events-none">
                    <p className="font-script text-white text-2xl sm:text-4xl tracking-wide drop-shadow-md">
                      {campusLife.imageCaption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Column (4 cols): Narrative & 4 Activity Stats */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-5 py-2">
              <p className="font-heading text-eyebrow font-bold uppercase tracking-widest text-accent-600">
                {campusLife.eyebrow}
              </p>
              <h2
                id="campus-life-heading"
                className="font-heading text-h2 font-bold text-ink-900 tracking-tight leading-tight text-balance"
              >
                {campusLife.title}
              </h2>
              <p className="text-body-sm sm:text-body text-ink-600 leading-relaxed">
                {campusLife.description}
              </p>
              <div className="pt-1">
                <SmartLink
                  href={campusLife.cta.href}
                  className="inline-flex items-center gap-2 font-heading font-semibold text-xs sm:text-body-sm text-brand-700 hover:text-brand-900 group"
                >
                  <span>{campusLife.cta.label}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </SmartLink>
              </div>

              {/* 4 Activity Stats Grid */}
              {campusLife.stats && (
                <div className="pt-4 grid grid-cols-2 gap-3 sm:gap-4 border-t border-border">
                  {campusLife.stats.map((stat, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <p className="font-heading text-xl sm:text-h3 font-bold text-brand-800">
                        {stat.value}
                      </p>
                      <p className="text-[11px] sm:text-caption text-ink-500 font-medium">
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
                    className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-brand-50/70 transition-colors group"
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
                          aria-hidden="true"
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

      {/* ── FULL-SCREEN VIDEO POPUP MODAL ─────────────────────────────────── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400"
            aria-label="Close video player"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[88vh] rounded-2xl overflow-hidden bg-brand-950 border border-white/10 shadow-2xl flex flex-col"
          >
            <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
              <video
                src="/video/mgmintrovideo.mp4"
                controls
                autoPlay
                playsInline
                className="w-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-brand-950 text-white border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                  Where Life Meets MGM — Campus Tour & Highlights
                </h3>
                <p className="text-caption text-brand-100/70">
                  MGM College of Engineering and Technology, Pampakuda
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-pill bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
