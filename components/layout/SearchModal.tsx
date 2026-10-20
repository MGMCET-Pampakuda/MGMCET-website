"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, BookOpen, GraduationCap, Newspaper, FileText } from "lucide-react";
import { navigation } from "@/content/navigation";
import { allDepartments } from "@/content/departments";
import { news } from "@/content/news";
import { cn } from "@/lib/cn";

export interface SearchResultItem {
  id: string;
  title: string;
  category: "Navigation" | "Department" | "News & Events" | "Document";
  href: string;
  description?: string;
  isExternal?: boolean;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Client-side search modal allowing instant searching across navigation,
 * 15 departments, academic downloads, and news articles.
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build the complete search index once
  const searchIndex: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Navigation items
    navigation.header.items.forEach((item) => {
      if ("children" in item) {
        item.children.forEach((child) => {
          items.push({
            id: `nav-${child.href}`,
            title: child.label,
            category: child.isPdf ? "Document" : "Navigation",
            href: child.href,
            description: `${item.label} › ${child.label}`,
            isExternal: child.isExternal || child.isPdf,
          });
        });
      } else {
        items.push({
          id: `nav-${item.href}`,
          title: item.label,
          category: "Navigation",
          href: item.href,
          description: "Main page",
        });
      }
    });

    // 2. All Departments
    allDepartments.forEach((dept) => {
      const levelLabel =
        dept.level === "btech"
          ? "B.Tech"
          : dept.level === "mtech"
          ? "M.Tech"
          : "Polytechnic / Diploma";
      items.push({
        id: `dept-${dept.id}`,
        title: `${levelLabel} — ${dept.name}`,
        category: "Department",
        href: dept.href,
        description: `${dept.duration} • Intake: ${dept.intake} seats`,
      });
    });

    // 3. News & Events
    news.forEach((item) => {
      items.push({
        id: `news-${item.id}`,
        title: item.title,
        category: "News & Events",
        href: `/news-events/${item.slug}`,
        description: item.excerpt,
      });
    });

    // Deduplicate by href
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });
  }, []);

  // Filtered results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return searchIndex
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
        );
      })
      .slice(0, 10);
  }, [query, searchIndex]);

  // Reset state on open during render
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }

  // Focus input and lock body scroll on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredResults[selectedIndex];
      if (selected) {
        handleSelect(selected);
      }
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  if (!isOpen) return null;

  const getCategoryIcon = (category: SearchResultItem["category"]) => {
    switch (category) {
      case "Department":
        return <GraduationCap className="h-4 w-4 text-brand-700" aria-hidden="true" />;
      case "News & Events":
        return <Newspaper className="h-4 w-4 text-accent-600" aria-hidden="true" />;
      case "Document":
        return <FileText className="h-4 w-4 text-ink-600" aria-hidden="true" />;
      default:
        return <BookOpen className="h-4 w-4 text-brand-600" aria-hidden="true" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
      className="fixed inset-0 z-modal flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search dialog panel */}
      <div className="relative w-full max-w-2xl rounded-card bg-surface shadow-pop border border-border overflow-hidden transition-all animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]">
        {/* Search header / input */}
        <div className="flex items-center px-4 border-b border-border bg-surface">
          <Search className="h-5 w-5 text-ink-400 shrink-0 mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search departments, courses, news, documents..."
            className="w-full h-14 bg-transparent text-ink-900 text-body placeholder:text-ink-400 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear query"
              className="p-1.5 rounded-md text-ink-400 hover:text-ink-900 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono text-ink-400 bg-brand-50 border border-brand-100 rounded-sm">
              ESC
            </kbd>
          )}
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
          {query.trim() === "" ? (
            <div className="py-12 px-6 text-center text-ink-400 space-y-2">
              <p className="font-heading text-body font-semibold text-ink-700">
                Type to start searching
              </p>
              <p className="text-body-sm text-ink-500 max-w-sm mx-auto">
                Quickly discover B.Tech, M.Tech, and Polytechnic programmes, syllabus links, IQAC, NIRF, and campus news.
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-12 px-6 text-center text-ink-600 space-y-2">
              <p className="font-heading text-body font-semibold text-ink-900">
                No matching results found
              </p>
              <p className="text-body-sm text-ink-500">
                No entries match &ldquo;{query}&rdquo;. Try searching for &ldquo;AI&rdquo;, &ldquo;CSE&rdquo;, &ldquo;Polytechnic&rdquo;, or &ldquo;Admissions&rdquo;.
              </p>
            </div>
          ) : (
            <ul role="listbox" className="space-y-1">
              {filteredResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer select-none",
                      isSelected
                        ? "bg-brand-50 text-brand-900"
                        : "hover:bg-brand-50/60 text-ink-900"
                    )}
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-4">
                      <div className="mt-0.5 shrink-0">{getCategoryIcon(item.category)}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-semibold text-body-sm truncate">
                            {item.title}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0",
                              item.category === "Department"
                                ? "bg-brand-100 text-brand-800"
                                : item.category === "News & Events"
                                ? "bg-accent-100 text-accent-700"
                                : "bg-ink-200/50 text-ink-700"
                            )}
                          >
                            {item.category}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-ink-500 truncate mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform",
                        isSelected
                          ? "text-brand-700 translate-x-1"
                          : "text-ink-400 opacity-0"
                      )}
                      aria-hidden="true"
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-border bg-brand-50/50 flex items-center justify-between text-xs text-ink-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-surface border border-border rounded-xs">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-surface border border-border rounded-xs">
                ↓
              </kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-surface border border-border rounded-xs">
                ↵
              </kbd>
              to select
            </span>
          </div>
          <span>
            {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  );
}
