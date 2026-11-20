import type { CampusLifeContent } from "@/types";

export const campusLife: CampusLifeContent = {
  stats: [
    { value: "10+", label: "Activity Clubs" },
    { value: "10+", label: "Student Events" },
    { value: "5+", label: "Volunteering Activities" },
    { value: "15+", label: "Educational Programs" },
  ],

  features: [
    {
      slug: "library",
      title: "Library",
      description:
        "From traditional hard copies to e-books; an extensive collection tailored to education needs, journals, and digital learning resources.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-library.webp",
      imageAlt: "MGMCET Library",
      iconName: "Library",
      href: "/campus-life/library",
    },
    {
      slug: "labs-and-workshops",
      title: "Labs & Workshops",
      description:
        "State-of-the-art laboratories and workshops fully equipped with the latest technology and equipment across all engineering streams.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-labs.webp",
      imageAlt: "MGMCET Labs and Workshops",
      iconName: "FlaskConical",
      href: "/campus-life/labs-and-workshops",
    },
    {
      slug: "hostel",
      title: "Hostel Facilities",
      description:
        "Safe, comfortable, modern amenities — boys and girls hostels providing a true home away from home with round-the-clock security.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-hostel.webp",
      imageAlt: "MGMCET Hostel",
      iconName: "Home",
      href: "/campus-life/hostel",
    },
    {
      slug: "transportation",
      title: "Transportation",
      description:
        "Comprehensive, reliable, and safe transportation service connecting the Pampakuda campus across Ernakulam and neighbouring districts.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-transport.webp",
      imageAlt: "MGMCET Transportation",
      iconName: "Bus",
      href: "/campus-life/transportation",
    },
    {
      slug: "nss",
      title: "National Service Scheme (NSS)",
      description:
        "Units 246 & 574 with 160 volunteers. Honoured with the prestigious Indira Gandhi National Award for Best NSS Unit and Best Programme Officer.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/placement-orientation.webp",
      imageAlt: "NSS at MGMCET",
      iconName: "Heart",
      href: "/campus-life/nss",
    },
    {
      slug: "women-cell",
      title: "Women Cell",
      description:
        "Empowering women students and faculty through health awareness, legal literacy, entrepreneurship, and cyber safety workshops.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/images/facilities/facility-faculty.webp",
      imageAlt: "Women Cell at MGMCET",
      iconName: "Shield",
      href: "/campus-life/women-cell",
    },
    {
      slug: "arts-club",
      title: "Arts Club",
      description:
        "A vibrant stage celebrating creativity, cultural fests, arts competitions, and memorable campus events including Freshers' Day and Arts Day.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/arts-fest.webp",
      imageAlt: "Arts Club at MGMCET",
      iconName: "Palette",
      href: "/campus-life/arts-club",
    },
    {
      slug: "sports-club",
      title: "Sports & Fitness",
      description:
        "Annual Sports Meet, MGM Soccer tournaments, inter-collegiate tournaments, and track-and-field training across campus.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/arts-fest.webp",
      imageAlt: "Sports Club at MGMCET",
      iconName: "Trophy",
      href: "/campus-life/sports-club",
    },
    {
      slug: "etcetera-club",
      title: "Etcetera Club",
      description:
        "MGMCET's official creative community platform for student expression, design, and ideas.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/events/other/hackathon-achievement.webp",
      imageAlt: "Etcetera Club at MGMCET",
      iconName: "Sparkles",
      href: "http://bento.me/etcetera",
      isExternal: true,
    },
    {
      slug: "associations-and-clubs",
      title: "Associations & Clubs",
      description:
        "Department associations and technical interest clubs connecting classroom concepts to hands-on industry applications and hackathons.",
      image: "https://ik.imagekit.io/miwqceyia/mgmcet/gallery/2025/autobahn-bharatbenz.webp",
      imageAlt: "Associations and Clubs at MGMCET",
      iconName: "Users2",
      href: "/campus-life/associations-and-clubs",
    },
  ],

  clubs: [
    {
      name: "Et Cetera Club (E.T.C) — Coding Club",
      slug: "etcetera-club",
      href: "/campus-life/associations-and-clubs",
      description: "Official Coding Club of MGMCET",
    },
    { name: "Drone Club", slug: "drone-club", href: "/campus-life/associations-and-clubs" },
    { name: "Media Club", slug: "media-club", href: "/campus-life/associations-and-clubs" },
    { name: "Debate Club", slug: "debate-club", href: "/campus-life/associations-and-clubs" },
    { name: "Dance Club", slug: "dance-club", href: "/campus-life/associations-and-clubs" },
    { name: "Music Club", slug: "music-club", href: "/campus-life/associations-and-clubs" },
    { name: "Sports Club", slug: "sports-club", href: "/campus-life/associations-and-clubs" },
    { name: "CSE Association", slug: "cse-association", href: "/campus-life/associations-and-clubs" },
    { name: "AIML Association", slug: "aiml-association", href: "/campus-life/associations-and-clubs" },
    { name: "Cyber Security Association", slug: "cyber-security-association", href: "/campus-life/associations-and-clubs" },
    { name: "ECE Association", slug: "ece-association", href: "/campus-life/associations-and-clubs" },
    { name: "NSS Unit (Units 246 & 574)", slug: "nss", href: "/campus-life/nss" },
    { name: "Arts Club", slug: "arts-club", href: "/campus-life/arts-club" },
    { name: "IEDC", slug: "iedc", href: "https://iedc.mgmcet.ac.in/", isExternal: true },
  ],

  facilityDetails: {
    library: {
      category: "Academic Infrastructure",
      highlights: [
        "From traditional hard copies to e-books; an extensive collection tailored to education needs.",
        "Subscription to national and international engineering journals and technical databases.",
        "Dedicated digital library section with high-speed internet terminals.",
        "Spacious, quiet reading atmosphere for individual study and research work.",
      ],
      body: [
        "The Central Library at MGMCET serves as a key learning hub for undergraduate, postgraduate, and polytechnic students. It houses extensive textbook collections, engineering reference handbooks, and competitive examination materials.",
        "The library operates in close coordination with departmental libraries across Computer Science, Electronics, and Mechanical Engineering to ensure comprehensive learning resource accessibility.",
      ],
      contactInfo: "Working Hours: 8:30 AM – 5:00 PM | Email: mail@mgmcet.ac.in",
    },
    "labs-and-workshops": {
      category: "Technical Infrastructure",
      highlights: [
        "Four specialized computer laboratories equipped with dual-boot systems and modern development tools.",
        "Heavy mechanical workshop with CNC lathe, precision lathes, shaping machines, and welding bays.",
        "Fluid mechanics, hydraulic machinery, and thermal engine test rigs.",
        "Electronics circuits, microprocessor trainers, and digital communication testing facilities.",
      ],
      body: [
        "Practical experimentation forms the foundation of engineering education at MGMCET. Our state-of-the-art laboratories and workshops are fully equipped with the latest technology and equipment.",
        "Supervised by dedicated faculty advisors and qualified technical laboratory in-charges, students develop hands-on problem solving skills from first-year foundational workshops through final-year capstone engineering projects.",
      ],
      contactInfo: "Supervised by respective Academic Heads of Department.",
    },
    hostel: {
      category: "Residential Living",
      highlights: [
        "Separate hostel facilities for boys and girls on campus.",
        "Safe, comfortable, and modern living amenities — a true home away from home.",
        "Hygienic dining mess providing nutritious daily meals.",
        "24-hour campus security and resident faculty wardens.",
      ],
      body: [
        "MGMCET provides safe, comfortable boys and girls hostels on campus, designed to provide a secure and supportive living atmosphere.",
        "Resident wardens oversee student welfare, discipline, and comfort, ensuring zero-tolerance for ragging and immediate assistance for any emergency.",
      ],
      contactInfo: "Hostel Admissions Office | Phone: 9946485111 | Email: mail@mgmcet.ac.in",
    },
    transportation: {
      category: "Campus Services",
      highlights: [
        "Reliable college bus fleet connecting the campus to Ernakulam and surrounding regions.",
        "Experienced drivers adhering strictly to safety regulations.",
        "Punctual daily routes coordinated with morning and evening class timings.",
      ],
      body: [
        "Comprehensive, reliable, and safe transportation service is provided by MGMCET connecting the Pampakuda campus to major towns across Ernakulam district.",
        "Bus routes and schedules are designed to provide stress-free, dependable transit for day scholars and faculty members.",
      ],
      contactInfo: "Transport In-charge | Phone: 7902995111 | Email: mail@mgmcet.ac.in",
    },
    nss: {
      category: "Social Outreach & Volunteering",
      highlights: [
        "Recipient of the prestigious Indira Gandhi National Award for Best NSS Unit and Best Programme Officer (Prof. Shajahan C.M, Dept. of ME).",
        "Two active NSS units: Unit Nos. 246 & 574 with 160 student volunteers.",
        "Community support initiatives: digital literacy, blood donation camps, school libraries, and pre-school education.",
        "Disaster relief support providing first aid, food, clothing, and rehabilitation.",
      ],
      body: [
        "The National Service Scheme at MGMCET focuses on inspiring and inculcating the spirit of service-mindedness and social responsibility in students. NSS volunteers strive to ensure that the needy get assistance to enhance their living standards and lead a life of dignity.",
        "Our unit was honored with the prestigious Indira Gandhi National Award for the Best NSS Unit and for the Best Programme Officer (awarded to Mr. Shajahan C.M, Asst. Professor, Department of ME) in recognition of exemplary community activities.",
      ],
      contactInfo: "NSS Programme Officer, Units 246 & 574, MGMCET Pampakuda.",
    },
    "women-cell": {
      category: "Empowerment & Inclusion",
      highlights: [
        "Regular interactive seminars on adolescent health, nutrition, and hygiene.",
        "Workshops on women entrepreneurship and startup initiatives.",
        "Legal awareness sessions on equality laws, anti-discrimination, and protection acts in association with the Kerala Legal Services Authority.",
        "Cyber awareness and digital security workshops.",
      ],
      body: [
        "The Women Cell at MGMCET is dedicated to empowering women students and staff, fostering a safe, respectful, and encouraging environment across campus.",
        "The cell conducts structured awareness sessions covering balanced nutrition, reproductive health, legal literacy, digital cyber safety, and entrepreneurship skills.",
      ],
      contactInfo: "Women Cell Convener | Email: mail@mgmcet.ac.in",
    },
    "arts-club": {
      category: "Creativity & Culture",
      highlights: [
        "Vibrant annual celebration of Arts Day showcasing performances, artwork, and creative competitions.",
        "Freshers' Day celebrations with special guest appearances, including renowned actor Eldho Mathew.",
        "Platform for music, dance, theater, literature, and fine arts.",
      ],
      body: [
        "The Arts Club at MGMCET is a vibrant platform for students to showcase their creative talents through music, dance, drama, fine arts, and literary competitions.",
        "Arts Day and Freshers' Day events bring the entire college community together in a celebration of talent, camaraderie, and artistic expression.",
      ],
      contactInfo: "Staff Advisor, Arts Club & Cultural Activities.",
    },
    "sports-club": {
      category: "Athletics & Physical Fitness",
      highlights: [
        "Annual MGM Sports Meet bringing students and faculty together in athletic competition.",
        "MGM Soccer tournament series (Season 3 & 2026).",
        "MGM ATHLON sports championship.",
        "First runner-up position in the Inter-Polytechnic Central Zone badminton competition.",
      ],
      body: [
        "Physical education and sports activities at MGMCET foster physical fitness, sportsmanship, and teamwork among students.",
        "The college hosts annual sports meets and football tournaments, encouraging students to excel in university-level and zonal athletic events.",
      ],
      contactInfo: "Department of Physical Education, MGMCET.",
    },
    "associations-and-clubs": {
      category: "Student Communities",
      highlights: [
        "Active department associations for Computer Science, AI & ML, ECE, and Mechanical.",
        "Technical workshops, hands-on industrial demonstrations, and student project expos.",
        "Industry-interaction sessions such as Autobahn BharatBenz truck demonstrations and electrical engineering workshops.",
      ],
      body: [
        "Student associations at MGMCET connect classroom learning to practical industrial application. Through student-led workshops, guest lectures, and project exhibitions, students build leadership and technical capabilities.",
      ],
      contactInfo: "Coordinated by Department Faculty Advisors.",
    },
  },
};
