import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const mechanicalPoly: DepartmentDetail = {
  id: "poly-mechanical",
  slug: "mechanical",
  level: "polytechnic",
  name: "Mechanical Engineering",
  shortName: "Mechanical",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-mechanical.svg",
  thumbnail: "/images/departments/poly-mechanical-thumb.svg",
  href: "/departments/polytechnic/mechanical",
  overview: "The Diploma in Mechanical Engineering provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "Mechanical Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-mechanical-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-mechanical@mgmcet.ac.in" }, // TODO(content): verify
};
