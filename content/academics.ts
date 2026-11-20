/**
 * Academics section content.
 * Real content from MGM College of Engineering and Technology (https://www.mgmcet.ac.in/academics)
 */

import type {
  IqacMember,
  MouPartner,
  AcademicsSectionBlock,
  FocusAreaBlock,
  DegreeCardBlock,
  EmergencyCalloutBlock,
  StepProcedureBlock,
  AcademicsOverviewContent,
  IqacPageContent,
  AcademicsPageContent,
  MousPageContent,
  AcademicsContent,
} from "@/types";

export type {
  IqacMember,
  MouPartner,
  AcademicsSectionBlock,
  FocusAreaBlock,
  DegreeCardBlock,
  EmergencyCalloutBlock,
  StepProcedureBlock,
  AcademicsOverviewContent,
  IqacPageContent,
  AcademicsPageContent,
  MousPageContent,
  AcademicsContent,
};

export const defaultIqacMembers: IqacMember[] = [
  {
    id: "iqac-1",
    role: "Chairperson",
    name: "Dr. Dhanya G",
    designation: "Principal",
    department: "Administration",
  },
  {
    id: "iqac-2",
    role: "Management Representative",
    name: "Er. Ahinus H",
    designation: "Director",
    department: "Management",
  },
  {
    id: "iqac-3",
    role: "Local Society Representative",
    name: "Sri. Nevin George",
    designation: "President, Pampakuda Block Panchayath",
    department: "Local Society",
  },
  {
    id: "iqac-4",
    role: "IQAC Coordinator",
    name: "Ms. Neethu B",
    designation: "Asst. Prof.",
    department: "EEE",
  },
  {
    id: "iqac-5",
    role: "Representative from Industry",
    name: "Sri. Nirmal S.",
    designation: "Senior System Engineer",
    department: "Robert Bosch, Coimbatore",
  },
  {
    id: "iqac-6",
    role: "Department Representative",
    name: "Ms. Jyothilekshmi S",
    designation: "Asst. Prof.",
    department: "CSE",
  },
  {
    id: "iqac-7",
    role: "Department Representative",
    name: "Mr. Linto Jose K",
    designation: "Asst. Prof.",
    department: "ME",
  },
  {
    id: "iqac-8",
    role: "Department Representative",
    name: "Dr. Sajitha Kumari T",
    designation: "Asso. Prof.",
    department: "S&H",
  },
  {
    id: "iqac-9",
    role: "Department Representative",
    name: "Ms. Neethu Joy",
    designation: "Asst. Prof.",
    department: "ECE",
  },
  {
    id: "iqac-10",
    role: "Department Representative",
    name: "Mr. Sreejith K Babu",
    designation: "Asst. Prof.",
    department: "CE",
  },
];

export const defaultMouPartners: MouPartner[] = [
  {
    id: "mou-1",
    companyName: "National Institute of Speech and Hearing",
    location: "Thiruvananthapuram, Kerala",
    category: "Assistive Technology & Research",
    scope: "Collaborative research, assistive engineering solutions, student internships, and awareness initiatives.",
    status: "Active",
  },
  {
    id: "mou-2",
    companyName: "Axianta MEP & QC",
    location: "1st floor, Saniya Building Pump Junction, Aluva, Kerala 683101",
    category: "MEP & Quality Control Engineering",
    scope: "Specialized MEP technical training, HVAC design, industrial site visits, quality assurance certification, and direct campus recruitment.",
    status: "Active",
  },
  {
    id: "mou-3",
    companyName: "Montgolfier Engineering & Solutions Pvt Ltd",
    location: "Ernakulam, Kerala",
    category: "Mechanical & Aerospace Engineering",
    scope: "Technical workshops, advanced CAD/CAM/CAE simulations, live design projects, and industrial internships.",
    status: "Active",
  },
  {
    id: "mou-4",
    companyName: "Crysol Technologies Pvt Ltd",
    location: "Kochi, Kerala",
    category: "IT Solutions & Software Development",
    scope: "Software engineering internships, full-stack development bootcamps, real-world industry projects, and student placement assistance.",
    status: "Active",
  },
  {
    id: "mou-5",
    companyName: "Progressive Cybernetics Pvt Ltd",
    location: "Muvattupuzha, Ernakulam",
    category: "Industrial Automation & Cybernetics",
    scope: "Industrial automation systems, PLC/SCADA instrumentation, robotics exposure, and faculty-student technical consultancy.",
    status: "Active",
  },
  {
    id: "mou-6",
    companyName: "Technovalley Software India Pvt Ltd",
    location: "Level 4, ATS Grand, opposite Highway Garden, Bypass, Edappally, Ernakulam, Kerala 682024",
    category: "Cybersecurity, Cloud & IT Services",
    scope: "Cyber security and network infrastructure training, cloud certifications, hackathons, and technology incubation.",
    status: "Active",
  },
];

