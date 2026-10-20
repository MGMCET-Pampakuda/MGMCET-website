"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  Menu,
  ArrowRight,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import {
  btechDepartments,
  mtechDepartments,
  polytechnicDepartments,
} from "@/content/departments";
import { SmartLink } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { SearchModal } from "./SearchModal";
import { MobileDrawer } from "./MobileDrawer";
import { cn } from "@/lib/cn";

export interface HeaderProps {
  className?: string;
}

/**
 * Institutional Sticky Header featuring animated shrink-on-scroll,
 * multi-level accessible mega-menus, client-side search, and admissions CTA.
 */
export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Shrink header on scroll past 20px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K / Ctrl+K for search & Escape to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset active menu if route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
  }

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-sticky w-full bg-surface border-b border-border transition-all duration-300",
          isScrolled ? "shadow-header py-2.5" : "py-4",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Left */}
          <SmartLink
            href="/"
            className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-brand-700 rounded-sm"
            aria-label={`${site.name} Home`}
          >
            <Image
              src="/images/brand/logo.svg"
              alt={site.name}
              width={220}
              height={56}
              priority
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-10 sm:h-11" : "h-11 sm:h-12"
              )}
            />
          </SmartLink>

          {/* Desktop Navigation Center */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navigation.header.items.map((item) => {
              const hasChildren = "children" in item;
              const isMenuOpen = activeMenu === item.label;

              if (!hasChildren) {
                const isActive = pathname === item.href;
                return (
                  <SmartLink
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 font-heading text-body-sm font-semibold transition-colors rounded-md",
                      isActive
                        ? "text-brand-700 font-bold"
                        : "text-ink-700 hover:text-brand-900 hover:bg-brand-50/60"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-700 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </SmartLink>
                );
              }

              // Dropdown / Mega Menu Trigger
              const isChildActive = Boolean(
                item.href && item.href !== "#" && pathname.startsWith(item.href)
              );

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                    onClick={() =>
                      setActiveMenu(isMenuOpen ? null : item.label)
                    }
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-2 font-heading text-body-sm font-semibold transition-colors rounded-md cursor-pointer select-none",
                      isMenuOpen || isChildActive
                        ? "text-brand-900 bg-brand-50/80"
                        : "text-ink-700 hover:text-brand-900 hover:bg-brand-50/60"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 text-ink-400",
                        isMenuOpen && "rotate-180 text-brand-700"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mega Menu Panels */}
                  {isMenuOpen && (
                    <div
                      className={cn(
                        "absolute top-full pt-2 z-dropdown animate-in fade-in zoom-in-95 duration-150",
                        item.label === "Departments"
                          ? "-left-48 w-[720px] xl:w-[780px]"
                          : item.label === "Academics"
                          ? "-left-20 w-[640px]"
                          : "-right-10 w-[480px]"
                      )}
                    >
                      <div className="rounded-card bg-surface border border-border shadow-pop p-6 overflow-hidden">
                        {/* 1. Departments Mega Menu */}
                        {item.label === "Departments" && (
                          <div className="grid grid-cols-3 gap-6">
                            {/* B.Tech */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-border">
                                <span className="font-heading font-bold text-body-sm text-brand-900 flex items-center gap-1.5">
                                  <GraduationCap className="h-4 w-4 text-brand-700" aria-hidden="true" />
                                  <span>B.Tech (4 Yrs)</span>
                                </span>
                              </div>
                              <ul className="space-y-1.5 text-caption">
                                {btechDepartments.map((d) => (
                                  <li key={d.id}>
                                    <SmartLink
                                      href={d.href}
                                      className="block py-1 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      {d.name}
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-2">
                                <SmartLink
                                  href="/departments/btech"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700"
                                >
                                  <span>All B.Tech Programs</span>
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </SmartLink>
                              </div>
                            </div>

                            {/* M.Tech */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-border">
                                <span className="font-heading font-bold text-body-sm text-brand-900 flex items-center gap-1.5">
                                  <Award className="h-4 w-4 text-accent-600" aria-hidden="true" />
                                  <span>M.Tech (2 Yrs)</span>
                                </span>
                              </div>
                              <ul className="space-y-1.5 text-caption">
                                {mtechDepartments.map((d) => (
                                  <li key={d.id}>
                                    <SmartLink
                                      href={d.href}
                                      className="block py-1 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      {d.name}
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-2">
                                <SmartLink
                                  href="/departments/mtech"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700"
                                >
                                  <span>All M.Tech Programs</span>
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </SmartLink>
                              </div>
                            </div>

                            {/* Polytechnic */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-border">
                                <span className="font-heading font-bold text-body-sm text-brand-900 flex items-center gap-1.5">
                                  <BookOpen className="h-4 w-4 text-brand-600" aria-hidden="true" />
                                  <span>Polytechnic (3 Yrs)</span>
                                </span>
                              </div>
                              <ul className="space-y-1.5 text-caption">
                                {polytechnicDepartments.map((d) => (
                                  <li key={d.id}>
                                    <SmartLink
                                      href={d.href}
                                      className="block py-1 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      {d.name}
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-2">
                                <SmartLink
                                  href="/departments/polytechnic"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700"
                                >
                                  <span>All Diploma Courses</span>
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </SmartLink>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Academics Mega Menu */}
                        {item.label === "Academics" && (
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="font-heading font-bold text-xs uppercase tracking-wider text-brand-800 pb-2 mb-2 border-b border-border">
                                Institutional Approvals & Disclosure
                              </p>
                              <ul className="space-y-1.5 text-body-sm">
                                {item.children.slice(0, 6).map((child) => (
                                  <li key={child.href}>
                                    <SmartLink
                                      href={child.href}
                                      isExternal={child.isExternal}
                                      isPdf={child.isPdf}
                                      showIcon
                                      className="flex items-center justify-between py-1.5 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      <span>{child.label}</span>
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="font-heading font-bold text-xs uppercase tracking-wider text-brand-800 pb-2 mb-2 border-b border-border">
                                Innovation & Cell Committees
                              </p>
                              <ul className="space-y-1.5 text-body-sm">
                                {item.children.slice(6).map((child) => (
                                  <li key={child.href}>
                                    <SmartLink
                                      href={child.href}
                                      isExternal={child.isExternal}
                                      isPdf={child.isPdf}
                                      showIcon
                                      className="flex items-center justify-between py-1.5 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      <span>{child.label}</span>
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* 3. More Dropdown */}
                        {item.label === "More" && (
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="font-heading font-bold text-xs uppercase tracking-wider text-brand-800 pb-2 mb-2 border-b border-border">
                                Student Clubs & Cells
                              </p>
                              <ul className="space-y-1.5 text-body-sm">
                                {item.children.slice(0, 6).map((child) => (
                                  <li key={child.href}>
                                    <SmartLink
                                      href={child.href}
                                      isExternal={child.isExternal}
                                      showIcon
                                      className="flex items-center justify-between py-1.5 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      <span>{child.label}</span>
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="font-heading font-bold text-xs uppercase tracking-wider text-brand-800 pb-2 mb-2 border-b border-border">
                                People & Placement
                              </p>
                              <ul className="space-y-1.5 text-body-sm">
                                {item.children.slice(6).map((child) => (
                                  <li key={child.href}>
                                    <SmartLink
                                      href={child.href}
                                      isExternal={child.isExternal}
                                      showIcon
                                      className="flex items-center justify-between py-1.5 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors"
                                    >
                                      <span>{child.label}</span>
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons: Search + Gold Apply Now + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog (Press Cmd+K)"
              className="p-2 sm:p-2.5 rounded-full text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 cursor-pointer"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Gold Apply Now Pill */}
            <SmartLink
              href={site.applyNowUrl}
              isExternal
              className="hidden sm:inline-flex"
            >
              <Button
                variant="accent"
                size={isScrolled ? "sm" : "md"}
                pill
                className="font-bold tracking-wide shadow-sm"
              >
                <span>Apply Now</span>
              </Button>
            </SmartLink>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Open mobile navigation"
              className="lg:hidden p-2 rounded-md text-ink-900 hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 cursor-pointer"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Client-side Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
