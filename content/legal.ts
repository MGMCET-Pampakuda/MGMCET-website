import { site } from "./site";

export interface LegalSection {
  title: string;
  body: string;
  items?: string[];
  footer?: string;
}

export interface LegalPageContent {
  title: string;
  badge: string;
  description: string;
  sections: LegalSection[];
  sideNavItems: Array<{ label: string; href: string }>;
}

export const legalContent: {
  privacyPolicy: LegalPageContent;
  terms: LegalPageContent;
} = {
  privacyPolicy: {
    title: "Privacy Policy",
    badge: "Legal & Compliance",
    description:
      "How MGM College of Engineering and Technology collects, handles, and protects personal information submitted through this website.",
    sideNavItems: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Mandatory Disclosure", href: "/academics/mandatory-disclosure" },
      { label: "Contact Us", href: "/contact" },
    ],
    sections: [
      {
        title: "1. Information We Collect",
        body: `MGM College of Engineering and Technology (${site.shortName}) values the privacy of students, parents, faculty, and visitors. When you browse our website, fill out an enquiry or admission form, or subscribe to announcements, we may collect:`,
        items: [
          "Personal identifying information such as full name, email address, phone number, and residential district.",
          "Academic interests, program preferences, and admission inquiries.",
          "Technical usage data (such as browser type, approximate device viewport, and referring URLs) collected for site maintenance and analytics.",
        ],
      },
      {
        title: "2. How We Use Your Information",
        body: `Information submitted to ${site.shortName} is used solely for legitimate educational and institutional purposes, including:`,
        items: [
          "Responding to admission inquiries, counseling requests, and general campus queries.",
          "Processing prospective student applications and scholarship eligibility checks.",
          "Sending critical academic announcements, counseling schedules, or institution updates.",
          "Improving the performance, security, and usability of our digital services.",
        ],
      },
      {
        title: "3. Data Security & Sharing",
        body: "We implement standard security measures to protect submitted information from unauthorized access, alteration, or disclosure. We do not sell, rent, or trade your personal data to commercial third parties. Data is only shared with authorized statutory bodies (such as AICTE, KTU, or DTE Kerala) when legally mandated.",
      },
      {
        title: "4. Contact Information",
        body: `For queries or concerns regarding this Privacy Policy, please contact the Principal’s office at ${site.contact.email} or visit the campus in ${site.contact.address}, ${site.contact.district}, ${site.contact.state}.`,
      },
    ],
  },

  terms: {
    title: "Terms of Use",
    badge: "Legal & Compliance",
    description:
      "Terms and conditions governing the access and use of the official MGMCET institutional website and related online services.",
    sideNavItems: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Mandatory Disclosure", href: "/academics/mandatory-disclosure" },
      { label: "Contact Us", href: "/contact" },
    ],
    sections: [
      {
        title: "1. Acceptance of Terms",
        body: "By accessing or using this website, you agree to comply with and be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, please discontinue use of this site.",
      },
      {
        title: "2. Intellectual Property Rights",
        body: `All content on this website—including emblems, logos, text descriptions, program curricula, images, graphics, and layout designs—is the property of ${site.name} (${site.group}) or its respective licensors and is protected by applicable intellectual property laws. Unauthorized reproduction or commercial distribution without prior written consent is strictly prohibited.`,
      },
      {
        title: "3. Accuracy of Academic & Regulatory Information",
        body: `While ${site.shortName} makes every reasonable effort to keep curriculum outlines, fee structures, seat matrices, and admission criteria up to date, information is subject to change according to APJ Abdul Kalam Technological University (KTU), AICTE, and State Government directives. Prospective applicants should verify specifics with the college admissions cell before finalizing enrollments.`,
      },
      {
        title: "4. External Links",
        body: `This website may contain links to third-party portals (such as KEAM, KTU, AICTE, and student initiative portals). ${site.shortName} does not endorse or assume responsibility for the content, privacy policies, or practices of any external sites.`,
      },
    ],
  },
};
