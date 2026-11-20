"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Inbox,
  Search,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  X,
  MessageSquare,
  Eye,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveEnquiries,
  updateEnquiry,
  deleteEnquiry,
} from "@/lib/firebase-services";
import type { EnquirySubmission, EnquiryStatus } from "@/types/forms";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminEnquiriesPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLiveEnquiries((items) => {
      setEnquiries(items);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openDetails = (enq: EnquirySubmission) => {
    setSelectedEnquiry(enq);
    setEditingNotes(enq.notes || "");
  };

  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    await updateEnquiry(id, { status: newStatus });
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    showToast(`Status updated to "${newStatus}"`);
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    await updateEnquiry(selectedEnquiry.id, { notes: editingNotes });
    setSelectedEnquiry({ ...selectedEnquiry, notes: editingNotes });
    showToast("Internal notes saved.");
  };

  const handleDelete = async (id: string) => {
    await deleteEnquiry(id);
    setDeleteConfirmId(null);
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }
    showToast("Enquiry removed.");
  };

  const filtered = useMemo(() => {
    return enquiries.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.fullName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchQuery, statusFilter]);

  // CSV Export for Admissions Desk
  const handleExportCSV = useCallback(() => {
    if (enquiries.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "District",
      "Source Page",
      "Status",
      "Created At",
      "Message",
      "Notes",
    ];

    const rows = filtered.map((e) => [
      `"${e.id}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${e.district.replace(/"/g, '""')}"`,
      `"${e.source}"`,
      `"${e.status}"`,
      `"${e.createdAt}"`,
      `"${e.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `mgmcet_enquiries_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [enquiries.length, filtered]);

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Admissions Enquiries"
        subtitle="Manage student inquiries, contact requests, and admission desk leads"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface hover:bg-canvas text-brand-900 border border-brand-200 font-heading font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            title="Download CSV spreadsheet"
          >
            <Download className="h-3.5 w-3.5 text-brand-700" />
            <span>Export to CSV / Excel</span>
          </button>
        }
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { label: "All Leads", val: "all", count: enquiries.length },
              { label: "New Unread", val: "new", count: newCount },
              { label: "Contacted", val: "contacted" },
              { label: "In Review", val: "in-review" },
              { label: "Resolved", val: "resolved" },
            ].map((tab) => (
              <button
                key={tab.val}
                type="button"
                onClick={() => setStatusFilter(tab.val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.val
                    ? "bg-brand-800 text-white"
                    : "bg-canvas text-ink-600 hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      statusFilter === tab.val
                        ? "bg-white/20 text-white"
                        : tab.val === "new"
                        ? "bg-red-100 text-red-700"
                        : "bg-border text-ink-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicant name, phone..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
        </div>

        {/* Enquiries List */}
        <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
            <h3 className="font-heading font-bold text-sm text-ink-900">
              Form Submissions ({filtered.length})
            </h3>
            <span className="text-[11px] text-ink-500">
              Real-time Firestore synchronisation
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => openDetails(item)}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-canvas/40 transition-colors cursor-pointer group"
              >
                {/* Details */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.status === "new"
                          ? "bg-red-50 text-red-700 border border-red-200 font-extrabold animate-pulse"
                          : item.status === "contacted"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : item.status === "resolved"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-canvas text-ink-600 border border-border"
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="text-xs text-ink-400">
                      From: {item.source.replace("_", " ")}
                    </span>

                    <span className="text-xs text-ink-400">•</span>

                    <span className="text-xs text-ink-400">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <h4 className="font-heading font-bold text-sm text-ink-900 group-hover:text-brand-800 transition-colors">
                      {item.fullName}
                    </h4>
                    <span className="text-xs text-brand-700 font-medium">
                      {item.phone}
                    </span>
                    <span className="text-xs text-ink-500">
                      • {item.district}
                    </span>
                  </div>

                  <p className="text-xs text-ink-600 line-clamp-2 max-w-2xl">
                    {item.message}
                  </p>

                  {item.notes && (
                    <div className="mt-1 text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-0.5 rounded-md inline-block">
                      Note: {item.notes}
                    </div>
                  )}
                </div>

                {/* Right quick actions */}
                <div
                  className="flex items-center gap-2 self-end sm:self-center shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleUpdateStatus(item.id, e.target.value as EnquiryStatus)
                    }
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-canvas text-ink-800 font-medium cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => openDetails(item)}
                    className="p-1.5 rounded-lg text-brand-800 hover:bg-brand-50 border border-brand-200 transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-12 text-center text-xs text-ink-500">
                No enquiries matching this criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail & Action Drawer/Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
              <div className="flex items-center gap-2.5">
                <Inbox className="h-5 w-5 text-brand-700" />
                <h3 className="font-heading font-bold text-h4 text-ink-900">
                  Enquiry Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-canvas"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Applicant Summary */}
              <div className="p-4 rounded-xl bg-canvas border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-lg text-ink-900">
                    {selectedEnquiry.fullName}
                  </h4>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      selectedEnquiry.status === "new"
                        ? "bg-red-100 text-red-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {selectedEnquiry.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-ink-700">
                    <Phone className="h-4 w-4 text-brand-700 shrink-0" />
                    <span className="font-semibold">{selectedEnquiry.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-ink-700">
                    <Mail className="h-4 w-4 text-brand-700 shrink-0" />
                    <span>{selectedEnquiry.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-ink-700">
                    <MapPin className="h-4 w-4 text-brand-700 shrink-0" />
                    <span>District: {selectedEnquiry.district}</span>
                  </div>

                  <div className="flex items-center gap-2 text-ink-700">
                    <Calendar className="h-4 w-4 text-brand-700 shrink-0" />
                    <span>
                      {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="pt-2 flex flex-wrap gap-2 border-t border-border">
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Phone</span>
                  </a>

                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas text-ink-800 border border-border text-xs font-semibold transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-heading font-bold text-ink-800 mb-1.5 uppercase tracking-wider">
                  Submitted Message / Course Query
                </label>
                <div className="p-4 rounded-xl bg-canvas border border-border text-ink-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1.5">
                  Update Lead Status
                </label>
                <div className="flex gap-2">
                  {(["new", "contacted", "in-review", "resolved", "archived"] as EnquiryStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateStatus(selectedEnquiry.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize border cursor-pointer ${
                          selectedEnquiry.status === st
                            ? "bg-brand-800 text-white border-brand-800 shadow-xs"
                            : "bg-canvas text-ink-600 border-border hover:bg-brand-50"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1.5">
                  Internal Admission Notes
                </label>
                <div className="space-y-2">
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    rows={3}
                    placeholder="Add notes e.g., 'Called parent on 10th Nov, interested in CSE AI/ML with hostel.'"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="px-3.5 py-1.5 rounded-lg bg-brand-800 text-white text-xs font-bold hover:bg-brand-900 cursor-pointer"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border flex justify-between items-center bg-canvas/30">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedEnquiry.id)}
                className="text-xs text-red-600 hover:text-red-800 font-semibold"
              >
                Delete Enquiry
              </button>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-ink-700 hover:bg-canvas"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface rounded-2xl p-6 max-w-sm w-full border border-border shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              <h4 className="font-heading font-bold text-base text-ink-900">
                Delete Enquiry Record
              </h4>
            </div>
            <p className="text-xs text-ink-600">
              Are you sure you want to permanently delete this enquiry record?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-ink-700 hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
