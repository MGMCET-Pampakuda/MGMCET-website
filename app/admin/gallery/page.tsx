"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  Camera,
  Search,
  Loader2,
  Film,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveGallery,
  saveGalleryItem,
  deleteGalleryItem,
} from "@/lib/firebase-services";
import { uploadMediaToImageKit } from "@/lib/client-imagekit";
import type { GalleryItem, GalleryCategory, GalleryMediaType } from "@/types/gallery";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "Campus & Architecture", value: "campus" },
  { label: "Academics & Labs", value: "academics" },
  { label: "Cultural Fest & Arts", value: "cultural" },
  { label: "Sports & Athletics", value: "sports" },
  { label: "Placements & Industry", value: "placements" },
  { label: "Events & Celebrations", value: "events" },
];

export default function AdminGalleryPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & Upload states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<GalleryMediaType>("image");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("campus");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to live gallery items
  useEffect(() => {
    const unsub = subscribeToLiveGallery((liveItems) => {
      setItems(liveItems);
    });
    return () => unsub();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadError(null);

    const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name);
    setFileType(isVideo ? "video" : "image");

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Auto-fill suggested alt text from file name if blank
    if (!altText) {
      const suggested = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setAltText(`MGM College — ${suggested}`);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setAltText("");
    setCaption("");
    setCategory("campus");
    setFileType("image");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit media upload to ImageKit & Firestore
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please select a photo or video to upload.");
      return;
    }
    if (!altText.trim()) {
      setUploadError("Please provide an image/video description or title.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      // 1. Upload directly to ImageKit
      const uploaded = await uploadMediaToImageKit(selectedFile, {
        folder: "/mgmcet/gallery",
        tags: ["gallery", category, fileType],
      });

      // 2. Save metadata to Firestore / Local state
      const newItem: Omit<GalleryItem, "id"> = {
        src: uploaded.url,
        alt: altText.trim(),
        caption: caption.trim() || undefined,
        category,
        type: uploaded.fileType,
        thumbnail: uploaded.thumbnailUrl,
        date: new Date().toISOString().split("T")[0],
      };

      await saveGalleryItem(newItem);

      setToastMessage(`${fileType === "video" ? "Video" : "Photo"} uploaded and published successfully!`);
      setTimeout(() => setToastMessage(null), 4000);

      resetForm();
      setIsUploadOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload media. Please try again.";
      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      setDeleteConfirmId(null);
      setToastMessage("Media item deleted from gallery.");
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage("Failed to delete item.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const isVideo = item.type === "video" || /\.(mp4|webm|mov)$/i.test(item.src);
    const matchesType =
      activeType === "all" ||
      (activeType === "video" && isVideo) ||
      (activeType === "image" && !isVideo);

    const matchesSearch =
      !searchQuery ||
      item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesType && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-canvas">
      <AdminHeader
        title="Campus Media Gallery"
        subtitle="Upload photos and videos directly to ImageKit and manage campus life highlights."
        onOpenMobileMenu={onOpenMobileMenu}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-success-bg border border-success/30 text-success flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-success/70 hover:text-success"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Action & Filter Bar */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-lg text-ink-900">
                Media Library ({filteredItems.length} of {items.length})
              </h2>
              <p className="text-body-sm text-ink-600">
                Assets are hosted on ImageKit CDN and synchronized with the public gallery.
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setIsUploadOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors shadow-xs shrink-0"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Photo / Video</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-border/80">
            {/* Search */}
            <div className="sm:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
              <input
                type="text"
                placeholder="Search by title, caption, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-700 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-4">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-700 capitalize"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Media Type Filter */}
            <div className="sm:col-span-3">
              <select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-700"
              >
                <option value="all">All Media Types</option>
                <option value="image">Photos Only</option>
                <option value="video">Videos Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
            <Camera className="h-10 w-10 text-ink-300 mx-auto" />
            <h3 className="font-heading font-semibold text-ink-800 text-base">
              No gallery items found
            </h3>
            <p className="text-body-sm text-ink-500 max-w-sm mx-auto">
              {searchQuery || activeCategory !== "all" || activeType !== "all"
                ? "Try clearing your filters or search terms."
                : "Get started by uploading your first campus photo or video."}
            </p>
            <button
              onClick={() => {
                resetForm();
                setIsUploadOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-brand-900 text-white text-xs font-semibold hover:bg-brand-800 transition-colors"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload Media</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              const isVideo = item.type === "video" || /\.(mp4|webm|mov)$/i.test(item.src);

              return (
                <div
                  key={item.id}
                  className="group bg-surface rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[4/3] w-full bg-brand-950 overflow-hidden">
                      {isVideo ? (
                        <video
                          src={item.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Type badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-950/80 backdrop-blur-xs text-white text-xs font-medium border border-white/10">
                        {isVideo ? (
                          <>
                            <Film className="h-3 w-3 text-accent-400" />
                            <span>Video</span>
                          </>
                        ) : (
                          <>
                            <Camera className="h-3 w-3 text-brand-300" />
                            <span>Photo</span>
                          </>
                        )}
                      </div>

                      {/* Category tag */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium capitalize">
                          {item.category}
                        </span>
                      </div>

                      {/* External ImageKit link */}
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                        title="Open on ImageKit CDN"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    {/* Metadata */}
                    <div className="p-4 space-y-1.5">
                      <h4 className="font-heading font-semibold text-body-sm text-ink-900 line-clamp-1">
                        {item.alt}
                      </h4>
                      {item.caption && (
                        <p className="text-caption text-ink-600 line-clamp-2">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 border-t border-border flex items-center justify-between text-xs text-ink-500 bg-brand-50/40">
                    <span className="truncate max-w-[150px]">
                      {item.date || "Active"}
                    </span>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded-lg text-danger hover:bg-danger-bg hover:text-danger transition-colors flex items-center gap-1 font-medium"
                      title="Delete from Gallery"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── UPLOAD MODAL ─────────────────────────────────────────────────── */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-surface rounded-2xl border border-border shadow-pop max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-800">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-ink-900">
                    Upload to Campus Gallery
                  </h3>
                  <p className="text-caption text-ink-500">
                    Direct ImageKit upload with instant CDN hosting
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isUploading) {
                    resetForm();
                    setIsUploadOpen(false);
                  }
                }}
                disabled={isUploading}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-canvas"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {uploadError && (
                <div className="p-3 rounded-xl bg-danger-bg border border-danger/30 text-danger text-xs font-medium flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* File Dropzone */}
              <div>
                <label className="block text-body-sm font-semibold text-ink-900 mb-2">
                  Media File (Photo or Video) *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border hover:border-brand-600 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-canvas hover:bg-brand-50/40 relative overflow-hidden group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="space-y-3">
                      <div className="relative aspect-video max-h-48 mx-auto rounded-xl overflow-hidden bg-black border border-border">
                        {fileType === "video" ? (
                          <video
                            src={previewUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image
                            src={previewUrl}
                            alt="Upload preview"
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>
                      <p className="text-xs text-brand-800 font-semibold truncate">
                        {selectedFile?.name} ({(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB)
                      </p>
                      <span className="text-[11px] text-ink-500 underline">
                        Click to choose a different file
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-700 mx-auto flex items-center justify-center">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="text-body-sm font-medium text-ink-800">
                        Drag and drop or <span className="text-brand-800 font-semibold underline">browse file</span>
                      </p>
                      <p className="text-caption text-ink-400">
                        Supports JPG, PNG, WebP up to 25MB • MP4, WebM up to 100MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title / Description */}
              <div>
                <label className="block text-body-sm font-semibold text-ink-900 mb-1">
                  Title / Alt Text *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MGM Campus Entrance & Academic Quad"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-body-sm font-semibold text-ink-900 mb-1">
                  Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Students celebrating innovation during the Annual Arts & Cultural Fest."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-body-sm font-semibold text-ink-900 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 capitalize"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => {
                    resetForm();
                    setIsUploadOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-pill border border-border text-ink-700 text-sm font-semibold hover:bg-canvas transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Uploading to ImageKit...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-accent-400" />
                      <span>Publish to Gallery</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ─────────────────────────────────────── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface rounded-2xl border border-border shadow-pop max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-danger">
              <div className="p-3 rounded-full bg-danger-bg">
                <Trash2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-ink-900">
                Delete Media Item?
              </h3>
            </div>
            <p className="text-body-sm text-ink-600 leading-relaxed">
              Are you sure you want to delete this media item? It will be immediately removed from the campus gallery.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-pill border border-border text-ink-700 text-sm font-medium hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-pill bg-danger text-white text-sm font-semibold hover:bg-danger/90 transition-colors shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
