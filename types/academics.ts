/** Academics and Governance types */

export interface IqacMember {
  id: string;
  role: string;
  name: string;
  designation: string;
  department?: string;
}

export interface MouPartner {
  id: string;
  companyName: string;
  location?: string;
  category?: string;
  scope?: string;
  status?: string;
}

export interface AcademicsSectionBlock {
  title: string;
  body?: string;
  items?: string[];
}

export interface FocusAreaBlock {
  title: string;
  description: string;
}

export interface DegreeCardBlock {
  badge: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface EmergencyCalloutBlock {
  title: string;
  contactLine: string;
  details: string;
}

export interface StepProcedureBlock {
  step: number;
  title: string;
  description: string;
}

export interface AcademicsOverviewContent {
  title: string;
  description: string;
  badge: string;
  introTitle: string;
  introBody: string;
  programCards: DegreeCardBlock[];
  obeTitle: string;
  obeBody: string;
  governanceTitle: string;
  governanceBody: string;
  statutoryCells: Array<{ name: string; description: string }>;
}

export interface IqacPageContent {
  title: string;
  badge: string;
  description: string;
  eyebrow?: string;
  body: string;
  objectives: string[];
  committeeMembers: IqacMember[];
  functionsTitle: string;
  functions: string[];
  blocks?: AcademicsSectionBlock[];
  relatedLinks?: Array<{ label: string; href: string; isPdf?: boolean; isExternal?: boolean }>;
}

export interface AcademicsPageContent {
  title: string;
  badge: string;
  description: string;
  eyebrow?: string;
  body: string;
  blocks?: AcademicsSectionBlock[];
  focusAreas?: FocusAreaBlock[];
  emergencyCallout?: EmergencyCalloutBlock;
  procedures?: StepProcedureBlock[];
  relatedLinks?: Array<{ label: string; href: string; isPdf?: boolean; isExternal?: boolean }>;
}

export interface MousPageContent extends AcademicsPageContent {
  partners?: MouPartner[];
}

export interface AcademicsContent {
  overview: AcademicsOverviewContent;
  iqac: IqacPageContent;
  antiRagging: AcademicsPageContent;
  aicteFeedback: AcademicsPageContent;
  researchAndDevelopment: AcademicsPageContent;
  grievanceCell: AcademicsPageContent;
  mous: MousPageContent;
}
