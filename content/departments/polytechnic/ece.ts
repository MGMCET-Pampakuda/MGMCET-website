import type { DepartmentDetail } from "@/types";

export const ecePoly: DepartmentDetail = {
  id: "poly-ece",
  slug: "ece",
  level: "polytechnic",
  name: "Electronics & Communication Engineering",
  shortName: "ECE",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-ece.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-ece.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Electronics & Communication Engineering equips students with hands-on skills in analog and digital electronic circuits, communication systems, microcontroller programming, PCB fabrication, and consumer electronics repair.",
  programOutcomes: [],
  labs: [
    {
      name: "Electronics Circuits & Communication Lab",
      description: "Equipped with dual power supplies, function generators, oscilloscopes, and communication trainer modules.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [],
  contact: { email: "mail@mgmcet.ac.in" },
};
