import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const ecePoly: DepartmentDetail = {
  id: "poly-ece",
  slug: "ece",
  level: "polytechnic",
  name: "Electronics and Communication Engineering",
  shortName: "ECE",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-ece.svg",
  thumbnail: "/images/departments/poly-ece-thumb.svg",
  href: "/departments/polytechnic/ece",
  overview: "The Diploma in Electronics and Communication Engineering provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "ECE Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-ece-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-ece@mgmcet.ac.in" }, // TODO(content): verify
};
