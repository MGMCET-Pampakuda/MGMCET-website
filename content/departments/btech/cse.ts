import type { DepartmentDetail } from "@/types";

export const cseBtech: DepartmentDetail = {
  id: "btech-cse",
  slug: "cse",
  level: "btech",
  name: "Computer Science & Engineering",
  shortName: "CSE",
  intake: 60,
  duration: "4 Years",
  image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-cse.webp",
  thumbnail: "https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-cse.webp",
  href: "/departments/btech/cse",
  tagline: "Innovating the Digital Future Through Code and Systems",
  overview:
    "The Department of Computer Science & Engineering was established in the year 2011. The department focuses on delivering rigorous education in software systems, algorithms, database architectures, networks, and advanced computing paradigms, preparing graduates to excel in global IT and engineering sectors.",
  vision:
    "To emerge as a Center of Excellence in Computer Science and Engineering education, fostering innovation, research, and socially committed technical professionals.",
  mission:
    "Impart high-quality professional education in computing; kindle innovative thinking and research culture through state-of-the-art laboratory infrastructure; and mould competent computer engineers capable of solving complex societal problems.",
  programOutcomes: [
    { code: "PEO1", description: "Graduates will apply their computing knowledge for the betterment of society." },
    { code: "PEO2", description: "Graduates will demonstrate capability to identify problems in Computer Science and Engineering, analyze and design optimal software solutions." },
    { code: "PEO3", description: "Graduates will address technological challenges in advance by applying their analytical and engineering capabilities." },
    { code: "PEO4", description: "Graduates will face global competition in the field of Information Technology and achieve placement in top reputed organizations." },
  ],
  labs: [
    {
      name: "Programming & Problem Solving Lab",
      description:
        "Modern computer laboratory equipped with high-performance desktop systems featuring Intel Core i5 processors, 8 GB RAM, high-speed SSD storage, and LED monitors. Connected via Gigabit Ethernet with uninterrupted high-bandwidth internet connectivity and centralized UPS backup. Provides dual-boot Ubuntu Linux and Windows environments pre-loaded with GCC/G++, Python, Java JDK, and integrated development environments.",
    },
    {
      name: "Software Engineering & Mini Project Lab",
      description:
        "Dedicated computing lab powered by Intel Core i5 systems with 8 GB RAM. Configured with modern IDEs, mobile application development toolchains, Git version control, and collaborative project development suites for student coursework and project implementation.",
    },
    {
      name: "Object-Oriented Programming & Networking Lab",
      description:
        "High-performance lab environment featuring Intel Core i5 workstations with 8 GB RAM on a Gigabit network. Configured with Java runtime and development kits, networking simulation tools, Wireshark, and socket programming environments.",
    },
    {
      name: "Data Structures & Database Systems Lab",
      description:
        "Equipped with Intel Core i5 computing systems and 8 GB RAM running Linux and Windows. Fully installed with relational database management engines, SQL tools, and algorithmic programming platforms for data structure and DBMS practicals.",
    },
    {
      name: "System Software & Microprocessors Lab",
      description:
        "Specialized computing lab with Intel Core i5 processors and 8 GB RAM running macro assemblers, MASM, low-level compilers, system debuggers, and simulation suites for system programming coursework.",
    },
    {
      name: "Department Library & Resource Centre",
      description:
        "A dedicated department resource library providing reference textbooks, technical conference proceedings, research journals, and project archives.",
    },
  ],
  faculty: [],
  curriculumLinks: [
    { label: "APJ Abdul Kalam Technological University B.Tech CSE Syllabus", href: "https://ktu.edu.in/", isPdf: false },
  ],
  achievements: [
    "Consistently high placement rate across premier IT and software development enterprises.",
    "Active student participation in technical hackathons, coding contests, and open-source contributions.",
  ],
  placements: {
    description: "Our CSE graduates secure placements across software development, cloud systems, systems engineering, and data analytics.",
    topRecruiters: ["TCS", "Infosys", "Wipro Technologies", "Cognizant (CTS)", "Mphasis", "UST Global", "IBS Software", "Poornam Infovision", "Comstream Technologies"],
  },
  contact: {
    email: "mail@mgmcet.ac.in",
  },
};