export const academicsNavItems = [
  { label: "Overview", href: "/academics" },
  { label: "IQAC", href: "/academics/iqac" },
  { label: "NIRF", href: "/academics/nirf" },
  { label: "MoUs", href: "/academics/mous" },
  { label: "Anti-Ragging", href: "/academics/anti-ragging" },
  { label: "AICTE Approval", href: "/academics/aicte-approval" },
  { label: "SC-ST Committee", href: "/academics/sc-st-committee" },
  { label: "Mandatory Disclosure", href: "/academics/mandatory-disclosure" },
  { label: "AICTE Feedback Facility", href: "/academics/aicte-feedback" },
  { label: "Research and Development", href: "/academics/research-and-development" },
  { label: "Grievance Cell", href: "/academics/grievance-cell" },
];

export const academics: AcademicsContent = {
  overview: {
    title: "Academic Excellence",
    badge: "Academic Framework",
    description:
      "MGMCET delivers AICTE-approved and KTU-affiliated technical education designed to develop competent engineers, innovative researchers, and ethical leaders.",
    introTitle: "Affiliation & Accreditations",
    introBody:
      "MGM College of Engineering and Technology operates under approval from the All India Council for Technical Education (AICTE), New Delhi, and is affiliated with APJ Abdul Kalam Technological University (KTU), Thiruvananthapuram, Kerala. Polytechnic diploma courses are conducted in adherence to Directorate of Technical Education (DTE), Government of Kerala norms.",
    programCards: [
      {
        badge: "Undergraduate",
        title: "B.Tech Degrees",
        description: "4-Year KTU Programs across AI & ML, CSE, Cyber Security, ECE, and Mechanical.",
        href: "/departments/btech",
        linkLabel: "Explore B.Tech →",
      },
      {
        badge: "Postgraduate",
        title: "M.Tech Degrees",
        description: "2-Year advanced engineering specializations in Instrumentation & Structural Engineering.",
        href: "/departments/mtech",
        linkLabel: "Explore M.Tech →",
      },
      {
        badge: "Diploma",
        title: "Polytechnic",
        description: "3-Year hands-on technical diplomas across 8 high-demand engineering streams.",
        href: "/departments/polytechnic",
        linkLabel: "Explore Polytechnic →",
      },
    ],
    obeTitle: "Outcome-Based Education (OBE)",
    obeBody:
      "The curriculum is structured around Outcome-Based Education principles. Course outcomes (COs) are directly mapped to Program Outcomes (POs) and Program Educational Objectives (PEOs). Regular assessments, practical laboratory work, industry-driven mini projects, and continuous evaluation ensure high academic rigour and industry readiness.",
    governanceTitle: "Governance & Statutory Cells",
    governanceBody:
      "The academic ecosystem is monitored by dedicated committees and cells ensuring student welfare, transparency, and continuous institutional growth:",
    statutoryCells: [
      {
        name: "Internal Quality Assurance Cell (IQAC)",
        description: "Coordinates quality initiatives, accreditations, and academic audits.",
      },
      {
        name: "Anti-Ragging Squad & Committee",
        description: "Maintains a strictly zero-tolerance campus environment under Principal's charge.",
      },
      {
        name: "Grievance Redressal and Appeal Committee",
        description: "Provides fair, structured channels for resolving student and staff concerns.",
      },
      {
        name: "SC-ST Committee",
        description: "Protects rights and ensures inclusive access in line with statutory mandates.",
      },
      {
        name: "Research & Development Cell (MEL-R&D)",
        description: "On-campus R&D centre established with Marine Electricals (India) Limited.",
      },
    ],
  },

  iqac: {
    title: "Internal Quality Assurance Cell (IQAC)",
    badge: "NAAC & Academic Governance",
    eyebrow: "Quality Consciousness",
    description:
      "In conformation with the NAAC directives to maintain momentum of quality consciousness in Higher Education Institutions, MGM College of Engineering & Technology has constituted an Internal Quality Assurance Cell (IQAC).",
    body: "The IQAC channelizes and systematizes the efforts and measures of the Institution towards academic excellence with the primary objectives of developing a quality system for conscious, consistent and catalytic programmed action to improve academic and administrative performance, and promoting measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.",
    objectives: [
      "To develop a quality system for conscious, consistent and catalytic programmed action to improve the academic and administrative performance.",
      "To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.",
    ],
    committeeMembers: defaultIqacMembers,
    functionsTitle: "Functions of the IQAC wing of MGM College of Engineering & Technology",
    functions: [
      "Development and application of quality benchmarks/parameters for various academic and administrative activities of the institution.",
      "Facilitating the creation of a learner-centric environment conducive to quality education and faculty maturation to adopt the required knowledge and technology for participatory teaching and learning process.",
      "Arrangement for feedback response from students, parents and other stakeholders on quality-related institutional processes.",
      "Dissemination of information on various quality parameters of higher education.",
      "Organization of inter and intra institutional workshops, seminars on quality related themes and promotion of quality circles.",
      "Documentation of the various programmes/activities leading to quality improvement.",
      "Acting as a nodal agency of the Institution for coordinating quality-related activities, including adoption and dissemination of best practices.",
      "Development and maintenance of institutional database through MIS for the purpose of maintaining /enhancing the institutional quality.",
      "Development of Quality Culture in the institution.",
      "Preparation of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC.",
    ],
  },

  antiRagging: {
    title: "Anti-Ragging Committee & Cell",
    badge: "Campus Safety",
    eyebrow: "Zero Tolerance Policy",
    description:
      "Strict compliance with AICTE and Supreme Court directives to prevent, prohibit, and eliminate ragging in any form across the college campus and hostels.",
    body: "Anti-ragging Cell is in operation under the overall charge of the Principal. Students are advised to bring cases of ragging (either in the college campus or in the hostel) to the notice of the Principal/members of anti-ragging committee/ teachers/hostel wardens. The offenders shall be liable for punishment with imprisonment and fine. Offenders may be expelled from the institution.",
    emergencyCallout: {
      title: "Immediate Reporting",
      contactLine: "Emergency Helpline: 9946485111 / 7902995111",
      details: "Report any suspected ragging incidents directly to the Principal or hostel wardens immediately.",
    },
    relatedLinks: [
      {
        label: "Download Anti-Ragging Committee & Squad Notification (PDF)",
        href: "/documents/anti-ragging-committee.pdf",
        isPdf: true,
      },
    ],
  },

  aicteFeedback: {
    title: "AICTE Feedback Facility",
    badge: "Feedback System",
    eyebrow: "Institutional Transparency",
    description:
      "Official feedback mechanism for students, faculty, and stakeholders via the AICTE Web Portal.",
    body: "This is to inform all the faculty, staff and students that the feedback facility of students and faculty is available in the AICTE Web-Portal. You may use the below links to use this facility.",
    relatedLinks: [
      {
        label: "AICTE Online Feedback Portal",
        href: "https://www.aicte-india.org/feedback/",
        isExternal: true,
      },
    ],
  },

  researchAndDevelopment: {
    title: "Research and Development",
    badge: "Innovation & Research",
    eyebrow: "MEL-R&D",
    description:
      "On-campus R&D centre established by Marine Electricals (India) Limited, Mumbai.",
    body: "R&D Centre set up by M/s. Marine Electricals (India) Limited, Mumbai, is functioning in the campus. The faculty and students are actively involved in various projects being implemented through this R&D set-up. Marine Electricals (India) Limited is an integrated technical service provider in the fields of electrical automation and information and communication technology solutions. They offer integrated and multidisciplinary total solutions.",
    focusAreas: [
      {
        title: "Electrical Automation",
        description: "Industrial control systems, power management, and marine electrical architecture.",
      },
      {
        title: "Information & Communication Technology",
        description: "Multidisciplinary total solutions, embedded hardware, and communication systems.",
      },
      {
        title: "Industry-Student Projects",
        description: "Hands-on implementation of live industry projects by undergraduate and postgraduate students.",
      },
    ],
  },

  grievanceCell: {
    title: "Grievance Redressal and Appeal Committee",
    badge: "Student Support",
    eyebrow: "Fair & Transparent",
    description:
      "Structured redressal mechanism ensuring prompt attention and fair hearing for all academic and campus grievances.",
    body: "The Grievance Redressal and Appeal Committee at MGMCET operates to address grievances of students and staff in a time-bound and objective manner. For faster response regarding admission-related queries, we suggest you contact us through any of the phone numbers provided on the site: 9946485111 or 7902995111.",
    procedures: [
      {
        step: 1,
        title: "Submission",
        description: "Submit written or verbal grievance to the Grievance Redressal Committee or Principal's office.",
      },
      {
        step: 2,
        title: "Inquiry & Review",
        description: "The Committee conducts an impartial review involving all relevant parties.",
      },
      {
        step: 3,
        title: "Resolution",
        description: "Appropriate action or remedy is communicated within standard procedural timelines.",
      },
    ],
  },

  mous: {
    title: "Memorandums of Understanding (MoUs)",
    badge: "Industry Collaborations",
    eyebrow: "Corporate Partnerships",
    description:
      "Active collaborations with leading corporates and institutions to enhance employability skills and provide practical global exposure.",
    body: "MGMCET has entered into collaboration with many leading corporates and universities to enhance the employability skills of students also to provide global exposure.",
    partners: defaultMouPartners,
    blocks: [
      {
        title: "Active Industry & Institutional Partners",
        items: [
          "National Institute of Speech and Hearing",
          "Axianta MEP & QC, 1st floor, Saniya Building Pump Junction, Aluva, Kerala 683101",
          "Montgolfier Engineering & Solutions Pvt Ltd",
          "Crysol Technologies Pvt Ltd, Kochi",
          "Progressive Cybernetics Pvt Ltd, Muvattupuzha, Ernakulam",
          "Technovalley Software India Pvt Ltd, Level 4, ATS Grand, opposite Highway Garden, Bypass, Edappally, Ernakulam, Kerala 682024",
        ],
      },
    ],
  },
};
