import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  className?: string;
}

/**
 * Accessible Pagination navigation supporting both click handlers and static href generation.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  getPageHref,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis
  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const renderPageButton = (page: number, isCurrent: boolean) => {
    const commonClass = cn(
      "h-10 min-w-10 px-3.5 flex items-center justify-center rounded-md font-heading text-body-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 select-none cursor-pointer",
      isCurrent
        ? "bg-brand-700 text-white shadow-sm"
        : "text-ink-700 hover:bg-brand-50 hover:text-brand-900"
    );

    if (getPageHref) {
      return (
        <Link
          key={page}
          href={getPageHref(page)}
          aria-current={isCurrent ? "page" : undefined}
          className={commonClass}
        >
          {page}
        </Link>
      );
    }

    return (
      <button
        key={page}
        type="button"
        onClick={() => onPageChange?.(page)}
        aria-current={isCurrent ? "page" : undefined}
        className={commonClass}
      >
        {page}
      </button>
    );
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      {/* Prev */}
      {hasPrev ? (
        getPageHref ? (
          <Link
            href={getPageHref(currentPage - 1)}
            aria-label="Go to previous page"
            className="h-10 px-3 flex items-center gap-1 rounded-md text-ink-700 hover:bg-brand-50 font-heading text-body-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onPageChange?.(currentPage - 1)}
            aria-label="Go to previous page"
            className="h-10 px-3 flex items-center gap-1 rounded-md text-ink-700 hover:bg-brand-50 font-heading text-body-sm font-medium cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        )
      ) : (
        <span
          aria-disabled="true"
          className="h-10 px-3 flex items-center gap-1 rounded-md text-ink-400 font-heading text-body-sm font-medium opacity-50 cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPages().map((p, idx) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="h-10 w-10 flex items-center justify-center text-ink-400 select-none"
            >
              …
            </span>
          ) : (
            renderPageButton(p, p === currentPage)
          )
        )}
      </div>

      {/* Next */}
      {hasNext ? (
        getPageHref ? (
          <Link
            href={getPageHref(currentPage + 1)}
            aria-label="Go to next page"
            className="h-10 px-3 flex items-center gap-1 rounded-md text-ink-700 hover:bg-brand-50 font-heading text-body-sm font-medium"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onPageChange?.(currentPage + 1)}
            aria-label="Go to next page"
            className="h-10 px-3 flex items-center gap-1 rounded-md text-ink-700 hover:bg-brand-50 font-heading text-body-sm font-medium cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )
      ) : (
        <span
          aria-disabled="true"
          className="h-10 px-3 flex items-center gap-1 rounded-md text-ink-400 font-heading text-body-sm font-medium opacity-50 cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
