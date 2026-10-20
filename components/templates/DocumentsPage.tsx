"use client";

import React, { useState, useMemo } from "react";
import { Search, FileText, Download, ExternalLink, Calendar, Filter } from "lucide-react";
import type { DownloadItem } from "@/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { SmartLink } from "@/components/ui/Link";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";

export interface CategoryOption {
  value: string;
  label: string;
}

export interface DocumentsPageProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  badge?: string;
  documents: DownloadItem[];
  categories?: CategoryOption[];
  className?: string;
}

/**
 * DocumentsPage template for regulatory disclosures, NIRF, AICTE approvals, and public downloads.
 * Features live client search, category filtering, file-type icons, and responsive document cards.
 */
export function DocumentsPage({
  title,
  description,
  breadcrumbItems,
  heroImage,
  badge = "Official Documents & Disclosures",
  documents,
  categories,
  className,
}: DocumentsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Derive categories if not explicitly provided
  const categoryOptions = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    const unique = Array.from(new Set(documents.map((d) => d.category)));
    return [
      { value: "all", label: "All Documents" },
      ...unique.map((cat) => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ];
  }, [categories, documents]);

  // Filter documents by search and category
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory =
        activeCategory === "all" || doc.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        doc.title.toLowerCase().includes(query) ||
        doc.description?.toLowerCase().includes(query) ||
        doc.year?.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [documents, activeCategory, searchQuery]);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title={title}
        description={description}
        breadcrumbItems={breadcrumbItems}
        image={heroImage}
        badge={badge}
      />

      <Section tone="canvas" spacing="default">
        <Container>
          {/* Controls Bar: Search & Filter Tabs */}
          <div className="rounded-2xl bg-surface border border-border p-4 sm:p-6 shadow-xs space-y-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Input
                  id="document-search"
                  type="text"
                  placeholder="Search by title, keyword, or academic year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-ink-400" />}
                  className="w-full"
                />
              </div>

              {/* Status counter */}
              <div className="text-body-sm font-medium text-ink-500 whitespace-nowrap">
                Showing{" "}
                <span className="font-bold text-brand-900">
                  {filteredDocuments.length}
                </span>{" "}
                of {documents.length} documents
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-border/60">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <Filter className="h-3.5 w-3.5" /> Filter:
              </span>
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer",
                    activeCategory === cat.value
                      ? "bg-brand-900 text-white shadow-xs"
                      : "bg-canvas text-ink-600 hover:bg-brand-50 hover:text-brand-900 border border-border/80"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Document Rows Grid */}
          {filteredDocuments.length > 0 ? (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl bg-surface border border-border p-4 sm:p-5 shadow-xs hover:border-brand-500 hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="p-3 rounded-lg bg-brand-50 text-brand-700 shrink-0 mt-0.5">
                      <FileText className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="mint" size="sm">
                          {doc.category.toUpperCase()}
                        </Badge>
                        {doc.year && (
                          <span className="inline-flex items-center gap-1 text-xs text-ink-500 font-medium">
                            <Calendar className="h-3 w-3" />
                            {doc.year}
                          </span>
                        )}
                        <span className="text-xs uppercase font-mono font-bold text-accent-700 bg-accent-100/60 px-2 py-0.5 rounded">
                          {doc.fileType}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-body sm:text-h4 text-ink-900 break-words">
                        {doc.title}
                      </h3>
                      {doc.description && (
                        <p className="text-body-sm text-ink-600 line-clamp-2">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 sm:self-center">
                    <SmartLink
                      href={doc.href}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-50 text-brand-800 hover:bg-brand-800 hover:text-white font-heading text-body-sm font-semibold transition-all border border-brand-200"
                    >
                      {doc.isExternal ? (
                        <>
                          <span>View Portal</span>
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          <span>Download PDF</span>
                          <Download className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </SmartLink>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface border border-border p-12 text-center space-y-3">
              <FileText className="h-12 w-12 text-ink-400 mx-auto" />
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                No matching documents found
              </h3>
              <p className="text-body-sm text-ink-500 max-w-md mx-auto">
                Try adjusting your search keywords or switching category filters.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
