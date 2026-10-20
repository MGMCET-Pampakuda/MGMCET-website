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
  image: string;
  imageAlt: string;
  /** Optional event-specific fields */
  eventDate?: string;
  eventLocation?: string;
  /** Tags for filtering */
  tags?: string[];
}
