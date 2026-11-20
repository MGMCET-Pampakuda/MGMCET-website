import type { DepartmentDetail } from "@/types";

export const eeePoly: DepartmentDetail = {
  id: "poly-eee",
  slug: "eee",
  level: "polytechnic",
  name: "Electrical & Electronics Engineering",
  shortName: "EEE",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-eee.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-eee.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Electrical & Electronics Engineering focuses on electrical machines, power distribution, domestic and industrial wiring, switchgear, control panels, and basic electronic controllers.",
  programOutcomes: [],
  labs: [
    {
      name: "Electrical Machines Lab",
      description: "Equipped with AC and DC motors, generators, transformers, and electrical test benches.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [],
  contact: { email: "mail@mgmcet.ac.in" },
};
