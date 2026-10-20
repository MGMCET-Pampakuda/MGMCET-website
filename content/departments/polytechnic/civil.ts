import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const civilPoly: DepartmentDetail = {
  id: "poly-civil",
  slug: "civil",
  level: "polytechnic",
  name: "Civil Engineering",
  shortName: "Civil",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-civil.svg",
  thumbnail: "/images/departments/poly-civil-thumb.svg",
  href: "/departments/polytechnic/civil",
  overview: "The Diploma in Civil Engineering provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "Civil Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-civil-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-civil@mgmcet.ac.in" }, // TODO(content): verify
};
