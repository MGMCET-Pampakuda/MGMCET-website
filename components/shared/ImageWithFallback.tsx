"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

export interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  /** Optional fallback image source if main src fails to load */
  fallbackSrc?: string;
}

/**
 * Enhanced Next.js Image component that smoothly handles image loading errors
 * by falling back to a default placeholder without breaking the UI layout.
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/campus/campus-main.svg",
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      className={cn("transition-opacity duration-300", className)}
      onError={() => {
        if (!error) {
          setError(true);
        }
      }}
      {...props}
    />
  );
}
