/** Faculty types */

import type { DepartmentLevel } from "./department";

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  department: string;
  departmentLevel: DepartmentLevel;
  experience?: string;
  image?: string;
  email?: string;
  specialization?: string;
  isHOD?: boolean;
}
