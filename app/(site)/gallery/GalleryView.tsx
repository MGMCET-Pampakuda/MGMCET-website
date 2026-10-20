"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ListingPage } from "@/components/templates/ListingPage";
import { Badge } from "@/components/ui/Badge";
import { gallery } from "@/content/gallery";

const FILTERS = [
  { label: "All Photos", value: "all" },
  { label: "Campus", value: "campus" },
  { label: "Academics", value: "academics" },
  { label: "Cultural", value: "cultural" },
  { label: "Sports", value: "sports" },
  { label: "Placements", value: "placements" },
  { label: "Events", value: "events" },
];

export function GalleryView() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredGallery = useMemo(() => {
    if (activeFilter === "all") return gallery;
    return gallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <ListingPage
      title="Photo Gallery"
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
      emptyMessage="No images found for this category."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item) => (
          <figure
            key={item.id}
            className="group rounded-2xl overflow-hidden bg-surface border border-border shadow-xs hover:shadow-card hover:-translate-y-1 transition-all flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="outline" size="sm" className="bg-brand-900/80 text-white backdrop-blur-xs border-white/20 capitalize">
                  {item.category}
                </Badge>
              </div>
            </div>
            {item.caption && (
              <figcaption className="p-4 text-body-sm font-medium text-ink-800">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </ListingPage>
  );
}
