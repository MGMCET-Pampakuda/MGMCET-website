/**
 * About page content
 * Real content from MGM College of Engineering & Technology (https://www.mgmcet.ac.in/about-us)
 */

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  organization: string;
  bio?: string;
  image: string;
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
  visionaries: LeaderProfile[];
  principals: LeaderProfile[];
  timeline: TimelineEvent[];
}

export const about: AboutContent = {
  hero: {
    title: "About MGMCET",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
    ],
    image: "/images/hero/campus-main.webp",
    imageAlt: "MGM College of Engineering and Technology campus building",
  },
  intro: {
    eyebrow: "About MGM",
    title: "Empowering Minds, Shaping Tomorrow",
    body: "MGM College of Engineering & Technology is a prestigious institution located in Pampakuda, Muvattupuzha, Ernakulam District. We are committed to ensuring international standards in career-oriented technology education. Established in 2011 with AICTE approval and affiliation with Kerala Technological University (KTU), we offer comprehensive B.Tech, M.Tech, and Polytechnic diploma programs. Our vision is to mould globally competent technology professionals with cutting-edge knowledge and skills. With highly qualified faculty and staff, we provide a nurturing environment emphasizing counselling, personal interaction, and strong parent-institution bonds. MGMCET is part of an esteemed education network consisting of 15 schools and 11 colleges.",
  },
  vision: {
    title: "Our Vision",
    text: "To be a center of excellence, molding individuals into leaders who excel on a global scale.",
  },
  mission: {
    title: "Our Mission",
    text: "To provide teaching and learning at international standards, preparing students for the challenges of a rapidly evolving world through career-oriented programs and industry interactions.",
  },
  director: {
    quote:
      "At MGMCET, we are committed to creating an academic ecosystem that inspires excellence and fuels innovation, preparing students to thrive in a changing world.",
    name: "Mr. H. Ahinus",
    designation: "Executive Director, MGM Group of Institutions",
    image: "/images/leadership/director-h-ahinus.webp",
    imageAlt: "Mr. H. Ahinus, Executive Director",
  },
  visionaries: [
    {
      name: "Dr. Geevarghese Yohannan",
      role: "Chairman & Founder",
      organization: "MGM Group of Institutions",
      bio: "Visionary founder steering the MGM Group of Institutions across Kerala, fostering academic excellence and holistic character formation.",
      image: "/images/leadership/chairman-dr-geevarghese-yohannan.webp",
    },
    {
      name: "Mr. Vinod Thomas",
      role: "Vice Chairman, Former IPS",
      organization: "MGM Group of Institutions",
      bio: "Former Indian Police Service officer bringing disciplined administrative leadership and ethical governance to the institutional management.",
      image: "/images/leadership/vice-chairman-vinod-thomas.webp",
    },
    {
      name: "Mr. H. Ahinus",
      role: "Executive Director",
      organization: "MGM Group of Institutions",
      bio: "The driving force behind the spontaneous growth of MGM Group of Institutions. Began his career in engineering education in 2003 with exceptional vision in industry trends and real-time execution.",
      image: "/images/leadership/director-h-ahinus.webp",
    },
  ],
  principals: [
    {
      name: "Dr. Dhanya G.",
      role: "Principal",
      organization: "MGM College of Engineering",
      bio: "Dedicated academic leader and administrator focusing on bridging theoretical learning with industry application, guiding faculty and students toward quality technical education and research.",
      image: "/images/leadership/principal-dr-dhanya-g.webp",
    },
    {
      name: "Er. N.K. Rajan",
      role: "Principal",
      organization: "MGM Polytechnic College",
      bio: "Former Joint Director of State Institute of Technical Teachers Training & Research (SITTTR), Joint Controller of Technical Examinations, and Deputy Director of Technical Education, Govt. of Kerala. Serving as Principal since July 8, 2020.",
      image: "/images/leadership/principal-poly-er-nk-rajan.webp",
    },
  ],
  timeline: [
    {
      year: "1994",
      title: "MGM Group Founded",
      description:
        "MGM Group of Institutions established its pioneering educational mission in Kerala.",
    },
    {
      year: "2011",
      title: "Establishment of MGMCET",
      description:
        "MGM College of Engineering and Technology established in Pampakuda, Ernakulam with AICTE approval and KTU affiliation.",
    },
    {
      year: "2020",
      title: "Polytechnic Leadership",
      description:
        "Er. N.K. Rajan, former Joint Director of SITTTR Govt. of Kerala, appointed Principal of MGM Polytechnic College.",
    },
    {
      year: "Present",
      title: "Expanding Network",
      description:
        "Part of an education network comprising 15 schools and 11 colleges across Kerala.",
    },
  ],
};
