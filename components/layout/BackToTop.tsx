"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BackToTopProps {
  threshold?: number;
  className?: string;
}

/**
 * Accessible BackToTop floating button that appears on scroll
 * and smoothly returns the viewport to the top of the page.
 */
export function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-fixed h-11 w-11 rounded-full bg-brand-900 text-accent-500 shadow-pop border border-brand-700/60 flex items-center justify-center hover:bg-brand-950 hover:text-accent-400 hover:scale-105 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-accent-500 cursor-pointer animate-in fade-in zoom-in-75 duration-200",
        className
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
