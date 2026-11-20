"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { NewsItem } from "@/types";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { subscribeToLiveNews } from "@/lib/firebase-services";

export interface NewsGridProps {
  news: NewsItem[];
  className?: string;
}

/**
 * Text-only editorial News & Events grid for the home page.
 * Styled with journalistic clarity, reading times, category badges, and clean typography.
 * Completely image-free to maximize performance and eliminate cloud storage dependency.
 */
export function NewsGrid({ news: initialNews, className }: NewsGridProps) {
  const [liveNews, setLiveNews] = useState<NewsItem[]>(initialNews);

  useEffect(() => {
    const unsubscribe = subscribeToLiveNews((items) => {
      if (items && items.length > 0) {
        setLiveNews(items);
      }
    });

    return () => unsubscribe();
  }, []);

  const latestNews = liveNews.slice(0, 4);

  return (
    <section
      aria-labelledby="news-events-heading"
      className={cn("py-12 sm:py-20 lg:py-24 bg-surface border-t border-border/40", className)}
    >
      <Container>
        <SectionHeader
          eyebrow="CAMPUS GAZETTE"
          title="Latest News & Bulletins"
          description="Read official announcements, technical symposium reports, campus placement achievements, and student outreach milestones from MGMCET Pampakuda."
          action={
            <SmartLink
              href="/news-events"
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-brand-700 hover:text-brand-900 group"
            >
              <span>Explore All Updates</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </SmartLink>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((item, idx) => (
            <SmartLink
              key={item.id || idx}
              href={`/news-events/${item.slug}`}
              className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-surface border border-border/80 shadow-xs hover:border-brand-600 hover:shadow-card hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              {/* Subtle top accent highlight */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1 transition-colors",
                  item.category === "event"
                    ? "bg-accent-500/70 group-hover:bg-accent-500"
                    : "bg-brand-700/70 group-hover:bg-brand-600"
                )}
                aria-hidden="true"
              />

              <div className="space-y-4">
                {/* Meta header row */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <Badge
                    variant={item.category === "event" ? "accent" : "mint"}
                    size="sm"
                    className="capitalize font-semibold text-[11px] tracking-wide"
                  >
                    {item.category === "event" ? "Campus Event" : "Bulletin"}
                  </Badge>

                  {item.readTime && (
                    <span className="flex items-center gap-1 text-[11px] text-ink-400 font-medium">
                      <Clock className="h-3 w-3" />
                      <span>{item.readTime}</span>
                    </span>
                  )}
                </div>

                {/* Published Date & Department */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-brand-700 shrink-0" aria-hidden="true" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>

                  {item.department && (
                    <p className="text-[11px] font-semibold text-brand-800 tracking-tight truncate">
                      {item.department}
                    </p>
                  )}
                </div>

                {/* Article Headline */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-ink-950 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                {/* Article Excerpt */}
                <p className="text-xs sm:text-body-sm text-ink-600 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              {/* Bottom footer bar */}
              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-heading font-semibold text-brand-700">
                <span className="inline-flex items-center gap-1 group-hover:text-brand-900 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>

                {item.tags && item.tags.length > 0 && (
                  <span className="text-[10px] uppercase font-mono tracking-wider text-ink-400 font-medium">
                    #{item.tags[0]}
                  </span>
                )}
              </div>
            </SmartLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
