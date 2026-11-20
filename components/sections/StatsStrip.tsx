"use client";

import React, { useState, useEffect, useRef } from "react";
import type { Stat } from "@/types";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/cn";

export interface StatsStripProps {
  stats: Stat[];
  className?: string;
}

/** Animated number count-up hook */
function useCountUp(targetStr: string, shouldAnimate: boolean) {
  const [animatedValue, setAnimatedValue] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    // Extract digits and suffix
    const match = targetStr.match(/^(\d+)(.*)$/);
    if (!match) return;

    const endValue = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const durationMs = 1600;
    const startTime = performance.now();

    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.round(easedProgress * endValue);

      setAnimatedValue(`${currentNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetStr, shouldAnimate]);

  return animatedValue ?? targetStr;
}

function StatCardItem({
  stat,
  isInView,
  isLast,
}: {
  stat: Stat;
  isInView: boolean;
  isLast: boolean;
}) {
  const animatedValue = useCountUp(stat.value, isInView && Boolean(stat.animated));

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 sm:gap-4 p-2.5 sm:py-3 sm:px-5 rounded-xl hover:bg-brand-50/50 transition-colors",
        !isLast && "lg:border-r lg:border-border/80"
      )}
    >
      <div className="p-2 sm:p-2.5 rounded-xl bg-brand-50 text-brand-700 shrink-0">
        <Icon name={stat.iconName || "Award"} className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>

      <div className="space-y-0.5 min-w-0">
        <p className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-ink-900 tracking-tight leading-none">
          {animatedValue}
        </p>
        <p className="font-heading text-[11px] sm:text-caption font-medium text-ink-600 leading-tight truncate">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

/**
 * Floating Stats card showcasing institutional milestones and accreditations.
 * Features an intersection-observer animated count-up and structured hairline dividers.
 */
export function StatsStrip({ stats, className }: StatsStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Key College Statistics"
      className={cn("py-4 sm:py-8 bg-canvas", className)}
    >
      <Container>
        <div className="rounded-2xl bg-surface border border-border shadow-card p-2 sm:p-4 grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3">
          {stats.map((stat, idx) => (
            <StatCardItem
              key={stat.id}
              stat={stat}
              isInView={isInView}
              isLast={idx === stats.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
