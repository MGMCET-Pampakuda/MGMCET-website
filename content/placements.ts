import type { PlacementsContent } from "@/types";

/**
 * Training & Placement Cell content.
 * TODO(content): replace all placeholder stats, recruiters, and team contact with real data.
 * IMPORTANT: Do NOT present placeholder numbers as fact.
 */
export const placements: PlacementsContent = {
  headline: "Training & Placement Cell",
  description:
    "The Training and Placement Cell at MGMCET bridges the gap between academia and industry through skill development programmes, internships, and campus recruitment drives.",
  stats: [
    // TODO(content): replace with real verified placement statistics
    { value: "N/A", label: "Students Placed", iconName: "Users" },
    { value: "N/A", label: "Companies Visited", iconName: "Building2" },
    { value: "N/A", label: "Highest Package", iconName: "TrendingUp" },
    { value: "N/A", label: "Core Companies", iconName: "Award" },
  ],
  recruiters: [
    // TODO(content): add real recruiter companies with their logos
    { name: "TCS", logo: "/images/recruiters/tcs.svg", logoAlt: "Tata Consultancy Services" },
    { name: "Infosys", logo: "/images/recruiters/infosys.svg", logoAlt: "Infosys" },
    { name: "Wipro", logo: "/images/recruiters/wipro.svg", logoAlt: "Wipro" },
    // TODO(content): add all real recruiters who have visited campus
  ],
  process: [
    { step: 1, title: "Registration", description: "Students register with the T&P Cell and submit their resumes.", iconName: "UserPlus" },
    { step: 2, title: "Training & Skill Development", description: "Aptitude, communication, and domain-specific training sessions.", iconName: "BookOpen" },
    { step: 3, title: "Mock Interviews", description: "Practice interviews with industry mentors to build confidence.", iconName: "MessageSquare" },
    { step: 4, title: "Campus Recruitment", description: "Companies conduct written tests, group discussions, and interviews on campus.", iconName: "Building2" },
    { step: 5, title: "Offer Letters", description: "Selected students receive offer letters from recruiting companies.", iconName: "FileCheck" },
  ],
  pastDrives: [
    // TODO(content): add real past placement drive data
    { company: "TCS", year: "2025", description: "Campus recruitment drive." }, // TODO(content): add actual students placed and package
  ],
  teamContact: {
    // TODO(content): add real T&P Cell coordinator details
    email: "placement@mgmcet.ac.in",
    phone: "9946485111",
  },
};
