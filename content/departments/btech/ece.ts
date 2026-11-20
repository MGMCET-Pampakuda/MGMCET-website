import type { DepartmentDetail } from "@/types";

export const eceBtech: DepartmentDetail = {
  id: "btech-ece",
  slug: "ece",
  level: "btech",
  name: "Electronics & Communication Engineering",
  shortName: "ECE",
  intake: 60,
  duration: "4 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-ece.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-ece.webp",
  href: "/departments/btech/ece",
  tagline: "Pioneering Next-Generation Communications and Embedded Intelligence",
  overview:
    "The Electronics and Communication Engineering (ECE) Department was started at the inception of the College itself. The Department is backed by highly qualified, efficient and committed faculty members who are periodically deputed to attend national and international seminars and conferences. For effective student guidance and counselling, an advisory system is introduced which includes a dedicated Faculty Advisor system.",
  vision:
    "To mould socially committed Professionals who strive for excellence to meet the challenges of the modern Electronics and Communication industry.",
  mission:
    "To develop high-quality professionals to meet the growing challenges of the electronics industry; sharpen their problem-solving and innovative skills; and foster an environment of continuous learning and ethical engineering practice.",
  programOutcomes: [
    { code: "PEO1", description: "Analyse, plan, design and develop innovative electronic products." },
    { code: "PEO2", description: "Apply the knowledge acquired in Electronics and Communication Engineering to solve socially relevant problems and pursue higher education or research." },
    { code: "PEO3", description: "Indulge in continuous learning for career enhancement to adapt to changing professional scenarios." },
    { code: "PEO4", description: "Work effectively in multidisciplinary teams, using technical knowledge attained to achieve project objectives." },
    { code: "PEO5", description: "Understand professional responsibilities, engineering ethics, and environmental stewardship." },
    { code: "PEO6", description: "Communicate and demonstrate effectively and exhibit strong leadership skills." },
    { code: "PSO1", description: "Analyze and design analog & digital circuits and systems for given specifications and applications." },
    { code: "PSO2", description: "Design and implement hardware-software co-designs for embedded systems, signal processing and communication." },
    { code: "PSO3", description: "Familiarize modern design tools and simulation software to ease the implementation of real-time systems." },
    { code: "PSO4", description: "Exhibit ethics, teamwork and leadership in their profession and adapt to current trends with a zest for lifelong learning." },
  ],
  labs: [
    {
      name: "Electronic Circuits and IC Lab",
      description: "Equipped with cathode-ray oscilloscopes (CROs), dual power supplies, function generators, digital multimeters, voltmeters, ammeters, and analog and digital IC testers for comprehensive electronics circuit experimentation.",
    },
    {
      name: "Communication Engineering Lab",
      description: "Facilities to study modulation and demodulation techniques, RF transmitters, optical receivers, antennas, transmission lines, and spectrum analyzers.",
    },
    {
      name: "Microprocessor & Microcontroller Lab",
      description: "Equipped with 8085 and 8051 trainer kits, peripheral interfacing modules, Keil IDE, and Proteus simulation suites for embedded system design.",
    },
    {
      name: "Advanced Electronics & Systems Lab",
      description: "Advanced hardware and software experimentation including microcomputer systems, DSP processing platforms, and VLSI design and simulation tools.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University B.Tech ECE Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Comprehensive student advisory and mentorship framework.",
    "Student placements in leading telecom, embedded systems, and semiconductor firms.",
  ],
  placements: {
    description: "Graduates are recruited across embedded systems, VLSI design, telecom network engineering, and IoT hardware.",
    topRecruiters: ["VVDN Technologies", "Tessolve Semiconductors", "SFO Technologies", "NeST", "Cognizant", "TCS", "Infosys", "Wipro"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
