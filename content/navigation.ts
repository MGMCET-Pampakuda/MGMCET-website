import type { NavigationConfig } from "@/types";

/**
 * Single source of truth for all navigation.
 * Header, mobile drawer, footer link columns, and sitemap all read from here.
 * Do NOT hardcode links in components.
 */
export const navigation: NavigationConfig = {
  header: {
    items: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      {
        label: "Academics",
        href: "/academics",
        children: [
          {
            label: "IEDC",
            href: "https://iedc.mgmcet.ac.in/",
            isExternal: true,
          },
          { label: "IQAC", href: "/academics/iqac" },
          {
            label: "NIRF",
            href: "/academics/nirf",
          },
          { label: "MoUs", href: "/academics/mous" },
          { label: "Anti-Ragging", href: "/academics/anti-ragging" },
          {
            label: "AICTE Approval",
            href: "/academics/aicte-approval",
          },
          {
            label: "SC-ST Committee",
            href: "/academics/sc-st-committee",
          },
          {
            label: "Mandatory Disclosure",
            href: "/academics/mandatory-disclosure",
          },
          { label: "AICTE Feedback Facility", href: "/academics/aicte-feedback" },
          { label: "Research and Development", href: "/academics/research-and-development" },
          { label: "Grievance Cell", href: "/academics/grievance-cell" },
        ],
      },
      {
        label: "Departments",
        href: "/departments",
        children: [
          { label: "B.Tech", href: "/departments/btech" },
          { label: "M.Tech", href: "/departments/mtech" },
          { label: "Polytechnic", href: "/departments/polytechnic" },
          // Individual B.Tech departments
          {
            label: "AI & Machine Learning",
            href: "/departments/btech/aiml",
          },
          {
            label: "CSE (Cyber Security)",
            href: "/departments/btech/cse-cyber-security",
          },
          {
            label: "Computer Science & Engineering",
            href: "/departments/btech/cse",
          },
          {
            label: "Electronics & Communication Engineering",
            href: "/departments/btech/ece",
          },
          {
            label: "Mechanical Engineering",
            href: "/departments/btech/mechanical",
          },
        ],
      },
      { label: "Campus Life", href: "/campus-life" },
      { label: "News & Events", href: "/news-events" },
      { label: "Contact Us", href: "/contact" },
      {
        label: "More",
        href: "#",
        children: [
          { label: "NSS", href: "/campus-life/nss" },
          { label: "Careers", href: "/careers" },
          { label: "Faculty", href: "/faculty" },
          { label: "Women Cell", href: "/campus-life/women-cell" },
          { label: "Arts Club", href: "/campus-life/arts-club" },
          { label: "Sports Club", href: "/campus-life/sports-club" },
          {
            label: "Etcetera Club",
            href: "http://bento.me/etcetera",
            isExternal: true,
          },
          {
            label: "Associations & Clubs",
            href: "/campus-life/associations-and-clubs",
          },
          {
            label: "Training & Placement Cell",
            href: "/placements",
          },
        ],
      },
    ],
  },

  footer: {
    showSocial: true,
    columns: [
      {
        heading: "Quick Links",
        links: [
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "About Us", href: "/about" },
          { label: "News & Events", href: "/news-events" },
          { label: "Admissions", href: "/admissions" },
        ],
      },
      {
        heading: "Engineering Programs",
        links: [
          {
            label: "B.Tech — AI & Machine Learning",
            href: "/departments/btech/aiml",
          },
          {
            label: "B.Tech — CSE (Cyber Security)",
            href: "/departments/btech/cse-cyber-security",
          },
          {
            label: "B.Tech — Computer Science & Engineering",
            href: "/departments/btech/cse",
          },
          {
            label: "B.Tech — Electronics & Communication",
            href: "/departments/btech/ece",
          },
          {
            label: "B.Tech — Mechanical Engineering",
            href: "/departments/btech/mechanical",
          },
          {
            label: "M.Tech — Industrial Instrumentation & Control",
            href: "/departments/mtech/industrial-instrumentation-control",
          },
          {
            label: "M.Tech — Structural Engineering & Construction Mgmt",
            href: "/departments/mtech/structural-engineering-construction-management",
          },
        ],
      },
      {
        heading: "Polytechnic / Diploma",
        links: [
          { label: "AI & Machine Learning", href: "/departments/polytechnic/aiml" },
          { label: "Civil Engineering", href: "/departments/polytechnic/civil" },
          {
            label: "Computer Science & Engineering",
            href: "/departments/polytechnic/cse",
          },
          { label: "Automobile Engineering", href: "/departments/polytechnic/automobile" },
          { label: "Mechanical Engineering", href: "/departments/polytechnic/mechanical" },
          {
            label: "Electrical & Electronics Engineering",
            href: "/departments/polytechnic/eee",
          },
          {
            label: "Electronics & Communication Engineering",
            href: "/departments/polytechnic/ece",
          },
          {
            label: "Electrical Engineering (EV Technology)",
            href: "/departments/polytechnic/electrical-ev",
          },
        ],
      },
      {
        heading: "Student Zone",
        links: [
          { label: "Downloads", href: "/downloads" },
          { label: "Mandatory Disclosure", href: "/academics/mandatory-disclosure" },
          { label: "Grievance Cell", href: "/academics/grievance-cell" },
          { label: "Anti-Ragging", href: "/academics/anti-ragging" },
          { label: "Faculty", href: "/faculty" },
          { label: "Training & Placement Cell", href: "/placements" },
        ],
      },
    ],
  },
};
