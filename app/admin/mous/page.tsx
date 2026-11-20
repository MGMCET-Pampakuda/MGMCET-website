"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Handshake,
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  X,
  Building2,
  Briefcase,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveMous,
  saveMous,
  resetMous,
} from "@/lib/firebase-services";
import { defaultMouPartners } from "@/content/academics";
import type { MouPartner } from "@/types/academics";
import { isFirebaseConfigured } from "@/lib/firebase";

const CATEGORY_PRESETS = [
  "IT Solutions & Software Development",
  "MEP & Quality Control Engineering",
  "Mechanical & Aerospace Engineering",
  "Cybersecurity, Cloud & IT Services",
  "Industrial Automation & Cybernetics",
  "Assistive Technology & Research",
  "Civil & Structural Engineering",
  "Electrical & Electronics Engineering",
];

const STATUS_PRESETS = ["Active", "In Renewal", "Completed", "Draft"];

function getCategoryBadge(category?: string): { bg: string; text: string; border: string } {
  const cat = (category || "").toLowerCase();
  if (cat.includes("assistive") || cat.includes("research")) {
    return { bg: "bg-purple-500/10", text: "text-purple-800", border: "border-purple-300/70" };
  }
  if (cat.includes("mep") || cat.includes("quality")) {
    return { bg: "bg-amber-500/10", text: "text-amber-800", border: "border-amber-300/70" };
  }
  if (cat.includes("aerospace") || cat.includes("mechanical")) {
    return { bg: "bg-brand-800/10", text: "text-brand-900", border: "border-brand-300/70" };
  }
  if (cat.includes("it") || cat.includes("software")) {
    return { bg: "bg-sky-500/10", text: "text-sky-800", border: "border-sky-300/70" };
  }
  if (cat.includes("automation") || cat.includes("cybernetics")) {
    return { bg: "bg-emerald-500/10", text: "text-emerald-800", border: "border-emerald-300/70" };
  }
  if (cat.includes("cyber") || cat.includes("cloud")) {
    return { bg: "bg-indigo-500/10", text: "text-indigo-800", border: "border-indigo-300/70" };
  }
  return { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-300/70" };
}

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminMousPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [partners, setPartners] = useState<MouPartner[]>(defaultMouPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MouPartner | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form Fields
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState(CATEGORY_PRESETS[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [location, setLocation] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("Active");

  const isFbConnected = isFirebaseConfigured();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const unsubscribe = subscribeToLiveMous((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setPartners(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setCompanyName("");
    setCategory(CATEGORY_PRESETS[0]);
    setCustomCategory("");
    setLocation("");
    setScope("");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (item: MouPartner) => {
    setEditingItem(item);
    setCompanyName(item.companyName);

    if (item.category && CATEGORY_PRESETS.includes(item.category)) {
      setCategory(item.category);
      setCustomCategory("");
    } else {
      setCategory("Other");
      setCustomCategory(item.category || "");
    }

    setLocation(item.location || "");
    setScope(item.scope || "");
    setStatus(item.status || "Active");
    setIsModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = category === "Other" ? customCategory.trim() : category.trim();

    if (!companyName.trim()) {
      alert("Please enter the company/institution name.");
      return;
    }

    const itemToSave: MouPartner = {
      id: editingItem ? editingItem.id : `mou-${Date.now()}`,
      companyName: companyName.trim(),
      category: finalCategory || undefined,
      location: location.trim() || undefined,
      scope: scope.trim() || undefined,
      status: status || "Active",
    };

    let updatedList: MouPartner[];
    if (editingItem) {
      updatedList = partners.map((p) => (p.id === editingItem.id ? itemToSave : p));
    } else {
      updatedList = [...partners, itemToSave];
    }

    setPartners(updatedList);
    setIsModalOpen(false);

    try {
      await saveMous(updatedList);
      showToast(
        editingItem
          ? `Updated MoU partner "${itemToSave.companyName}" successfully.`
          : `Added new MoU partner "${itemToSave.companyName}".`
      );
    } catch {
      showToast("Saved locally (offline mode).");
    }
  };

  const handleDeletePartner = async (id: string) => {
    const updated = partners.filter((p) => p.id !== id);
    setPartners(updated);
    setDeleteConfirmId(null);

    try {
      await saveMous(updated);
      showToast("MoU partner removed.");
    } catch {
      showToast("Removed from local storage.");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= partners.length) return;

    const copy = [...partners];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    setPartners(copy);
    try {
      await saveMous(copy);
      showToast("Partner ordering updated.");
    } catch {
      showToast("Reordered in local storage.");
    }
  };

  const handleResetToDefault = async () => {
    try {
      const resetList = await resetMous();
      setPartners(resetList);
      setIsResetConfirmOpen(false);
      showToast("Restored official 6 MoU partners from college records.");
    } catch {
      showToast("Error resetting to defaults.");
    }
  };

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        p.companyName.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.scope && p.scope.toLowerCase().includes(q));

      let matchesCat = true;
      if (selectedCategoryFilter === "it") {
        matchesCat =
          (p.category || "").toLowerCase().includes("it") ||
          (p.category || "").toLowerCase().includes("software") ||
          (p.category || "").toLowerCase().includes("cyber");
      } else if (selectedCategoryFilter === "eng") {
        matchesCat =
          (p.category || "").toLowerCase().includes("mep") ||
          (p.category || "").toLowerCase().includes("mechanical") ||
          (p.category || "").toLowerCase().includes("aerospace");
      } else if (selectedCategoryFilter === "automation") {
        matchesCat = (p.category || "").toLowerCase().includes("automation");
      } else if (selectedCategoryFilter === "research") {
        matchesCat =
          (p.category || "").toLowerCase().includes("research") ||
          (p.category || "").toLowerCase().includes("assistive");
      }

      return matchesSearch && matchesCat;
    });
  }, [partners, searchQuery, selectedCategoryFilter]);

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <AdminHeader
        title="Industry MoUs"
        subtitle="Manage institutional Memorandums of Understanding and corporate partnerships"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-surface hover:bg-canvas text-ink-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Reset list to the official 6 MGMCET partners"
            >
              <RotateCcw className="w-3.5 h-3.5 text-ink-500" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add MoU Partner</span>
            </button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-950 text-white text-xs font-medium shadow-xl border border-brand-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Total MoUs
              </p>
              <p className="font-heading font-black text-2xl text-ink-900 mt-1">
                {partners.length}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5">Signed corporate agreements</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900">
              <Handshake className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Active Linkages
              </p>
              <p className="font-heading font-black text-2xl text-emerald-700 mt-1">
                {partners.filter((p) => (p.status || "active").toLowerCase() === "active").length}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5">Ongoing student programs</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-300/40 flex items-center justify-center text-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Engineering &amp; MEP
              </p>
              <p className="font-heading font-black text-2xl text-ink-900 mt-1">
                {partners.filter((p) => {
                  const c = (p.category || "").toLowerCase();
                  return c.includes("mep") || c.includes("mechanical") || c.includes("aerospace");
                }).length}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5">Core engineering partners</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300/40 flex items-center justify-center text-amber-800">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Software &amp; Cyber
              </p>
              <p className="font-heading font-black text-2xl text-ink-900 mt-1">
                {partners.filter((p) => {
                  const c = (p.category || "").toLowerCase();
                  return c.includes("it") || c.includes("software") || c.includes("cyber");
                }).length}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5">IT &amp; tech training hubs</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-300/40 flex items-center justify-center text-sky-800">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search partner, city, domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-semibold text-ink-500 mr-1 hidden sm:inline">
              Domain:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategoryFilter === "all"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              All ({partners.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter("it")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategoryFilter === "it"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              IT &amp; Software
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter("eng")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategoryFilter === "eng"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              Engineering &amp; MEP
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter("automation")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategoryFilter === "automation"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              Automation
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter("research")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategoryFilter === "research"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              Research
            </button>
          </div>
        </div>

        {/* Editable Table Card */}
        <div className="rounded-2xl border border-border bg-surface shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-canvas/40">
            <div>
              <h2 className="font-heading font-bold text-h4 text-ink-900 flex items-center gap-2">
                <span>Active MoUs &amp; Collaborators</span>
                <span className="text-xs font-normal text-ink-500">
                  ({filteredPartners.length} displayed)
                </span>
              </h2>
              <p className="text-xs text-ink-500 mt-0.5">
                Use the reorder arrows to change listing order on the public site; click Edit to
                update address, scope or status.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isFbConnected ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span className="text-ink-500 font-medium">
                {isFbConnected ? "Cloud Sync: Active" : "Local Storage Mode"}
              </span>
            </div>
          </div>

          {filteredPartners.length === 0 ? (
            <div className="p-12 text-center text-ink-500 text-xs">
              No MoU partners match your search criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-canvas border-b border-border text-ink-600 font-semibold text-xs tracking-wider uppercase">
                    <th scope="col" className="py-3 px-3 text-center w-14">
                      Order
                    </th>
                    <th scope="col" className="py-3 px-3 text-center w-12">
                      #
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Company / Organization
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Domain / Category
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Location / Address
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4 text-right w-36">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-body-sm">
                  {filteredPartners.map((item, index) => {
                    const badge = getCategoryBadge(item.category);
                    const originalIndex = partners.findIndex((p) => p.id === item.id);
                    const canMoveUp = originalIndex > 0;
                    const canMoveDown = originalIndex < partners.length - 1;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-canvas/60 transition-colors group"
                      >
                        {/* Order buttons */}
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-0.5">
                            <button
                              type="button"
                              onClick={() => handleMove(originalIndex, "up")}
                              disabled={!canMoveUp}
                              className={`p-1 rounded hover:bg-canvas transition-colors ${
                                canMoveUp
                                  ? "text-ink-600 hover:text-ink-900 cursor-pointer"
                                  : "text-ink-300 cursor-not-allowed"
                              }`}
                              title="Move partner up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMove(originalIndex, "down")}
                              disabled={!canMoveDown}
                              className={`p-1 rounded hover:bg-canvas transition-colors ${
                                canMoveDown
                                  ? "text-ink-600 hover:text-ink-900 cursor-pointer"
                                  : "text-ink-300 cursor-not-allowed"
                              }`}
                              title="Move partner down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Sl. No */}
                        <td className="py-2.5 px-3 text-center font-mono text-xs text-ink-500">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        {/* Company Name */}
                        <td className="py-2.5 px-4">
                          <span className="font-semibold text-ink-900 block leading-snug">
                            {item.companyName}
                          </span>
                          {item.scope && (
                            <span className="text-[11px] text-ink-500 line-clamp-1 mt-0.5">
                              {item.scope}
                            </span>
                          )}
                        </td>

                        {/* Domain / Category */}
                        <td className="py-2.5 px-4">
                          {item.category ? (
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
                            >
                              {item.category}
                            </span>
                          ) : (
                            <span className="text-ink-400 text-xs">—</span>
                          )}
                        </td>

                        {/* Location / Address */}
                        <td className="py-2.5 px-4 text-ink-600 text-xs max-w-xs truncate">
                          {item.location || "—"}
                        </td>

                        {/* Status */}
                        <td className="py-2.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {item.status || "Active"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="p-1.5 rounded-lg text-ink-600 hover:text-brand-900 hover:bg-brand-50 transition-colors cursor-pointer"
                              title="Edit partner details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete partner"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-canvas/40">
              <h3 className="font-heading font-bold text-h4 text-ink-900 flex items-center gap-2">
                <Handshake className="w-4 h-4 text-brand-800" />
                <span>{editingItem ? "Edit MoU Partner" : "Add MoU Partner"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-canvas transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="p-6 space-y-4">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Technovalley Software India Pvt Ltd"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  required
                />
              </div>

              {/* Category Select & Custom */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Domain / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  {CATEGORY_PRESETS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">Custom Category...</option>
                </select>

                {category === "Other" && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category domain"
                    className="w-full mt-2 px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                )}
              </div>

              {/* Location / Full Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Location / Full Address
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Level 4, ATS Grand, opposite Highway Garden, Bypass, Edappally, Ernakulam"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Scope of Collaboration */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Scope of Collaboration / Programs
                </label>
                <textarea
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  rows={3}
                  placeholder="e.g. Specialized MEP training, HVAC design, industrial site visits, and direct recruitment."
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600 resize-none"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  MoU Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  {STATUS_PRESETS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border bg-surface text-ink-700 hover:bg-canvas text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {editingItem ? "Save Changes" : "Add Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="font-heading font-bold text-h4 text-ink-900">
                Remove MoU Partner?
              </h4>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              Are you sure you want to remove this partner from the MoUs directory? This will update
              the live website immediately.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 rounded-xl border border-border text-xs font-semibold text-ink-700 hover:bg-canvas cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeletePartner(deleteConfirmId)}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-brand-900">
              <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-brand-900" />
              </div>
              <h4 className="font-heading font-bold text-h4 text-ink-900">
                Reset to Defaults?
              </h4>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              This will overwrite the MoUs directory with the official 6 partner companies as recorded
              in college records.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-border text-xs font-semibold text-ink-700 hover:bg-canvas cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-3.5 py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Restore 6 Partners
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
