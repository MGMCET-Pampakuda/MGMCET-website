import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

/**
 * Accessible Breadcrumb navigation following WCAG 2.2 guidelines.
 */
export function Breadcrumb({
  items,
  className,
  separator = <ChevronRight className="h-3.5 w-3.5 text-ink-400 shrink-0" aria-hidden="true" />,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-caption", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 text-ink-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 rounded-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn("font-medium", isLast ? "text-ink-900" : "")}
                >
                  {item.label}
                </span>
              )}

              {!isLast && <span aria-hidden="true">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
