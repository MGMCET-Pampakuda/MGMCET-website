import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const sectionVariants = cva("relative w-full overflow-hidden", {
  variants: {
    tone: {
      white: "bg-surface text-ink-900",
      mint: "bg-brand-50 text-ink-900",
      canvas: "bg-canvas text-ink-900",
      dark: "bg-brand-900 text-white",
    },
    spacing: {
      default: "py-14 sm:py-20 lg:py-24",
      sm: "py-10 sm:py-14 lg:py-16",
      lg: "py-20 sm:py-28 lg:py-32",
      none: "py-0",
    },
  },
  defaultVariants: {
    tone: "white",
    spacing: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article" | "aside";
}

/**
 * Standard Section layout primitive guaranteeing consistent vertical rhythm
 * and background color tones across the college website.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", tone, spacing, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(sectionVariants({ tone, spacing }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";
