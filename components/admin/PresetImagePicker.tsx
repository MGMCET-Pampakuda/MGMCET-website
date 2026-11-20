"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Pre-curated campus images from ImageKit CDN
export const CAMPUS_PRESETS = [
  {
    name: "Campus Front Entrance",
    category: "Campus",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/front-entrance.webp",
  },
  {
    name: "Aerial Campus Panorama",
    category: "Campus",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/campus-aerial.webp",
  },
  {
    name: "Main Academic Block",
    category: "Campus",
    url: "/images/hero/campus-main.webp",
  },
  {
    name: "Hackathon & Tech Meet",
    category: "Events",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/events/other/hackathon-achievement.webp",
  },
  {
    name: "Arts & Cultural Fest",
    category: "Cultural",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/arts-fest.webp",
  },
  {
    name: "Technical Seminar & Workshop",
    category: "Academics",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/events/other/technical-seminar.webp",
  },
  {
    name: "Training & Placement Drive",
    category: "Placements",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/events/other/placement-training.webp",
  },
  {
    name: "Placement Milestone Celebration",
    category: "Placements",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/events/other/placement-2025.webp",
  },
  {
    name: "Advanced Computer Labs",
    category: "Facilities",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-labs.webp",
  },
  {
    name: "Central Engineering Library",
    category: "Facilities",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-library.webp",
  },
  {
    name: "Autobahn BharatBenz Demo",
    category: "Academics",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/autobahn-bharatbenz.webp",
  },
  {
    name: "Faculty & Mentorship",
    category: "Academics",
    url: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp",
  },
];

interface PresetImagePickerProps {
  onSelect: (url: string) => void;
  currentValue?: string;
  buttonLabel?: string;
}

export function PresetImagePicker({
  onSelect,
  currentValue,
  buttonLabel = "Pick Preset Image",
}: PresetImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Campus", "Events", "Academics", "Placements", "Facilities"];

  const filtered = filter === "all"
    ? CAMPUS_PRESETS
    : CAMPUS_PRESETS.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-md transition-colors cursor-pointer"
      >
        <ImageIcon className="h-3.5 w-3.5 text-brand-700" />
        <span>{buttonLabel}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas/50">
              <div>
                <h3 className="font-heading font-bold text-h4 text-ink-900">
                  Select Campus Preset Photo
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Click any verified college image to insert it directly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-surface transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category tabs */}
            <div className="px-6 py-2.5 border-b border-border bg-canvas/30 flex items-center gap-2 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer capitalize whitespace-nowrap ${
                    filter === c
                      ? "bg-brand-800 text-white"
                      : "bg-surface text-ink-600 hover:bg-brand-50 hover:text-brand-800 border border-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((preset) => {
                const isSelected = currentValue === preset.url;
                return (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      onSelect(preset.url);
                      setIsOpen(false);
                    }}
                    className={`group relative text-left rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      isSelected
                        ? "border-brand-700 ring-2 ring-brand-600/40 shadow-sm"
                        : "border-border hover:border-brand-500 hover:shadow-md"
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full bg-canvas overflow-hidden">
                      <Image
                        src={preset.url}
                        alt={preset.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 p-1 bg-brand-700 text-white rounded-full shadow-sm">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 bg-surface">
                      <span className="block text-xs font-semibold text-ink-800 truncate">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-ink-500 uppercase tracking-wider">
                        {preset.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border flex justify-end bg-canvas/30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
