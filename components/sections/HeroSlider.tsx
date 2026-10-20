"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Play, ArrowUpRight } from "lucide-react";
import type { HeroSlide } from "@/types";
import { SmartLink } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface HeroSliderProps {
  slides: HeroSlide[];
  className?: string;
  autoplayInterval?: number;
}

/**
 * Institutional Hero Slider powered by Embla Carousel.
 * Features smooth transitions, dark-green gradient overlays, Caveat script accents,
 * slide counter (01 / 03), pause on hover, and an interactive video modal.
 */
export function HeroSlider({
  slides,
  className,
  autoplayInterval = 6000,
}: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay with hover pause
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [emblaApi, isPaused, autoplayInterval]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      scrollNext();
    }
  };

  return (
    <>
      <section
        aria-label="Campus Hero Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className={cn(
          "relative w-full overflow-hidden bg-brand-950 text-white select-none focus:outline-none",
          className
        )}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] min-w-0 h-[560px] sm:h-[620px] lg:h-[680px] flex items-center"
              >
                {/* Full-bleed background photo */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt || slide.headline}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  {/* Left-to-right dark green institutional gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-transparent/30"
                    aria-hidden="true"
                  />
                  {/* Bottom subtle vignette */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-raised max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
                    {/* Eyebrow */}
                    <p className="font-heading text-xs sm:text-eyebrow font-bold uppercase tracking-widest text-brand-100/90 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
                      <span>{slide.eyebrow}</span>
                    </p>

                    {/* Headline */}
                    <h1 className="font-heading text-display font-bold text-white tracking-tight leading-[1.1] text-balance">
                      <span>{slide.headline} </span>
                      {slide.headlineAccent && (
                        <span className="font-script text-accent-400 font-normal italic inline-block transform -rotate-1 text-[1.15em] ml-1">
                          {slide.headlineAccent}
                        </span>
                      )}
                    </h1>

                    {/* Description */}
                    <p className="text-body sm:text-body-lg text-brand-100/90 leading-relaxed max-w-xl text-pretty">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
                      {slide.primaryCta && (
                        <SmartLink href={slide.primaryCta.href}>
                          <Button
                            variant="accent"
                            size="lg"
                            pill
                            className="font-bold tracking-wide shadow-md group text-ink-900"
                          >
                            <span>{slide.primaryCta.label}</span>
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </Button>
                        </SmartLink>
                      )}

                      {slide.secondaryCta && (
                        slide.secondaryCta.isVideoModal ? (
                          <Button
                            variant="outline-light"
                            size="lg"
                            pill
                            onClick={() => setIsVideoModalOpen(true)}
                            className="font-medium tracking-wide group"
                          >
                            <span className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-2 group-hover:bg-accent-500 group-hover:text-ink-900 transition-colors">
                              <Play className="h-3 w-3 fill-current ml-0.5" aria-hidden="true" />
                            </span>
                            <span>{slide.secondaryCta.label}</span>
                          </Button>
                        ) : (
                          <SmartLink href={slide.secondaryCta.href}>
                            <Button
                              variant="outline-light"
                              size="lg"
                              pill
                              className="font-medium tracking-wide"
                            >
                              <span>{slide.secondaryCta.label}</span>
                              <ArrowUpRight className="h-4 w-4 ml-1" aria-hidden="true" />
                            </Button>
                          </SmartLink>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Slide Counter & Controls */}
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 lg:right-12 z-raised flex items-center gap-3">
          <div className="font-heading text-body-sm font-semibold tracking-wider text-white/90 bg-brand-950/70 backdrop-blur-xs px-3 py-1 rounded-pill border border-white/10">
            <span className="text-accent-400">
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1.5 text-white/40">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/30 bg-brand-950/50 backdrop-blur-xs text-white flex items-center justify-center hover:bg-white hover:text-brand-950 hover:border-white transition-all focus-visible:outline-2 focus-visible:outline-accent-400 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/30 bg-brand-950/50 backdrop-blur-xs text-white flex items-center justify-center hover:bg-white hover:text-brand-950 hover:border-white transition-all focus-visible:outline-2 focus-visible:outline-accent-400 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Campus Tour Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="MGM CET Campus Tour"
        description="Experience the academic ecosystem and modern infrastructure at Pampakuda"
        size="xl"
      >
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-brand-950 flex items-center justify-center">
          {site.tourVideoEmbedUrl && (
            <iframe
              src={site.tourVideoEmbedUrl}
              title="MGMCET Campus Tour"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </Modal>
    </>
  );
}
