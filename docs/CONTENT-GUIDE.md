# MGMCET Content Guide

This guide is the definitive manual for content editors, department heads, and site administrators. All editable content lives in `/content/*.ts` files as strongly-typed data structures. **No components, layouts, or page code files need to be touched** when adding, modifying, or removing content.

---

## 📖 "How Do I...?" Content Recipes

### 1. How do I edit general site text, phone numbers, or social links?
All global institution details, emergency numbers, physical addresses, and social media handles reside in [`content/site.ts`](../content/site.ts).

```typescript
// content/site.ts
export const siteConfig: SiteConfig = {
  name: "MGM College of Engineering and Technology",
  shortName: "MGMCET",
  tagline: "Approved by AICTE | Affiliated to APJ Abdul Kalam Technological University",
  contact: {
    address: "MGMCET, Pampakuda, Ernakulam, Kerala - 686667",
    phone: ["+91 485 282 2222", "+91 485 282 2223"],
    email: "info@mgmcet.ac.in",
    principalEmail: "principal@mgmcet.ac.in",
    officeHours: "Monday – Saturday: 9:00 AM – 4:30 PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
  },
  social: {
    facebook: "https://facebook.com/mgmcet",
    instagram: "https://instagram.com/mgmcet",
    linkedin: "https://linkedin.com/school/mgmcet",
    youtube: "https://youtube.com/@mgmcet",
  },
};
```
*Changes made here automatically update the top AnnouncementBar, Header contact buttons, Contact page, and Footer.*

---

### 2. How do I change the Home page hero slides?
Open [`content/home.ts`](../content/home.ts). The `heroSlides` array drives the full-bleed carousel on the home page. You can customize the headline, call-to-action buttons, and background visuals.

```typescript
// content/home.ts
export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    eyebrow: "Admissions 2026–27",
    headline: "Engineering the Future with",
    headlineAccent: "Innovation & Integrity",
    description: "Empowering next-generation engineers through world-class labs, industry-led mentorship, and 30+ years of educational excellence.",
    image: "/images/hero/hero-1.svg",
    primaryCta: {
      label: "Explore Programs",
      href: "/departments",
    },
    secondaryCta: {
      label: "Watch Campus Tour",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isVideoModal: true,
    },
  },
  // Add or edit subsequent slides...
];
```

---

### 3. How do I add a news update, circular, or event?
Open [`content/news.ts`](../content/news.ts). Add a new `NewsItem` object to the top of the `news` array (newest entries first).

```typescript
// content/news.ts
export const news: NewsItem[] = [
  {
    id: "hackathon-winners-2026",
    slug: "mgm-students-win-national-hackathon-2026",
    title: "MGMCET AI Team Secures 1st Prize at National Smart India Hackathon",
    excerpt: "Students from the Department of Artificial Intelligence & Machine Learning developed an automated crop disease detection system.",
    category: "achievement", // "news" | "event" | "announcement" | "achievement"
    publishedAt: "2026-03-28",
    image: "/images/news/news-1.svg",
    featured: true,
    author: "Department of AI & ML",
    tags: ["Hackathon", "AI & ML", "National Award", "Student Achievement"],
    content: `
      ## Outstanding Performance at SIH 2026
      A team of six pre-final year students from MGMCET won the first prize of ₹1,00,000 at the Grand Finale of Smart India Hackathon.
      
      ### The Winning Project
      The team developed an edge-computing computer vision pipeline capable of detecting foliar paddy diseases in real-time.
    `,
  },
  // ... existing news items
];
```
*The Home page "Latest Updates" section (showing newest 4), the `/news-events` listing, the detail page `/news-events/[slug]`, and the XML sitemap will automatically reflect the new item.*

---

### 4. How do I add a new academic department?
Adding a department requires two steps:

#### Step 1: Create the department detail file
Create a new file in `content/departments/{level}/{slug}.ts` (e.g. `content/departments/btech/robotics.ts`):

