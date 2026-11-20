/** News and events types */

export type NewsCategory = "news" | "event";

export interface NewsItem {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  content?: string;
  date: string; // ISO 8601 date string e.g. "2026-09-15"
  department?: string;
  readTime?: string;
  /** Legacy image fields made optional to support text-only free storage */
  image?: string;
  imageAlt?: string;
  /** Optional event-specific fields */
  eventDate?: string;
  eventLocation?: string;
  /** Tags for filtering */
  tags?: string[];
  /** Optional legacy gallery */
  gallery?: string[];
}
