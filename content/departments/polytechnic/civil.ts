import type { DepartmentDetail } from "@/types";

export const civilPoly: DepartmentDetail = {
  id: "poly-civil",
  slug: "civil",
  level: "polytechnic",
  name: "Civil Engineering",
  shortName: "Civil",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-civil.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-civil.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Civil Engineering offers rigorous practical education in surveying, construction materials, structural detailing, estimating and costing, and project site supervision, adhering to DTE Kerala curriculum.",
  programOutcomes: [],
  labs: [
    {
      name: "Surveying & Levelling Lab",
      description: "Equipped with total stations, theodolites, auto levels, and surveying accessories.",
    },
    {
      name: "Civil Engineering Materials Lab",
      description: "Testing equipment for compressive strength of concrete, tensile rebar testing, and soil classification.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [
    "MGM Polytechnic Civil Department achieved 100% pass result in the final state board examinations.",
  ],
  contact: { email: "mail@mgmcet.ac.in" },
};
