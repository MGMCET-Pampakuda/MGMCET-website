import type { DepartmentDetail } from "@/types";

export const electricalEvPoly: DepartmentDetail = {
  id: "poly-electrical-ev",
  slug: "electrical-ev",
  level: "polytechnic",
  name: "Electrical Engineering and Electric Vehicle Technology",
  shortName: "EE & EV",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-ev.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-ev.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Electrical Engineering and Electric Vehicle Technology combines electrical engineering principles with specialized modern instruction in battery management systems (BMS), electric vehicle motors, charging infrastructure, power electronics, and regenerative braking.",
  programOutcomes: [],
  labs: [
    {
      name: "Electric Vehicle & Power Systems Lab",
      description: "Equipped with EV motor test benches, battery pack diagnostics, power electronic converters, and EV simulation kits.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [],
  contact: { email: "mail@mgmcet.ac.in" },
};
