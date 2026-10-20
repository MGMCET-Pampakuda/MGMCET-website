import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const csePoly: DepartmentDetail = {
  id: "poly-cse",
  slug: "cse",
  level: "polytechnic",
  name: "Computer Science & Engineering",
  shortName: "CSE",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-cse.svg",
  thumbnail: "/images/departments/poly-cse-thumb.svg",
  href: "/departments/polytechnic/cse",
  overview: "The Diploma in Computer Science & Engineering provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "CSE Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-cse-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-cse@mgmcet.ac.in" }, // TODO(content): verify
};
