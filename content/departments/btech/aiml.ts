import type { DepartmentDetail } from "@/types";

export const aimlBtech: DepartmentDetail = {
  id: "btech-aiml",
  slug: "aiml",
  level: "btech",
  name: "Artificial Intelligence & Machine Learning",
  shortName: "AI & ML",
  intake: 60,
  duration: "4 Years",
  image: "/images/departments/btech-aiml.svg",
  thumbnail: "/images/departments/btech-aiml-thumb.svg",
  href: "/departments/btech/aiml",
  tagline: "Building Intelligent Systems for Tomorrow",
  overview:
    "The B.Tech in Artificial Intelligence & Machine Learning programme equips students with strong foundations in AI algorithms, deep learning, data science, computer vision, and natural language processing. Students gain hands-on exposure through well-equipped labs, industry collaborations, and real-world project work aligned with the KTU curriculum.",
  // TODO(content): replace with official vision statement from the department
  vision:
    "To emerge as a center of excellence in Artificial Intelligence and Machine Learning education and research, producing globally competent graduates.",
  // TODO(content): replace with official mission from the department
  mission:
    "To provide quality education in AI and ML through innovative teaching, industry collaboration, and ethical technology practices.",
  programOutcomes: [
    // TODO(content): replace with official KTU Programme Outcomes for this department
    { code: "PO1", description: "Engineering Knowledge: Apply knowledge of mathematics, science, and engineering." },
    { code: "PO2", description: "Problem Analysis: Identify, formulate, and analyse complex engineering problems." },
    { code: "PO3", description: "Design/Development of Solutions: Design solutions for complex problems." },
    { code: "PO4", description: "Conduct Investigations of Complex Problems: Use research-based knowledge and methods." },
    { code: "PO5", description: "Modern Tool Usage: Create, select, and apply appropriate techniques and tools." },
    { code: "PO6", description: "The Engineer and Society: Apply reasoning informed by contextual knowledge." },
    { code: "PO7", description: "Environment and Sustainability: Understand the impact of engineering solutions." },
    { code: "PO8", description: "Ethics: Apply ethical principles and commit to professional ethics." },
    { code: "PO9", description: "Individual and Team Work: Function effectively in diverse teams." },
    { code: "PO10", description: "Communication: Communicate effectively with engineering community and society." },
    { code: "PO11", description: "Project Management and Finance: Demonstrate knowledge and understanding of engineering management." },
    { code: "PO12", description: "Life-long Learning: Recognize the need for and engage in lifelong learning." },
  ],
  labs: [
    // TODO(content): replace with actual lab names and descriptions from the department
    { name: "AI & Deep Learning Lab", description: "Equipped with high-performance GPU systems for deep learning experiments." },
    { name: "Data Science Lab", description: "Workstations with Python, R, and analytics tools for data science projects." },
    { name: "Computer Vision Lab", description: "Cameras and processing units for image and video analysis." },
  ],
  faculty: [
    // TODO(content): replace with actual HOD and faculty names, qualifications, and images
    {
      id: "btech-aiml-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D (Pursuing)", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    // TODO(content): add real KTU syllabus PDF links for each semester
    { label: "KTU B.Tech AI&ML Syllabus (Scheme 2019)", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    // TODO(content): add real achievements, paper presentations, hackathon wins
  ],
  placements: {
    description: "Students from AI&ML have been placed in leading technology companies.", // TODO(content): add real placement data
    topRecruiters: [], // TODO(content): add real recruiters
  },
  contact: {
    // TODO(content): add real HOD email and phone for this department
    email: "aiml@mgmcet.ac.in",
  },
};
