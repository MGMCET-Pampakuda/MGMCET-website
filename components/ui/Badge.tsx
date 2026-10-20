import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center font-heading font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        brand: "bg-brand-100 text-brand-800 border border-brand-200",
        mint: "bg-brand-100 text-brand-800 border border-brand-200",
        "brand-dark": "bg-brand-900 text-brand-100 border border-brand-800",
        dark: "bg-brand-900 text-brand-100 border border-brand-800",
        accent: "bg-accent-100 text-accent-700 border border-accent-400/40",
        outline: "border border-border text-ink-700 bg-surface",
        surface: "bg-surface text-ink-900 border border-border shadow-sm",
        success: "bg-success-bg text-success border border-success/30",
        warning: "bg-warning-bg text-warning border border-warning/30",
        danger: "bg-danger-bg text-danger border border-danger/30",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-sm gap-1",
        md: "px-2.5 py-1 text-caption rounded-sm gap-1.5",
        lg: "px-3 py-1.5 text-body-sm rounded-md gap-2",
      },
      pill: {
        true: "rounded-pill",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
      pill: true,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon rendered inside the badge */
  icon?: React.ReactNode;
}

/**
 * Institutional Badge component for status tags, programme levels, and category labels.
 */
export function Badge({
  className,
  variant,
  size,
  pill,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, pill }), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
