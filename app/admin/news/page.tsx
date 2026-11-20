"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  X,
  Newspaper,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveNews,
  saveNewsItem,
  deleteNewsItem,
} from "@/lib/firebase-services";
import { news as staticNews } from "@/content/news";
import type { NewsItem, NewsCategory } from "@/types/news";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminNewsPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get("action");

  const [newsList, setNewsList] = useState<NewsItem[]>(staticNews);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(() => initialAction === "new");
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields (Text-only article management)
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<NewsCategory>("news");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setSlug("");
    setCategory("news");
    setDepartment("MGM Technological Campus");
    setDate(new Date().toISOString().split("T")[0]);
    setExcerpt("");
    setContent("");
    setEventDate("");
    setEventLocation("");
    setTagsInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setCategory(item.category);
    setDepartment(item.department || "MGM Technological Campus");
    setDate(item.date);
    setExcerpt(item.excerpt);
    setContent(item.content || "");
    setEventDate(item.eventDate || "");
    setEventLocation(item.eventLocation || "");
    setTagsInput((item.tags || []).join(", "));
    setIsModalOpen(true);
  };

  // Load and subscribe to live news
  useEffect(() => {
    const unsubscribe = subscribeToLiveNews((items) => {
      setNewsList(items.length > 0 ? items : staticNews);
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Auto-slug generator when title changes (if adding new)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingItem) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !excerpt) {
      alert("Please fill in Title, Slug, and Summary Excerpt.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    // Calculate reading time
    const fullText = content || excerpt;
    const words = fullText.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.round(words / 160))} min read`;

    const payload: Omit<NewsItem, "id"> & { id?: string } = {
      ...(editingItem?.id ? { id: editingItem.id } : {}),
      title: title.trim(),
      slug: slug.trim(),
      category,
      department: department.trim() || undefined,
      readTime,
      date,
      excerpt: excerpt.trim(),
      content: (content || excerpt).trim(),
      eventDate: category === "event" && eventDate ? eventDate.trim() : undefined,
      eventLocation: category === "event" && eventLocation ? eventLocation.trim() : undefined,
      tags: tags.length > 0 ? tags : undefined,
    };

    await saveNewsItem(payload);
    setIsModalOpen(false);
    showToast(
      editingItem
        ? "Article updated successfully!"
        : "New article published successfully!"
    );
  };

  const handleDelete = async (id: string) => {
    await deleteNewsItem(id);
    setDeleteConfirmId(null);
    showToast("Article deleted successfully.");
  };

  // Filtered list
  const filteredList = useMemo(() => {
    return newsList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        Boolean(item.department?.toLowerCase().includes(q));

      const matchesCat =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [newsList, searchQuery, categoryFilter]);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="News & Events Manager"
        subtitle="Publish campus news bulletins, placement announcements, workshops, and symposiums"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-accent-400" />
            <span>+ Add News or Event</span>
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

        {/* Info banner about text-only storage */}
        <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-800 shrink-0">
              <Sparkles className="h-4 w-4 text-brand-700" />
            </div>
            <div>
              <p className="font-bold text-brand-950">
                Text-Only Editorial Architecture
              </p>
              <p className="text-ink-600 text-[11px] mt-0.5">
                News and bulletins are stored directly as structured text in Firestore with zero image hosting overhead, ensuring permanent free-tier operation.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-surface p-4 rounded-2xl border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "news", "event"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-brand-800 text-white"
                    : "bg-canvas text-ink-600 hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {cat === "all" ? "All Updates" : cat === "news" ? "Campus News" : "Events & Fests"}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, dept, tag..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-canvas border border-border text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
        </div>

        {/* News List Table / Rows */}
        <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
            <h3 className="font-heading font-bold text-sm text-ink-900">
              Published Articles &amp; Bulletins ({filteredList.length})
            </h3>
            <span className="text-[11px] text-ink-500">
              Ordered newest first
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-canvas/30 transition-colors"
              >
                {/* Details */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Category icon badge */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      item.category === "event"
                        ? "bg-accent-50 text-accent-800 border-accent-200"
                        : "bg-brand-50 text-brand-800 border-brand-200"
                    }`}
                  >
                    {item.category === "event" ? (
                      <Calendar className="h-5 w-5" />
                    ) : (
                      <Newspaper className="h-5 w-5" />
                    )}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          item.category === "event"
                            ? "bg-accent-100 text-accent-900 border border-accent-300"
                            : "bg-brand-50 text-brand-800 border border-brand-200"
                        }`}
                      >
                        {item.category === "event" ? "Event" : "Bulletin"}
                      </span>

                      <span className="text-xs text-ink-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-brand-700" />
                        <span>{item.date}</span>
                      </span>

                      {item.department && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-canvas border border-border text-brand-900 font-semibold truncate max-w-xs">
                          {item.department}
                        </span>
                      )}

                      {item.readTime && (
                        <span className="text-[10px] text-ink-400 flex items-center gap-1 font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{item.readTime}</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-sm text-ink-950 line-clamp-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-ink-600 line-clamp-1 max-w-2xl">
                      {item.excerpt}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-ink-400 bg-canvas px-1.5 py-0.2 rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    href={`/news-events/${item.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-ink-500 hover:text-brand-800 hover:bg-brand-50 transition-colors"
                    title="View live article"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete article"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredList.length === 0 && (
              <div className="p-12 text-center space-y-3">
                <p className="text-sm font-medium text-ink-500">
                  No news items match your current search.
                </p>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-800 text-white text-xs font-bold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Publish First News</span>
                </button>
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
                Confirm Deletion
              </h4>
            </div>
            <p className="text-xs text-ink-600">
              Are you sure you want to delete this article? This action will remove it from the live college website.
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
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-surface rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/40">
              <div>
                <h3 className="font-heading font-bold text-h4 text-ink-900">
                  {editingItem ? "Edit News or Event Article" : "Create New Article / Event"}
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Publishes instantly to the public website without image storage requirements
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-canvas transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-heading font-bold text-ink-800 mb-1.5">
                  Article Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory("news")}
                    className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      category === "news"
                        ? "bg-brand-50 border-brand-700 text-brand-900 ring-1 ring-brand-700"
                        : "bg-surface border-border text-ink-600 hover:bg-canvas"
                    }`}
                  >
                    <Newspaper className="h-4 w-4" />
                    <span>Campus News Bulletin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("event")}
                    className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      category === "event"
                        ? "bg-accent-50 border-accent-600 text-accent-950 ring-1 ring-accent-600"
                        : "bg-surface border-border text-ink-600 hover:bg-canvas"
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Campus Event / Workshop / Fest</span>
                  </button>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    News Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Hackrush 2026 Hackathon"
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    URL Slug * (auto-generated)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. hackrush-2026"
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              {/* Department & Publish Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Department / Organizing Unit
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Training & Placement Cell, NSS Unit 246, Dept. of CSE"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                    Publish Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              {/* Event Specific Details */}
              {category === "event" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-accent-50/40 border border-accent-200">
                  <div>
                    <label className="block text-xs font-heading font-semibold text-accent-950 mb-1">
                      Event Date String (e.g. January 17, 2026)
                    </label>
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="e.g. March 15, 2026"
                      className="w-full px-3.5 py-2 rounded-xl border border-accent-300 bg-white text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-accent-950 mb-1">
                      Event Location / Venue
                    </label>
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Seminar Hall, MGMCET"
                      className="w-full px-3.5 py-2 rounded-xl border border-accent-300 bg-white text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-600"
                    />
                  </div>
                </div>
              )}

              {/* Summary / Excerpt */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Summary Caption / Excerpt * (1-2 sentences shown on cards and previews)
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  placeholder="A concise summary highlighting the key announcement, winners, or guest speakers..."
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Extended Description */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Extended Description (full article content — paragraphs &amp; bullet points supported)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={7}
                  placeholder="Detailed multi-paragraph description of the event, chief guests, prize distributions, and student achievements..."
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600 font-mono"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="placement, recruitment, workshop, electronics"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-ink-700 hover:bg-canvas transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs shadow-xs transition-colors"
                >
                  {editingItem ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
