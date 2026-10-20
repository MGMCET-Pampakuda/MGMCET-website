/** Placements / Training & Placement Cell types */

export interface PlacementStat {
  value: string;
  label: string;
  iconName?: string;
}

export interface Recruiter {
  name: string;
  logo: string;
  logoAlt: string;
  website?: string;
}

export interface PlacementProcess {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface PlacementDrive {
  company: string;
  year: string;
  studentsPlaced?: number;
  package?: string;
  description?: string;
}

export interface PlacementsContent {
  headline: string;
  description: string;
  stats: PlacementStat[];
  recruiters: Recruiter[];
  process: PlacementProcess[];
  pastDrives: PlacementDrive[];
  teamContact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}
