"use client";

import React from "react";
import {
  Apple,
  Lightbulb,
  HeartPulse,
  Scale,
  ShieldAlert,
  Calendar,
  MapPin,
  Mic,
  UserCheck,
  Shield,
  Sparkles,
} from "lucide-react";
import { womenCellEvents } from "@/content/women-cell";
import type { WomenCellEvent } from "@/types/campus-life";

const EVENT_ICON_MAP: Record<string, React.ElementType> = {
  Apple,
  Lightbulb,
  HeartPulse,
  Scale,
  ShieldAlert,
};

export function WomenCellSection() {
  return (
    <div className="space-y-12">
      {/* 1. Header Mandate & Overview */}
      <div className="p-6 sm:p-8 rounded-2xl bg-brand-50/70 border border-brand-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-accent-200/30 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-900">
            <Shield className="w-4 h-4 text-accent-600 shrink-0" />
            <span>Empowerment, Well-being &amp; Equal Opportunity</span>
          </div>
          <h2 className="font-heading font-extrabold text-h2 text-ink-900">
            Women&apos;s Cell Initiatives &amp; Awareness Programs
          </h2>
          <p className="text-body text-ink-700 leading-relaxed max-w-3xl">
            The Women&apos;s Cell at MGMCET is dedicated to fostering an empowering, respectful, and safe campus
            atmosphere. Through multidisciplinary seminars and expert workshops, the cell equips women students
            and faculty with essential insights into health, entrepreneurship, statutory rights, and cyber protection.
          </p>
        </div>
      </div>

      {/* 2. Program Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div>
            <h3 className="font-heading font-bold text-h3 text-ink-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-600" />
              <span>Flagship Awareness Sessions &amp; Seminars</span>
            </h3>
            <p className="text-body-sm text-ink-600 mt-0.5">
              Structured developmental programs organized by the Women&apos;s Cell in collaboration with professional institutions
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold border border-brand-200">
            {womenCellEvents.length} Recent Programs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {womenCellEvents.map((evt: WomenCellEvent, index: number) => {
            const IconComp = (evt.iconName && EVENT_ICON_MAP[evt.iconName]) || Sparkles;

            return (
              <div
                key={evt.id}
                className="p-6 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Top: Index, Category Badge, Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center border border-brand-200/80 group-hover:bg-brand-900 group-hover:text-white transition-colors shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        {evt.category && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-accent-50 text-accent-800 border border-accent-200 mb-1">
                            {evt.category}
                          </span>
                        )}
                        <h4 className="font-heading font-bold text-h4 text-ink-900 group-hover:text-brand-800 transition-colors leading-snug">
                          {evt.title}
                        </h4>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-400 shrink-0">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Date and Venue Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-canvas text-ink-700 font-medium border border-border">
                      <Calendar className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                      <span>{evt.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-canvas text-ink-700 font-medium border border-border">
                      <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                      <span>{evt.venue}</span>
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-body-sm text-ink-700 leading-relaxed pt-1">
                    {evt.summary}
                  </p>

                  {/* Dignitaries Box */}
                  <div className="pt-3 border-t border-border/70 space-y-2 text-xs bg-canvas/60 p-3.5 rounded-xl border border-border/60">
                    <div className="flex items-start gap-2">
                      <Mic className="w-3.5 h-3.5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block">
                          Welcome Address
                        </span>
                        <span className="font-semibold text-ink-900 leading-snug">
                          {evt.welcomeSpeech}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-border/50">
                      <UserCheck className="w-3.5 h-3.5 text-accent-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block">
                          Vote of Thanks
                        </span>
                        <span className="font-semibold text-ink-900 leading-snug">
                          {evt.voteOfThanks}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
