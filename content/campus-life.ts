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
        "An extensive collection of technical books, journals, and digital resources — from traditional hard copies to e-books — curated to meet all educational needs.",
      image: "/images/facilities/library.svg",
      imageAlt: "MGMCET Library",
      iconName: "Library",
      href: "/campus-life/library",
    },
    {
      slug: "labs-and-workshops",
      title: "Labs & Workshops",
      description:
        "State-of-the-art laboratories and workshops equipped with the latest technology, providing hands-on learning experiences across all engineering disciplines.",
      image: "/images/facilities/labs.svg",
      imageAlt: "MGMCET Labs and Workshops",
      iconName: "FlaskConical",
      href: "/campus-life/labs-and-workshops",
    },
    {
      slug: "hostel",
      title: "Hostel Facilities",
      description:
        "Safe, comfortable, and modern hostel facilities for boys and girls — a true home away from home with all essential amenities.",
      image: "/images/facilities/hostel.svg",
      imageAlt: "MGMCET Hostel",
      iconName: "Home",
      href: "/campus-life/hostel",
    },
    {
      slug: "transportation",
      title: "Transportation",
      description:
        "Comprehensive, reliable, and safe transportation services connecting the campus to major districts and towns across the region.",
      image: "/images/facilities/transport.svg",
      imageAlt: "MGMCET Transportation",
      iconName: "Bus",
      href: "/campus-life/transportation",
    },
    {
      slug: "nss",
      title: "NSS",
      description:
        "The NSS unit at MGMCET encourages students to contribute to social welfare through community service, awareness campaigns, and volunteering.",
      image: "/images/placeholders/nss.svg",
      imageAlt: "NSS at MGMCET",
      iconName: "Heart",
      href: "/campus-life/nss",
    },
    {
      slug: "women-cell",
      title: "Women Cell",
      description:
        "A dedicated cell to ensure a safe, empowering, and inclusive environment for women students and staff on campus.",
      image: "/images/placeholders/women-cell.svg",
      imageAlt: "Women Cell at MGMCET",
      iconName: "Shield",
      href: "/campus-life/women-cell",
    },
    {
      slug: "arts-club",
      title: "Arts Club",
      description:
        "A vibrant platform for students to showcase their creative talents through music, dance, drama, fine arts, and literary events.",
      image: "/images/placeholders/arts-club.svg",
      imageAlt: "Arts Club at MGMCET",
      iconName: "Palette",
      href: "/campus-life/arts-club",
    },
    {
      slug: "sports-club",
      title: "Sports & Fitness",
      description:
        "Facilities and coaching for a wide range of sports, promoting physical fitness and sportsmanship among students.",
      image: "/images/placeholders/sports-club.svg",
      imageAlt: "Sports Club at MGMCET",
      iconName: "Trophy",
      href: "/campus-life/sports-club",
    },
    {
      slug: "etcetera-club",
      title: "Etcetera Club",
      description:
        "MGMCET's official student creative community — beyond boundaries, beyond categories.",
      image: "/images/placeholders/etcetera.svg",
      imageAlt: "Etcetera Club at MGMCET",
      iconName: "Sparkles",
      href: "http://bento.me/etcetera",
      isExternal: true,
    },
    {
      slug: "associations-and-clubs",
      title: "Associations & Clubs",
      description:
        "Department associations and interest-based clubs enabling students to connect, learn, and grow beyond academics.",
      image: "/images/placeholders/clubs.svg",
      imageAlt: "Associations and Clubs at MGMCET",
      iconName: "Users2",
      href: "/campus-life/associations-and-clubs",
    },
  ],

  clubs: [
    // TODO(content): add full list of student clubs and associations with their details
    { name: "CSE Association", slug: "cse-association", href: "/campus-life/associations-and-clubs" },
    { name: "ECE Association", slug: "ece-association", href: "/campus-life/associations-and-clubs" },
    { name: "Mechanical Association", slug: "mechanical-association", href: "/campus-life/associations-and-clubs" },
    { name: "NSS Unit", slug: "nss", href: "/campus-life/nss" },
    { name: "Arts Club", slug: "arts-club", href: "/campus-life/arts-club" },
    { name: "Sports Club", slug: "sports-club", href: "/campus-life/sports-club" },
    {
      name: "Etcetera Club",
      slug: "etcetera-club",
      href: "http://bento.me/etcetera",
      isExternal: true,
    },
    { name: "IEDC", slug: "iedc", href: "https://iedc.mgmcet.ac.in/", isExternal: true },
  ],
  facilityDetails: {

    library: {
      category: "Academic Infrastructure",
      highlights: [
        "Over 25,000+ print volumes, monographs, and technical reference manuals.",
        "Subscription to IEEE Xplore, DELNET, ScienceDirect, and KTU e-consortium digital databases.",
        "Air-conditioned digital library section with 30+ dedicated high-speed terminals.",
        "Spacious reading hall accommodating over 150 students simultaneously.",
        "Automated borrowing and book bank facility for semester students.",
      ],
      body: [
        "The Central Library at MGMCET serves as the knowledge nexus for undergraduate, postgraduate, and diploma students. Curated by qualified library professionals, our repository covers the complete curriculum syllabi alongside cutting-edge research literature in computer science, artificial intelligence, electronics, and mechanical engineering.",
        "In addition to traditional print volumes, students enjoy 24/7 access to digital e-books, research proceedings, NPTEL course videos, and institutional repositories facilitating comprehensive exam preparation and final-year project research.",
      ],
      contactInfo: "Working Hours: 8:30 AM – 5:30 PM (Monday to Saturday) | Email: library@mgmcet.ac.in",
    },
    "labs-and-workshops": {
      category: "Technical Infrastructure",
      highlights: [
        "Specialized computer laboratories with high-speed fiber internet and GPU workstations.",
        "Advanced manufacturing shop with CNC machines, lathes, milling tools, and welding bays.",
        "Embedded systems, IoT prototyping, VLSI design, and DSP signal processing setups.",
        "Strict compliance with national laboratory safety and AICTE infrastructure benchmarks.",
      ],
      body: [
        "Practical experimentation forms the foundation of engineering education at MGMCET. Our specialized departmental laboratories are continually updated to meet university curricula and modern industrial demands.",
        "Each laboratory is supervised by experienced faculty and qualified technical staff, guiding students through hands-on design, coding, circuit simulation, and mechanical fabrication from their initial semester to capstone projects.",
      ],
      contactInfo: "Supervised by respective Academic Heads of Department.",
    },
    hostel: {
      category: "Residential Living",
      highlights: [
        "Separate hostel blocks for male and female students with secure access.",
        "Spacious, well-ventilated rooms with study tables, cupboards, and high-speed Wi-Fi.",
        "Nutritious, hygienic vegetarian and non-vegetarian dining mess with purified water.",
        "24x7 security personnel, CCTV surveillance, and resident faculty wardens.",
        "Indoor recreation spaces with television, table tennis, and reading lounge.",
      ],
      body: [
        "MGMCET provides a safe, welcoming, and disciplined residential environment ensuring students feel completely at home while focusing on academic success.",
        "The residential campus fosters camaraderie, peer learning, and healthy lifestyle habits. Ragging is strictly prohibited, and wardens ensure immediate support for all medical, dietary, or personal necessities.",
      ],
      contactInfo: "Hostel Admissions Office | Phone: 9946485111 | Email: hostel@mgmcet.ac.in",
    },
    transportation: {
      category: "Campus Services",
      highlights: [
        "Fleet of modern, well-maintained college buses connecting major towns and transit hubs.",
        "Routes serving Ernakulam, Piravom, Muvattupuzha, Kothamangalam, Thodupuzha, Tripunithura, and Vaikom.",
        "Experienced, licensed drivers adhering strictly to road safety guidelines.",
        "Punctual schedules coordinated with daily morning and evening college timings.",
      ],
      body: [
        "To ensure convenient daily commutes for day-scholar students and faculty, MGMCET operates an extensive transport network spanning central Kerala's key arterial routes.",
        "Buses arrive before morning assembly and depart immediately following the conclusion of evening academic sessions. Subsidized semester bus passes are issued at the start of each academic session.",
      ],
      contactInfo: "Transport In-charge | Phone: 7902995111 | Email: transport@mgmcet.ac.in",
    },
    nss: {
      category: "Social Outreach & Volunteering",
      highlights: [
        "Affiliated unit of the National Service Scheme (NSS) under APJ Abdul Kalam Technological University.",
        "Regular blood donation camps, free medical check-ups, and disaster relief campaigns.",
        "Annual 7-day residential village adoption camp focusing on rural development.",
        "Environmental initiatives including tree planting, energy conservation, and plastic-free drives.",
      ],
      body: [
        "The National Service Scheme unit at MGMCET instills civic responsibility, social empathy, and teamwork in aspiring engineers. Under the motto 'Not Me But You', student volunteers actively collaborate with local panchayats to address grassroots challenges.",
        "Participation in NSS activities earns grace marks under university regulations and equips students with invaluable organizational, communication, and crisis-management leadership skills.",
      ],
      contactInfo: "NSS Programme Officer, MGMCET Pampakuda.",
    },
    "women-cell": {
      category: "Empowerment & Inclusion",
      highlights: [
        "Dedicated committee championing gender equity, safety, and empowerment on campus.",
        "Self-defense workshops, legal literacy seminars, and health awareness sessions.",
        "Mentorship programs connecting female students with successful women engineers and leaders.",
        "Confidential counseling and rapid grievance redressal mechanisms.",
      ],
      body: [
        "The Women Cell at MGMCET is dedicated to creating a supportive, equitable, and harassment-free academic atmosphere. The cell organizes interactive panel discussions, leadership seminars, and career planning sessions for female students and staff.",
        "Any concerns or suggestions can be addressed directly to the convener in complete confidence, guaranteeing prompt attention and institutional backing.",
      ],
      contactInfo: "Women Cell Convener | Email: womencell@mgmcet.ac.in",
    },
    "arts-club": {
      category: "Creativity & Culture",
      highlights: [
        "Dynamic student-led platform for music, dance, theatrical performance, and fine arts.",
        "Annual intra-college cultural festival celebrating Kerala's vibrant artistic heritage.",
        "Coaching and sponsorship for university youth festivals and national competitions.",
        "Active instrumental bands, vocal ensembles, literary debating squads, and design clubs.",
      ],
      body: [
        "Engineering flourishes when combined with artistic expression. The Arts Club provides every student an open stage to nurture their innate talents in classical, western, and contemporary creative disciplines.",
        "Through rehearsals, stage productions, and inter-collegiate events, students develop public presentation confidence, aesthetic appreciation, and lifelong friendships.",
      ],
      contactInfo: "Staff Advisor, Arts Club & Cultural Activities.",
    },
    "sports-club": {
      category: "Athletics & Physical Fitness",
      highlights: [
        "Expansive outdoor playground for cricket, football, and track athletics.",
        "Dedicated volleyball and basketball courts with tournament-grade surfaces.",
        "Indoor sports room for table tennis, chess, and carrom tournaments.",
        "Annual Sports Meet promoting friendly inter-departmental athletic competition.",
        "College teams competing regularly in KTU inter-collegiate championships.",
      ],
      body: [
        "Physical fitness and sportsmanship are vital pillars of well-rounded student development. MGMCET's Department of Physical Education encourages every student to participate in sports and maintain daily active habits.",
        "Outstanding student athletes receive personalized coaching, equipment support, and attendance accommodations for university tournament fixtures.",
      ],
      contactInfo: "Department of Physical Education, MGMCET.",
    },
    "associations-and-clubs": {
      category: "Student Communities",
      highlights: [
        "Department associations representing Computer Science, AI & ML, ECE, and Mechanical.",
        "Student chapters of national professional bodies conducting coding hackathons and fests.",
        "Technical symposiums featuring paper presentations, robotics challenges, and workshops.",
        "Peer study circles and collaborative hardware project development teams.",
      ],
      body: [
        "Student associations form the vibrant core of department life at MGMCET. These communities organize annual technical symposiums, invite industry veterans for interactive guest talks, and host collegiate coding competitions.",
        "Through executive committee roles, students gain direct experience in project planning, financial management, corporate sponsorship, and large-scale event execution.",
      ],
      contactInfo: "Coordinated by Respective Department Faculty Advisors.",
    },
  },
};