```typescript
// content/departments/btech/robotics.ts
import type { DepartmentDetail } from "@/types";

export const roboticsDetail: DepartmentDetail = {
  id: "btech-robotics",
  slug: "robotics",
  level: "btech",
  name: "Department of Robotics & Automation",
  shortName: "Robotics & Automation",
  badge: "B.Tech Program",
  degreesOffered: ["B.Tech in Robotics and Automation"],
  duration: "4 Years (8 Semesters)",
  intake: 60,
  establishedYear: 2026,
  affiliation: "Affiliated to APJ Abdul Kalam Technological University (KTU), Approved by AICTE",
  heroImage: "/images/departments/btech-robotics.svg",
  overview: "The Department of Robotics & Automation equips students with multidisciplinary knowledge in robotics, mechatronics, and artificial intelligence.",
  vision: "To be a center of excellence in robotics engineering education and applied automation research.",
  mission: [
    "Provide cutting-edge hands-on training in industrial robotics and embedded systems.",
    "Foster industry-academia partnerships to solve manufacturing automation challenges.",
  ],
  hod: {
    name: "Dr. K. R. Suresh",
    designation: "Head of the Department",
    qualification: "Ph.D. (Robotics), IIT Madras",
    email: "hod.robotics@mgmcet.ac.in",
    image: "/images/faculty/placeholder-avatar.svg",
    message: "Welcome to the Department of Robotics & Automation...",
  },
  labs: [
    {
      name: "Industrial Robotics & Cobots Lab",
      description: "Equipped with 6-axis articulated robotic arms and programmable logic controllers.",
    },
  ],
  faculty: [
    {
      id: "fac-suresh",
      name: "Dr. K. R. Suresh",
      designation: "Professor & HOD",
      qualification: "Ph.D.",
      specialization: "Kinematics & Machine Vision",
      email: "hod.robotics@mgmcet.ac.in",
    },
  ],
  syllabusLinks: [
    {
      title: "KTU B.Tech Robotics Syllabus (2024 Scheme)",
      href: "/documents/ktu-robotics-syllabus.pdf",
    },
  ],
};
```

#### Step 2: Register in `content/departments/index.ts`
Import the new department and add it to `allDepartmentDetails` and `departmentsMeta`:

```typescript
// content/departments/index.ts
import { roboticsDetail } from "./btech/robotics";

export const allDepartmentDetails: Record<string, DepartmentDetail> = {
  // ... existing departments
  "btech-robotics": roboticsDetail,
};

export const departmentsMeta: DepartmentMeta[] = [
  // ... existing metadata
  {
    id: "btech-robotics",
    slug: "robotics",
    level: "btech",
    name: "Robotics & Automation",
    code: "RA",
    duration: "4 Years",
    intake: 60,
    image: "/images/departments/btech-robotics.svg",
  },
];
```
*The dynamic route `/departments/btech/robotics/`, the navigation menus, level listings, home department grid, and sitemap will generate automatically.*

---

### 5. How do I add a downloadable PDF or institutional document?
1. Place the PDF file in `public/documents/` (e.g. `public/documents/nirf-2026.pdf`).
2. Open [`content/downloads.ts`](../content/downloads.ts) and append an item:

```typescript
// content/downloads.ts
export const downloads: DownloadItem[] = [
  {
    id: "nirf-report-2026",
    title: "National Institutional Ranking Framework (NIRF) Report 2026",
    category: "reports", // "academic" | "reports" | "regulations" | "forms"
    fileSize: "2.4 MB",
    updatedAt: "2026-02-15",
    href: "/documents/nirf-2026.pdf",
    description: "Submitted data for NIRF 2026 Engineering category.",
  },
  // ... existing downloads
];
```
*The document will immediately appear in the searchable and filterable `/downloads` repository.*

---

### 6. How do I add or update a faculty member?
Open [`content/faculty.ts`](../content/faculty.ts). Add or edit the faculty object:

```typescript
// content/faculty.ts
export const facultyList: FacultyMember[] = [
  {
    id: "fac-cs-10",
    name: "Dr. Lakshmi Priya",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    departmentSlug: "cse",
    qualification: "Ph.D. in Deep Learning (NIT Calicut), M.Tech (Gold Medalist)",
    experienceYears: 12,
    email: "lakshmi.priya@mgmcet.ac.in",
    image: "/images/faculty/placeholder-avatar.svg",
    specialization: ["Natural Language Processing", "Computer Vision", "Medical Imaging"],
    researchPublicationsCount: 18,
  },
  // ... existing faculty
];
```

---

### 7. How do I add or modify a navigation link?
Open [`content/navigation.ts`](../content/navigation.ts). The navigation schema governs the Header mega menu, Mobile drawer, and Footer columns:

```typescript
// content/navigation.ts
export const navigation: NavigationConfig = {
  header: [
    {
      label: "Academics",
      href: "/academics",
      children: [
        { label: "Overview", href: "/academics" },
        { label: "New Academic Cell", href: "/academics/new-cell" }, // Added link
      ],
    },
    // ...
  ],
  footer: {
    columns: [
      {
        title: "Quick Links",
        links: [
          { label: "Campus Life", href: "/campus-life" },
          { label: "Online Grievance", href: "/academics/grievance-cell" },
        ],
      },
    ],
  },
};
```

