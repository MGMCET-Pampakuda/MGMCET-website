import type { DepartmentDetail } from "@/types";

export const industrialInstrumentationMtech: DepartmentDetail = {
  id: "mtech-industrial-instrumentation-control",
  slug: "industrial-instrumentation-control",
  level: "mtech",
  name: "Industrial Instrumentation & Control",
  shortName: "Industrial Instrumentation",
  intake: 18,
  duration: "2 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/mtech-iic.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/mtech-iic.webp",
  href: "/departments/mtech",
  tagline: "Precision Engineering for Industry 4.0",
  overview:
    "Advance your career with an M.Tech in Industrial Instrumentation and Control. Master automation, process control, and smart sensor technology for modern industries. Affiliated with APJ Abdul Kalam Technological University (KTU), the programme delivers advanced training in industrial control loops, PLC/SCADA systems, distributed control architectures, and embedded automation.",
  vision:
    "To produce expert postgraduate engineers in industrial instrumentation and control systems capable of leading automation, research, and technological innovation.",
  mission:
    "To provide advanced education in instrumentation and process control through research-led teaching, practical simulation, and industry-partnered technical projects.",
  programOutcomes: [
    { code: "PO1", description: "Demonstrate in-depth knowledge of modern instrumentation, industrial sensors, and process control systems." },
    { code: "PO2", description: "Design and implement complex automated control loops using PLC, SCADA, and DCS architectures." },
    { code: "PO3", description: "Conduct research, write technical papers, and contribute to industrial automation problem solving." },
  ],
  labs: [
    {
      name: "Advanced Instrumentation & Process Control Lab",
      description: "Equipped with PLC programming modules, SCADA monitoring stations, sensor calibration benches, and closed-loop process simulators.",
    },
    {
      name: "MEL-R&D Centre (Marine Electricals)",
      description: "On-campus collaborative research facility established with Marine Electricals (India) Limited for automation and electrical systems.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University M.Tech Curriculum", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Collaborative live projects through on-campus MEL-R&D centre.",
  ],
  placements: {
    description: "Career avenues span process automation engineers, control systems specialists, DCS managers, and instrumentation consultants.",
    topRecruiters: ["Marine Electricals (India) Ltd", "Axianta MEP & QC", "Montgolfier Engineering", "Crysol Technologies", "SFO Technologies"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
