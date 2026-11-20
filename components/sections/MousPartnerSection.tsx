"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Handshake, MapPin, Search } from "lucide-react";
import { subscribeToLiveMous } from "@/lib/firebase-services";
import { defaultMouPartners } from "@/content/academics";
import type { MouPartner } from "@/types/academics";

function getCategoryBadge(category?: string): { bg: string; text: string; border: string } {
  const cat = (category || "").toLowerCase();
  if (cat.includes("assistive") || cat.includes("research")) {
    return { bg: "bg-purple-500/10", text: "text-purple-800", border: "border-purple-300/60" };
  }
  if (cat.includes("mep") || cat.includes("quality")) {
    return { bg: "bg-amber-500/10", text: "text-amber-800", border: "border-amber-300/60" };
  }
  if (cat.includes("aerospace") || cat.includes("mechanical")) {
    return { bg: "bg-brand-800/10", text: "text-brand-900", border: "border-brand-300/60" };
  }
  if (cat.includes("it") || cat.includes("software")) {
    return { bg: "bg-sky-500/10", text: "text-sky-800", border: "border-sky-300/60" };
  }
  if (cat.includes("automation") || cat.includes("cybernetics")) {
    return { bg: "bg-emerald-500/10", text: "text-emerald-800", border: "border-emerald-300/60" };
  }
  if (cat.includes("cyber") || cat.includes("cloud")) {
    return { bg: "bg-indigo-500/10", text: "text-indigo-800", border: "border-indigo-300/60" };
  }
  return { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-300/60" };
}

export function MousPartnerSection() {
  const [partners, setPartners] = useState<MouPartner[]>(defaultMouPartners);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToLiveMous((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setPartners(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredPartners = useMemo(() => {
    if (!searchQuery.trim()) return partners;
    const q = searchQuery.toLowerCase();
    return partners.filter(
      (p) =>
        p.companyName.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.scope && p.scope.toLowerCase().includes(q))
    );
  }, [partners, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
        <div>
          <h3 className="font-heading font-bold text-h4 text-ink-900 flex items-center gap-2">
            <Handshake className="w-5 h-5 text-brand-800 shrink-0" />
            <span>Corporate &amp; Institutional MoUs</span>
          </h3>
          <p className="text-body-sm text-ink-600 mt-0.5">
            Formally signed agreements supporting student internships, industrial training, and placements
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 font-semibold text-xs border border-brand-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {partners.length} Active MoUs
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by company name, technology, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>

      {/* Partner Cards Grid */}
      {filteredPartners.length === 0 ? (
        <div className="p-10 rounded-2xl border border-border bg-canvas text-center text-ink-500 text-xs">
          No MoU partners match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPartners.map((item, index) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={item.id || `mou-${index}`}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Top Bar: Index + Category + Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink-400 w-6">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      {item.category && (
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.status || "Active"}
                    </span>
                  </div>

                  {/* Company Name */}
                  <h4 className="font-heading font-bold text-ink-900 text-h4 group-hover:text-brand-900 transition-colors leading-snug">
                    {item.companyName}
                  </h4>

                  {/* Address / Location */}
                  {item.location && (
                    <div className="flex items-start gap-2 text-xs text-ink-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-accent-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item.location}</span>
                    </div>
                  )}

                  {/* Collaboration Scope */}
                  {item.scope && (
                    <div className="pt-2 border-t border-border/70">
                      <p className="text-body-sm text-ink-700 leading-relaxed">
                        {item.scope}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