---

### 8. How do I add a new Campus Life facility or club page?
Open [`content/campus-life.ts`](../content/campus-life.ts). Add a facility or club entry:

```typescript
// content/campus-life.ts
export const campusLifeFacilities: CampusLifeItem[] = [
  {
    id: "robotics-makerspace",
    slug: "robotics-makerspace",
    name: "Robotics Innovation Makerspace",
    category: "facility", // "facility" | "cell" | "club"
    tagline: "24/7 Prototyping Lab with 3D Printers and CNC Millers",
    image: "/images/facilities/makerspace.svg",
    description: "The Makerspace provides students with open access to rapid prototyping tools, IoT development kits, and electronic test benches.",
    features: [
      "Creality Ender-3 High-Speed 3D Printers",
      "Laser Cutters & PCB Milling Stations",
      "NVIDIA Jetson Nano AI Development Boards",
    ],
    contactPerson: "Prof. Arun Thomas (Lab Coordinator)",
    contactEmail: "makerspace@mgmcet.ac.in",
  },
];
```
*The dynamic subpage `/campus-life/robotics-makerspace/` will be generated with full metadata.*

---

### 9. How do I replace placeholder images with real photos?
All placeholder graphics are stored as SVGs under `public/images/`. To replace any image:
1. Save your photograph using the exact filename and recommended dimensions listed in the table below.
2. Place the file in the designated directory (e.g. `public/images/campus/campus-main.jpg` or `.svg`).
3. If changing the file extension (e.g., from `.svg` to `.webp` or `.jpg`), update the corresponding path in the matching `/content/*.ts` file.

---

### 10. How do I update the "Apply Now" application link?
Open [`content/site.ts`](../content/site.ts) and update `applyNowUrl`:

```typescript
// content/site.ts
export const siteConfig: SiteConfig = {
  // ...
  applyNowUrl: "https://admissions.mgmcet.ac.in/apply-2026", // Real application portal or Google Form
};
```
*This updates the gold "Apply Now" button in the sticky Header, the hero CTA buttons, and the Admissions portal link.*

---

## 📋 Placeholders to Replace

All items below currently contain placeholder data. Replace each item with verified information from the college administration.

