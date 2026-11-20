import React from "react";
import Image from "next/image";
import { Container } from "./Container";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/shared";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

export interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  image?: string;
  badge?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Institutional PageHero used across all inner pages.
 * Features dark forest green brand gradient overlay, crisp white typography,
 * breadcrumbs, and optional decorative background image.
 */
export function PageHero({
  title,
  description,
  breadcrumbItems,
  image = "/images/hero/campus-main.webp",
  badge,
  actions,
  className,
}: PageHeroProps) {
  const breadcrumbSchema =
    breadcrumbItems && breadcrumbItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.label,
            item: item.href
              ? item.href.startsWith("http")
                ? item.href
                : `${BASE_URL}${item.href}`
              : undefined,
          })),
        }
      : null;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-brand-950 text-white py-10 sm:py-16 lg:py-20 border-b border-brand-800",
        className
      )}
    >
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}

      {/* Background image with rich gradient overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-20 filter saturate-50"
            aria-hidden="true"
          />
          {/* Gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/90 to-brand-950/70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Decorative gold hairline line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-600 via-accent-500 to-transparent opacity-80"
        aria-hidden="true"
      />

      <Container className="relative z-raised">
        <div className="max-w-3xl space-y-4">
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <div className="mb-4">
              <Breadcrumb
                items={breadcrumbItems}
                className="[&_ol]:text-white/70 [&_span[aria-current]]:text-accent-400 [&_a]:text-white/80 [&_a:hover]:text-accent-400"
              />
            </div>
          )}

          {badge && (
            <div>
              <Badge variant="accent" size="sm" pill>
                {badge}
              </Badge>
            </div>
          )}

          <h1 className="font-heading text-h1 font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-body-lg text-brand-100/90 leading-relaxed max-w-2xl pt-1">
              {description}
            </p>
          )}

          {actions && <div className="pt-4 flex flex-wrap gap-4">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}
