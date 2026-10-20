"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SmartLink } from "@/components/ui/Link";
import { news } from "@/content/news";

const FILTERS = [
  { label: "All Updates", value: "all" },
  { label: "Campus News", value: "news" },
  { label: "Events & Fests", value: "event" },
];

const ITEMS_PER_PAGE = 6;

export function NewsEventsView() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    if (activeFilter === "all") return news;
    return news.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE) || 1;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handleFilterChange = (val: string) => {
    setActiveFilter(val);
    setCurrentPage(1);
  };

  return (
    <ListingPage
      title="News &amp; Events"
      description="Stay updated with recent academic achievements, campus hackathons, technical symposiums, sports fests, and placement milestones at MGMCET."
      badge="Latest Bulletins"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "News & Events", href: "/news-events" },
      ]}
      filters={FILTERS}
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
      totalCount={filteredNews.length}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      emptyMessage="No updates found for this category."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedItems.map((item) => (
          <Card
            key={item.id}
            variant="outlined"
            padding="none"
            className="group overflow-hidden flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={item.category === "event" ? "accent" : "mint"}
                    size="sm"
                    className="capitalize shadow-xs"
                  >
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <Calendar className="h-3.5 w-3.5 text-brand-700" />
                  <time dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h3 className="font-heading font-bold text-h4 text-ink-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                  <SmartLink href={`/news-events/${item.slug}`}>
                    {item.title}
                  </SmartLink>
                </h3>

                <p className="text-body-sm text-ink-600 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-border/80 mt-2 flex items-center justify-between">
              <SmartLink
                href={`/news-events/${item.slug}`}
                className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
              >
                <span>Read Full Story</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </SmartLink>

              {item.tags && item.tags.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-ink-400">
                  <Tag className="h-3 w-3" />
                  <span className="capitalize">{item.tags[0]}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ListingPage>
  );
}
