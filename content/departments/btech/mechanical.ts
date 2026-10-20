import type { DepartmentDetail } from "@/types";

export const mechanicalBtech: DepartmentDetail = {
  id: "btech-mechanical",
  slug: "mechanical",
  level: "btech",
  name: "Mechanical Engineering",
  shortName: "Mechanical",
  intake: 60,
  duration: "4 Years",
  image: "/images/departments/btech-mechanical.svg",
  thumbnail: "/images/departments/btech-mechanical-thumb.svg",
  href: "/departments/btech/mechanical",
  tagline: "Engineering the Machines That Move the World",
  overview:
    "The B.Tech in Mechanical Engineering at MGMCET provides a strong foundation in thermodynamics, fluid mechanics, manufacturing technology, machine design, and materials science. Students develop problem-solving and design capabilities through hands-on workshop training, industry visits, and project work aligned with KTU curriculum.",
  // TODO(content): replace with official vision from the department
  vision:
    "To produce competent mechanical engineers with analytical skills, innovative thinking, and commitment to sustainable development.",
  // TODO(content): replace with official mission from the department
  mission:
    "To provide quality mechanical engineering education through rigorous coursework, practical training, and industry engagement, fostering innovation and ethical practice.",
  programOutcomes: [
    // TODO(content): replace with official KTU Programme Outcomes
    { code: "PO1", description: "Engineering Knowledge: Apply mathematics and sciences to mechanical engineering problems." },
    { code: "PO2", description: "Problem Analysis: Identify and analyse complex mechanical engineering challenges." },
    { code: "PO3", description: "Design/Development: Design mechanical components and systems." },
    { code: "PO4", description: "Investigations: Conduct experiments and interpret engineering data." },
    { code: "PO5", description: "Modern Tool Usage: Use CAD/CAM, simulation, and manufacturing tools." },
    { code: "PO6", description: "Engineer and Society: Recognise societal impact of mechanical systems." },
    { code: "PO7", description: "Environment: Design for energy efficiency and minimal environmental impact." },
    { code: "PO8", description: "Ethics: Commit to professional ethics in engineering practice." },
    { code: "PO9", description: "Team Work: Work effectively in multidisciplinary engineering teams." },
    { code: "PO10", description: "Communication: Present engineering designs and reports professionally." },
    { code: "PO11", description: "Project Management: Manage mechanical projects within constraints." },
    { code: "PO12", description: "Life-long Learning: Adapt to evolving manufacturing and design technologies." },
  ],
  labs: [
    // TODO(content): replace with actual lab names
    { name: "Manufacturing Technology Lab", description: "Lathes, milling machines, welding equipment, and CNC trainers." },
    { name: "Fluid Mechanics Lab", description: "Pumps, turbines, and flow measurement apparatus." },
    { name: "Thermodynamics Lab", description: "Engines, heat exchangers, and calorimeters." },
    { name: "CAD/CAM Lab", description: "AutoCAD, SolidWorks, ANSYS, and CNC simulation software." },
    { name: "Material Testing Lab", description: "Universal testing machine, hardness testers, and metallographic equipment." },
  ],
  faculty: [
    // TODO(content): replace with actual HOD and faculty
    {
      id: "btech-mech-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    { label: "KTU B.Tech Mechanical Engineering Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [],
  placements: {
    description: "Mechanical graduates have been placed in manufacturing, automotive, and core engineering companies.", // TODO(content): add real data
    topRecruiters: [],
  },
  contact: {
    email: "mechanical@mgmcet.ac.in", // TODO(content): verify
  },
};
