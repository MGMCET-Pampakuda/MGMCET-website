import type { FacultyMember } from "@/types";

/**
 * Faculty listing.
 * TODO(content): replace all placeholder entries with real faculty data including
 * actual names, qualifications, designations, experience, and profile photos.
 * Required photo dimensions: 400×400px (1:1 square).
 */
export const faculty: FacultyMember[] = [
  // ─── B.Tech — AI & ML ────────────────────────────────────────────────────
  {
    id: "btech-aiml-hod",
    name: "HOD Name", // TODO(content): replace
    designation: "Associate Professor & Head of Department",
    qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
    department: "Artificial Intelligence & Machine Learning",
    departmentLevel: "btech",
    isHOD: true,
    image: "/images/faculty/placeholder-avatar.svg",
  },
  // TODO(content): add all faculty members for each department

  // ─── B.Tech — CSE ────────────────────────────────────────────────────────
  {
    id: "btech-cse-hod",
    name: "HOD Name", // TODO(content): replace
    designation: "Associate Professor & Head of Department",
    qualification: "M.Tech, Ph.D", // TODO(content): verify
    department: "Computer Science & Engineering",
    departmentLevel: "btech",
    isHOD: true,
    image: "/images/faculty/placeholder-avatar.svg",
  },

  // ─── B.Tech — ECE ────────────────────────────────────────────────────────
  {
    id: "btech-ece-hod",
    name: "HOD Name", // TODO(content): replace
    designation: "Associate Professor & Head of Department",
    qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
    department: "Electronics & Communication Engineering",
    departmentLevel: "btech",
    isHOD: true,
    image: "/images/faculty/placeholder-avatar.svg",
  },

  // ─── B.Tech — Mechanical ─────────────────────────────────────────────────
  {
    id: "btech-mechanical-hod",
    name: "HOD Name", // TODO(content): replace
    designation: "Associate Professor & Head of Department",
    qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
    department: "Mechanical Engineering",
    departmentLevel: "btech",
    isHOD: true,
    image: "/images/faculty/placeholder-avatar.svg",
  },
];
