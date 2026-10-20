import React from "react";
import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

/**
 * Pulsing skeleton placeholder for loading cards, images, and text.
 */
export function Skeleton({
  variant = "rectangular",
  className,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 w-full rounded-xs",
    circular: "rounded-full shrink-0",
    rectangular: "rounded-md",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-brand-100/70",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
