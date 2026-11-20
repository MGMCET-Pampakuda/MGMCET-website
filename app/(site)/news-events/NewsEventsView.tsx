"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Search,
} from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SmartLink } from "@/components/ui/Link";
import { news as staticNews } from "@/content/news";
import { subscribeToLiveNews } from "@/lib/firebase-services";
import { formatDate } from "@/lib/format";
import type { NewsItem } from "@/types/news";
import { cn } from "@/lib/cn";

const FILTERS = [
  { label: "All Updates", value: "all" },
  { label: "Campus News", value: "news" },
  { label: "Events & Fests", value: "event" },
  { label: "Placements", value: "placement" },
  { label: "NSS & Community", value: "nss" },
];

const ITEMS_PER_PAGE = 9;

export function NewsEventsView() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allNews, setAllNews] = useState<NewsItem[]>(staticNews);

  useEffect(() => {
    const unsubscribe = subscribeToLiveNews((items) => {
      if (items && items.length > 0) {
        setAllNews(items);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredNews = useMemo(() => {
    return allNews.filter((item) => {
      // Category filter
      let matchesCategory = true;
      if (activeFilter === "all") {
        matchesCategory = true;
      } else if (activeFilter === "news" || activeFilter === "event") {
        matchesCategory = item.category === activeFilter;
      } else if (activeFilter === "placement") {
        matchesCategory =
          Boolean(item.tags?.includes("placement")) ||
          Boolean(item.department?.toLowerCase().includes("placement")) ||
          item.title.toLowerCase().includes("placement") ||
          item.title.toLowerCase().includes("hiring");
      } else if (activeFilter === "nss") {
        matchesCategory =
          Boolean(item.tags?.includes("nss")) ||
          Boolean(item.department?.toLowerCase().includes("nss")) ||
          item.title.toLowerCase().includes("nss") ||
          item.title.toLowerCase().includes("donation");
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          Boolean(item.department?.toLowerCase().includes(q)) ||
          Boolean(item.tags?.some((t) => t.toLowerCase().includes(q)));
      }

      return matchesCategory && matchesSearch;
    });
  }, [allNews, activeFilter, searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE) || 1;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handleFilterChange = (val: string) => {
    setActiveFilter(val);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Check if we should render a lead story (only on page 1, when no search and "all" filter)
  const isDefaultView =
    currentPage === 1 && !searchQuery.trim() && activeFilter === "all";
  const leadStory = isDefaultView && paginatedItems.length > 0 ? paginatedItems[0] : null;
  const remainingItems = leadStory ? paginatedItems.slice(1) : paginatedItems;

  return (
    <ListingPage
      title="News & Events"
      description="Stay updated with academic bulletins, campus hackathons, technical symposiums, sports fests, and placement milestones from MGMCET Pampakuda."
      badge="Campus Gazette"
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
      emptyMessage="No updates match your search criteria. Try a different category or search term."
    >
      <div className="space-y-8">
        {/* Search Bar & Result Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-border shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search news, workshops, drives..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-canvas border border-border text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-400 hover:text-ink-700"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-ink-500 font-medium self-end sm:self-center">
            Showing <span className="font-bold text-ink-900">{filteredNews.length}</span> published articles & bulletins
          </div>
        </div>

        {/* Featured Lead Story (shown prominently on page 1 of all updates) */}
        {leadStory && (
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white shadow-xl overflow-hidden border border-brand-700/40">
            {/* Subtle decorative background watermark */}
            <div
              className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-raised space-y-5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-accent-500 text-ink-950 font-bold uppercase tracking-wider text-[11px] shadow-sm">
                  Featured Story
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-brand-100 font-medium capitalize text-[11px] backdrop-blur-xs">
                  {leadStory.category === "event" ? "Campus Event" : "News Bulletin"}
                </span>
                {leadStory.readTime && (
                  <span className="flex items-center gap-1 text-brand-200 text-xs">
                    <Clock className="h-3.5 w-3.5 text-accent-400" />
                    <span>{leadStory.readTime}</span>
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-brand-200">
                  <Calendar className="h-3.5 w-3.5 text-accent-400" />
                  <time dateTime={leadStory.date}>{formatDate(leadStory.date)}</time>
                  {leadStory.department && (
                    <>
                      <span>•</span>
                      <span className="text-accent-300 font-medium">{leadStory.department}</span>
                    </>
                  )}
                </div>

                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  <SmartLink
                    href={`/news-events/${leadStory.slug}`}
                    className="hover:text-accent-300 transition-colors"
                  >
                    {leadStory.title}
                  </SmartLink>
                </h2>
              </div>

              <p className="text-brand-100/90 text-sm sm:text-base leading-relaxed line-clamp-3">
                {leadStory.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <SmartLink
                  href={`/news-events/${leadStory.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-brand-950 font-heading font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </SmartLink>

                {leadStory.tags && leadStory.tags.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-brand-300">
                    <Tag className="h-3.5 w-3.5 text-accent-400" />
                    {leadStory.tags.map((t) => (
                      <span key={t} className="font-mono text-[11px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Editorial News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingItems.map((item) => (
            <Card
              key={item.id}
              variant="outlined"
              padding="none"
              className="group relative flex flex-col justify-between rounded-2xl bg-surface border border-border/80 shadow-xs hover:border-brand-600 hover:shadow-card hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div
                className={cn(
                  "h-1.5 w-full transition-colors",
                  item.category === "event"
                    ? "bg-accent-500/80 group-hover:bg-accent-500"
                    : "bg-brand-700/80 group-hover:bg-brand-600"
                )}
                aria-hidden="true"
              />

              <div className="p-6 space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant={item.category === "event" ? "accent" : "mint"}
                    size="sm"
                    className="capitalize text-[11px] font-semibold"
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
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-brand-700" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>

                  {item.department && (
                    <p className="text-[11px] font-semibold text-brand-800 tracking-tight truncate">
                      {item.department}
                    </p>
                  )}
                </div>

                {/* Headline */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-ink-950 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                  <SmartLink href={`/news-events/${item.slug}`}>
                    {item.title}
                  </SmartLink>
                </h3>

                {/* Excerpt */}
                <p className="text-body-sm text-ink-600 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 pb-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-heading font-semibold text-brand-700">
                <SmartLink
                  href={`/news-events/${item.slug}`}
                  className="inline-flex items-center gap-1 group-hover:text-brand-900 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </SmartLink>

                {item.tags && item.tags.length > 0 && (
                  <span className="flex items-center gap-1 text-ink-400 font-normal text-[11px]">
                    <Tag className="h-3 w-3" />
                    <span>#{item.tags[0]}</span>
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ListingPage>
  );
}
