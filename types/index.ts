/** Barrel export for all types */

export type * from "./site";
export type * from "./navigation";
export type * from "./content";
export type * from "./department";
export type * from "./news";
export type * from "./campus-life";
export type * from "./downloads";
export type * from "./placements";
export type * from "./gallery";
export type * from "./careers";
export type * from "./faculty";
export type * from "./forms";
export type * from "./academics";

// Re-export type guard
export { isNavGroup } from "./navigation";
