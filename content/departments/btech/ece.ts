import type { DepartmentDetail } from "@/types";

export const eceBtech: DepartmentDetail = {
  id: "btech-ece",
  slug: "ece",
  level: "btech",
  name: "Electronics & Communication Engineering",
  shortName: "ECE",
  intake: 60,
  duration: "4 Years",
  image: "/images/departments/btech-ece.svg",
  thumbnail: "/images/departments/btech-ece-thumb.svg",
  href: "/departments/btech/ece",
  tagline: "Connecting the World Through Technology",
  overview:
    "The B.Tech in Electronics & Communication Engineering at MGMCET covers the complete spectrum of electronics — from analog circuits and digital systems to embedded systems, VLSI design, signal processing, and wireless communications. The programme is KTU-affiliated and provides strong fundamentals alongside modern technology exposure.",
  // TODO(content): replace with official vision from the department
  vision:
    "To be a center of excellence producing innovative electronics and communication engineers equipped for global industry and research.",
  // TODO(content): replace with official mission from the department
  mission:
    "To provide world-class education in electronics and communication engineering through quality teaching, modern labs, and industry partnerships.",
  programOutcomes: [
    // TODO(content): replace with official KTU Programme Outcomes
    { code: "PO1", description: "Engineering Knowledge: Apply mathematical and scientific fundamentals to ECE problems." },
    { code: "PO2", description: "Problem Analysis: Analyse electronic systems and signal processing challenges." },
    { code: "PO3", description: "Design/Development: Design analog, digital, and communication systems." },
    { code: "PO4", description: "Conduct Investigations: Use instruments and simulation tools to investigate ECE problems." },
    { code: "PO5", description: "Modern Tool Usage: Use simulation tools like MATLAB, SPICE, and EDA software." },
    { code: "PO6", description: "Engineer and Society: Understand the role of ECE in society and critical infrastructure." },
    { code: "PO7", description: "Environment: Design energy-efficient electronic systems." },
    { code: "PO8", description: "Ethics: Apply ethical practices in hardware design and spectrum usage." },
    { code: "PO9", description: "Team Work: Collaborate on complex electronic system projects." },
    { code: "PO10", description: "Communication: Present circuit designs and results clearly." },
    { code: "PO11", description: "Project Management: Plan and deliver embedded and electronics projects." },
    { code: "PO12", description: "Life-long Learning: Keep pace with advances in electronics, RF, and wireless technology." },
  ],
  labs: [
    // TODO(content): replace with actual lab names
    { name: "Electronics Lab", description: "Analog and digital circuits workbench with oscilloscopes and signal generators." },
    { name: "Communication Lab", description: "RF trainers, spectrum analyzers, and DSP kits." },
    { name: "Embedded Systems Lab", description: "Microcontrollers, Raspberry Pi, Arduino, and IoT development boards." },
    { name: "VLSI Lab", description: "EDA tools for VHDL/Verilog simulation and synthesis." },
  ],
  faculty: [
    // TODO(content): replace with actual HOD and faculty
    {
      id: "btech-ece-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    { label: "KTU B.Tech ECE Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [],
  placements: {
    description: "ECE graduates have been placed in electronics, telecom, and embedded systems companies.", // TODO(content): add real data
    topRecruiters: [],
  },
  contact: {
    email: "ece@mgmcet.ac.in", // TODO(content): verify
  },
};
