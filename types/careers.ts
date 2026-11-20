/** Careers & Job Application Types */

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

export type JobCategory =
  | "teaching"
  | "lab_assistant"
  | "administrative"
  | "technical"
  | "other";

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "rejected"
  | "offered";

export interface JobApplication {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  category: JobCategory;
  roleApplied: string;
  department: string;
  highestQualification: string;
  specialization?: string;
  totalExperienceYears: string;
  teachingExperienceYears?: string;
  industryExperienceYears?: string;
  currentEmployer?: string;
  currentDesignation?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  resumeFileType?: string;
  resumeFileSize?: number;
  coverLetter?: string;
  status: ApplicationStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}
