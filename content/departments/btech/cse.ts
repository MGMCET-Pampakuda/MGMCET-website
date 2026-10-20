import type { DepartmentDetail } from "@/types";

export const cseBtech: DepartmentDetail = {
  id: "btech-cse",
  slug: "cse",
  level: "btech",
  name: "Computer Science & Engineering",
  shortName: "CSE",
  intake: 60,
  duration: "4 Years",
  image: "/images/departments/btech-cse.svg",
  thumbnail: "/images/departments/btech-cse-thumb.svg",
  href: "/departments/btech/cse",
  tagline: "Shaping the Architects of Tomorrow's Digital World",
  overview:
    "The B.Tech in Computer Science & Engineering is one of the flagship programmes at MGMCET. The curriculum is aligned with KTU and covers core computing disciplines including programming, data structures, algorithms, operating systems, databases, web technologies, and software engineering — complemented by modern electives in cloud, DevOps, and full-stack development.",
  // TODO(content): replace with official vision from the department
  vision:
    "To build globally competent computer science engineers capable of addressing complex challenges with innovation and integrity.",
  // TODO(content): replace with official mission from the department
  mission:
    "To provide comprehensive computer science education through quality teaching, hands-on labs, and industry-focused projects that prepare students for diverse career paths.",
  programOutcomes: [
    // TODO(content): replace with official KTU Programme Outcomes
    { code: "PO1", description: "Engineering Knowledge: Apply foundational knowledge in mathematics and computing." },
    { code: "PO2", description: "Problem Analysis: Analyse and formulate computational solutions to complex problems." },
    { code: "PO3", description: "Design/Development: Design software systems and algorithms meeting specified requirements." },
    { code: "PO4", description: "Conduct Investigations: Apply research to solve computing challenges." },
    { code: "PO5", description: "Modern Tool Usage: Use modern IDEs, frameworks, and development tools." },
    { code: "PO6", description: "Engineer and Society: Appreciate societal impact of computing and software systems." },
    { code: "PO7", description: "Environment: Consider sustainability in software and system design." },
    { code: "PO8", description: "Ethics: Uphold professional ethics and intellectual property norms." },
    { code: "PO9", description: "Team Work: Function effectively in cross-functional software teams." },
    { code: "PO10", description: "Communication: Present technical ideas clearly to diverse audiences." },
    { code: "PO11", description: "Project Management: Plan, execute, and deliver software projects on time." },
    { code: "PO12", description: "Life-long Learning: Continuously update skills in a rapidly evolving field." },
  ],
  labs: [
    // TODO(content): replace with actual lab names from department
    { name: "Programming Lab", description: "Systems loaded with GCC, Java, Python, and modern IDEs." },
    { name: "Database Lab", description: "Oracle, MySQL, and MongoDB environments for database coursework." },
    { name: "Networking & OS Lab", description: "Linux servers, network simulators, and virtual machines." },
    { name: "Project Development Lab", description: "Dedicated space for final-year and mini-projects." },
  ],
  faculty: [
    // TODO(content): replace with actual HOD and faculty details
    {
      id: "btech-cse-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    { label: "KTU B.Tech CSE Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [],
  placements: {
    description: "CSE graduates have been placed across top IT, product, and service companies.", // TODO(content): add real placement data and stats
    topRecruiters: [],
  },
  contact: {
    email: "cse@mgmcet.ac.in", // TODO(content): verify
  },
};
