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
  MapPin,
  Phone,
  Mail,
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
import { AnnouncementStrip } from "@/components/sections/AnnouncementStrip";
import { cn } from "@/lib/cn";

export interface HeaderProps {
  className?: string;
}

/**
 * Two-tier sticky header:
 * 1. TopBar — dark-green strip with contact info (left) and quick links + search (right).
 * 2. MainNav — white bar with logo, primary nav (dropdown/mega menu), and Apply Now CTA.
 *
 * Shrinks on scroll (TopBar hides, MainNav condenses). Mobile: hamburger → slide-in drawer.
 */
export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hide TopBar and shrink MainNav on scroll past 20px
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

  // Reset active menu on route change
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
          "sticky top-0 z-[40] w-full transition-all duration-300",
          className
        )}
      >
        {/* ── TOP BAR (Desktop & Tablet only — keeps mobile viewport clean) ── */}
        <div className="hidden sm:block bg-brand-900 text-white text-[12px] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
            {/* Left: contact snippet */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5 text-white/85 text-[12px]">
              <span className="hidden xl:inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent-400 shrink-0" aria-hidden="true" />
                <span>
                  {site.contact.address.split(",")[0]}, {site.contact.district}, {site.contact.state}
                </span>
              </span>
              <span className="hidden xl:block w-px h-3.5 bg-white/20" aria-hidden="true" />
              <a
                href={`tel:${site.contact.phones[0]}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label={`Call us at ${site.contact.phones[0]}`}
              >
                <Phone className="h-3.5 w-3.5 text-accent-400 shrink-0" aria-hidden="true" />
                <span>{site.contact.phones[0]}</span>
              </a>
              <span className="w-px h-3.5 bg-white/20" aria-hidden="true" />
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label={`Email us at ${site.contact.email}`}
              >
                <Mail className="h-3.5 w-3.5 text-accent-400 shrink-0" aria-hidden="true" />
                <span>{site.contact.email}</span>
              </a>
            </div>

            {/* Right: quick-access links */}
            <nav
              aria-label="Utility Navigation"
              className="flex items-center gap-1 sm:gap-1.5 ml-auto text-[12px]"
            >
              {navigation.topBar.links.map((link) => {
                const isActive =
                  link.href !== "#" &&
                  (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
                return (
                  <SmartLink
                    key={link.href + link.label}
                    href={link.href}
                    isExternal={link.isExternal}
                    className={cn(
                      "px-2.5 py-1 rounded text-xs transition-colors",
                      isActive
                        ? "text-accent-400 font-semibold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </SmartLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ── MAIN NAV BAR ────────────────────────────────────────────────── */}
        <div
          className={cn(
            "bg-surface border-b border-border transition-all duration-300",
            isScrolled ? "shadow-header" : ""
          )}
        >
          <div
            className={cn(
              "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300",
              isScrolled ? "py-2" : "py-3"
            )}
          >
            {/* Logo */}
            <SmartLink
              href="/"
              className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-brand-700 rounded-sm"
              aria-label={`${site.name} Home`}
            >
              <Image
                src="/images/brand/logo.png"
                alt={site.name}
                width={220}
                height={86}
                priority
                className={cn(
                  "w-auto transition-all duration-300",
                  isScrolled ? "h-10 sm:h-11" : "h-11 sm:h-13"
                )}
              />
            </SmartLink>

            {/* Desktop Primary Navigation */}
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
                        "relative px-3 py-2 font-heading text-body-sm transition-colors whitespace-nowrap",
                        isActive
                          ? "text-brand-800 font-bold"
                          : "text-ink-700 hover:text-brand-800 font-medium"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </SmartLink>
                  );
                }

                // Dropdown trigger
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
                        "inline-flex items-center gap-1.5 px-3 py-2 font-heading text-body-sm transition-colors cursor-pointer select-none whitespace-nowrap",
                        isMenuOpen || isChildActive
                          ? "text-brand-800 font-bold"
                          : "text-ink-700 hover:text-brand-800 font-medium"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isMenuOpen || isChildActive ? "text-brand-700" : "text-ink-400",
                          isMenuOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Mega Menu Panels */}
                    {isMenuOpen && (
                      <div
                        className={cn(
                          "absolute top-full pt-2 z-[30] animate-in fade-in zoom-in-95 duration-150",
                          item.label === "Departments"
                            ? "-left-40 xl:-left-48 w-[720px] xl:w-[780px]"
                            : item.label === "Academics"
                              ? "-left-16 w-[640px]"
                              : "right-0 w-[480px]"
                        )}
                      >
                        <div className="rounded-card bg-surface border border-border shadow-pop p-6 overflow-hidden">
                          {/* 1. Departments Mega Menu */}
                          {item.label === "Departments" && (
                            <div className="grid grid-cols-3 gap-6">
                              {/* B.Tech */}
                              <div className="space-y-3">
                                <div className="flex items-center pb-2 border-b border-border gap-1.5">
                                  <GraduationCap className="h-4 w-4 text-brand-700" aria-hidden="true" />
                                  <span className="font-heading font-bold text-body-sm text-brand-900">
                                    B.Tech (4 Yrs)
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
                                <SmartLink
                                  href="/departments/btech"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700"
                                >
                                  <span>All B.Tech Programs</span>
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </SmartLink>
                              </div>

                              {/* M.Tech */}
                              <div className="space-y-3">
                                <div className="flex items-center pb-2 border-b border-border gap-1.5">
                                  <Award className="h-4 w-4 text-accent-600" aria-hidden="true" />
                                  <span className="font-heading font-bold text-body-sm text-brand-900">
                                    M.Tech (2 Yrs)
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
                                <SmartLink
                                  href="/departments/mtech"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700"
                                >
                                  <span>All M.Tech Programs</span>
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </SmartLink>
                              </div>

                              {/* Polytechnic */}
                              <div className="space-y-3">
                                <div className="flex items-center pb-2 border-b border-border gap-1.5">
                                  <BookOpen className="h-4 w-4 text-brand-600" aria-hidden="true" />
                                  <span className="font-heading font-bold text-body-sm text-brand-900">
                                    Polytechnic (3 Yrs)
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
                                <SmartLink
                                  href="/departments/polytechnic"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700"
                                >
                                  <span>All Diploma Courses</span>
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </SmartLink>
                              </div>
                            </div>
                          )}

                          {/* 2. Academics Mega Menu */}
                          {item.label === "Academics" && (
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <p className="font-heading font-bold text-xs uppercase tracking-wider text-brand-800 pb-2 mb-2 border-b border-border">
                                  Institutional Approvals &amp; Disclosure
                                </p>
                                <ul className="space-y-1.5 text-body-sm">
                                  {item.children.slice(0, 6).map((child) => (
                                    <li key={`${child.href}-${child.label}`}>
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
                                  Innovation &amp; Cell Committees
                                </p>
                                <ul className="space-y-1.5 text-body-sm">
                                  {item.children.slice(6).map((child) => (
                                    <li key={`${child.href}-${child.label}`}>
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
                                  Student Clubs &amp; Cells
                                </p>
                                <ul className="space-y-1.5 text-body-sm">
                                  {item.children.slice(0, 6).map((child) => (
                                    <li key={`${child.href}-${child.label}`}>
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
                                  People &amp; Placement
                                </p>
                                <ul className="space-y-1.5 text-body-sm">
                                  {item.children.slice(6).map((child) => (
                                    <li key={`${child.href}-${child.label}`}>
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

                          {/* Generic dropdown for any other group */}
                          {item.label !== "Departments" &&
                            item.label !== "Academics" &&
                            item.label !== "More" && (
                              <ul className="space-y-1.5 text-body-sm">
                                {item.children.map((child) => (
                                  <li key={`${child.href}-${child.label}`}>
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
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Search + Apply Now + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search icon (always visible) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search dialog (Press Cmd+K)"
                className="p-2 rounded-full text-ink-700 hover:text-brand-900 hover:bg-brand-50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-700"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Gold Apply Now pill */}
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
                  <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
              </SmartLink>

              {/* Mobile hamburger */}
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
        </div>

        {/* Scrolling marquee announcement strip directly under navigation bar */}
        <AnnouncementStrip />
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
