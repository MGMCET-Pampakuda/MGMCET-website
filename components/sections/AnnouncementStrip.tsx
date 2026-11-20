"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Megaphone, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { SmartLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";
import { subscribeToLiveAnnouncements } from "@/lib/firebase-services";
import type { AnnouncementItem } from "@/types/site";

export interface AnnouncementStripProps {
  className?: string;
}

const emptySubscribe = () => () => {};

/**
 * Scrolling marquee announcement strip placed directly under the navigation bar.
 * Light, elegant styling matching the college identity.
 * Smooth continuous loop powered by Framer Motion, with hover-to-pause.
 */
export function AnnouncementStrip({ className }: AnnouncementStripProps) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(site.announcements);
  const [isPaused, setIsPaused] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const unsubscribe = subscribeToLiveAnnouncements((items) => {
      if (items && items.length > 0) {
        setAnnouncements(items);
      }
    });

    return () => unsubscribe();
  }, []);

  const activeAnnouncements = announcements.filter((a) => a.active);

  if (activeAnnouncements.length === 0) return null;

  // Tripled announcements list for infinite continuous loop
  const loopList = [...activeAnnouncements, ...activeAnnouncements, ...activeAnnouncements];

  return (
    <div
      role="region"
      aria-label="Campus Announcements"
      className={cn(
        "w-full bg-brand-50/90 text-ink-900 border-b border-brand-200/80 overflow-hidden flex items-center select-none relative z-20 shadow-xs",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fixed Notice Lead Badge */}
      <div className="bg-brand-900 text-white px-3 sm:px-4 py-2 flex items-center gap-2 font-heading font-bold uppercase tracking-wider text-[11px] shrink-0 border-r border-brand-800 shadow-xs z-30">
        <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse shrink-0" />
        <Megaphone className="h-3.5 w-3.5 text-accent-400 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Announcements</span>
        <span className="sm:hidden">Notice</span>
      </div>

      {/* Marquee Scroller Viewport */}
      <div className="flex-1 overflow-hidden relative py-1.5 flex items-center">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-brand-50/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-brand-50/90 to-transparent z-10" />

        {mounted ? (
          <motion.div
            className="flex items-center gap-10 whitespace-nowrap pl-6"
            animate={isPaused ? { x: undefined } : { x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: Math.max(22, activeAnnouncements.length * 8),
                ease: "linear",
              },
            }}
          >
            {loopList.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 shrink-0" />
                <span className="font-semibold text-ink-800 tracking-tight">{item.text}</span>
                {item.linkHref && item.linkText && (
                  <SmartLink
                    href={item.linkHref}
                    isExternal={item.isExternal}
                    className="inline-flex items-center gap-1 font-bold text-brand-900 bg-white hover:bg-brand-100/90 px-2 py-0.5 rounded-md border border-brand-200/80 text-[11px] transition-colors shadow-2xs"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="h-3 w-3 text-accent-600" />
                  </SmartLink>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex items-center gap-8 whitespace-nowrap pl-6 text-xs font-medium text-ink-800">
            {activeAnnouncements.map((item) => (
              <span key={item.id} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
