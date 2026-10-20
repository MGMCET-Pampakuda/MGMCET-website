import type { DepartmentDetail } from "@/types";

export const structuralEngineeringMtech: DepartmentDetail = {
  id: "mtech-structural-engineering-construction-management",
  slug: "structural-engineering-construction-management",
  level: "mtech",
  name: "Structural Engineering & Construction Management",
  shortName: "Structural Engineering",
  intake: 18,
  duration: "2 Years",
  image: "/images/departments/mtech-secm.svg",
  thumbnail: "/images/departments/mtech-secm-thumb.svg",
  href: "/departments/mtech/structural-engineering-construction-management",
  tagline: "Building Safe, Sustainable Structures",
  overview:
    "The M.Tech in Structural Engineering & Construction Management provides advanced expertise in structural analysis, design, project management, and construction technology. Graduates are equipped to take on leadership roles in civil infrastructure projects.",
  // TODO(content): replace with official vision from the department
  vision:
    "To develop expert structural engineers and construction managers who drive infrastructure excellence through innovation.",
  // TODO(content): replace with official mission from the department
  mission:
    "To provide advanced structural engineering education with emphasis on safe design, sustainable construction, and effective project management.",
  programOutcomes: [
    // TODO(content): add official POs for this M.Tech programme
  ],
  labs: [
    { name: "Structural Analysis Lab", description: "Software tools for FEM analysis including STAAD.Pro and ETABS." },
    { name: "Construction Materials Lab", description: "Testing equipment for concrete, steel, and other construction materials." },
    // TODO(content): add more lab details
  ],
  faculty: [
    {
      id: "mtech-secm-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    { label: "KTU M.Tech Structural Engineering Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [],
  placements: {
    description: "", // TODO(content): add real placement data
  },
  contact: {
    email: "structural@mgmcet.ac.in", // TODO(content): verify
  },
};
