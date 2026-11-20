import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import type { DirectorQuote as DirectorQuoteType } from "@/types";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

export interface DirectorQuoteProps {
  directorQuote: DirectorQuoteType;
  className?: string;
}

/**
 * Director's Message Strip showcasing leadership commitment to innovation and academic excellence.
 */
export function DirectorQuote({ directorQuote, className }: DirectorQuoteProps) {
  return (
    <section
      aria-label="Director's Message"
      className={cn("py-12 sm:py-16 bg-surface border-y border-border/80", className)}
    >
      <Container>
        <div className="relative rounded-2xl bg-brand-50/60 border border-brand-100 p-4 sm:p-8 flex flex-col md:flex-row items-center gap-5 sm:gap-8 max-w-5xl mx-auto shadow-xs">
          <Quote
            className="absolute top-4 left-6 h-12 w-12 text-accent-500/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Director Portrait */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-full overflow-hidden border-2 border-accent-400 shadow-md">
            <Image
              src={directorQuote.image || "/images/leadership/director-h-ahinus.webp"}
              alt={directorQuote.name}
              fill
              sizes="112px"
              className="object-cover object-center"
            />
          </div>

          {/* Quote & Citation */}
          <div className="space-y-3 text-center md:text-left">
            <blockquote className="font-heading text-body-lg sm:text-h4 font-medium text-ink-800 italic leading-relaxed text-pretty">
              &ldquo;{directorQuote.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-heading font-bold text-body text-brand-900">
                {directorQuote.name}
              </p>
              <p className="text-caption text-ink-500 font-medium">
                {directorQuote.designation}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
