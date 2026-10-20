import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const automobilePoly: DepartmentDetail = {
  id: "poly-automobile",
  slug: "automobile",
  level: "polytechnic",
  name: "Automobile Engineering",
  shortName: "Automobile",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-automobile.svg",
  thumbnail: "/images/departments/poly-automobile-thumb.svg",
  href: "/departments/polytechnic/automobile",
  overview: "The Diploma in Automobile Engineering provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "Automobile Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-automobile-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-automobile@mgmcet.ac.in" }, // TODO(content): verify
};
