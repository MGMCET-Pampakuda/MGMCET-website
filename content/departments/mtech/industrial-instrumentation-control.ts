import type { DepartmentDetail } from "@/types";

export const industrialInstrumentationMtech: DepartmentDetail = {
  id: "mtech-industrial-instrumentation-control",
  slug: "industrial-instrumentation-control",
  level: "mtech",
  name: "Industrial Instrumentation & Control",
  shortName: "Industrial Instrumentation",
  intake: 18,
  duration: "2 Years",
  image: "/images/departments/mtech-iic.svg",
  thumbnail: "/images/departments/mtech-iic-thumb.svg",
  href: "/departments/mtech/industrial-instrumentation-control",
  tagline: "Precision Engineering for Industry 4.0",
  overview:
    "The M.Tech in Industrial Instrumentation & Control prepares postgraduate engineers for advanced roles in process control, sensor technology, PLC/SCADA systems, and industrial automation. The programme is KTU-affiliated and integrates strong theoretical knowledge with hands-on lab work.",
  // TODO(content): replace with official vision from the department
  vision:
    "To produce expert engineers in industrial instrumentation and control systems capable of leading automation and Industry 4.0 initiatives.",
  // TODO(content): replace with official mission from the department
  mission:
    "To provide advanced education in instrumentation and control through research-led teaching and industry collaboration.",
  programOutcomes: [
    // TODO(content): add official POs for this M.Tech programme
  ],
  labs: [
    { name: "Instrumentation & Control Lab", description: "PLC, SCADA, DCS, and sensor calibration equipment." },
    // TODO(content): add more lab details
  ],
  faculty: [
    {
      id: "mtech-iic-hod",
      name: "HOD Name", // TODO(content): replace with real name
      designation: "Associate Professor & Head of Department",
      qualification: "M.Tech, Ph.D", // TODO(content): verify
      isHOD: true,
      image: "/images/faculty/placeholder-avatar.svg",
    },
  ],
  curriculumLinks: [
    { label: "KTU M.Tech Industrial Instrumentation Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [],
  placements: {
    description: "", // TODO(content): add real placement data
  },
  contact: {
    email: "instrumentation@mgmcet.ac.in", // TODO(content): verify
  },
};
