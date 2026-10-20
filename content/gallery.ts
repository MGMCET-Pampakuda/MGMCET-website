import type { GalleryItem } from "@/types";

/**
 * Gallery content.
 * TODO(content): replace placeholder images with real photos.
 * Required dimensions: 800×600px (4:3 ratio) for grid items.
 */
export const gallery: GalleryItem[] = [
  { id: "g-1", src: "/images/gallery/gallery-1.svg", alt: "Campus aerial view", caption: "MGMCET Campus", category: "campus" },
  { id: "g-2", src: "/images/gallery/gallery-2.svg", alt: "Students in lab", caption: "Laboratory Session", category: "academics" },
  { id: "g-3", src: "/images/gallery/gallery-3.svg", alt: "Onam celebrations", caption: "Onam Festival", category: "cultural" },
  { id: "g-4", src: "/images/gallery/gallery-4.svg", alt: "Sports day event", caption: "Annual Sports Day", category: "sports" },
  { id: "g-5", src: "/images/gallery/gallery-5.svg", alt: "Placement drive", caption: "Campus Recruitment", category: "placements" },
  { id: "g-6", src: "/images/gallery/gallery-6.svg", alt: "Technical fest", caption: "Technical Fest", category: "events" },
  { id: "g-7", src: "/images/gallery/gallery-7.svg", alt: "Cultural programme", caption: "Cultural Programme", category: "cultural" },
  { id: "g-8", src: "/images/gallery/gallery-8.svg", alt: "Graduation day", caption: "Graduation Day", category: "events" },
];
