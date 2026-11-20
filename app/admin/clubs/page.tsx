"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
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
  Code,
  Sparkles,
  Camera,
  Music,
  Trophy,
  Plane,
  MessageSquareQuote,
  Terminal,
  Brain,
  ShieldAlert,
  Radio,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveClubs,
  saveClubs,
  resetClubs,
} from "@/lib/firebase-services";
import { defaultClubsAndAssociations } from "@/content/clubs";
import type { ClubAssociationItem, ClubCategory } from "@/types/campus-life";
import { isFirebaseConfigured } from "@/lib/firebase";

const ICON_OPTIONS = [
  { value: "Code", label: "Code / Tech (Et Cetera Coding Club)" },
  { value: "Camera", label: "Camera (Media Club)" },
  { value: "Sparkles", label: "Sparkles (Dance Club)" },
  { value: "Music", label: "Music (Music Club)" },
  { value: "Trophy", label: "Trophy (Sports Club)" },
  { value: "Plane", label: "Plane (Drone Club)" },
  { value: "MessageSquareQuote", label: "Quote / Mic (Debate Club)" },
  { value: "Terminal", label: "Terminal (CSE Association)" },
  { value: "Brain", label: "Brain / AI (AIML Association)" },
  { value: "ShieldAlert", label: "Shield / Security (Cyber Security)" },
  { value: "Radio", label: "Radio / IoT (ECE Association)" },
  { value: "Users", label: "Users (General Community)" },
];

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Code,
  Camera,
  Sparkles,
  Music,
  Trophy,
  Plane,
  MessageSquareQuote,
  Terminal,
  Brain,
  ShieldAlert,
  Radio,
  Users,
};

