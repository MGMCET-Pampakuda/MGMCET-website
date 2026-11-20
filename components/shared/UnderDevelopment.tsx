import React from "react";
import Link from "next/link";
import { Hammer, Sparkles, ArrowLeft, Mail, Compass } from "lucide-react";

export interface UnderDevelopmentProps {
  title?: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}

export function UnderDevelopment({
  title = "Page Under Development",
  subtitle = "We are currently revamping this section with new media, reports, and upcoming event schedules. We will be back soon!",
  backHref = "/campus-life",
  backLabel = "Return to Campus Life",
}: UnderDevelopmentProps) {
  return (
    <div className="py-12 sm:py-16 text-center max-w-xl mx-auto space-y-6">
      {/* Icon Emblem */}
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-800 border border-amber-300/80 mx-auto flex items-center justify-center shadow-xs">
        <Hammer className="w-8 h-8 text-amber-700 animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Work in Progress</span>
        </span>
        <h2 className="font-heading font-extrabold text-h2 text-ink-900">
          {title}
        </h2>
        <p className="text-body text-ink-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Action links */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-heading font-bold text-xs transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </Link>
        <Link
          href="/campus-life/associations-and-clubs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface hover:bg-canvas text-ink-800 font-heading font-semibold text-xs transition-colors"
        >
          <Compass className="w-4 h-4 text-brand-700" />
          <span>Clubs &amp; Associations</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface hover:bg-canvas text-ink-800 font-heading font-semibold text-xs transition-colors"
        >
          <Mail className="w-4 h-4 text-accent-600" />
          <span>Contact Campus Desk</span>
        </Link>
      </div>
    </div>
  );
}
