import type { DepartmentDetail } from "@/types";

export const aimlPoly: DepartmentDetail = {
  id: "poly-aiml",
  slug: "aiml",
  level: "polytechnic",
  name: "Artificial Intelligence & Machine Learning",
  shortName: "AI & ML",
  intake: 30,
  duration: "3 Years",
  image: "/images/departments/poly-aiml.svg",
  thumbnail: "/images/departments/poly-aiml-thumb.svg",
  href: "/departments/polytechnic/aiml",
  tagline: "Foundations of Intelligent Technology",
  overview: "The Diploma in Artificial Intelligence & Machine Learning introduces students to foundational concepts of AI, data handling, Python programming, and basic ML workflows. Aligned with the SBTET/KTU Polytechnic curriculum.",
  programOutcomes: [],
  labs: [{ name: "AI Lab", description: "Python and ML tools on networked workstations." }], // TODO(content): add real lab details
  faculty: [{ id: "poly-aiml-hod", name: "HOD Name", designation: "Lecturer & HOD", isHOD: true, image: "/images/faculty/placeholder-avatar.svg" }], // TODO(content): replace
  curriculumLinks: [],
  achievements: [],
  contact: { email: "poly-aiml@mgmcet.ac.in" }, // TODO(content): verify
};
