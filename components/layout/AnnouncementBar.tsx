"use client";

import React, { useState } from "react";
import { Megaphone, X, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { SmartLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

export interface AnnouncementBarProps {
  className?: string;
  /** Whether the announcement bar should be displayed */
  show?: boolean;
}

/**
 * Top announcement strip highlighting active admissions and scholarship alerts.
 * Content-driven from site.ts, fully dismissible by the user.
 */
export function AnnouncementBar({ className, show = true }: AnnouncementBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const activeAnnouncements = site.announcements.filter((a) => a.active);

  if (!show || isDismissed || activeAnnouncements.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Announcements"
      className={cn(
        "relative z-sticky bg-brand-950 text-white text-caption border-b border-brand-800/80 transition-all",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        {/* Left side content */}
        <div className="flex-1 flex items-center justify-center sm:justify-start flex-wrap gap-x-4 gap-y-1 text-center sm:text-left pr-8 sm:pr-0">
          <div className="inline-flex items-center gap-1.5 font-heading font-semibold text-accent-400 shrink-0">
            <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="uppercase tracking-wider text-[11px]">Notice</span>
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start">
            {activeAnnouncements.map((item, idx) => (
              <div key={item.id} className="inline-flex items-center gap-2">
                {idx > 0 && (
                  <span className="hidden md:inline text-white/30" aria-hidden="true">
                    |
                  </span>
                )}
                <span className="text-white/90">{item.text}</span>
                {item.linkHref && item.linkText && (
                  <SmartLink
                    href={item.linkHref}
                    isExternal={item.isExternal}
                    className="inline-flex items-center gap-1 font-semibold text-accent-400 hover:text-accent-300 underline underline-offset-2 decoration-accent-400/50 hover:decoration-accent-300 transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </SmartLink>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss announcement"
          className="rounded-xs p-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
