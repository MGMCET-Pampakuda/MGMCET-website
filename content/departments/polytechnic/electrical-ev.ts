import type { DepartmentDetail } from "@/types";

// TODO(content): replace all placeholder values with real department data
export const electricalevPoly: DepartmentDetail = {
  id: "poly-electrical-ev",
  slug: "electrical-ev",
  level: "polytechnic",
  name: "Electrical Engineering and Electric Vehicle Technology",
  shortName: "Electrical EV",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-electrical-ev.svg",
  thumbnail: "/images/departments/poly-electrical-ev-thumb.svg",
  href: "/departments/polytechnic/electrical-ev",
  overview: "The Diploma in Electrical Engineering and Electric Vehicle Technology provides students with foundational technical skills aligned with industry and the SBTET/KTU polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "Electrical EV Lab", description: "Equipped for practical coursework." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-electrical-ev-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-electrical-ev@mgmcet.ac.in" }, // TODO(content): verify
};