function renderClubIcon(iconName?: string) {
  const IconComp = (iconName && ICON_COMPONENTS[iconName]) || Users;
  return <IconComp className="w-4 h-4" />;
}

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminClubsPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [items, setItems] = useState<ClubAssociationItem[]>(defaultClubsAndAssociations);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "club" | "association">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClubAssociationItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ClubCategory>("club");
  const [tagline, setTagline] = useState("");
  const [brief, setBrief] = useState("");
  const [chairperson, setChairperson] = useState("");
  const [staffInCharge, setStaffInCharge] = useState("");
  const [viceChairperson, setViceChairperson] = useState("");
  const [iconName, setIconName] = useState("Users");
  const [href, setHref] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const isFbConnected = isFirebaseConfigured();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const unsubscribe = subscribeToLiveClubs((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setItems(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setCategory("club");
    setTagline("");
    setBrief("");
    setChairperson("");
    setStaffInCharge("");
    setViceChairperson("");
    setIconName("Users");
    setHref("");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (item: ClubAssociationItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setTagline(item.tagline || "");
    setBrief(item.brief || "");
    setChairperson(item.chairperson || "");
    setStaffInCharge(item.staffInCharge || "");
    setViceChairperson(item.viceChairperson || "");
    setIconName(item.iconName || "Users");
    setHref(item.href || "");
    setStatus(item.status || "Active");
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter the name of the club or association.");
      return;
    }
    if (!chairperson.trim()) {
      alert("Please enter the Chairperson name.");
      return;
    }
    if (!staffInCharge.trim()) {
      alert("Please enter the Staff-in-Charge name.");
      return;
    }

    const itemToSave: ClubAssociationItem = {
      id: editingItem ? editingItem.id : `${category}-${Date.now()}`,
      name: name.trim(),
      category,
      tagline: tagline.trim() || undefined,
      brief: brief.trim(),
      chairperson: chairperson.trim(),
      staffInCharge: staffInCharge.trim(),
      viceChairperson: viceChairperson.trim() || "—",
      iconName: iconName || "Users",
      href: href.trim() || undefined,
      isExternal: href.trim().startsWith("http"),
      status,
      order: editingItem?.order ?? items.length + 1,
    };

    let updatedList: ClubAssociationItem[];
    if (editingItem) {
      updatedList = items.map((i) => (i.id === editingItem.id ? itemToSave : i));
    } else {
      updatedList = [...items, itemToSave];
    }

    setItems(updatedList);
    setIsModalOpen(false);

    try {
      await saveClubs(updatedList);
      showToast(
        editingItem
          ? `Updated "${itemToSave.name}" successfully.`
          : `Added "${itemToSave.name}" successfully.`
      );
    } catch {
      showToast("Saved locally (offline mode).");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    setDeleteConfirmId(null);

    try {
      await saveClubs(updated);
      showToast("Organization removed successfully.");
    } catch {
      showToast("Removed from local view.");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const copy = [...items];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    setItems(copy);
    try {
      await saveClubs(copy);
      showToast("Ordering updated.");
    } catch {
      showToast("Reordered in local storage.");
    }
  };

  const handleResetToDefault = async () => {
    try {
      const resetList = await resetClubs();
      setItems(resetList);
      setIsResetConfirmOpen(false);
      showToast("Reset all clubs & associations to verified original table details.");
    } catch {
      showToast("Reset error occurred.");
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = item.name.toLowerCase().includes(q);
        const mChair = item.chairperson.toLowerCase().includes(q);
        const mStaff = item.staffInCharge.toLowerCase().includes(q);
        const mVice = (item.viceChairperson || "").toLowerCase().includes(q);
        const mBrief = (item.brief || "").toLowerCase().includes(q);
        return mName || mChair || mStaff || mVice || mBrief;
      }
      return true;
    });
  }, [items, categoryFilter, searchQuery]);

  const clubsCount = items.filter((i) => i.category === "club").length;
  const assocCount = items.filter((i) => i.category === "association").length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-canvas">
      {/* Top Header */}
      <AdminHeader
        title="Clubs & Associations Management"
        onOpenMobileMenu={onOpenMobileMenu}
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500 text-white font-medium text-xs sm:text-body-sm shadow-md transition-all animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Summary Banner */}
        <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                Campus Student Ecosystem
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isFbConnected
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isFbConnected ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {isFbConnected ? "Firestore Cloud Synced" : "Local Storage Mode"}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-h3 text-ink-900">
              Manage Clubs &amp; Department Associations
            </h1>
            <p className="text-body-sm text-ink-600 max-w-2xl">
              Add new student clubs or academic associations, update leadership (Chairperson,
              Staff-in-Charge, Vice Chairperson), adjust descriptions, and manage order.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border bg-canvas text-ink-700 hover:text-ink-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
              title="Reset to default table records"
            >
              <RotateCcw className="w-4 h-4 text-ink-500" />
              <span>Reset Table</span>
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-heading font-bold text-xs transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Club / Association</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-surface border border-border">
            <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider block">
              Total Organizations
            </span>
            <span className="font-heading font-extrabold text-h3 text-ink-900 mt-1 block">
              {items.length}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border">
            <span className="text-[11px] font-semibold text-accent-700 uppercase tracking-wider block">
              Activity Clubs
            </span>
            <span className="font-heading font-extrabold text-h3 text-accent-800 mt-1 block">
              {clubsCount}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border">
            <span className="text-[11px] font-semibold text-brand-800 uppercase tracking-wider block">
              Department Associations
            </span>
            <span className="font-heading font-extrabold text-h3 text-brand-900 mt-1 block">
              {assocCount}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
              Coding Club (Et Cetera)
            </span>
            <span className="font-heading font-bold text-xs text-ink-700 mt-2 block">
              Sana Meharin K (Chair)
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-surface border border-border shadow-xs">
            <button
              type="button"
              onClick={() => setCategoryFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === "all"
                  ? "bg-brand-900 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
              }`}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("club")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === "club"
                  ? "bg-brand-900 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
              }`}
            >
              Clubs ({clubsCount})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("association")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === "association"
                  ? "bg-brand-900 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-900 hover:bg-canvas"
              }`}
            >
              Associations ({assocCount})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, staff, chairperson..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-border bg-surface text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600"
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
        </div>

        {/* Organizations Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-border text-ink-600 font-semibold text-xs tracking-wider uppercase">
                  <th scope="col" className="py-3 px-3 w-10 text-center">
                    #
                  </th>
                  <th scope="col" className="py-3 px-4 min-w-[200px]">
                    Organization &amp; Category
                  </th>
                  <th scope="col" className="py-3 px-4 min-w-[130px]">
                    Chairperson
                  </th>
                  <th scope="col" className="py-3 px-4 min-w-[140px]">
                    Staff-in-Charge
                  </th>
                  <th scope="col" className="py-3 px-4 min-w-[130px]">
                    Vice Chairperson
                  </th>
                  <th scope="col" className="py-3 px-3 min-w-[90px] text-center">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-4 min-w-[140px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-body-sm">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-ink-500 text-xs">
                      No clubs or associations match your current filter.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => {
                    const isEtc =
                      item.id === "et-cetera-club" || item.name.toLowerCase().includes("et cetera");

                    return (
                      <tr
                        key={item.id || `admin-club-${index}`}
                        className={`hover:bg-canvas/60 transition-colors group ${
                          isEtc ? "bg-accent-50/20" : ""
                        }`}
                      >
                        {/* Order & Reorder Controls */}
                        <td className="py-3.5 px-3 text-center">
                          <div className="flex flex-col items-center justify-center gap-0.5">
                            <button
                              type="button"
                              onClick={() => handleMove(index, "up")}
                              disabled={index === 0}
                              className="text-ink-400 hover:text-ink-900 disabled:opacity-20 transition-opacity"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-xs font-bold text-ink-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleMove(index, "down")}
                              disabled={index === items.length - 1}
                              className="text-ink-400 hover:text-ink-900 disabled:opacity-20 transition-opacity"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Name + Category + Tagline + Brief Preview */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                  isEtc
                                    ? "bg-accent-500 text-brand-950 font-bold"
                                    : item.category === "club"
                                    ? "bg-accent-50 text-accent-800 border border-accent-200"
                                    : "bg-brand-50 text-brand-900 border border-brand-200"
                                }`}
                              >
                                {renderClubIcon(item.iconName)}
                              </div>
                              <div>
                                <span className="font-heading font-bold text-ink-900 text-body flex items-center gap-1.5">
                                  {item.name}
                                  {isEtc && (
                                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-accent-100 text-accent-900 border border-accent-300">
                                      Coding Club
                                    </span>
                                  )}
                                </span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                      item.category === "club"
                                        ? "bg-amber-500/10 text-amber-800 border border-amber-300/60"
                                        : "bg-brand-800/10 text-brand-900 border border-brand-300/60"
                                    }`}
                                  >
                                    {item.category === "club" ? "Club" : "Association"}
                                  </span>
                                  {item.tagline && (
                                    <span className="text-xs text-ink-500 font-medium truncate max-w-[240px]">
                                      {item.tagline}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {item.brief && (
                              <p className="text-xs text-ink-600 line-clamp-2 pl-9">
                                {item.brief}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Chairperson */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-semibold text-ink-900 text-xs">
                            <UserCheck className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                            <span>{item.chairperson || "—"}</span>
                          </div>
                        </td>

                        {/* Staff-in-Charge */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-semibold text-ink-900 text-xs">
                            <GraduationCap className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                            <span>{item.staffInCharge || "—"}</span>
                          </div>
                        </td>

                        {/* Vice Chairperson */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-xs text-ink-700">
                            <Users className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                            <span
                              className={
                                item.viceChairperson && item.viceChairperson !== "—"
                                  ? "font-semibold text-ink-900"
                                  : "text-ink-400 font-mono"
                              }
                            >
                              {item.viceChairperson || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              item.status === "Inactive"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {item.status || "Active"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="p-1.5 rounded-lg text-ink-600 hover:text-brand-900 hover:bg-canvas transition-colors"
                              title="Edit Details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface rounded-2xl border border-border shadow-2xl max-w-xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                {editingItem ? "Edit Club / Association" : "Add New Organization"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-ink-400 hover:text-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              {/* Category radio */}
              <div>
                <label className="block font-semibold text-ink-800 mb-1">
                  Organization Category *
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-ink-800">
                    <input
                      type="radio"
                      name="category"
                      value="club"
                      checked={category === "club"}
                      onChange={() => setCategory("club")}
                      className="text-brand-800 focus:ring-brand-700"
                    />
                    <span>Activity / Technical Club</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-ink-800">
                    <input
                      type="radio"
                      name="category"
                      value="association"
                      checked={category === "association"}
                      onChange={() => setCategory("association")}
                      className="text-brand-800 focus:ring-brand-700"
                    />
                    <span>Department Academic Association</span>
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block font-semibold text-ink-800 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Et Cetera Club (E.T.C) or Robotics Club"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block font-semibold text-ink-800 mb-1">
                  Tagline / Specialization
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Official Coding & Technical Club of MGMCET"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Brief Description */}
              <div>
                <label className="block font-semibold text-ink-800 mb-1">
                  Brief About the Club / Association *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain what the club is, its mission, workshops, and activities..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Chairperson & Staff-in-Charge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">
                    Chairperson (Student Lead) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sana Meharin K"
                    value={chairperson}
                    onChange={(e) => setChairperson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-800 mb-1">
                    Staff-in-Charge (Faculty Advisor) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shreya Ginson"
                    value={staffInCharge}
                    onChange={(e) => setStaffInCharge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              {/* Vice Chairperson & Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">
                    Vice Chairperson (Student Co-lead)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shamilin Shaji (or leave blank / —)"
                    value={viceChairperson}
                    onChange={(e) => setViceChairperson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-800 mb-1">
                    Icon Symbol
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* External Link & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">
                    External Link / Bento URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. http://bento.me/etcetera"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-800 mb-1">
                    Visibility Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-ink-600 hover:text-ink-900 hover:bg-canvas font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-heading font-bold shadow-xs"
                >
                  {editingItem ? "Update Details" : "Save Organization"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border shadow-xl max-w-sm w-full p-6 space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-h4 text-ink-900">
                Confirm Removal
              </h4>
              <p className="text-body-sm text-ink-600 mt-1">
                Are you sure you want to remove this organization from the active college directory?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-ink-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteItem(deleteConfirmId)}
                className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-h4 text-ink-900">
                Reset to Original Verified Records?
              </h4>
              <p className="text-body-sm text-ink-600 mt-1">
                This will restore all 11 original clubs and department associations (including
                Media Club, Dance Club, Music Club, Sports Club, Drone Club, Et Cetera Coding Club,
                Debate Club, and the 4 Department Associations) with their official leadership teams.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-ink-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-4 py-1.5 rounded-lg bg-brand-900 text-white text-xs font-bold hover:bg-brand-950"
              >
                Yes, Reset Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
