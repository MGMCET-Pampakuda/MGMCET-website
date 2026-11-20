import type { DepartmentDetail } from "@/types";

export const csePoly: DepartmentDetail = {
  id: "poly-cse",
  slug: "cse",
  level: "polytechnic",
  name: "Computer Science & Engineering",
  shortName: "CSE",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-cse.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-cse.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Computer Science & Engineering imparts practical foundations in computer programming, database administration, web development, computer networking, hardware troubleshooting, and operating systems.",
  programOutcomes: [],
  labs: [
    {
      name: "Computer Hardware & Network Lab",
      description: "Equipped with PC assembly stations, networking switches, routers, and diagnostic toolkits.",
    },
    {
      name: "Software Application Lab",
      description: "Workstations running C++, Java, Python, and open-source database management systems.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [],
  contact: { email: "mail@mgmcet.ac.in" },
};