### Contact & Brand
- [ ] `content/site.ts` — `contact.email` (verify principal's official email)
- [ ] `content/site.ts` — `contact.mapEmbedUrl` (replace with exact Google Maps embed URL for Pampakuda campus)
- [ ] `content/site.ts` — `social.*` (verify official YouTube, Instagram, Facebook, and LinkedIn links)
- [ ] `content/site.ts` — `applyNowUrl` (replace with the live Google Form or ERP admissions URL)
- [ ] `content/site.ts` — `announcements[].linkHref` (verify scholarship application links)

### Home Page
- [ ] `content/home.ts` — `directorQuote.name` (replace "Director, MGMCET" with the Director's actual name)
- [ ] `content/home.ts` — `stats[1].value` — currently "7" (5 B.Tech + 2 M.Tech). Confirm if Polytechnic programs should be counted separately.

### Leadership & About
- [ ] `content/about.ts` — `director.name` (replace with Director's full name and titles)
- [ ] `content/about.ts` — `director.image` (replace `/images/about/director.svg` with portrait photograph)
- [ ] `content/about.ts` — `timeline` (add historical milestones and expansion achievements)

### Academics & Statutory Committees
- [ ] `content/academics.ts` — `iqac.body` (add official IQAC committee member list and AQAR links)
- [ ] `content/academics.ts` — `antiRagging.body` (add committee members, phone numbers, and Nodal Officer contact)
- [ ] `content/academics.ts` — `aicteFeedback.relatedLinks[0].href` (verify AICTE official feedback portal URL)
- [ ] `content/academics.ts` — `researchAndDevelopment.body` (add funded research projects, patents, and publications)
- [ ] `content/academics.ts` — `grievanceCell.body` (add student ombudsman contact details and committee list)
- [ ] `content/academics.ts` — `mous.body` (add industrial partner list, signing dates, and active programs)

### Department Details (All 15 Departments: B.Tech × 5, M.Tech × 2, Polytechnic × 8)
For each department file in `content/departments/`, replace:
- [ ] `hod.name` (replace "HOD Name" with real name and qualification)
- [ ] `labs` (list verified laboratories and software packages)
- [ ] `faculty` (list full-time faculty members with designations and emails)
- [ ] `curriculumLinks` (direct PDF links to official KTU syllabus documents)
- [ ] `achievements` (student hackathon wins, university ranks, paper publications)
- [ ] `placements` (annual placement statistics and median salary packages)
- [ ] `contact.email` (official departmental contact email)

### Placements
- [ ] `content/placements.ts` — `stats.*` (replace placeholder placement percentages and package figures with verified records)
- [ ] `content/placements.ts` — `recruiters` (add complete list of visiting corporate recruiters)
- [ ] `content/placements.ts` — `pastDrives` (add real placement records by academic year)
- [ ] `content/placements.ts` — `teamContact` (verify Placement Officer name, phone, and email)

### News, Gallery & Careers
- [ ] `content/news.ts` — replace 6 sample articles with recent press releases and circulars
- [ ] `content/gallery.ts` — replace sample album entries with real event photo sets (800×600px)
- [ ] `content/careers.ts` — add current faculty and staff vacancies with application deadlines
- [ ] `content/downloads.ts` — replace placeholder PDF links for NIRF, Mandatory Disclosure, and Prospectus with real PDF files in `public/documents/`

---

## 🖼️ Images to Replace

All placeholder images are SVG files in the repository. Replace them with high-resolution photographs matching the specified dimensions:

| Asset | File Path | Target Dimensions | Notes |
|---|---|---|---|
| **Logo (Light)** | `public/images/brand/logo.svg` | Vector SVG | Green shield + MGM wordmark |
| **Logo (Dark/Footer)** | `public/images/brand/logo-light.svg` | Vector SVG | White/gold version for dark footer |
| **Favicon** | `public/images/brand/favicon.svg` | 64×64 SVG | Browser tab icon |
| **OG Social Banner** | `public/images/brand/og-image.png` | 1200×630 PNG | OpenGraph image for WhatsApp/Twitter |
| **Hero Slide 1** | `public/images/hero/hero-1.svg` | 1920×1080 | Main campus aerial or facade photograph |
| **Hero Slide 2** | `public/images/hero/hero-2.svg` | 1920×1080 | High-tech computer lab or robotics workspace |
| **Hero Slide 3** | `public/images/hero/hero-3.svg` | 1920×1080 | Students collaborating / graduation ceremony |
| **Campus Main** | `public/images/campus/campus-main.svg` | 800×600 | About page header & split image |
| **Campus Life** | `public/images/campus/campus-life.svg` | 800×600 | Campus life hub hero photo |
| **Director Portrait** | `public/images/about/director.svg` | 400×400 | Formal executive portrait of the Director |
| **Faculty Avatar** | `public/images/faculty/placeholder-avatar.svg` | 400×400 | Default avatar fallback for faculty members |
| **B.Tech AIML Hero** | `public/images/departments/btech-aiml.svg` | 800×450 | AI & ML lab photograph |
| **B.Tech CSE Cyber Hero** | `public/images/departments/btech-cse-cyber.svg` | 800×450 | Cyber security & forensics lab photograph |
| **B.Tech CSE Hero** | `public/images/departments/btech-cse.svg` | 800×450 | Software engineering lab photograph |
| **B.Tech ECE Hero** | `public/images/departments/btech-ece.svg` | 800×450 | VLSI & communication lab photograph |
| **B.Tech Mech Hero** | `public/images/departments/btech-mechanical.svg` | 800×450 | CAD/CAM & thermal engineering workshop |
| **M.Tech IIC Hero** | `public/images/departments/mtech-iic.svg` | 800×450 | Advanced computing research center |
| **M.Tech SECM Hero** | `public/images/departments/mtech-secm.svg` | 800×450 | Structural engineering testing facility |
| **Polytechnic (8 depts)** | `public/images/departments/poly-{slug}.svg` | 800×450 | 8 individual polytechnic lab photographs |
| **Central Library** | `public/images/facilities/library.svg` | 800×600 | Reading hall and digital library photograph |
| **Labs & Workshops** | `public/images/facilities/labs.svg` | 800×600 | Mechanical and electrical workshops |
| **Hostel Facilities** | `public/images/facilities/hostel.svg` | 800×600 | Student residency and dining hall |
| **Transportation** | `public/images/facilities/transport.svg` | 800×600 | College bus fleet on campus |
| **Gallery Images (1–8)** | `public/images/gallery/gallery-{1-8}.svg` | 800×600 | College festivals, arts, sports, convocations |
| **Recruiter Logos** | `public/images/recruiters/{name}.svg` | 160×60 | Transparent corporate logos of recruiters |
