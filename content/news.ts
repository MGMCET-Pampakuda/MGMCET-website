import type { NewsItem } from "@/types";

/**
 * News & Events — newest first.
 * Adding a new item here automatically updates: news listing, home Latest Updates, detail pages, and sitemap.
 * TODO(content): replace all items below with real news from the college.
 */
export const news: NewsItem[] = [
  {
    id: "news-1",
    slug: "technical-talk-emerging-technologies-2026",
    category: "event",
    title: "Technical Talk on Emerging Technologies",
    excerpt:
      "MGMCET hosted an insightful session on emerging trends in AI and cloud computing, featuring industry experts.", // TODO(content): update with real event details
    date: "2026-09-22",
    image: "/images/news/news-1.svg",
    imageAlt: "Technical talk session at MGMCET", // TODO(content): update with real image
    tags: ["technology", "seminar"],
  },
  {
    id: "news-2",
    slug: "mgm-students-win-national-hackathon-2026",
    category: "news",
    title: "MGM Students Win at National Hackathon",
    excerpt:
      "A team from MGMCET's CSE department secured top position at a national-level hackathon, impressing judges with an innovative solution.", // TODO(content): update with real event details
    date: "2026-09-15",
    image: "/images/news/news-2.svg",
    imageAlt: "MGMCET hackathon winning team", // TODO(content): update with real image
    tags: ["achievement", "hackathon"],
  },
  {
    id: "news-3",
    slug: "onam-celebrations-2026",
    category: "event",
    title: "Onam Celebrations 2026",
    excerpt:
      "MGMCET celebrated Onam with vibrant traditional festivities including pookkalam, games, and cultural performances.", // TODO(content): update with real details
    date: "2026-09-10",
    image: "/images/news/news-3.svg",
    imageAlt: "Onam celebrations at MGMCET campus", // TODO(content): update with real image
    tags: ["cultural", "festival"],
  },
  {
    id: "news-4",
    slug: "placement-drive-by-tcs-2026",
    category: "news",
    title: "Placement Drive by TCS",
    excerpt:
      "TCS conducted a campus recruitment drive at MGMCET, offering exciting opportunities for final-year engineering students.", // TODO(content): update with real details and placement numbers
    date: "2026-09-05",
    image: "/images/news/news-4.svg",
    imageAlt: "TCS placement drive at MGMCET", // TODO(content): update with real image
    tags: ["placement", "recruitment"],
  },
  {
    id: "news-5",
    slug: "faculty-development-programme-2026",
    category: "event",
    title: "Faculty Development Programme on AI Tools",
    excerpt:
      "A week-long Faculty Development Programme on integrating AI tools in education was conducted at MGMCET.", // TODO(content): update with real details
    date: "2026-08-20",
    image: "/images/news/news-5.svg",
    imageAlt: "Faculty development programme at MGMCET",
    tags: ["faculty", "workshop"],
  },
  {
    id: "news-6",
    slug: "admissions-open-2026",
    category: "news",
    title: "Admissions Open for Academic Year 2026–27",
    excerpt:
      "MGMCET has opened admissions for B.Tech, M.Tech, and Polytechnic programmes for the academic year 2026–27. Apply early to secure your seat.",
    date: "2026-07-01",
    image: "/images/news/news-6.svg",
    imageAlt: "MGMCET admissions 2026",
    tags: ["admissions"],
  },
];
