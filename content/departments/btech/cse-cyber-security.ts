import type { DepartmentDetail } from "@/types";

export const cseCyberSecurityBtech: DepartmentDetail = {
  id: "btech-cse-cyber-security",
  slug: "cse-cyber-security",
  level: "btech",
  name: "Computer Science & Engineering (Cyber Security)",
  shortName: "CSE (Cyber Security)",
  intake: 60,
  duration: "4 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-cyber-security.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-cyber-security.webp",
  href: "/departments/btech/cse-cyber-security",
  tagline: "Securing Digital Frontiers and Critical Information Infrastructure",
  overview:
    "The Department of Computer Science & Engineering offers this specialized B.Tech program in Cybersecurity to address the critical global demand for information security professionals. Students are provided with the optimal learning environment to master network defense, cryptography, secure coding, digital forensics, ethical hacking, and risk management.",
  vision:
    "To emerge as a premier center of excellence in cybersecurity education and threat research, developing trusted professionals who safeguard national and global digital assets.",
  mission:
    "Deliver cutting-edge education in cybersecurity and computer systems; nurture proactive problem-solving and ethical mindsets in threat intelligence; and produce graduates with high technical competence and social responsibility.",
  programOutcomes: [
    { code: "PEO1", description: "Graduates will be able to apply their cybersecurity knowledge for the betterment and security of society." },
    { code: "PEO2", description: "Graduates will demonstrate the capability to identify vulnerabilities and security problems in areas relevant to cybersecurity and computer science, formulating robust defense mechanisms." },
    { code: "PEO3", description: "Graduates will address technological challenges in advance by applying their analytical and cryptographic capabilities." },
    { code: "PEO4", description: "Graduates will face global competition in Information Security and Information Technology, achieving high-impact placements in reputed organizations." },
  ],
  labs: [
    {
      name: "Network Security & Cyber Defense Lab",
      description:
        "Equipped with modern high-performance desktop systems powered by Intel Core i5 processors and 8 GB RAM, connected to Gigabit LAN with uninterrupted high-bandwidth internet connectivity and centralized UPS backup. Configured with dual-boot Linux and Windows environments running network packet analyzers, Wireshark, firewall testing tools, and threat simulation suites.",
    },
    {
      name: "Programming & Secure Software Development Lab",
      description:
        "Modern computer laboratory featuring Intel Core i5 workstations with 8 GB RAM and SSD storage. Provides dual-boot Ubuntu Linux and Windows environments pre-loaded with GCC/G++, Python, Java Development Kit, secure coding frameworks, and debugging environments.",
    },
    {
      name: "Database Security & Cryptography Lab",
      description:
        "Specialized laboratory featuring Intel Core i5 systems with 8 GB RAM on high-speed local networking. Loaded with database management engines, cryptographic algorithm toolkits, and data encryption test environments for hands-on security practicals.",
    },
    {
      name: "System Software & Hardware Security Lab",
      description:
        "Dedicated computing lab powered by Intel Core i5 processors and 8 GB RAM for low-level system software analysis, MASM assemblers, kernel debugging, and microcomputing experiments.",
    },
    {
      name: "Department Library & Resource Centre",
      description:
        "Dedicated departmental reference collection covering network security, cryptography, penetration testing, ethical hacking, and computer science literature.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University B.Tech CSE (Cyber Security) Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Specialized training modules in vulnerability assessment and network penetration testing.",
    "Student participation in national cyber security competitions and capture-the-flag events.",
  ],
  placements: {
    description: "High demand across security operations centers (SOC), vulnerability management, cloud security, and financial technology institutions.",
    topRecruiters: ["TCS", "Infosys", "Wipro Technologies", "Cognizant", "Mphasis", "UST Global", "IBS Software", "VVDN Technologies"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
