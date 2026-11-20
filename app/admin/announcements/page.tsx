"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveAnnouncements,
  saveAnnouncementItem,
  deleteAnnouncementItem,
} from "@/lib/firebase-services";
import { site } from "@/content/site";
import type { AnnouncementItem } from "@/types/site";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminAnnouncementsPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get("action");

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(() => initialAction === "new");
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [text, setText] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkHref, setLinkHref] = useState("");
  const [isExternal, setIsExternal] = useState(false);
  const [active, setActive] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setText("");
    setLinkText("Apply Now");
    setLinkHref("/admissions");
    setIsExternal(false);
    setActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: AnnouncementItem) => {
    setEditingItem(item);
    setText(item.text);
    setLinkText(item.linkText || "");
    setLinkHref(item.linkHref || "");
    setIsExternal(Boolean(item.isExternal));
    setActive(item.active);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const unsubscribe = subscribeToLiveAnnouncements((items) => {
      setAnnouncements(items.length > 0 ? items : site.announcements);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleActive = async (item: AnnouncementItem) => {
    await saveAnnouncementItem({
      ...item,
      active: !item.active,
    });
    showToast(
      !item.active
        ? `Notice activated and shown on site.`
        : `Notice hidden from website.`
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter announcement text.");
      return;
    }

    await saveAnnouncementItem({
      ...(editingItem?.id ? { id: editingItem.id } : {}),
      text: text.trim(),
      linkText: linkText.trim() || undefined,
      linkHref: linkHref.trim() || undefined,
      isExternal,
      active,
    });

    setIsModalOpen(false);
    showToast(
      editingItem
        ? "Announcement updated successfully!"
        : "New announcement added!"
    );
  };

  const handleDelete = async (id: string) => {
    await deleteAnnouncementItem(id);
    setDeleteConfirmId(null);
    showToast("Announcement deleted.");
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Announcements & Ticker"
        subtitle="Manage live top-bar announcements and hero notice strips"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-accent-400" />
            <span>+ Add Announcement</span>
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

        {/* Live Preview Strip */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-heading font-bold text-ink-900 uppercase tracking-wider">
              <Eye className="h-4 w-4 text-brand-700" />
              <span>Live Website Header Preview</span>
            </div>
            <span className="text-[11px] text-ink-500">
              Only active items appear on public pages
            </span>
          </div>

          <div className="rounded-xl bg-brand-950 text-white p-3.5 text-xs flex items-center justify-between gap-4 border border-brand-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="px-2 py-0.5 rounded bg-accent-500 text-brand-950 font-extrabold text-[10px] uppercase shrink-0">
                Notice
              </span>
              <div className="truncate text-white/90">
                {announcements.filter((a) => a.active).length > 0 ? (
                  announcements
                    .filter((a) => a.active)
                    .map((a) => a.text)
                    .join("  •  ")
                ) : (
                  <span className="text-white/40 italic">
                    No active announcements currently enabled.
                  </span>
                )}
              </div>
            </div>

            <span className="text-[10px] text-accent-400 shrink-0 font-bold">
              ● Live Bar
            </span>
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
            <h3 className="font-heading font-bold text-sm text-ink-900">
              Configured Announcements ({announcements.length})
            </h3>
            <span className="text-[11px] text-ink-500">
              Toggle the switch to show or hide from public visitors
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-canvas/30 transition-colors"
              >
                {/* Left: Text & Link */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.active
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-ink-100 text-ink-600 border border-border"
                      }`}
                    >
                      {item.active ? "Active on site" : "Draft / Hidden"}
                    </span>
                    {item.isExternal && (
                      <span className="text-[10px] text-ink-400">External URL</span>
                    )}
                  </div>

                  <p className="font-heading font-bold text-sm text-ink-900 leading-snug">
                    {item.text}
                  </p>

                  {item.linkText && item.linkHref && (
                    <div className="flex items-center gap-1.5 text-xs text-brand-700 font-semibold">
                      <span>Action Link:</span>
                      <span className="underline underline-offset-2">
                        {item.linkText} ({item.linkHref})
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Toggle & Actions */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-canvas text-xs font-medium cursor-pointer"
                    title={item.active ? "Click to deactivate" : "Click to activate"}
                  >
                    {item.active ? (
                      <>
                        <ToggleRight className="h-5 w-5 text-emerald-600" />
                        <span className="text-emerald-800 font-semibold">Active</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="h-5 w-5 text-ink-400" />
                        <span className="text-ink-500">Hidden</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg text-brand-800 hover:bg-brand-50 border border-brand-200 transition-colors cursor-pointer"
                    title="Edit announcement"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete announcement"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {announcements.length === 0 && (
              <div className="p-12 text-center text-xs text-ink-500">
                No announcements created yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface rounded-2xl p-6 max-w-sm w-full border border-border shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              <h4 className="font-heading font-bold text-base text-ink-900">
                Delete Announcement
              </h4>
            </div>
            <p className="text-xs text-ink-600">
              Are you sure you want to permanently remove this announcement?
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                {editingItem ? "Edit Announcement" : "Create New Announcement"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-canvas transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Announcement Text *
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  placeholder="e.g. B.Tech & Polytechnic Admissions Open 2026-27. Merit Scholarships Available."
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Action Link Text (optional)
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="e.g. Apply Online"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Action Link Destination URL
                  </label>
                  <input
                    type="text"
                    value={linkHref}
                    onChange={(e) => setLinkHref(e.target.value)}
                    placeholder="e.g. /admissions or https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-ink-800">
                  <input
                    type="checkbox"
                    checked={isExternal}
                    onChange={(e) => setIsExternal(e.target.checked)}
                    className="rounded border-border text-brand-700 focus:ring-brand-600"
                  />
                  <span>Opens in new tab (external link)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-ink-800">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded border-border text-brand-700 focus:ring-brand-600"
                  />
                  <span className="font-bold text-brand-900">
                    Publish immediately (Active)
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-ink-700 hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {editingItem ? "Save Changes" : "Create Announcement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
