import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const cardVariants = cva("overflow-hidden text-ink-900 transition-all", {
  variants: {
    variant: {
      plain: "bg-surface",
      outlined: "bg-surface border border-border",
      elevated:
        "bg-surface border border-border/80 shadow-card hover:shadow-pop",
      interactive:
        "bg-surface border border-border hover:border-brand-600 hover:shadow-card cursor-pointer group",
      tinted: "bg-brand-50 border border-brand-100",
      accent: "bg-accent-50 border border-accent-100",
      dark: "bg-brand-900 text-white border border-brand-800",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6 sm:p-7",
      lg: "p-8 sm:p-10",
    },
    radius: {
      card: "rounded-card",
      xl: "rounded-xl",
      lg: "rounded-lg",
      md: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "outlined",
    padding: "md",
    radius: "card",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card container with customizable elevation, border, radius and padding.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, radius, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, radius }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading font-bold text-h4 leading-snug", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-ink-600 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-body", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 mt-auto border-t border-border/60", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
