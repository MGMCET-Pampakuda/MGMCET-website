import React from "react";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Standard SectionHeader providing uppercase gold eyebrow, prominent title,
 * descriptive subtext, and optional call-to-action button.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  tone = "light",
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        isCenter
          ? "text-center max-w-3xl mx-auto flex flex-col items-center"
          : "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6",
        className
      )}
    >
      <div className={cn("space-y-2.5", isCenter ? "w-full" : "max-w-2xl")}>
        {eyebrow && (
          <p
            className={cn(
              "font-heading text-eyebrow font-bold uppercase tracking-widest",
              isDark ? "text-accent-400" : "text-accent-600"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "font-heading text-h2 font-bold tracking-tight leading-tight",
            isDark ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-body sm:text-body-lg leading-relaxed pt-1",
              isDark ? "text-brand-100" : "text-ink-600"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className={cn("shrink-0", isCenter ? "mt-4" : "")}>{action}</div>
      )}
    </div>
  );
}
