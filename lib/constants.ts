/** Application-wide constants */
import { site } from "@/content/site";

/** Computed dynamically from foundedYear */
export const YEARS_OF_EXCELLENCE = new Date().getFullYear() - site.foundedYear;

/** Base URL — used in metadata and sitemap */
export const BASE_URL = "https://www.mgmcet.ac.in";

/** Canonical nav levels for department routing */
export const DEPARTMENT_LEVELS = ["btech", "mtech", "polytechnic"] as const;
