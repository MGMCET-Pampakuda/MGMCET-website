"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Search, ChevronDown, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { btechDepartments, mtechDepartments, polytechnicDepartments } from "@/content/departments";
import { SmartLink } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

/**
 * Mobile drawer navigation featuring an accessible accordion for deep categories,
 * quick admissions CTA, search trigger, and direct contact details.
 */
export function MobileDrawer({ isOpen, onClose, onOpenSearch }: MobileDrawerProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Close drawer whenever route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isOpen) {
      onClose();
    }
  }

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-modal flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-surface h-full shadow-pop flex flex-col z-raised animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-surface shrink-0">
          <SmartLink href="/" onClick={onClose} className="flex items-center">
            <Image
              src="/images/brand/logo.svg"
              alt={site.name}
              width={160}
              height={48}
              className="h-10 w-auto"
            />
          </SmartLink>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 rounded-md text-ink-600 hover:text-ink-900 hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 cursor-pointer"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Quick Search Trigger */}
        <div className="p-4 border-b border-border bg-brand-50/50 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-border bg-surface text-ink-500 hover:text-ink-900 hover:border-brand-600 text-body-sm transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 text-ink-400" aria-hidden="true" />
              <span>Search courses, news, docs...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-brand-50 border border-border rounded-xs">
              Search
            </kbd>
          </button>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.header.items.map((item) => {
            const hasChildren = "children" in item;

            if (!hasChildren) {
              const isActive = pathname === item.href;
              return (
                <SmartLink
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-3 rounded-lg font-heading text-body font-semibold transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-900 font-bold"
                      : "text-ink-900 hover:bg-brand-50/60 hover:text-brand-800"
                  )}
                >
                  <span>{item.label}</span>
                </SmartLink>
              );
            }

            // Category with dropdown / accordion
            const isOpen = Boolean(openSections[item.label]);

            // For Departments, show categorized levels
            if (item.label === "Departments") {
              return (
                <div key={item.label} className="rounded-lg overflow-hidden border border-border/50">
                  <button
                    type="button"
                    onClick={() => toggleSection(item.label)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-3.5 py-3 font-heading text-body font-semibold text-ink-900 hover:bg-brand-50/60 transition-colors cursor-pointer"
                  >
                    <span>Departments</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-ink-400 transition-transform duration-200",
                        isOpen && "rotate-180 text-brand-700"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="bg-brand-50/30 px-3 pb-3 pt-1 space-y-4 border-t border-border/40 text-body-sm">
                      {/* B.Tech */}
                      <div>
                        <div className="flex items-center justify-between font-heading font-bold text-xs uppercase tracking-wider text-brand-800 py-1.5 border-b border-brand-100">
                          <span>B.Tech Programmes (4 Yrs)</span>
                          <SmartLink
                            href="/departments/btech"
                            onClick={onClose}
                            className="text-accent-600 hover:underline text-[11px]"
                          >
                            Overview →
                          </SmartLink>
                        </div>
                        <ul className="mt-1.5 space-y-1">
                          {btechDepartments.map((d) => (
                            <li key={d.id}>
                              <SmartLink
                                href={d.href}
                                onClick={onClose}
                                className="block py-1 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-white transition-colors"
                              >
                                {d.name}
                              </SmartLink>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* M.Tech */}
                      <div>
                        <div className="flex items-center justify-between font-heading font-bold text-xs uppercase tracking-wider text-brand-800 py-1.5 border-b border-brand-100">
                          <span>M.Tech Programmes (2 Yrs)</span>
                          <SmartLink
                            href="/departments/mtech"
                            onClick={onClose}
                            className="text-accent-600 hover:underline text-[11px]"
                          >
                            Overview →
                          </SmartLink>
                        </div>
                        <ul className="mt-1.5 space-y-1">
                          {mtechDepartments.map((d) => (
                            <li key={d.id}>
                              <SmartLink
                                href={d.href}
                                onClick={onClose}
                                className="block py-1 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-white transition-colors"
                              >
                                {d.name}
                              </SmartLink>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Polytechnic */}
                      <div>
                        <div className="flex items-center justify-between font-heading font-bold text-xs uppercase tracking-wider text-brand-800 py-1.5 border-b border-brand-100">
                          <span>Polytechnic / Diploma (3 Yrs)</span>
                          <SmartLink
                            href="/departments/polytechnic"
                            onClick={onClose}
                            className="text-accent-600 hover:underline text-[11px]"
                          >
                            Overview →
                          </SmartLink>
                        </div>
                        <ul className="mt-1.5 space-y-1">
                          {polytechnicDepartments.map((d) => (
                            <li key={d.id}>
                              <SmartLink
                                href={d.href}
                                onClick={onClose}
                                className="block py-1 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-white transition-colors"
                              >
                                {d.name}
                              </SmartLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Other groups (Academics, More)
            return (
              <div key={item.label} className="rounded-lg overflow-hidden border border-border/50">
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-3.5 py-3 font-heading text-body font-semibold text-ink-900 hover:bg-brand-50/60 transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-ink-400 transition-transform duration-200",
                      isOpen && "rotate-180 text-brand-700"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="bg-brand-50/30 px-3 pb-3 pt-1 space-y-1 border-t border-border/40 text-body-sm">
                    {item.children.map((child) => (
                      <SmartLink
                        key={`${child.href}-${child.label}`}
                        href={child.href}
                        isExternal={child.isExternal}
                        isPdf={child.isPdf}
                        showIcon
                        onClick={onClose}
                        className="flex items-center justify-between py-1.5 px-2 rounded-sm text-ink-700 hover:text-brand-900 hover:bg-white transition-colors"
                      >
                        <span>{child.label}</span>
                      </SmartLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Links (Campus Life, Faculty, Alumni, Contact Us) */}
          <div className="pt-3 mt-2 border-t border-border/60">
            <p className="px-3 pb-1.5 text-xs font-heading font-bold uppercase tracking-wider text-ink-500">
              Quick Links
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {navigation.topBar.links.map((link) => {
                const isActive =
                  link.href !== "#" &&
                  (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
                return (
                  <SmartLink
                    key={link.href + link.label}
                    href={link.href}
                    isExternal={link.isExternal}
                    onClick={onClose}
                    className={cn(
                      "px-3 py-2 rounded-lg text-body-sm font-medium transition-colors",
                      isActive
                        ? "text-brand-800 font-bold bg-brand-50"
                        : "text-ink-700 hover:text-brand-800 hover:bg-brand-50/50"
                    )}
                  >
                    {link.label}
                  </SmartLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Area: Apply CTA & Quick Contact */}
        <div className="p-4 sm:p-5 border-t border-border bg-brand-50/30 space-y-4 shrink-0">
          <SmartLink href={site.applyNowUrl} isExternal className="w-full block">
            <Button variant="accent" pill fullWidth className="font-bold">
              <span>Apply Now (Admissions 2026)</span>
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          </SmartLink>

          <div className="pt-2 text-xs text-ink-600 space-y-1.5 border-t border-border/60">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-brand-700 shrink-0" aria-hidden="true" />
              <span>{site.contact.phones.join(" / ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-brand-700 shrink-0" aria-hidden="true" />
              <span>{site.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-brand-700 shrink-0" aria-hidden="true" />
              <span>
                {site.contact.address}, {site.contact.district}, {site.contact.state}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
