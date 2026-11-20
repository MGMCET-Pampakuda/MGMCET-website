"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Award,
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
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveIqacCommittee,
  saveIqacCommittee,
  resetIqacCommittee,
} from "@/lib/firebase-services";
import { defaultIqacMembers } from "@/content/academics";
import type { IqacMember } from "@/types/academics";
import { isFirebaseConfigured } from "@/lib/firebase";

const ROLE_PRESETS = [
  "Chairperson",
  "Management Representative",
  "Local Society Representative",
  "IQAC Coordinator",
  "Representative from Industry",
  "Department Representative",
  "Student Representative",
  "Alumni Representative",
  "Administrative Officer",
];

const DEPARTMENT_PRESETS = [
  "Administration",
  "Management",
  "Local Society",
  "CSE",
  "EEE",
  "ME",
  "ECE",
  "CE",
  "S&H",
  "AI & ML",
  "Automobile",
];

function getRoleBadgeVariant(role: string): { bg: string; text: string; border: string } {
  const lower = role.toLowerCase();
  if (lower.includes("chairperson") || lower.includes("principal")) {
    return {
      bg: "bg-amber-500/10",
      text: "text-amber-800",
      border: "border-amber-300/70",
    };
  }
  if (lower.includes("management") || lower.includes("director")) {
    return {
      bg: "bg-brand-800/10",
      text: "text-brand-900",
      border: "border-brand-300/70",
    };
  }
  if (lower.includes("coordinator")) {
    return {
      bg: "bg-emerald-500/10",
      text: "text-emerald-800",
      border: "border-emerald-300/70",
    };
  }
  if (lower.includes("industry")) {
    return {
      bg: "bg-sky-500/10",
      text: "text-sky-800",
      border: "border-sky-300/70",
    };
  }
  if (lower.includes("society")) {
    return {
      bg: "bg-purple-500/10",
      text: "text-purple-800",
      border: "border-purple-300/70",
    };
  }
  return {
    bg: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-300/70",
  };
}

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminIqacPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [members, setMembers] = useState<IqacMember[]>(defaultIqacMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IqacMember | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form Fields
  const [role, setRole] = useState(ROLE_PRESETS[0]);
  const [customRole, setCustomRole] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState(DEPARTMENT_PRESETS[0]);
  const [customDepartment, setCustomDepartment] = useState("");

  const isFbConnected = isFirebaseConfigured();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const unsubscribe = subscribeToLiveIqacCommittee((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setMembers(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setRole(ROLE_PRESETS[5]); // Department Representative
    setCustomRole("");
    setName("");
    setDesignation("Asst. Prof.");
    setDepartment("CSE");
    setCustomDepartment("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: IqacMember) => {
    setEditingItem(item);
    if (ROLE_PRESETS.includes(item.role)) {
      setRole(item.role);
      setCustomRole("");
    } else {
      setRole("Other");
      setCustomRole(item.role);
    }

    setName(item.name);
    setDesignation(item.designation);

    const dep = item.department || "";
    if (DEPARTMENT_PRESETS.includes(dep)) {
      setDepartment(dep);
      setCustomDepartment("");
    } else {
      setDepartment("Other");
      setCustomDepartment(dep);
    }

    setIsModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalRole = role === "Other" ? customRole.trim() : role.trim();
    const finalDepartment = department === "Other" ? customDepartment.trim() : department.trim();

    if (!finalRole) {
      alert("Please specify a committee role.");
      return;
    }
    if (!name.trim()) {
      alert("Please enter the member's full name.");
      return;
    }
    if (!designation.trim()) {
      alert("Please enter the designation.");
      return;
    }

    const itemToSave: IqacMember = {
      id: editingItem ? editingItem.id : `iqac-${Date.now()}`,
      role: finalRole,
      name: name.trim(),
      designation: designation.trim(),
      department: finalDepartment || undefined,
    };

    let updatedList: IqacMember[];
    if (editingItem) {
      updatedList = members.map((m) => (m.id === editingItem.id ? itemToSave : m));
    } else {
      updatedList = [...members, itemToSave];
    }

    setMembers(updatedList);
    setIsModalOpen(false);

    try {
      await saveIqacCommittee(updatedList);
      showToast(
        editingItem
          ? `Updated member "${itemToSave.name}" successfully.`
          : `Added new member "${itemToSave.name}" to IQAC committee.`
      );
    } catch {
      showToast("Saved locally (offline mode).");
    }
  };

  const handleDeleteMember = async (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    setDeleteConfirmId(null);

    try {
      await saveIqacCommittee(updated);
      showToast("Committee member removed.");
    } catch {
      showToast("Removed from local view.");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= members.length) return;

    const copy = [...members];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    setMembers(copy);
    try {
      await saveIqacCommittee(copy);
      showToast("Committee ordering updated.");
    } catch {
      showToast("Reordered in local storage.");
    }
  };

  const handleResetToDefault = async () => {
    try {
      const resetList = await resetIqacCommittee();
      setMembers(resetList);
      setIsResetConfirmOpen(false);
      showToast("Restored official 10 IQAC committee members from NAAC record.");
    } catch {
      showToast("Error resetting to defaults.");
    }
  };

  // Filtered members for display
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        searchQuery === "" ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.department && m.department.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesRole = true;
      if (selectedRoleFilter === "leadership") {
        matchesRole =
          m.role.toLowerCase().includes("chairperson") ||
          m.role.toLowerCase().includes("management") ||
          m.role.toLowerCase().includes("coordinator");
      } else if (selectedRoleFilter === "dept") {
        matchesRole = m.role.toLowerCase().includes("department");
      } else if (selectedRoleFilter === "external") {
        matchesRole =
          m.role.toLowerCase().includes("industry") ||
          m.role.toLowerCase().includes("society") ||
          m.role.toLowerCase().includes("alumni");
      }

      return matchesSearch && matchesRole;
    });
  }, [members, searchQuery, selectedRoleFilter]);

  // Quick stats
  const chairperson = members.find((m) => m.role.toLowerCase().includes("chairperson"));
  const coordinator = members.find((m) => m.role.toLowerCase().includes("coordinator"));
  const deptCount = members.filter((m) => m.role.toLowerCase().includes("department")).length;

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <AdminHeader
        title="IQAC Committee"
        subtitle="Manage NAAC Internal Quality Assurance Cell composition & statutory representation"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-surface hover:bg-canvas text-ink-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Reset list to the official 10 MGMCET members"
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
              <span>Add Member</span>
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
                Total Members
              </p>
              <p className="font-heading font-black text-2xl text-ink-900 mt-1">
                {members.length}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5">Constituted committee</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Chairperson
              </p>
              <p className="font-heading font-bold text-sm text-ink-900 mt-1 truncate max-w-[150px]">
                {chairperson ? chairperson.name : "Unassigned"}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5 truncate max-w-[150px]">
                {chairperson ? chairperson.designation : "—"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300/40 flex items-center justify-center text-amber-800">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                IQAC Coordinator
              </p>
              <p className="font-heading font-bold text-sm text-ink-900 mt-1 truncate max-w-[150px]">
                {coordinator ? coordinator.name : "Unassigned"}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5 truncate max-w-[150px]">
                {coordinator?.department ? `${coordinator.department} Dept` : "Academic"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-300/40 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Department Reps
              </p>
              <p className="font-heading font-black text-2xl text-ink-900 mt-1">
                {deptCount}
              </p>
              <p className="text-[11px] text-ink-500 mt-0.5">Faculty representations</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-300/40 flex items-center justify-center text-sky-800">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 rounded-2xl bg-surface border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, dept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-semibold text-ink-500 mr-1 hidden sm:inline">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedRoleFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoleFilter === "all"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              All ({members.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedRoleFilter("leadership")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoleFilter === "leadership"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              Leadership
            </button>
            <button
              type="button"
              onClick={() => setSelectedRoleFilter("dept")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoleFilter === "dept"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              Departments
            </button>
            <button
              type="button"
              onClick={() => setSelectedRoleFilter("external")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoleFilter === "external"
                  ? "bg-brand-900 text-white"
                  : "bg-canvas text-ink-700 hover:bg-border/60"
              }`}
            >
              Industry / Society
            </button>
          </div>
        </div>

        {/* Editable Table Card */}
        <div className="rounded-2xl border border-border bg-surface shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-canvas/40">
            <div>
              <h2 className="font-heading font-bold text-h4 text-ink-900 flex items-center gap-2">
                <span>Official Committee Members</span>
                <span className="text-xs font-normal text-ink-500">
                  ({filteredMembers.length} displayed)
                </span>
              </h2>
              <p className="text-xs text-ink-500 mt-0.5">
                Use the reorder arrows to change the hierarchy; click Edit to update designation,
                name or department.
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

          {filteredMembers.length === 0 ? (
            <div className="p-12 text-center text-ink-500 text-xs">
              No committee members match your search criteria.
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
                      Committee Role
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Member Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Designation
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Department / Organization
                    </th>
                    <th scope="col" className="py-3 px-4 text-right w-36">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-body-sm">
                  {filteredMembers.map((member, index) => {
                    const badge = getRoleBadgeVariant(member.role);
                    const originalIndex = members.findIndex((m) => m.id === member.id);
                    const canMoveUp = originalIndex > 0;
                    const canMoveDown = originalIndex < members.length - 1;

                    return (
                      <tr
                        key={member.id}
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
                              title="Move member up"
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
                              title="Move member down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Sl. No */}
                        <td className="py-2.5 px-3 text-center font-mono text-xs text-ink-500">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        {/* Role */}
                        <td className="py-2.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {member.role}
                          </span>
                        </td>

                        {/* Name */}
                        <td className="py-2.5 px-4 font-semibold text-ink-900">
                          {member.name}
                        </td>

                        {/* Designation */}
                        <td className="py-2.5 px-4 text-ink-700">
                          {member.designation}
                        </td>

                        {/* Department */}
                        <td className="py-2.5 px-4 text-ink-600 font-medium">
                          {member.department || "—"}
                        </td>

                        {/* Actions */}
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => openEditModal(member)}
                              className="p-1.5 rounded-lg text-ink-600 hover:text-brand-900 hover:bg-brand-50 transition-colors cursor-pointer"
                              title="Edit member details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(member.id)}
                              className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete member"
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
                <Award className="w-4 h-4 text-brand-800" />
                <span>{editingItem ? "Edit Committee Member" : "Add Committee Member"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-canvas transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-6 space-y-4">
              {/* Role Select & Custom */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Committee Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  {ROLE_PRESETS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                  <option value="Other">Custom Role...</option>
                </select>

                {role === "Other" && (
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="Enter custom role title (e.g. Student Representative)"
                    className="w-full mt-2 px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    required
                  />
                )}
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Full Name (with Prefix) *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Dhanya G / Ms. Neethu B / Sri. Nevin George"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  required
                />
              </div>

              {/* Designation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Designation *
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Principal / Asst. Prof. / Director / Senior System Engineer"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  required
                />
              </div>

              {/* Department / Organization */}
              <div className="space-y-1.5">
                <label className="block text-xs font-heading font-semibold text-ink-800">
                  Department / Organization / Unit
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  {DEPARTMENT_PRESETS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value="Other">Custom Department / External Organization...</option>
                </select>

                {department === "Other" && (
                  <input
                    type="text"
                    value={customDepartment}
                    onChange={(e) => setCustomDepartment(e.target.value)}
                    placeholder="e.g. Robert Bosch, Coimbatore or Local Society / Panchayath"
                    className="w-full mt-2 px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                )}
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
                  {editingItem ? "Save Changes" : "Add to Committee"}
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
                Remove Member?
              </h4>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              Are you sure you want to remove this member from the IQAC committee list? This will
              update the live public website immediately.
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
                onClick={() => handleDeleteMember(deleteConfirmId)}
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
              This will overwrite the committee list with the official 10 MGMCET members as
              constituted in the college NAAC records.
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
                Yes, Restore 10 Members
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
