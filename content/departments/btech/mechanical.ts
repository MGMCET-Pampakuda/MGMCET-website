import type { DepartmentDetail } from "@/types";

export const mechanicalBtech: DepartmentDetail = {
  id: "btech-mechanical",
  slug: "mechanical",
  level: "btech",
  name: "Mechanical Engineering",
  shortName: "Mechanical",
  intake: 60,
  duration: "4 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-mechanical.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-mechanical.webp",
  href: "/departments/btech/mechanical",
  tagline: "Designing, Analyzing, and Manufacturing the Physical World",
  overview:
    "The Mechanical Engineering department stands as a strong pillar, right from the inception of MGM College of Engineering & Technology. With comprehensive workshop facilities and advanced thermal, fluid mechanics, CAD, and manufacturing laboratories, the department trains students to design, analyse, and build high-performance machinery, thermal power systems, and automotive systems.",
  vision:
    "To be a distinguished center of learning and innovation in Mechanical Engineering, producing globally competent professionals with strong ethical values.",
  mission:
    "Impart robust foundational knowledge in mechanical systems and manufacturing; provide intensive hands-on training on industrial equipment and modern design software; and foster socially responsible engineers capable of meeting industrial and sustainability challenges.",
  programOutcomes: [
    { code: "PO1", description: "Apply knowledge of mathematics, science, and engineering fundamentals to mechanical systems." },
    { code: "PO2", description: "Identify, formulate, and analyze complex mechanical and thermal engineering problems." },
    { code: "PO3", description: "Design machine components, thermal systems, and manufacturing processes meeting safety and environmental standards." },
    { code: "PO4", description: "Conduct investigations of fluid, thermal, and material properties through experimental testing." },
    { code: "PO5", description: "Apply modern CAD/CAM, CFD, and FEA simulation software tools in design and production." },
    { code: "PO6", description: "Assess societal, health, safety, and legal responsibilities in engineering practice." },
    { code: "PO7", description: "Understand the impact of mechanical solutions on sustainability and energy conservation." },
    { code: "PO8", description: "Apply professional ethics, integrity, and safety norms." },
    { code: "PO9", description: "Function effectively as an individual and in multidisciplinary teams." },
    { code: "PO10", description: "Communicate mechanical designs and technical reports effectively." },
    { code: "PO11", description: "Demonstrate engineering management and project budgeting principles." },
    { code: "PO12", description: "Recognize the need for and engage in lifelong professional learning." },
  ],
  labs: [
    {
      name: "Computer-Aided Design and Analysis Lab (MEL 201 & MEL 332)",
      description: "Trains students in solid modelling, surface modelling, assembly modelling, and mechanism design. Equipped with CAD/CAM software, finite element analysis packages, and high-performance networked workstations.",
    },
    {
      name: "Fluid Mechanics & Hydraulic Machines Lab (MEL 202)",
      description: "Equipped with Pelton, Francis, and Kaplan turbines, Bernoulli's apparatus, Venturimeter, Orificemeter, Reciprocating, Centrifugal, Self-priming, and Gear pumps, and Hydraulic Ram for comprehensive fluid dynamics testing.",
    },
    {
      name: "Thermal Engineering Lab (MEL 333)",
      description: "Features a Steam Power Plant, 4-stroke 4-cylinder Petrol Engine Test Rig with Hydraulic dynamometer, Single Cylinder Diesel Test Rig with Rope brake dynamometer, Single Cylinder Diesel Test Rig with electrical dynamometer, and Twin-cylinder 4-stroke Diesel Engine.",
    },
    {
      name: "Mechanical Systems & Heat Transfer Lab (MEL 334)",
      description: "Equipped with Motorized Gyroscope, Universal Governor, Whirling of Shaft, Universal Vibration Apparatus, Thermal Conductivity apparatus, Composite Wall apparatus, Forced convection, AC Unit, Refrigeration Test Rig, and Air Compressor.",
    },
    {
      name: "Mechanical Engineering Workshop (ESL 120)",
      description: "Equipped with CNC Trainer Lathe, 18 precision lathes, 9 shaping machines, 9 slotting machines, universal milling, vertical drilling, smithy, foundry, carpentry, fitting, and welding sections.",
    },
    {
      name: "Manufacturing Technology Lab 2",
      description: "Equipped with Profile Projector, Tool Maker's Microscope, Thermocouple Calibration Apparatus, Strain Gauge, Surface Roughness Tester, and Autocollimator for advanced metrology and precision measurements.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University B.Tech Mechanical Engineering Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Prof. Shajahan C.M (Dept. of Mechanical Engineering) awarded Indira Gandhi National Award for Best NSS Programme Officer.",
    "Comprehensive on-campus industrial training programs and automotive technical exhibitions.",
  ],
  placements: {
    description: "Placements across heavy manufacturing, automotive fabrication, construction, and MEP engineering.",
    topRecruiters: ["MRF", "Cherian Varkey Constructions (CVC)", "Aarbee Structures", "Armstech Engineers", "Mary Matha Constructions", "Luxon TATA"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
