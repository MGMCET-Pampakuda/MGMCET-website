import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsItem } from "@/types";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface NewsGridProps {
  news: NewsItem[];
  className?: string;
}

/**
 * News & Events card grid displaying the latest 4 campus announcements,
 * achievements, and cultural/technical workshops.
 */
export function NewsGrid({ news, className }: NewsGridProps) {
  const latestNews = news.slice(0, 4);

  return (
    <section
      aria-labelledby="news-events-heading"
      className={cn("py-16 sm:py-24 bg-surface", className)}
    >
      <Container>
        <SectionHeader
          eyebrow="LATEST UPDATES"
          title="News & Events"
          description="Stay informed with the latest academic milestones, national competitions, and student activities at MGMCET."
          action={
            <SmartLink
              href="/news-events"
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-brand-700 hover:text-brand-900 group"
            >
              <span>View All News & Events</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </SmartLink>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {latestNews.map((item) => (
            <SmartLink
              key={item.id}
              href={`/news-events/${item.slug}`}
              className="group block rounded-card bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-pop hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
            >
              {/* Thumbnail with Category Badge */}
              <div className="relative aspect-[16/10] w-full bg-brand-50 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-raised">
                  <Badge
                    variant={item.category === "event" ? "accent" : "brand"}
                    size="sm"
                    pill
                    className="capitalize shadow-xs"
                  >
                    {item.category}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-caption text-ink-500 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-brand-700" aria-hidden="true" />
                    <span>{formatDate(item.date)}</span>
                  </div>

                  <h3 className="font-heading font-bold text-body text-ink-900 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs font-heading font-semibold text-brand-700">
                  <span>Read Article</span>
                  <div className="h-6 w-6 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
