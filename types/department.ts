/** Department content types */

export type DepartmentLevel = "btech" | "mtech" | "polytechnic";

export interface Lab {
  name: string;
  description?: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  experience?: string;
  image?: string;
  email?: string;
  isHOD?: boolean;
}

export interface ProgramOutcome {
  code: string;
  description: string;
}

export interface CurriculumLink {
  label: string;
  href: string;
  isPdf?: boolean;
  year?: string;
}

export interface Achievement {
  title: string;
  year?: string;
  description?: string;
}

/** Registry entry — lightweight, used in listings, nav, and sitemap */
export interface DepartmentMeta {
  id: string;
  slug: string;
  level: DepartmentLevel;
  name: string;
  shortName?: string;
  intake?: number;
  duration: string;
  image: string;
  /** Used for home page department cards */
  thumbnail: string;
  href: string;
}

/** Full department detail — used on the department detail page */
export interface DepartmentDetail extends DepartmentMeta {
  tagline?: string;
  overview: string;
  vision?: string;
  mission?: string;
  programOutcomes: ProgramOutcome[];
  programEducationalObjectives?: ProgramOutcome[];
  labs: Lab[];
  faculty: Faculty[];
  curriculumLinks: CurriculumLink[];
  achievements?: Achievement[];
  placements?: {
    description?: string;
    topRecruiters?: string[];
  };
  contact?: {
    hod?: string;
    email?: string;
    phone?: string;
  };
}
