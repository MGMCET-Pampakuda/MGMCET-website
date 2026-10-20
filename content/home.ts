import type { HomeContent } from "@/types";
import { site } from "./site";

/** Compute years of excellence dynamically from the founded year */
const yearsOfExcellence = new Date().getFullYear() - site.foundedYear;

export const home: HomeContent = {
  hero: [
    {
      id: "slide-1",
      eyebrow: "MGM College of Engineering and Technology",
      headline: "Spark Your Future",
      headlineAccent: "at MGMCET",
      description:
        "Transform your passion into expertise with cutting edge technologies, state of the art facilities, and industry connections at Pampakuda's premier engineering institution.",
      image: "/images/hero/hero-1.svg",
      imageAlt: "MGM College of Engineering and Technology campus, Pampakuda",
      primaryCta: { label: "Explore Programs", href: "/departments" },
      secondaryCta: {
        label: "Watch Campus Tour",
        href: "#campus-tour-video",
        isVideoModal: true,
      },
      badges: ["40+ Industry Partners / Global Connections", "A+ AICTE Approved, Affiliated to KTU"],
    },
    {
      id: "slide-2",
      eyebrow: "Excellence Since 1994",
      headline: "Build. Innovate.",
      headlineAccent: "Lead the Future.",
      description:
        "Join B.Tech, M.Tech, and Polytechnic programmes across AI, CSE, ECE, Mechanical Engineering and more — backed by AICTE approval and KTU affiliation.",
      image: "/images/hero/hero-2.svg",
      imageAlt: "Students working in MGMCET campus labs",
      primaryCta: { label: "View B.Tech Programs", href: "/departments/btech" },
      secondaryCta: { label: "Apply Now", href: site.applyNowUrl, isVideoModal: false },
    },
    {
      id: "slide-3",
      eyebrow: "Campus Life at MGMCET",
      headline: "Learn. Make Friends.",
      headlineAccent: "Create Memories.",
      description:
        "From idea labs to cultural fests, student-led clubs to sports arenas — our campus is built to unlock your full potential at Pampakuda.",
      image: "/images/hero/hero-3.svg",
      imageAlt: "Students engaged in campus activities at MGMCET",
      primaryCta: { label: "Explore Campus Life", href: "/campus-life" },
      secondaryCta: { label: "Admissions", href: "/admissions" },
    },
  ],

  stats: [
    {
      id: "years-excellence",
      value: `${yearsOfExcellence}+`,
      animated: true,
      label: "Years of Excellence",
      iconName: "Award",
    },
    {
      id: "engineering-programs",
      value: "7",
      animated: false,
      label: "Engineering Programs",
      iconName: "GraduationCap",
    },
    {
      id: "industry-partners",
      value: "40+",
      animated: true,
      label: "Industry Partners",
      iconName: "Handshake",
    },
    {
      id: "aicte-approved",
      value: "A+",
      animated: false,
      label: "AICTE Approved",
      iconName: "BadgeCheck",
    },
  ],

  about: {
    eyebrow: "About MGM",
    title: "Empowering Minds, Shaping Tomorrow",
    description:
      "MGM College of Engineering & Technology, a renowned institution committed to developing globally competent professionals in technology and management with refined attitudes. With a mission to provide teaching and learning at international standards, we prepare students for the challenges of a rapidly evolving world.",
    image: "/images/campus/campus-main.svg",
    imageAlt: "MGM College of Engineering and Technology campus",
    imageCaption: "Where Ideas Grow",
    cta: { label: "Read More About MGMCET", href: "/about" },
    vision: {
      title: "Our Vision",
      text: "To be a center of excellence, molding individuals into leaders who excel on a global scale.",
      iconName: "Eye",
    },
    mission: {
      title: "Our Mission",
      text: "To provide teaching and learning at international standards, preparing students for the challenges of a rapidly evolving world through career-oriented programs and industry interactions.",
      iconName: "Target",
    },
  },

  programs: [
    {
      id: "btech",
      level: "B.Tech",
      title: "B.Tech Programs",
      duration: "4-Year Undergraduate",
      programCount: 5,
      iconName: "Code2",
      href: "/departments/btech",
    },
    {
      id: "mtech",
      level: "M.Tech",
      title: "M.Tech Programs",
      duration: "2-Year Postgraduate",
      programCount: 2,
      iconName: "FlaskConical",
      href: "/departments/mtech",
    },
    {
      id: "polytechnic",
      level: "Polytechnic",
      title: "Diploma Courses",
      duration: "3-Year Diploma",
      programCount: 8,
      iconName: "Wrench",
      href: "/departments/polytechnic",
    },
  ],

  why: {
    eyebrow: "Why MGM?",
    title: "More Than Just An Education",
    description:
      "At MGMCET, we go beyond classrooms. We offer an environment where you can learn, grow, innovate and belong.",
    cta: { label: "Why Choose MGM", href: "/about" },
    items: [
      {
        id: "faculty",
        title: "Well-Qualified Faculty",
        description:
          "Committed to providing a challenging and supportive educational environment.",
        iconName: "Users",
      },
      {
        id: "labs",
        title: "Labs & Workshop",
        description:
          "State-of-the-art labs and workshops fully equipped with the latest technology and equipment.",
        iconName: "Microscope",
      },
      {
        id: "library",
        title: "Library",
        description:
          "From traditional hard copies to e-books; an extensive collection tailored to education needs.",
        iconName: "Library",
      },
      {
        id: "hostel",
        title: "Boys & Girls Hostel",
        description:
          "Safe, comfortable, modern amenities — a home away from home for all students.",
        iconName: "Home",
      },
      {
        id: "transport",
        title: "Transportation Facilities",
        description:
          "Comprehensive, reliable and safe transportation service across the region.",
        iconName: "Bus",
      },
      {
        id: "placement",
        title: "Training & Placement",
        description:
          "Industry interactions, soft-skills training and strong recruiter network for your career.",
        iconName: "TrendingUp",
      },
    ],
  },

  campusLife: {
    eyebrow: "Campus Life",
    title: "Learn. Make Friends. Create Memories.",
    description:
      "Beyond Books. Into the Real World — Explore, Express, Evolve. At MGMCET, we believe that education goes hand in hand with experience. From idea labs to cultural fests, student-led clubs to sports arenas — our campus is built to unlock your full potential.",
    image: "/images/campus/campus-life.svg",
    imageAlt: "Students enjoying campus life at MGMCET",
    imageCaption: "Where Life Meets MGM",
    cta: { label: "Explore Campus Life", href: "/campus-life" },
    quickLinks: [
      { label: "Clubs & Associations", href: "/campus-life/associations-and-clubs", iconName: "Users2" },
      { label: "Sports & Fitness", href: "/campus-life/sports-club", iconName: "Trophy" },
      { label: "Hostel Facilities", href: "/campus-life/hostel", iconName: "Home" },
      { label: "Cultural Events", href: "/campus-life/arts-club", iconName: "Music" },
      { label: "Gallery", href: "/gallery", iconName: "Image" },
    ],
    stats: [
      { value: "10+", label: "Activity Clubs" },
      { value: "10+", label: "Student Events" },
      { value: "5+", label: "Volunteering Activities" },
      { value: "15+", label: "Educational Programs" },
    ],
  },

  directorQuote: {
    quote:
      "At MGMCET, we are committed to creating an academic ecosystem that inspires excellence and fuels innovation preparing students to thrive in a changing world.",
    name: "Director, MGMCET", // TODO(content): replace with Director's actual name
    designation: "Director, MGMCET, Pampakuda",
    image: "/images/about/director.svg",
  },

  ctaBanner: {
    eyebrow: "Join Us",
    title: "Admissions Open for 2026",
    description:
      "Ready to Begin Your Journey? Join MGM College of Engineering and Technology to unlock your potential and build a successful career in the field of engineering and technology.",
    primaryCta: { label: "Apply Now", href: site.applyNowUrl },
    secondaryCta: { label: "Download Prospectus", href: site.prospectusUrl },
  },

  newsCount: 4,
};
