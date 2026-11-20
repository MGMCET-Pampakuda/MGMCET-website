/** Campus life types */

export interface CampusLifeStat {
  value: string;
  label: string;
}

export interface CampusLifeFeature {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  iconName: string;
  href: string;
  isExternal?: boolean;
  /** Full detail page content */
  content?: string;
}

export type ClubCategory = "club" | "association";

export interface WomenCellEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  welcomeSpeech: string;
  voteOfThanks: string;
  summary: string;
  iconName?: string;
  category?: string;
}

export interface ClubAssociationItem {
  id: string;
  name: string;
  category: ClubCategory;
  brief: string;
  chairperson: string;
  staffInCharge: string;
  viceChairperson?: string;
  tagline?: string;
  iconName?: string;
  href?: string;
  isExternal?: boolean;
  order?: number;
  status?: "Active" | "Inactive";
}

export interface ClubItem {
  name: string;
  description?: string;
  slug: string;
  href: string;
  isExternal?: boolean;
}

export interface FacilityDetail {
  category: string;
  highlights: string[];
  body: string[];
  contactInfo?: string;
}

export interface CampusLifeContent {
  features: CampusLifeFeature[];
  clubs: ClubItem[];
  stats: CampusLifeStat[];
  facilityDetails: Record<string, FacilityDetail>;
}
