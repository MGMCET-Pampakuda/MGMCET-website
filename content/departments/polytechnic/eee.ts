import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const eeePoly: DepartmentDetail = {
  id: "poly-eee",
  slug: "eee",
  level: "polytechnic",
  name: "Electrical and Electronics Engineering",
  shortName: "EEE",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-eee.svg",
  thumbnail: "/images/departments/poly-eee-thumb.svg",
  href: "/departments/polytechnic/eee",
  overview: "The Diploma in Electrical and Electronics Engineering provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "EEE Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-eee-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-eee@mgmcet.ac.in" }, // TODO(content): verify
};
