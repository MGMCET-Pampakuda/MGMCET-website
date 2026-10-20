import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const iconBoxVariants = cva(
  "inline-flex items-center justify-center shrink-0 transition-colors select-none",
  {
    variants: {
      variant: {
        brand: "bg-brand-100 text-brand-800",
        accent: "bg-accent-100 text-accent-700",
        mint: "bg-brand-50 text-brand-700 border border-brand-100",
        surface: "bg-surface text-brand-700 border border-border shadow-sm",
        dark: "bg-brand-900 text-accent-500 border border-brand-800",
        gold: "bg-accent-500 text-ink-900 shadow-sm",
      },
      size: {
        sm: "h-9 w-9 rounded-md [&>svg]:h-4 [&>svg]:w-4",
        md: "h-12 w-12 rounded-xl [&>svg]:h-6 [&>svg]:w-6",
        lg: "h-16 w-16 rounded-2xl [&>svg]:h-8 [&>svg]:w-8",
      },
      shape: {
        rounded: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "mint",
      size: "md",
      shape: "rounded",
    },
  }
);

export interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {
  icon?: React.ReactNode;
}

/**
 * Decorated icon container used across stats, why-choose-us cards, and facility highlights.
 */
export function IconBox({
  className,
  variant,
  size,
  shape,
  icon,
  children,
  ...props
}: IconBoxProps) {
  return (
    <div
      className={cn(iconBoxVariants({ variant, size, shape }), className)}
      {...props}
    >
      {icon || children}
    </div>
  );
}
