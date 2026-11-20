/** Site brand and contact configuration. */
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
}

export interface ContactInfo {
  address: string;
  district: string;
  state: string;
  pincode: string;
  phones: string[];
  email?: string;
  mapEmbedUrl?: string;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  linkText?: string;
  linkHref?: string;
  isExternal?: boolean;
  /** Set false to hide without deleting */
  active: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  group: string;
  taglines: string[];
  affiliationText: string;
  collegeCode: string;
  foundedYear: number;
  contact: ContactInfo;
  social: SocialLinks;
  applyNowUrl: string;
  prospectusUrl?: string;
  scholarshipUrl?: string;
  tourVideoEmbedUrl?: string;
  announcements: AnnouncementItem[];
  /** Footer credits line */
  credits: string;
}
