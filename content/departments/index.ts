/**
 * Department Registry
 * Single source of truth for all departments.
 * Adding a department = adding one file in content/departments/... + registering it here.
 * Listings, nav, sitemap, home page, and detail pages update automatically.
 */

import type { DepartmentDetail, DepartmentMeta } from "@/types";
import { aimlBtech } from "./btech/aiml";
import { cseCyberBtech } from "./btech/cse-cyber-security";
import { cseBtech } from "./btech/cse";
import { eceBtech } from "./btech/ece";
import { mechanicalBtech } from "./btech/mechanical";
import { industrialInstrumentationMtech } from "./mtech/industrial-instrumentation-control";
import { structuralEngineeringMtech } from "./mtech/structural-engineering-construction-management";
import { aimlPoly } from "./polytechnic/aiml";
import { civilPoly } from "./polytechnic/civil";
import { csePoly } from "./polytechnic/cse";
import { automobilePoly } from "./polytechnic/automobile";
import { mechanicalPoly } from "./polytechnic/mechanical";
import { eeePoly } from "./polytechnic/eee";
import { ecePoly } from "./polytechnic/ece";
import { electricalevPoly } from "./polytechnic/electrical-ev";

/** All registered department details */
export const allDepartmentDetails: DepartmentDetail[] = [
  // B.Tech (5)
  aimlBtech,
  cseCyberBtech,
  cseBtech,
  eceBtech,
  mechanicalBtech,

  // M.Tech (2)
  industrialInstrumentationMtech,
  structuralEngineeringMtech,

  // Polytechnic (8)
  aimlPoly,
  civilPoly,
  csePoly,
  automobilePoly,
  mechanicalPoly,
  eeePoly,
  ecePoly,
  electricalevPoly,
];

/** Lightweight metadata array for listings, nav, and home page */
export const allDepartments: DepartmentMeta[] = allDepartmentDetails;

/** Filter helpers — used by listings and nav */
export const btechDepartments = allDepartments.filter((d) => d.level === "btech");
export const mtechDepartments = allDepartments.filter((d) => d.level === "mtech");
export const polytechnicDepartments = allDepartments.filter((d) => d.level === "polytechnic");

/** Helper to retrieve a single department detail by level and slug */
export function getDepartment(level: string, slug: string): DepartmentDetail | undefined {
  return allDepartmentDetails.find((d) => d.level === level && d.slug === slug);
}
