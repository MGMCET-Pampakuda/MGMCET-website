import type { DepartmentDetail } from "@/types";

export const structuralEngineeringMtech: DepartmentDetail = {
  id: "mtech-structural-engineering-construction-management",
  slug: "structural-engineering-construction-management",
  level: "mtech",
  name: "Structural Engineering & Construction Management",
  shortName: "Structural Engineering",
  intake: 18,
  duration: "2 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/mtech-se-cm.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/mtech-se-cm.webp",
  href: "/departments/mtech",
  tagline: "Mastering Structural Design and Modern Project Leadership",
  overview:
    "Master the dual expertise of advanced structural analysis and construction site leadership. Affiliated with APJ Abdul Kalam Technological University (KTU), our M.Tech program covers earthquake-resistant design, sustainable materials, structural health monitoring, BIM workflows, and modern infrastructure project management.",
  vision:
    "To develop expert structural engineers and construction managers who drive infrastructure excellence, safe structural design, and sustainable construction practices.",
  mission:
    "To provide advanced structural engineering education with emphasis on resilient design, modern construction technology, digital project management tools, and ethical engineering governance.",
  programOutcomes: [
    { code: "PO1", description: "Apply advanced knowledge of structural mechanics, finite element modelling, and structural dynamics to complex civil structures." },
    { code: "PO2", description: "Design earthquake-resistant and wind-resistant buildings, bridges, and foundation systems adhering to national and international codes." },
    { code: "PO3", description: "Implement modern construction management techniques, project scheduling, cost control, and quality assurance frameworks." },
  ],
  labs: [
    {
      name: "Computational Structural Design Lab",
      description: "Equipped with industry-standard analysis software including STAAD.Pro, ETABS, and Tekla for 3D structural modelling and analysis.",
    },
    {
      name: "Advanced Construction Materials & Testing Lab",
      description: "Testing facilities for high-strength concrete, rebar evaluation, non-destructive testing (NDT), and aggregate characterization.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University M.Tech Curriculum", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Technical workshops on Tekla software and modern construction project methodologies.",
  ],
  placements: {
    description: "Graduates take on roles as structural consultants, senior design engineers, project managers, and quality control leads.",
    topRecruiters: ["Cherian Varkey Constructions (CVC)", "Aarbee Structures", "Armstech Engineers", "Mary Matha Constructions", "Axianta MEP & QC"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
