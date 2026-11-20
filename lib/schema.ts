import { BASE_URL } from "./constants";
import { site } from "@/content/site";

/**
 * Generates Google-compliant JSON-LD schema for EducationalOrganization & CollegeOrUniversity.
 */
export function getCollegeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CollegeOrUniversity", "EducationalOrganization"],
        "@id": `${BASE_URL}/#organization`,
        name: site.name,
        alternateName: [
          "MGMCET",
          "MGMCET Pampakuda",
          "MGM Engineering College Pampakuda",
          "MGM College Pampakuda",
          "MGM Polytechnic College Pampakuda",
        ],
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/images/brand/logo-icon.png`,
          contentUrl: `${BASE_URL}/images/brand/logo-icon.png`,
          caption: "MGM College of Engineering and Technology Official Crest",
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#campusImage`,
          url: `${BASE_URL}/images/brand/og-image.png`,
          caption: "MGM College of Engineering and Technology Campus, Pampakuda, Kerala",
          width: 1200,
          height: 630,
        },
        description:
          "MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam, Kerala is an AICTE-approved and KTU-affiliated premier engineering and polytechnic institution established in 1994 under the MGM Group of Institutions.",
        foundingDate: "1994",
        telephone: "+91-9946485111",
        email: site.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.contact.address,
          addressLocality: "Muvattupuzha",
          addressRegion: site.contact.state,
          postalCode: site.contact.pincode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.908,
          longitude: 76.5502,
        },
        parentOrganization: {
          "@type": "EducationalOrganization",
          name: site.group,
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "AICTE Approval",
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "All India Council for Technical Education (AICTE)",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "KTU Affiliation",
            recognizedBy: {
              "@type": "CollegeOrUniversity",
              name: "APJ Abdul Kalam Technological University (KTU)",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "DTE Approval",
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Directorate of Technical Education (DTE), Kerala",
            },
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering and Polytechnic Academic Programs",
          itemListElement: [
            {
              "@type": "Course",
              name: "B.Tech in Computer Science and Engineering (CSE)",
              description: "4-year KTU affiliated undergraduate engineering program in Computer Science.",
              url: `${BASE_URL}/departments/btech/cse/`,
              provider: { "@id": `${BASE_URL}/#organization` },
            },
            {
              "@type": "Course",
              name: "B.Tech in Artificial Intelligence and Machine Learning (AI & ML)",
              description: "4-year undergraduate degree program focusing on AI, Machine Learning, and Data Science.",
              url: `${BASE_URL}/departments/btech/aiml/`,
              provider: { "@id": `${BASE_URL}/#organization` },
            },
            {
              "@type": "Course",
              name: "B.Tech in Computer Science and Engineering (Cyber Security)",
              description: "4-year engineering program specializing in network security, cryptography, and defense.",
              url: `${BASE_URL}/departments/btech/cse-cyber-security/`,
              provider: { "@id": `${BASE_URL}/#organization` },
            },
            {
              "@type": "Course",
              name: "B.Tech in Mechanical Engineering",
              description: "4-year KTU affiliated undergraduate degree in Mechanical Engineering.",
              url: `${BASE_URL}/departments/btech/mechanical/`,
              provider: { "@id": `${BASE_URL}/#organization` },
            },
            {
              "@type": "Course",
              name: "B.Tech in Electronics and Communication Engineering (ECE)",
              description: "4-year KTU affiliated program in VLSI, embedded systems, and communication networks.",
              url: `${BASE_URL}/departments/btech/ece/`,
              provider: { "@id": `${BASE_URL}/#organization` },
            },
            {
              "@type": "Course",
              name: "Diploma in Polytechnic Engineering",
              description: "3-year state board technical diploma programs across multiple engineering specializations.",
              url: `${BASE_URL}/departments/polytechnic/`,
              provider: { "@id": `${BASE_URL}/#organization` },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "MGM College of Engineering and Technology",
        alternateName: "MGMCET",
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        inLanguage: "en-IN",
      },
    ],
  };
}

/**
 * Generates BreadcrumbList schema for deep inner pages.
 */
export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${BASE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
      })),
    ],
  };
}

/**
 * Generates FAQPage schema for Admissions page rich snippets.
 */
export function getAdmissionsFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the KEAM college code for MGM College of Engineering and Technology?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official KEAM College Code for MGM College of Engineering and Technology (MGMCET), Pampakuda is MGE.",
        },
      },
      {
        "@type": "Question",
        name: "Which university is MGMCET affiliated to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MGMCET is affiliated to APJ Abdul Kalam Technological University (KTU), Kerala and approved by the All India Council for Technical Education (AICTE), New Delhi.",
        },
      },
      {
        "@type": "Question",
        name: "What programs are offered at MGMCET Pampakuda?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MGMCET offers 4-year B.Tech degree programs in Computer Science & Engineering (CSE), Artificial Intelligence & Machine Learning (AI & ML), CSE (Cyber Security), Mechanical Engineering, and Electronics & Communication Engineering (ECE); M.Tech programs; and 3-year Polytechnic Diploma programs.",
        },
      },
      {
        "@type": "Question",
        name: "Are scholarships available for students at MGMCET?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, MGMCET offers merit scholarships including Mammootty's Vidyamrutham Scholarship and MGM Trust Merit Scholarships for meritorious students.",
        },
      },
      {
        "@type": "Question",
        name: "Does MGMCET provide hostel and transportation facilities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, MGMCET provides modern, secure boys and girls hostels on campus, along with a dedicated college bus transit fleet serving Ernakulam, Muvattupuzha, Piravom, and surrounding areas.",
        },
      },
    ],
  };
}
