"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Play,
  Film,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { Badge } from "@/components/ui/Badge";
import { gallery as initialGallery } from "@/content/gallery";
import { subscribeToLiveGallery } from "@/lib/firebase-services";
import type { GalleryItem } from "@/types/gallery";

const FILTERS = [
  { label: "All Media", value: "all" },
  { label: "Campus", value: "campus" },
  { label: "Academics", value: "academics" },
  { label: "Cultural", value: "cultural" },
  { label: "Sports", value: "sports" },
  { label: "Placements", value: "placements" },
  { label: "Events", value: "events" },
];

export function GalleryView() {
  const [items, setItems] = useState<GalleryItem[]>(initialGallery);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Subscribe to live gallery updates from Firestore / ImageKit
  useEffect(() => {
    const unsub = subscribeToLiveGallery((liveItems) => {
      if (liveItems && liveItems.length > 0) {
        setItems(liveItems);
      }
    });
    return () => unsub();
  }, []);

  const filteredGallery = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredGallery.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredGallery.length) % filteredGallery.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <>
      <ListingPage
        title="Campus Media Gallery"
        description="Visual moments capturing student life, state-of-the-art laboratories, sports tournaments, technical festivals, and cultural festivities at MGMCET."
        badge="Campus Life &amp; Highlights"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalCount={filteredGallery.length}
        emptyMessage="No photos or videos found for this category."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => {
            const isVideo =
              item.type === "video" || /\.(mp4|webm|mov)$/i.test(item.src);

            return (
              <figure
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group rounded-2xl overflow-hidden bg-surface border border-border shadow-xs hover:shadow-card hover:-translate-y-1 transition-all flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-950">
                  {isVideo ? (
                    <>
                      <video
                        src={item.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Play overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-brand-900/90 text-white flex items-center justify-center shadow-card group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-ink-900 transition-all">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="outline"
                      size="sm"
                      className="bg-brand-950/80 text-white backdrop-blur-xs border-white/20 capitalize text-[11px]"
                    >
                      {item.category}
                    </Badge>
                  </div>

                  {/* Video/Photo indicator */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    {isVideo ? (
                      <Film className="h-3.5 w-3.5 text-accent-400" />
                    ) : (
                      <Camera className="h-3.5 w-3.5 text-brand-200" />
                    )}
                  </div>
                </div>

                {/* Caption / Title */}
                <figcaption className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="font-heading font-semibold text-body-sm text-ink-900 line-clamp-1">
                    {item.alt}
                  </h4>
                  {item.caption && (
                    <p className="text-caption text-ink-600 line-clamp-2 mt-1">
                      {item.caption}
                    </p>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </ListingPage>

      {/* ── LIGHTBOX MODAL ──────────────────────────────────────────────── */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400"
            aria-label="Close full view"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous arrow */}
          {filteredGallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex! - 1 + filteredGallery.length) %
                    filteredGallery.length
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors hidden sm:flex items-center justify-center focus-visible:outline-2 focus-visible:outline-accent-400"
              aria-label="Previous media"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next arrow */}
          {filteredGallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex! + 1) % filteredGallery.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors hidden sm:flex items-center justify-center focus-visible:outline-2 focus-visible:outline-accent-400"
              aria-label="Next media"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Lightbox content card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-brand-950 border border-white/10 shadow-2xl"
          >
            {/* Media player / container */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[480px] bg-black flex items-center justify-center">
              {activeLightboxItem.type === "video" ||
              /\.(mp4|webm|mov)$/i.test(activeLightboxItem.src) ? (
                <video
                  src={activeLightboxItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <div className="relative w-full h-[65vh]">
                  <Image
                    src={activeLightboxItem.src}
                    alt={activeLightboxItem.alt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Bottom info bar */}
            <div className="p-4 sm:p-5 bg-brand-950 text-white border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="accent" size="sm" pill className="capitalize">
                    {activeLightboxItem.category}
                  </Badge>
                  <span className="text-caption text-white/60">
                    {lightboxIndex! + 1} of {filteredGallery.length}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-body-lg text-white">
                  {activeLightboxItem.alt}
                </h3>
                {activeLightboxItem.caption && (
                  <p className="text-body-sm text-brand-100/80">
                    {activeLightboxItem.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeLightboxItem.src}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Full View</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
