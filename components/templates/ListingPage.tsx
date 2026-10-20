"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";

export interface FilterOption {
  label: string;
  value: string;
}

export interface ListingPageProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  badge?: string;
  filters?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  children: React.ReactNode;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  className?: string;
}

/**
 * ListingPage template for collection pages (News & Events, Gallery, Faculty, Careers).
 * Features PageHero, filter bar, responsive grid/list container, and pagination.
 */
export function ListingPage({
  title,
  description,
  breadcrumbItems,
  heroImage,
  badge,
  filters,
  activeFilter,
  onFilterChange,
  children,
  totalCount,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  emptyMessage = "No items found in this section.",
  className,
}: ListingPageProps) {
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
          {/* Filter Bar */}
          {filters && filters.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-border/80">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => onFilterChange?.(filter.value)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs sm:text-body-sm font-semibold transition-all shrink-0 cursor-pointer",
                      activeFilter === filter.value
                        ? "bg-brand-900 text-white shadow-xs"
                        : "bg-surface text-ink-600 hover:bg-brand-50 hover:text-brand-900 border border-border"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {typeof totalCount === "number" && (
                <span className="text-xs sm:text-body-sm text-ink-500 whitespace-nowrap">
                  Showing <strong className="text-brand-900">{totalCount}</strong> results
                </span>
              )}
            </div>
          )}

          {/* Items Content */}
          <div className="min-h-[280px]">
            {totalCount === 0 ? (
              <div className="py-16 text-center text-ink-500 font-medium">
                {emptyMessage}
              </div>
            ) : (
              children
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && onPageChange && (
            <div className="pt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
