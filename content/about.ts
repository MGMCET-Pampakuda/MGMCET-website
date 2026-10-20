/**
 * About page content
 * Vision & Mission text from BUILD_SPEC.md §3.2 verbatim.
 */

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AboutContent {
  hero: {
    title: string;
    breadcrumb: Array<{ label: string; href: string }>;
    image: string;
    imageAlt: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  vision: {
    title: string;
    text: string;
  };
  mission: {
    title: string;
    text: string;
  };
  director: {
    quote: string;
    name: string;
    designation: string;
    image: string;
    imageAlt: string;
  };
  timeline: TimelineEvent[];
}

export const about: AboutContent = {
  hero: {
    title: "About MGMCET",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
    ],
    image: "/images/campus/campus-main.svg",
    imageAlt: "MGM College of Engineering and Technology campus building",
  },
  intro: {
    eyebrow: "About MGM",
    title: "Empowering Minds, Shaping Tomorrow",
    body: "MGM College of Engineering & Technology, a renowned institution committed to developing globally competent professionals in technology and management with refined attitudes. Our vision is to be a center of excellence, molding individuals into leaders who excel on a global scale. With a mission to provide teaching and learning at international standards, we prepare students for the challenges of a rapidly evolving world. Our career-oriented programs and industry interactions ensure students gain practical exposure and excellent opportunities to succeed in global competitions. We emphasize social commitment, and nurturing responsible individuals ready to make a positive impact. By fostering innovation and problem-solving, we empower students to approach challenges creatively.",
  },
  vision: {
    title: "Our Vision",
    text: "To be a center of excellence in technical education, research and innovation — molding individuals into globally competent leaders and responsible citizens.",
  },
  mission: {
    title: "Our Mission",
    text: "To provide teaching and learning at international standards, preparing students for the challenges of a rapidly evolving world through career-oriented programs, industry interactions, practical exposure, and a strong emphasis on social commitment, innovation and problem-solving.",
  },
  director: {
    quote:
      "At MGMCET, we are committed to creating an academic ecosystem that inspires excellence and fuels innovation preparing students to thrive in a changing world.",
    name: "Director, MGMCET", // TODO(content): replace with Director's actual name
    designation: "Director, MGMCET, Pampakuda",
    image: "/images/about/director.svg",
    imageAlt: "Director of MGMCET", // TODO(content): update alt with actual name
  },
  timeline: [
    {
      year: "1994",
      title: "Founded",
      description:
        "MGM College of Engineering and Technology was established in Pampakuda, Ernakulam, Kerala as part of the MGM Group of Institutions.",
    },
    // TODO(content): add more timeline milestones (affiliations, accreditations, expansion years)
  ],
};
