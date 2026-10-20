import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { SmartLink } from "@/components/ui/Link";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";

export interface SideNavItem {
  label: string;
  href: string;
  active?: boolean;
  isExternal?: boolean;
}

export interface ContentPageProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  badge?: string;
  sideNavTitle?: string;
  sideNavItems?: SideNavItem[];
  children: React.ReactNode;
  className?: string;
}

/**
 * ContentPage template for institutional narrative pages (About, IQAC, Committees, Policies).
 * Features PageHero, a responsive 2-column layout with a sticky sidebar for related links/navigation,
 * and standard typography hierarchy.
 */
export function ContentPage({
  title,
  description,
  breadcrumbItems,
  heroImage,
  badge,
  sideNavTitle = "In this Section",
  sideNavItems,
  children,
  className,
}: ContentPageProps) {
  const hasSideNav = sideNavItems && sideNavItems.length > 0;

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title={title}
        description={description}
        breadcrumbItems={breadcrumbItems}
        image={heroImage}
        badge={badge}
      />

      <Section tone="canvas" spacing="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Content Area */}
            <article
              className={cn(
                "rounded-2xl bg-surface border border-border p-6 sm:p-10 lg:p-12 shadow-xs",
                hasSideNav ? "lg:col-span-8" : "lg:col-span-12"
              )}
            >
              <div className="space-y-6 text-ink-700 leading-relaxed text-body">
                {children}
              </div>
            </article>

            {/* Sticky Sidebar Navigation */}
            {hasSideNav && (
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-4">
                  <h2 className="font-heading font-bold text-h4 text-ink-900 border-b border-border pb-3">
                    {sideNavTitle}
                  </h2>
                  <nav aria-label={sideNavTitle}>
                    <ul className="space-y-1">
                      {sideNavItems.map((item) => (
                        <li key={item.href}>
                          <SmartLink
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-body-sm font-medium transition-colors",
                              item.active
                                ? "bg-brand-50 text-brand-900 font-semibold border-l-4 border-brand-700"
                                : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
                            )}
                          >
                            <span>{item.label}</span>
                            <span
                              className={cn(
                                "text-xs",
                                item.active ? "text-brand-700" : "text-ink-400"
                              )}
                              aria-hidden="true"
                            >
                              &rarr;
                            </span>
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
