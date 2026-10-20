"use client";

import React, { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const emptySubscribe = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Direction from which element translates in */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Delay in seconds before animation triggers */
  delay?: number;
  /** Duration of animation in seconds (default: 0.5) */
  duration?: number;
  /** Whether the animation should only trigger once */
  once?: boolean;
}

/**
 * Scroll reveal animation wrapper using framer-motion.
 * Automatically disables animation if user prefers reduced motion.
 * Renders full content during SSR to avoid blank pages and hydration mismatches.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
}: RevealProps) {
  const isClient = useIsClient();
  const prefersReducedMotion = useReducedMotion();

  // On server, or if user prefers reduced motion, render clean static markup
  if (!isClient || prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const offset = 24;
  const initialVariants = {
    up: { opacity: 0, y: offset },
    down: { opacity: 0, y: -offset },
    left: { opacity: 0, x: offset },
    right: { opacity: 0, x: -offset },
    none: { opacity: 0 },
  };

  const targetVariants = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={targetVariants[direction]}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
