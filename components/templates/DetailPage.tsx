import React from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";

export interface DetailGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface DetailPageProps {
  title: string;
  subtitle?: string;
  date?: string;
  category?: string;
  breadcrumbItems?: BreadcrumbItem[];
  featuredImage?: string;
  gallery?: DetailGalleryImage[];
  children: React.ReactNode;
  relatedItems?: React.ReactNode;
  backLink?: { label: string; href: string };
  className?: string;
}

/**
 * DetailPage template for individual articles (News & Events details, Campus-life facility details).
 * Features rich header with meta tags, featured hero image, article prose body,
 * optional photo gallery, and related items section.
 */
export function DetailPage({
  title,
  subtitle,
  date,
  category,
  breadcrumbItems,
  featuredImage,
  gallery,
  children,
  relatedItems,
  backLink,
  className,
}: DetailPageProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title={title}
        description={subtitle}
        breadcrumbItems={breadcrumbItems}
        badge={category}
      />

      <Section tone="canvas" spacing="default">
        <Container size="narrow">
          <div className="space-y-8">
            {/* Back Navigation Link */}
            {backLink && (
              <div>
                <SmartLink
                  href={backLink.href}
                  className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>{backLink.label}</span>
                </SmartLink>
              </div>
            )}

            {/* Article Card */}
            <article className="rounded-2xl bg-surface border border-border overflow-hidden shadow-xs">
              {/* Featured Top Image */}
              {featuredImage && (
                <div className="relative aspect-[16/9] w-full bg-brand-50">
                  <Image
                    src={featuredImage}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center"
                  />
                </div>
              )}

              <div className="p-6 sm:p-10 lg:p-12 space-y-6">
                {/* Meta info bar */}
                {(date || category) && (
                  <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border/80 text-xs sm:text-body-sm text-ink-500">
                    {category && (
                      <Badge variant="mint" size="sm">
                        <Tag className="h-3 w-3 mr-1 inline" />
                        {category}
                      </Badge>
                    )}
                    {date && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-4 w-4 text-brand-700" />
                        {date}
                      </span>
                    )}
                  </div>
                )}

                {/* Main Article Body */}
                <div className="prose prose-college max-w-none text-ink-700 text-body leading-relaxed space-y-4">
                  {children}
                </div>
              </div>
            </article>

            {/* Image Gallery */}
            {gallery && gallery.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-heading font-bold text-h3 text-ink-900">
                  Photo Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-50 border border-border"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 text-white text-xs text-center backdrop-blur-xs">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Items Section */}
            {relatedItems && (
              <div className="pt-8 border-t border-border space-y-6">
                {relatedItems}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
