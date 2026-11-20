"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Tag,
  MapPin,
  Building2,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { subscribeToLiveNews } from "@/lib/firebase-services";
import { formatDate } from "@/lib/format";
import type { NewsItem } from "@/types/news";

interface NewsDetailClientViewProps {
  initialItem: NewsItem;
  relatedNews: NewsItem[];
  slug: string;
}

export function NewsDetailClientView({
  initialItem,
  relatedNews: initialRelated,
  slug,
}: NewsDetailClientViewProps) {
  const [item, setItem] = useState<NewsItem>(initialItem);
  const [related, setRelated] = useState<NewsItem[]>(initialRelated);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToLiveNews((liveItems) => {
      if (liveItems && liveItems.length > 0) {
        const found = liveItems.find((n) => n.slug === slug || n.id === initialItem.id);
        if (found) {
          setItem(found);
        }
        setRelated(liveItems.filter((n) => n.slug !== slug).slice(0, 3));
      }
    });

    return () => unsubscribe();
  }, [slug, initialItem.id]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const shareUrl = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${item.title} — MGMCET News\n`);
      window.open(`https://api.whatsapp.com/send?text=${text}${shareUrl}`, "_blank");
    }
  };

  // Format content paragraphs
  const contentParagraphs = (item.content || item.excerpt || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col w-full">
      {/* Editorial Masthead Hero */}
      <PageHero
        title={item.title}
        description={item.excerpt}
        badge={item.category === "event" ? "Campus Event" : "News Bulletin"}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/news-events" },
          { label: item.title, href: `/news-events/${slug}` },
        ]}
      />

      <Section tone="canvas" spacing="default">
        <Container size="narrow">
          <div className="space-y-10">
            {/* Back Navigation & Share Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <SmartLink
                href="/news-events"
                className="inline-flex items-center gap-2 text-body-sm font-heading font-semibold text-brand-700 hover:text-brand-900 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to All Updates</span>
              </SmartLink>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-ink-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-ink-700 hover:bg-canvas text-xs font-semibold transition-colors cursor-pointer"
                  title="Copy Link to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5 text-ink-500" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Main Article Document Container */}
            <article className="rounded-3xl bg-surface border border-border/80 shadow-xs p-6 sm:p-10 lg:p-12 space-y-8">
              {/* Meta Byline Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/70 text-xs sm:text-body-sm text-ink-500">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant={item.category === "event" ? "accent" : "mint"}
                    size="sm"
                    className="capitalize font-semibold text-xs"
                  >
                    {item.category === "event" ? "Campus Event" : "News Bulletin"}
                  </Badge>

                  {item.department && (
                    <span className="inline-flex items-center gap-1.5 text-ink-700 font-semibold text-xs sm:text-sm">
                      <Building2 className="h-3.5 w-3.5 text-brand-700" />
                      <span>{item.department}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5 font-medium text-ink-600">
                    <Calendar className="h-4 w-4 text-brand-700" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </span>

                  {item.readTime && (
                    <span className="flex items-center gap-1 text-ink-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{item.readTime}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Commanding Article Title */}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink-950 tracking-tight leading-tight">
                {item.title}
              </h1>

              {/* Lead Excerpt Paragraph */}
              <div className="p-5 sm:p-6 rounded-2xl bg-brand-50/60 border-l-4 border-brand-700 text-ink-900 font-medium text-base sm:text-lg leading-relaxed shadow-2xs">
                {item.excerpt}
              </div>

              {/* Event Details Callout Box (if category is event) */}
              {item.category === "event" && (item.eventDate || item.eventLocation) && (
                <div className="p-5 sm:p-6 rounded-2xl bg-canvas border border-border/90 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-brand-800">
                    <Sparkles className="h-4 w-4 text-accent-600" />
                    <span>Event Schedule & Venue</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {item.eventDate && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide">
                            Date
                          </div>
                          <div className="font-semibold text-ink-900">{item.eventDate}</div>
                        </div>
                      </div>
                    )}

                    {item.eventLocation && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-semibold text-ink-500 uppercase tracking-wide">
                            Location
                          </div>
                          <div className="font-semibold text-ink-900">{item.eventLocation}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Main Article Body Text */}
              <div className="prose prose-college max-w-none text-ink-800 text-base sm:text-lg leading-relaxed space-y-5">
                {contentParagraphs.length > 0 ? (
                  contentParagraphs.map((para, idx) => {
                    // Check if paragraph is a bullet/numbered list
                    if (para.includes("\n•") || para.includes("\n*") || para.includes("\n-") || para.startsWith("•") || para.startsWith("*")) {
                      const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
                      return (
                        <div key={idx} className="space-y-2 py-1">
                          {lines.map((line, lIdx) => {
                            const isBullet = line.startsWith("•") || line.startsWith("*") || line.startsWith("-");
                            const cleanLine = line.replace(/^[•*-]\s*/, "");
                            return isBullet ? (
                              <div key={lIdx} className="flex items-start gap-2.5 ml-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-700 mt-2 shrink-0" />
                                <span className="text-ink-800 leading-relaxed">{cleanLine}</span>
                              </div>
                            ) : (
                              <p key={lIdx} className="font-semibold text-ink-900 mb-1">
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      );
                    }

                    return (
                      <p key={idx} className="whitespace-pre-line leading-relaxed">
                        {para}
                      </p>
                    );
                  })
                ) : (
                  <p>
                    MGM College of Engineering and Technology, Pampakuda, regularly organizes state and national level technical workshops, academic symposia, and campus recruitment drives. For additional information regarding this update or future event schedules, please contact the college administration.
                  </p>
                )}
              </div>

              {/* Tags Section */}
              {item.tags && item.tags.length > 0 && (
                <div className="pt-6 border-t border-border/70 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-ink-500 mr-1 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span>Tags:</span>
                  </span>
                  {item.tags.map((tg) => (
                    <span
                      key={tg}
                      className="px-2.5 py-1 rounded-lg bg-canvas border border-border/70 text-xs text-ink-700 font-mono"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              )}

              {/* Official College Bureau Sign-off */}
              <div className="pt-6 border-t border-border/70 flex items-center justify-between text-xs text-ink-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-700" />
                  <span className="font-semibold text-ink-700">Official MGMCET College Bulletin</span>
                </div>
                <span>Pampakuda, Ernakulam, Kerala</span>
              </div>
            </article>

            {/* Related Stories Section (Text-Only Editorial Cards) */}
            {related.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="font-heading font-bold text-h3 text-ink-900">
                    More Campus Stories & Bulletins
                  </h3>
                  <SmartLink
                    href="/news-events"
                    className="text-xs font-heading font-semibold text-brand-700 hover:text-brand-900"
                  >
                    View All →
                  </SmartLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <SmartLink
                      key={rel.id}
                      href={`/news-events/${rel.slug}`}
                      className="group flex flex-col justify-between p-5 rounded-2xl bg-surface border border-border/80 shadow-2xs hover:border-brand-600 hover:shadow-card hover:-translate-y-1 transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge
                            variant={rel.category === "event" ? "accent" : "mint"}
                            size="sm"
                            className="capitalize text-[10px]"
                          >
                            {rel.category}
                          </Badge>
                          <span className="text-[11px] text-ink-400 font-medium">
                            {formatDate(rel.date)}
                          </span>
                        </div>

                        <h4 className="font-heading font-bold text-base text-ink-900 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>

                        <p className="text-xs text-ink-600 line-clamp-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-xs font-heading font-semibold text-brand-700">
                        <span>Read Story</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </SmartLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
