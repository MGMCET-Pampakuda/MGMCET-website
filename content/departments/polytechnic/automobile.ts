import type { DepartmentDetail } from "@/types";

export const automobilePoly: DepartmentDetail = {
  id: "poly-automobile",
  slug: "automobile",
  level: "polytechnic",
  name: "Automobile Engineering",
  shortName: "Automobile",
  intake: 60,
  duration: "3 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-automobile.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/polytechnic-automobile.webp",
  href: "/departments/polytechnic",
  overview:
    "The 3-Year Diploma in Automobile Engineering provides comprehensive hands-on skills in internal combustion engines, chassis design, transmission systems, automotive electrical systems, diagnostics, and modern vehicle maintenance practices.",
  programOutcomes: [],
  labs: [
    {
      name: "Automobile Engineering Lab & Workshop",
      description: "Equipped with engine testing benches, vehicle dismantling & reassembly stations, chassis components, and diagnostic scanners.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "State Board of Technical Education (SBTET) Diploma Curriculum", href: "https://www.dtekerala.gov.in/", isPdf: false },
  ],
  achievements: [
    "Industrial training collaboration and on-campus commercial vehicle demonstrations with Autobahn BharatBenz.",
  ],
  contact: { email: "mail@mgmcet.ac.in" },
};
