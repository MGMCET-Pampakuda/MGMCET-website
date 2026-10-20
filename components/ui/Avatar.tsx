"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Avatar component displaying faculty or user photos with graceful initials/icon fallback.
 */
export function Avatar({
  src,
  alt,
  name,
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const effectiveAlt = alt || name || "Avatar";
  const effectiveFallback = fallback || name;

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-body-sm",
    lg: "h-16 w-16 text-body-lg",
    xl: "h-24 w-24 text-h4",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-brand-800 font-heading font-semibold select-none border border-border/80 shadow-xs",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <Image
          src={src}
          alt={effectiveAlt}
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : effectiveFallback ? (
        <span>{getInitials(effectiveFallback)}</span>
      ) : (
        <User className="h-1/2 w-1/2 text-brand-700" aria-hidden="true" />
      )}
    </div>
  );
}
