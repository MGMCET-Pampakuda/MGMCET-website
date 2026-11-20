import type { DepartmentDetail } from "@/types";

export const mechanicalPoly: DepartmentDetail = {
  id: "poly-mechanical",
  slug: "mechanical",
  level: "polytechnic",
  name: "Mechanical Engineering",
  shortName: "Mechanical",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-mechanical.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-mechanical.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Mechanical Engineering prepares students in machine shop operations, fitting, welding, thermal engineering, fluid machines, CAD drawing, and quality inspection.",
  programOutcomes: [],
  labs: [
    {
      name: "Mechanical Machine Shop",
      description: "Equipped with precision centre lathes, shaping machines, drilling machines, and bench fitting stations.",
    },
    {
      name: "Mechanical Foundry & Smithy",
      description: "Facilities for open hearth smithy forging, moulding sand preparation, and pattern making.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [],
  contact: { email: "mail@mgmcet.ac.in" },
};
