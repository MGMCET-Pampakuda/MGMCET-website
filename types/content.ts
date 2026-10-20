/** Home page and shared section content types */

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  /** The accent (gold) second line rendered below headline */
  headlineAccent?: string;
  description: string;
  /** Background image path (from /public/) */
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; isVideoModal?: boolean };
  /** Optional badge labels over the hero image */
  badges?: string[];
}

export interface Stat {
  id: string;
  value: string;
  /** If true, the numeric portion will animate on scroll */
  animated?: boolean;
  label: string;
  iconName: string;
}

export interface AboutSplit {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  cta: { label: string; href: string };
  vision: { title: string; text: string; iconName: string };
  mission: { title: string; text: string; iconName: string };
}

export interface ProgramCard {
  id: string;
  level: string;
  title: string;
  duration: string;
  programCount: number;
  iconName: string;
  href: string;
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhySection {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  items: WhyItem[];
}

export interface CampusLifeSection {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  cta: { label: string; href: string };
  quickLinks: Array<{ label: string; href: string; iconName: string }>;
  stats: Array<{ value: string; label: string }>;
}

export interface DirectorQuote {
  quote: string;
  name: string;
  designation: string;
  image?: string;
}

export interface CTABannerContent {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export interface HomeContent {
  hero: HeroSlide[];
  stats: Stat[];
  about: AboutSplit;
  programs: ProgramCard[];
  why: WhySection;
  campusLife: CampusLifeSection;
  directorQuote: DirectorQuote;
  ctaBanner: CTABannerContent;
  /** Number of news items to show on home page */
  newsCount: number;
}
