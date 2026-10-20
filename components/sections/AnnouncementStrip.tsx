import React from "react";
import { Megaphone, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { SmartLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

export interface AnnouncementStripProps {
  className?: string;
}

/**
 * Notice strip placed directly below the hero carousel matching the reference design.
 * Content-driven from site.ts with scholarship and admissions open banners.
 */
export function AnnouncementStrip({ className }: AnnouncementStripProps) {
  const activeAnnouncements = site.announcements.filter((a) => a.active);

  if (activeAnnouncements.length === 0) return null;

  return (
    <div
      className={cn(
        "w-full bg-brand-50/90 border-y border-brand-100/80 py-3 text-ink-900 text-body-sm shadow-xs",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-center">
        <div className="inline-flex items-center gap-2 font-heading font-bold text-brand-900 text-xs uppercase tracking-wider">
          <Megaphone className="h-4 w-4 text-accent-600" aria-hidden="true" />
          <span>Announcements:</span>
        </div>

        <div className="flex items-center flex-wrap gap-x-6 gap-y-1 justify-center">
          {activeAnnouncements.map((item, idx) => (
            <div key={item.id} className="inline-flex items-center gap-2">
              {idx > 0 && (
                <span className="hidden md:inline text-ink-400/60" aria-hidden="true">
                  |
                </span>
              )}
              <span className="font-medium text-ink-800">{item.text}</span>
              {item.linkHref && item.linkText && (
                <SmartLink
                  href={item.linkHref}
                  isExternal={item.isExternal}
                  className="inline-flex items-center gap-1 font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </SmartLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
