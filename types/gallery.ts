/** Gallery types */

export type GalleryCategory =
  | "campus"
  | "events"
  | "sports"
  | "cultural"
  | "academics"
  | "placements"
  | "all";

export type GalleryMediaType = "image" | "video";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: GalleryCategory;
  date?: string;
  type?: GalleryMediaType;
  thumbnail?: string;
}
