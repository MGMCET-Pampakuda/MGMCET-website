import React from "react";
import { cn } from "@/lib/cn";

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "main" | "div";
}

/**
 * Standard PageShell wrapper ensuring clean vertical structure and landmark layout.
 */
export function PageShell({
  as: Component = "div",
  className,
  children,
  ...props
}: PageShellProps) {
  return (
    <Component className={cn("min-h-screen flex flex-col", className)} {...props}>
      {children}
    </Component>
  );
}
