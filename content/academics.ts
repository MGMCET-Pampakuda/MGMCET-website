/**
 * Academics section content.
 * Committee/policy pages use ContentPage template.
 * Document pages (NIRF, AICTE Approval, SC-ST, Mandatory Disclosure) are in downloads.ts.
 */

export interface AcademicsSectionBlock {
  title: string;
  body?: string;
  items?: string[];
}

export interface FocusAreaBlock {
  title: string;
  description: string;
}

export interface DegreeCardBlock {
  badge: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface EmergencyCalloutBlock {
  title: string;
  contactLine: string;
  details: string;
}

export interface StepProcedureBlock {
  step: number;
  title: string;
  description: string;
}

export interface AcademicsOverviewContent {
  title: string;
  description: string;
  badge: string;
  introTitle: string;
  introBody: string;
  programCards: DegreeCardBlock[];
  obeTitle: string;
  obeBody: string;
  governanceTitle: string;
  governanceBody: string;
  statutoryCells: Array<{ name: string; description: string }>;
}

export interface AcademicsPageContent {
  title: string;
  badge: string;
  description: string;
  eyebrow?: string;
  body: string;
  blocks?: AcademicsSectionBlock[];
  focusAreas?: FocusAreaBlock[];
  emergencyCallout?: EmergencyCalloutBlock;
  procedures?: StepProcedureBlock[];
  relatedLinks?: Array<{ label: string; href: string; isPdf?: boolean; isExternal?: boolean }>;
}

export interface AcademicsContent {
  overview: AcademicsOverviewContent;
  iqac: AcademicsPageContent;
  antiRagging: AcademicsPageContent;
  aicteFeedback: AcademicsPageContent;
  researchAndDevelopment: AcademicsPageContent;
  grievanceCell: AcademicsPageContent;
  mous: AcademicsPageContent;
}

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
        description: "Maintains a strictly zero-tolerance campus environment.",
      },
      {
        name: "Grievance Redressal Cell",
        description: "Provides fair, structured channels for resolving student concerns.",
      },
      {
        name: "SC-ST & OBC Committees",
        description: "Protects rights and ensures inclusive access for marginalized communities.",
      },
      {
        name: "Research & Development Cell",
        description: "Promotes publications, patents, student projects, and hackathons.",
      },
    ],
  },

  iqac: {
    title: "Internal Quality Assurance Cell (IQAC)",
    badge: "Academic Governance",
    eyebrow: "Quality Assurance",
    description:
      "Driving continuous enhancement in teaching-learning, research standards, and administrative accountability across MGMCET.",
    body: `The Internal Quality Assurance Cell (IQAC) at MGMCET is dedicated to developing a quality culture and sustaining processes that contribute to achieving academic excellence. The IQAC functions as a driving force behind quality initiatives, monitoring outcomes, and ensuring continuous improvement across all academic and administrative activities.

The cell coordinates accreditation activities, implements feedback mechanisms, organizes faculty development programmes, and maintains outcome-based education frameworks in alignment with AICTE and KTU norms.`,
    // TODO(content): add real IQAC member list, NAAC/AQAR reports, and committee details
    blocks: [
      {
        title: "Core Functions & Strategies",
        items: [
          "Development and application of quality benchmarks/parameters for academic and administrative activities of the college.",
          "Facilitating the creation of a learner-centric environment conducive to quality education and faculty maturation.",
          "Arrangement for feedback response from students, parents and other stakeholders on quality-related institutional processes.",
          "Dissemination of information on various quality parameters to higher education stakeholders.",
          "Organization of inter and intra institutional workshops, seminars on quality-related themes and promotion of quality circles.",
          "Documentation of the various programmes and activities leading to quality improvement.",
        ],
      },
      {
        title: "IQAC Committee Composition",
        body: "The IQAC operates under the chairmanship of the Principal and includes senior faculty heads, administrative officers, management representatives, external industry experts, and student representatives.",
      },
    ],
    relatedLinks: [
      { label: "NIRF Report", href: "/academics/nirf" },
      { label: "AICTE Approval", href: "/academics/aicte-approval" },
    ],
  },

  antiRagging: {
    title: "Anti-Ragging Committee",
    badge: "Zero Tolerance • Student Safety",
    eyebrow: "Campus Safety & Compliance",
    description:
      "Zero tolerance policy towards ragging in any form on campus, in hostels, and during college transportation.",
    body: `MGMCET strictly prohibits ragging in any form on its campus and in hostels. The Anti-Ragging Committee is constituted as per the directives of the Hon'ble Supreme Court of India and UGC/AICTE regulations.

Report Ragging: If you witness or experience ragging, please report immediately to the Anti-Ragging Helpline or the designated Nodal Officer.

The college has constituted a Squad and a Monitoring Cell to ensure strict enforcement of anti-ragging norms. Severe action including expulsion will be taken against offenders.`,
    // TODO(content): add committee member names, contact details, and signed pledge form link
    emergencyCallout: {
      title: "24x7 Anti-Ragging Toll Free Helpline",
      contactLine: "National Helpline: 1800-180-5522 | Email: helpline@antiragging.in",
      details:
        "Students or parents can lodge complaints directly with the College Squad, Head of Institution, or through the national portal without disclosing their identity.",
    },
    blocks: [
      {
        title: "Statutory Penalties Under Law",
        body: "As per the Kerala Prohibition of Ragging Act, 1998, and AICTE Regulations, anyone found guilty of committing, abetting, or being passive spectators to ragging is liable for:",
        items: [
          "Immediate suspension from attending classes and academic privileges.",
          "Withholding scholarships, fellowships, and other benefits.",
          "Debarring from appearing in tests/examinations or campus placement drives.",
          "Suspension or expulsion from the hostel and college mess.",
          "Rustication or permanent expulsion from the institution with FIR registration with local police authorities.",
        ],
      },
    ],
    relatedLinks: [],
  },

  aicteFeedback: {
    title: "AICTE Feedback Facility",
    badge: "Stakeholder Feedback System",
    eyebrow: "Academics",
    description:
      "Direct feedback portal operated by AICTE enabling students, parents, and faculty to submit feedback and grievances regarding institutional functioning.",
    body: `AICTE has implemented an online feedback system to enable students, faculty, and other stakeholders to provide feedback on technical institutions and their programmes.

Students and parents may submit feedback through the AICTE portal for grievances related to technical institutions.`,
    relatedLinks: [
      {
        label: "Open AICTE Online Feedback Portal",
        href: "https://www.aicte-india.org/feedback",
        isExternal: true,
      },
    ],
    // TODO(content): verify AICTE feedback portal URL and add institution-specific instructions
  },

  researchAndDevelopment: {
    title: "Research and Development",
    badge: "Innovation & Discovery",
    eyebrow: "Academics",
    description:
      "Fostering applied engineering research, student innovation, project mentorship, and intellectual property creation at MGMCET.",
    body: `MGMCET is committed to fostering a research culture among its faculty and students. The Research and Development Cell encourages applied research, project-based learning, innovation, and collaboration with industry and academia.

The college promotes participation in national-level hackathons, technical paper presentations, and funded research projects. Faculty members are encouraged to pursue sponsored research through government agencies such as DST, SERB, KSCSTE, and DRDO.`,
    // TODO(content): add list of funded projects, publications, patents, and R&D achievements
    focusAreas: [
      {
        title: "Artificial Intelligence & Data Engineering",
        description: "Deep learning models, natural language processing, predictive maintenance, and intelligent automation systems.",
      },
      {
        title: "Cyber Security & Information Assurance",
        description: "Vulnerability assessment, IoT security, cryptography, and defensive network architecture.",
      },
      {
        title: "Renewable Energy & EV Technologies",
        description: "Electric powertrain simulation, smart battery management, solar PV grid integration, and power electronics.",
      },
      {
        title: "Advanced Materials & Structural Mechanics",
        description: "Composite materials, sustainable construction aggregates, finite element modeling, and thermal design.",
      },
    ],
    relatedLinks: [
      { label: "Visit MGMCET IEDC Portal", href: "https://iedc.mgmcet.ac.in/", isExternal: true },
    ],
  },

  grievanceCell: {
    title: "Grievance Cell",
    badge: "Student Welfare & Redressal",
    eyebrow: "Academics",
    description:
      "Ensuring a fair, transparent, and confidential mechanism for resolving academic and non-academic concerns of students.",
    body: `The Student Grievance Cell at MGMCET is established to address academic and non-academic grievances of students in a fair and transparent manner.

Students may submit grievances in person, by letter, or through the designated online form. All complaints are treated with strict confidentiality and resolved within a defined time-frame as per AICTE and KTU guidelines.`,
    // TODO(content): add committee member names, grievance submission form link, and redressal timelines
    procedures: [
      {
        step: 1,
        title: "Submission of Grievance",
        description: "Any aggrieved student may submit an application in writing to the Principal or via email to the designated grievance officer.",
      },
      {
        step: 2,
        title: "Preliminary Review & Hearing",
        description: "The Committee reviews the matter within 7 working days, invites the concerned parties for an impartial hearing if necessary.",
      },
      {
        step: 3,
        title: "Resolution & Communication",
        description: "Actionable recommendations are documented, approved by the Principal, and formally communicated to the applicant within 15 working days.",
      },
    ],
    relatedLinks: [
      { label: "Anti-Ragging", href: "/academics/anti-ragging" },
    ],
  },

  mous: {
    title: "Memoranda of Understanding (MoUs)",
    badge: "Industry Partnerships",
    eyebrow: "Academics",
    description:
      "Fostering industry-aligned education, student internships, joint research, and technical consultancy through formal MoUs.",
    body: `MGMCET has entered into Memoranda of Understanding with leading industries, research organisations, and academic institutions to strengthen industry-academia collaboration.

These MoUs facilitate internships, industrial visits, guest lectures, joint research initiatives, and placement opportunities for students.`,
    // TODO(content): add list of MoU partners, signing dates, scope, and logos
    focusAreas: [
      {
        title: "Internships & Industrial Training",
        description: "Students receive hands-on experience in production environments, software development cycles, and hardware testing.",
      },
      {
        title: "Faculty Development & Guest Lectures",
        description: "Corporate mentors and chief technical officers deliver specialized masterclasses on cutting-edge industry practices.",
      },
      {
        title: "Joint Projects & Hackathons",
        description: "Collaborative solution engineering addressing real problems faced by manufacturing, IT, and automation firms.",
      },
      {
        title: "Priority Campus Recruitment",
        description: "Direct access for partner firms to evaluate and hire talented graduates from specialized branches.",
      },
    ],
    relatedLinks: [],
  },
};

export const academicsNavItems = [
  { label: "Academics Overview", href: "/academics" },
  { label: "IQAC", href: "/academics/iqac" },
  { label: "NIRF", href: "/academics/nirf" },
  { label: "MoUs", href: "/academics/mous" },
  { label: "Anti-Ragging Committee", href: "/academics/anti-ragging" },
  { label: "AICTE Approval", href: "/academics/aicte-approval" },
  { label: "SC-ST Committee", href: "/academics/sc-st-committee" },
  { label: "Mandatory Disclosure", href: "/academics/mandatory-disclosure" },
  { label: "AICTE Feedback", href: "/academics/aicte-feedback" },
  { label: "Research & Development", href: "/academics/research-and-development" },
  { label: "Grievance Cell", href: "/academics/grievance-cell" },
  { label: "IEDC", href: "https://iedc.mgmcet.ac.in/", isExternal: true },
];
