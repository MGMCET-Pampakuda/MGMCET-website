import React from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

/**
 * Visual hairline divider separating sections or content blocks.
 */
export function Divider({
  orientation = "horizontal",
  label,
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px self-stretch bg-border", className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("relative my-6 flex items-center justify-center", className)}
        {...props}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-surface px-4 font-heading text-caption uppercase tracking-wider text-ink-400">
          {label}
        </span>
      </div>
    );
  }

  return (
    <hr
      className={cn("my-6 border-0 border-t border-border", className)}
      {...props}
    />
  );
}
