"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  Camera,
  Sparkles,
  Music,
  Trophy,
  Plane,
  Code,
  MessageSquareQuote,
  Terminal,
  Brain,
  ShieldAlert,
  Radio,
  ExternalLink,
  Table as TableIcon,
  LayoutGrid,
  GraduationCap,
  UserCheck,
  Building2,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { subscribeToLiveClubs } from "@/lib/firebase-services";
import { defaultClubsAndAssociations } from "@/content/clubs";
import type { ClubAssociationItem } from "@/types/campus-life";

const ICON_MAP: Record<string, React.ElementType> = {
  Camera,
  Sparkles,
  Music,
  Trophy,
  Plane,
  Code,
  MessageSquareQuote,
  Terminal,
  Brain,
  ShieldAlert,
  Radio,
  Users,
};

function getClubIcon(iconName?: string): React.ElementType {
  if (iconName && ICON_MAP[iconName]) {
    return ICON_MAP[iconName];
  }
  return Users;
}

function hasViceChair(viceChair?: string): boolean {
  if (!viceChair) return false;
  const v = viceChair.trim();
  return v !== "" && v !== "—" && v !== "-" && v.toLowerCase() !== "n/a";
}

export function ClubsAssociationsSection() {
  const [items, setItems] = useState<ClubAssociationItem[]>(defaultClubsAndAssociations);
  const [activeTab, setActiveTab] = useState<"all" | "club" | "association">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Subscribe to live Firestore / local storage updates
  useEffect(() => {
    const unsubscribe = subscribeToLiveClubs((liveData) => {
      if (Array.isArray(liveData) && liveData.length > 0) {
        setItems(liveData);
      }
    });

    return () => unsubscribe();
  }, []);

  // Filter items by tab and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Status check (default to Active if not set)
      if (item.status === "Inactive") return false;

      // Category check
      if (activeTab !== "all" && item.category !== activeTab) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesChairperson = item.chairperson.toLowerCase().includes(q);
        const matchesStaff = item.staffInCharge.toLowerCase().includes(q);
        const matchesVice = (item.viceChairperson || "").toLowerCase().includes(q);
        const matchesBrief = (item.brief || "").toLowerCase().includes(q);
        const matchesTagline = (item.tagline || "").toLowerCase().includes(q);

        return (
          matchesName ||
          matchesChairperson ||
          matchesStaff ||
          matchesVice ||
          matchesBrief ||
          matchesTagline
        );
      }

      return true;
    });
  }, [items, activeTab, searchQuery]);

  // Grouped into clubs and associations
  const clubsList = useMemo(
    () => filteredItems.filter((i) => i.category === "club"),
    [filteredItems]
  );
  const associationsList = useMemo(
    () => filteredItems.filter((i) => i.category === "association"),
    [filteredItems]
  );

  const totalClubs = items.filter((i) => i.category === "club" && i.status !== "Inactive").length;
  const totalAssoc = items.filter((i) => i.category === "association" && i.status !== "Inactive").length;

  return (
    <div className="space-y-10">
      {/* 1. Header Overview & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-800 mb-1">
            <Compass className="w-4 h-4 text-accent-600" />
            <span>Student Leadership &amp; Department Bodies</span>
          </div>
          <h2 className="font-heading font-extrabold text-h2 text-ink-900 tracking-tight">
            Clubs &amp; Department Associations
          </h2>
          <p className="text-body-sm text-ink-600 mt-1 max-w-2xl">
            Explore active student-led technical clubs, creative communities, and departmental
            academic associations driving innovation, campus fests, and hands-on peer learning.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-900 font-semibold text-xs border border-brand-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent-600" />
            {totalClubs} Activity Clubs
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-ink-800 font-semibold text-xs border border-border shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-brand-700" />
            {totalAssoc} Department Associations
          </span>
        </div>
      </div>

      {/* 2. Spotlight Notice for Et Cetera Coding Club */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white p-5 sm:p-6 shadow-sm">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center shrink-0 border border-accent-500/30">
              <Code className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-brand-950">
                  Featured
                </span>
                <span className="text-xs font-semibold text-brand-200">Official Coding Club</span>
              </div>
              <h3 className="font-heading font-bold text-h4 text-white mt-1">
                Et Cetera Club (E.T.C)
              </h3>
              <p className="text-body-sm text-brand-100/90 mt-1 max-w-xl">
                MGMCET&apos;s premier coding club fostering software development, algorithmic problem-solving,
                hackathons, and open-source contributions.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="http://bento.me/etcetera"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-brand-950 font-heading font-bold text-xs transition-colors shadow-xs"
            >
              <span>Visit Bento Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Selector Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-surface border border-border shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-brand-900 text-white shadow-xs"
                : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
            }`}
          >
            All Organizations ({filteredItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("club")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "club"
                ? "bg-brand-900 text-white shadow-xs"
                : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
            }`}
          >
            Clubs ({totalClubs})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("association")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "association"
                ? "bg-brand-900 text-white shadow-xs"
                : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
            }`}
          >
            Associations ({totalAssoc})
          </button>
        </div>

        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64 md:w-80">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by club, staff, student lead..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-border bg-surface text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-400 hover:text-ink-700"
              >
                Clear
              </button>
            )}
          </div>

          <div className="hidden sm:inline-flex p-1 rounded-xl bg-surface border border-border">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-label="Table View"
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-brand-50 text-brand-900" : "text-ink-500 hover:text-ink-900"
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              aria-label="Card View"
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "cards" ? "bg-brand-50 text-brand-900" : "text-ink-500 hover:text-ink-900"
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Content Render: Empty State or Categorized Sections */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-border bg-surface space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-800 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-h4 text-ink-900">No organizations found</h3>
          <p className="text-body-sm text-ink-600 max-w-sm mx-auto">
            No clubs or associations matched your search for &ldquo;{searchQuery}&rdquo;. Try another term
            or clear the search filter.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold hover:bg-brand-950 transition-colors"
          >
            Reset Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* SECTION 1: CLUBS */}
          {(activeTab === "all" || activeTab === "club") && clubsList.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-brand-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/10 text-accent-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent-700" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-h3 text-ink-900 flex items-center gap-2">
                      <span>Part 1: Activity &amp; Technical Clubs</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-800 border border-accent-200 font-semibold font-sans">
                        {clubsList.length} Active
                      </span>
                    </h3>
                    <p className="text-body-sm text-ink-600 mt-0.5">
                      Student-run interest groups in media, coding, UAV robotics, performing arts, sports, and oratory
                    </p>
                  </div>
                </div>
              </div>

              {viewMode === "table" ? (
                <ClubsTableView items={clubsList} isClub={true} />
              ) : (
                <ClubsCardView items={clubsList} />
              )}
            </div>
          )}

          {/* SECTION 2: ASSOCIATIONS */}
          {(activeTab === "all" || activeTab === "association") && associationsList.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-brand-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-800/10 text-brand-900 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-brand-800" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-h3 text-ink-900 flex items-center gap-2">
                      <span>Part 2: Department Academic Associations</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-brand-200 font-semibold font-sans">
                        {associationsList.length} Active
                      </span>
                    </h3>
                    <p className="text-body-sm text-ink-600 mt-0.5">
                      Curricular bodies aligned with core engineering disciplines connecting academic theory to industrial practice
                    </p>
                  </div>
                </div>
              </div>

              {viewMode === "table" ? (
                <ClubsTableView items={associationsList} isClub={false} />
              ) : (
                <ClubsCardView items={associationsList} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Responsive Desktop Table Component
// ----------------------------------------------------------------------------
interface TableViewProps {
  items: ClubAssociationItem[];
  isClub: boolean;
}

function ClubsTableView({ items, isClub }: TableViewProps) {
  return (
    <div>
      {/* Desktop & Tablet Table (md and up) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border text-ink-600 font-semibold text-xs tracking-wider uppercase">
                <th scope="col" className="py-4 px-4 w-12 text-center">
                  #
                </th>
                <th scope="col" className="py-4 px-5 min-w-[260px]">
                  {isClub ? "Club" : "Association"} &amp; Brief
                </th>
                <th scope="col" className="py-4 px-4 min-w-[160px]">
                  Staff-in-Charge
                </th>
                <th scope="col" className="py-4 px-4 min-w-[150px]">
                  Chairperson
                </th>
                <th scope="col" className="py-4 px-4 min-w-[150px]">
                  Vice Chairperson
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-body-sm">
              {items.map((item, index) => {
                const IconComponent = getClubIcon(item.iconName);
                const isEtc = item.id === "et-cetera-club" || item.name.toLowerCase().includes("et cetera");

                return (
                  <tr
                    key={item.id || `row-${index}`}
                    className={`transition-colors hover:bg-canvas/60 ${
                      isEtc ? "bg-accent-50/20" : ""
                    }`}
                  >
                    {/* Index */}
                    <td className="py-4 px-4 text-center text-ink-400 font-mono text-xs font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* Name + Brief */}
                    <td className="py-4 px-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isEtc
                                ? "bg-accent-500 text-brand-950"
                                : "bg-brand-50 text-brand-900 border border-brand-200/70"
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-heading font-bold text-ink-900 text-body flex items-center gap-1.5">
                              {item.name}
                              {isEtc && (
                                <span className="inline-block px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-100 text-accent-900 border border-accent-300">
                                  Coding Club
                                </span>
                              )}
                            </span>
                            {item.tagline && (
                              <span className="block text-xs font-medium text-brand-700">
                                {item.tagline}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Brief Description */}
                        {item.brief && (
                          <p className="text-body-sm text-ink-600 leading-relaxed pl-9 pr-2">
                            {item.brief}
                          </p>
                        )}

                        {item.href && (
                          <div className="pl-9 pt-0.5">
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors"
                            >
                              <span>Official Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 1. Staff-in-Charge */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                          <span className="font-semibold text-ink-900">
                            {item.staffInCharge || "—"}
                          </span>
                        </div>
                        <span className="block text-[11px] text-ink-500 uppercase tracking-wider pl-5">
                          Faculty Advisor
                        </span>
                      </div>
                    </td>

                    {/* 2. Chairperson */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                          <span className="font-semibold text-ink-900">
                            {item.chairperson || "—"}
                          </span>
                        </div>
                        <span className="block text-[11px] text-ink-500 uppercase tracking-wider pl-5">
                          Student Lead
                        </span>
                      </div>
                    </td>

                    {/* 3. Vice Chairperson */}
                    <td className="py-4 px-4 align-top">
                      {hasViceChair(item.viceChairperson) && (
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                            <span className="font-semibold text-ink-900">
                              {item.viceChairperson}
                            </span>
                          </div>
                          <span className="block text-[11px] text-ink-500 uppercase tracking-wider pl-5">
                            Co-Lead
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Stack View (under 768px) */}
      <div className="block md:hidden space-y-3">
        {items.map((item, index) => {
          const IconComponent = getClubIcon(item.iconName);
          const isEtc = item.id === "et-cetera-club" || item.name.toLowerCase().includes("et cetera");

          return (
            <div
              key={item.id || `mob-${index}`}
              className={`p-4 rounded-xl border border-border bg-surface shadow-xs space-y-3 ${
                isEtc ? "border-accent-400 bg-accent-50/10" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isEtc
                        ? "bg-accent-500 text-brand-950"
                        : "bg-brand-50 text-brand-900 border border-brand-200"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 text-body leading-snug">
                      {item.name}
                    </h4>
                    {item.tagline && (
                      <span className="text-[11px] font-semibold text-brand-700 block">
                        {item.tagline}
                      </span>
                    )}
                  </div>
                </div>

                <span className="font-mono text-xs font-semibold text-ink-400 shrink-0">
                  #{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Brief */}
              {item.brief && (
                <p className="text-body-sm text-ink-700 leading-relaxed pt-1 border-t border-border/60">
                  {item.brief}
                </p>
              )}

              {/* Leadership Pill Grid */}
              <div
                className={`grid gap-2 pt-2 border-t border-border/60 text-xs ${
                  hasViceChair(item.viceChairperson)
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {/* 1. Staff in Charge */}
                <div className="p-2.5 rounded-lg bg-canvas border border-border/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 block mb-0.5">
                    Staff-in-Charge
                  </span>
                  <span className="font-semibold text-ink-900 text-xs">
                    {item.staffInCharge || "—"}
                  </span>
                </div>

                {/* 2. Chairperson */}
                <div className="p-2.5 rounded-lg bg-canvas border border-border/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-700 block mb-0.5">
                    Chairperson
                  </span>
                  <span className="font-semibold text-ink-900 text-xs">
                    {item.chairperson || "—"}
                  </span>
                </div>

                {/* 3. Vice Chairperson (Only if present) */}
                {hasViceChair(item.viceChairperson) && (
                  <div className="p-2.5 rounded-lg bg-canvas border border-border/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block mb-0.5">
                      Vice Chairperson
                    </span>
                    <span className="font-semibold text-ink-900 text-xs">
                      {item.viceChairperson}
                    </span>
                  </div>
                )}
              </div>

              {item.href && (
                <div className="pt-1">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-700 hover:text-accent-800"
                  >
                    <span>Visit Bento Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Grid Card View Component
// ----------------------------------------------------------------------------
function ClubsCardView({ items }: { items: ClubAssociationItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => {
        const IconComponent = getClubIcon(item.iconName);
        const isEtc = item.id === "et-cetera-club" || item.name.toLowerCase().includes("et cetera");

        return (
          <div
            key={item.id || `card-${index}`}
            className={`p-5 rounded-2xl bg-surface border border-border hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden ${
              isEtc ? "border-accent-300 ring-1 ring-accent-400/40" : ""
            }`}
          >
            <div className="space-y-3">
              {/* Top Meta Bar */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isEtc
                        ? "bg-accent-500 text-brand-950 font-bold"
                        : "bg-brand-50 text-brand-900 border border-brand-200"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-ink-900 text-h4 group-hover:text-brand-900 transition-colors leading-snug">
                      {item.name}
                    </h4>
                    {item.tagline && (
                      <span className="text-xs font-semibold text-brand-700 block">
                        {item.tagline}
                      </span>
                    )}
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-ink-400">
                  #{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Brief */}
              {item.brief && (
                <p className="text-body-sm text-ink-700 leading-relaxed pt-1">
                  {item.brief}
                </p>
              )}

              {/* Leadership Team Box */}
              <div className="pt-3 border-t border-border/70 space-y-2">
                {/* 1. Staff-in-Charge */}
                <div className="flex items-center justify-between text-xs py-1 border-b border-border/40">
                  <span className="text-ink-500 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-brand-700" />
                    Staff-in-Charge:
                  </span>
                  <span className="font-semibold text-ink-900">{item.staffInCharge || "—"}</span>
                </div>

                {/* 2. Chairperson */}
                <div
                  className={`flex items-center justify-between text-xs py-1 ${
                    hasViceChair(item.viceChairperson) ? "border-b border-border/40" : ""
                  }`}
                >
                  <span className="text-ink-500 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-accent-600" />
                    Chairperson:
                  </span>
                  <span className="font-semibold text-ink-900">{item.chairperson || "—"}</span>
                </div>

                {/* 3. Vice Chairperson (Only if present) */}
                {hasViceChair(item.viceChairperson) && (
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-ink-500 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-ink-400" />
                      Vice Chairperson:
                    </span>
                    <span className="font-semibold text-ink-900">
                      {item.viceChairperson}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {item.href && (
              <div className="pt-3 mt-2 border-t border-border/70 flex justify-end">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors"
                >
                  <span>Visit Bento Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
