/** Careers page types */

export type CareerType = "teaching" | "non-teaching" | "technical" | "administrative";

export interface CareerItem {
  id: string;
  title: string;
  department?: string;
  type: CareerType;
  qualification?: string;
  experience?: string;
  description?: string;
  applyHref?: string;
  postedDate: string;
  closingDate?: string;
  isActive: boolean;
}
