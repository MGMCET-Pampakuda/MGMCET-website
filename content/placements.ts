import type { PlacementsContent } from "@/types";

/**
 * Training & Placement Cell content.
 * Real verified data from https://www.mgmcet.ac.in/training-and-placement-cell
 */
export const placements: PlacementsContent = {
  headline: "Training & Placement Cell (TPC)",
  description:
    "Headed by Senior Faculty with Industrial Recruitment Experience, a dedicated Training and Placement Cell (TPC) is operational on campus. Apart from seminars, guest lectures, and career conferences, special training sessions are conducted in Communication Skills, Presentation Skills, Physical Grooming, and Corporate Dress Codes. TPC conducts Mock Interviews and Aptitude Tests with external training agencies like NOSCE Techno Solutions and T-Horizon that help students meet the expectations of Multinational Companies.",
  stats: [
    { value: "96%", label: "Placement Rate (2023)", iconName: "TrendingUp" },
    { value: "40+", label: "Industry Recruiting Partners", iconName: "Building2" },
    { value: "5+", label: "CSR Skilling Initiatives", iconName: "Award" },
    { value: "2021–25", label: "Recorded Placement Years", iconName: "Users" },
  ],
  recruiters: [
    { name: "Tata", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-03.webp", logoAlt: "Tata Logo" },
    { name: "Toyota", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-04.webp", logoAlt: "Toyota Logo" },
    { name: "Wipro", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-05.webp", logoAlt: "Wipro Logo" },
    { name: "Speridian Technologies", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-09.webp", logoAlt: "Speridian Technologies Logo" },
    { name: "Tessolve", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-06.webp", logoAlt: "Tessolve Logo" },
    { name: "OEN India Ltd", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-01.webp", logoAlt: "OEN India Ltd Logo" },
    { name: "Cognizant", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-02.webp", logoAlt: "Cognizant Logo" },
    { name: "Zerone Consulting", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-08.webp", logoAlt: "Zerone Consulting Logo" },
    { name: "Mphasis", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/recruiter-10.webp", logoAlt: "Mphasis Logo" },
    { name: "Eben Telecom", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/eben-telecom.webp", logoAlt: "Eben Telecom Logo" },
    { name: "Malayala Manorama", logo: "https://ik.imagekit.io/miwqceyia/mgmcet/images/general/malayala-manorama.webp", logoAlt: "Malayala Manorama Logo" },
  ],
  process: [
    {
      step: 1,
      title: "Foundation & Skill Development",
      description: "Comprehensive training in communication skills, presentation, grooming, and corporate readiness.",
      iconName: "BookOpen",
    },
    {
      step: 2,
      title: "CSR Skilling Programs",
      description: "Students participate in Infosys Springboard, TCS YEP, IBM Build Skills, Pentagon CSR, and Mahindra Naandi Pride Classrooms.",
      iconName: "UserPlus",
    },
    {
      step: 3,
      title: "External Aptitude & Mock Interviews",
      description: "Intensive training with external assessment agencies including NOSCE Techno Solutions and T-Horizon.",
      iconName: "MessageSquare",
    },
    {
      step: 4,
      title: "Campus Recruitment Drives",
      description: "On-campus, pool-campus, and virtual hiring drives conducted by top MNCs and core engineering recruiters.",
      iconName: "Building2",
    },
    {
      step: 5,
      title: "Career Placement & Onboarding",
      description: "Students receive formal offer letters and join industry leaders upon completing their academic programs.",
      iconName: "FileCheck",
    },
  ],
  pastDrives: [
    { company: "Comstream Technologies", year: "2025", description: "Campus placement drive for engineering graduates." },
    { company: "Luxon TATA", year: "2025", description: "On-campus placement recruitment drive." },
    { company: "OEN", year: "2025", description: "Placement drive for core engineering disciplines." },
    { company: "SFO Technologies & NeST", year: "2025", description: "Combined electronics and technology campus recruitment drive." },
    { company: "MRF", year: "2025", description: "Core mechanical and production campus hiring drive." },
  ],
  teamContact: {
    email: "mail@mgmcet.ac.in",
    phone: "9946485111, 7902995111",
  },
};
