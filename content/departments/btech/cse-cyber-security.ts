import type { DepartmentDetail } from "@/types";

export const cseCyberBtech: DepartmentDetail = {
  id: "btech-cse-cyber-security",
  slug: "cse-cyber-security",
  level: "btech",
  name: "Computer Science & Engineering (Cyber Security)",
  shortName: "CSE (Cyber Security)",
  intake: 60,
  duration: "4 Years",
  image: "/images/departments/btech-cse-cyber.svg",
  thumbnail: "/images/departments/btech-cse-cyber-thumb.svg",
  href: "/departments/btech/cse-cyber-security",
  tagline: "Defending the Digital World",
  overview:
    "The B.Tech in Computer Science & Engineering (Cyber Security) programme focuses on equipping students with the knowledge and skills to protect digital infrastructure. The curriculum covers network security, ethical hacking, cryptography, digital forensics, and secure software development, aligned with KTU norms.",
  // TODO(content): replace with official vision from the department
  vision:
    "To be a leading centre for cyber security education and research, producing ethical and competent security professionals.",
  // TODO(content): replace with official mission from the department
  mission:
    "To impart quality education in cyber security through a blend of theoretical foundation and practical skills, preparing students for industry and research.",
  programOutcomes: [
    // TODO(content): replace with official KTU Programme Outcomes
    { code: "PO1", description: "Engineering Knowledge: Apply mathematics, science, and engineering fundamentals." },
    { code: "PO2", description: "Problem Analysis: Formulate and analyse complex security problems." },
    { code: "PO3", description: "Design/Development of Solutions: Design secure systems and solutions." },
    { code: "PO4", description: "Conduct Investigations: Apply research-based methods to security challenges." },
    { code: "PO5", description: "Modern Tool Usage: Use appropriate security tools and frameworks." },
    { code: "PO6", description: "Engineer and Society: Understand societal and legal aspects of cyber security." },
    { code: "PO7", description: "Environment and Sustainability: Evaluate sustainability of digital solutions." },
    { code: "PO8", description: "Ethics: Commit to ethical hacking and responsible disclosure principles." },
    { code: "PO9", description: "Individual and Team Work: Collaborate effectively in security teams." },
    { code: "PO10", description: "Communication: Present technical security findings clearly." },
    { code: "PO11", description: "Project Management: Manage security projects effectively." },
    { code: "PO12", description: "Life-long Learning: Stay current in the evolving cyber security landscape." },
  ],
  labs: [
    // TODO(content): replace with actual lab names
    { name: "Cyber Security Lab", description: "Dedicated lab for ethical hacking, network security, and penetration testing." },
    { name: "Digital Forensics Lab", description: "Equipped for investigation and analysis of digital evidence." },
    { name: "Networking Lab", description: "Cisco and Linux-based networking environment." },
  ],
  faculty: [
    // TODO(content): replace with actual HOD and faculty
    {
      id: "btech-cse-cyber-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    { label: "KTU B.Tech CSE (Cyber Security) Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [],
  placements: {
    description: "Students have been recruited by leading IT and security firms.", // TODO(content): add real data
    topRecruiters: [],
  },
  contact: {
    email: "cse-cyber@mgmcet.ac.in", // TODO(content): verify
  },
};
