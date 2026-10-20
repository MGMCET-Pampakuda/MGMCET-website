# MGM College of Engineering and Technology (MGMCET) — Official Website

Modern, accessible, performant, and fully data-driven institutional portal for **MGM College of Engineering and Technology (MGMCET)**, Pampakuda, Ernakulam, Kerala (Established in 1994, managed by the Geevarghese Yorke Charitable Trust).

Affiliated to **APJ Abdul Kalam Technological University (KTU)** and approved by **AICTE**, New Delhi.

---

## ⚡ Tech Stack

- **Framework:** Next.js 16 (App Router, Static HTML Export `output: "export"`)
- **Language:** TypeScript (Strict mode, zero `any`, zero unchecked globals)
- **Styling:** Tailwind CSS v4 with semantic `@theme` design tokens in `app/globals.css`
- **Component Variants:** `class-variance-authority` (CVA) + `tailwind-merge` + `clsx` (`cn()`)
- **Iconography:** `lucide-react` with centralized string registry (`components/shared/icons.ts`)
- **Motion:** `framer-motion` (reduced-motion safe, scroll reveal, dialog transitions)
- **Carousel:** `embla-carousel-react` + `embla-carousel-autoplay`
- **Forms & Validation:** `react-hook-form` + `zod`
- **Backend / Services:** Firebase (Firestore create-only `enquiries` collection + Firebase Hosting)

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js `v18.x` or later
- npm `v9.x` or later

### 2. Installation
```bash
git clone <repository-url>
cd mgmcet
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run with Design System Catalog (Dev Only)
To view the live component library, color swatches, typography scale, and layout primitives:
```bash
NEXT_PUBLIC_SHOW_DESIGN_SYSTEM=true npm run dev
```
Navigate to [http://localhost:3000/design-system/](http://localhost:3000/design-system/).

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Validates TypeScript and exports static HTML production bundle into `out/` |
| `npm run lint` | Runs ESLint checks across all TypeScript and React files |
| `npx tsc --noEmit` | Strict type checking without emitting JS files |
| `npm run preview` | Serves the generated static `out/` directory locally on port 3000 |

---

## 📁 Repository Folder Map

```text
mgmcet/
├── app/                              # Next.js App Router root
│   ├── (site)/                       # Public site route group
│   │   ├── page.tsx                  # Home page (composed of 11 standalone sections)
│   │   ├── layout.tsx                # Site layout (Header, AnnouncementBar, Footer, JSON-LD)
│   │   ├── about/                    # About MGMCET page
│   │   ├── academics/                # Academics hub & regulatory disclosures
│   │   │   ├── aicte-approval/
│   │   │   ├── aicte-feedback/
│   │   │   ├── anti-ragging/
│   │   │   ├── grievance-cell/
│   │   │   ├── iqac/
│   │   │   ├── mandatory-disclosure/
│   │   │   ├── mous/
│   │   │   ├── nirf/
│   │   │   ├── research-and-development/
│   │   │   └── sc-st-committee/
│   │   ├── admissions/               # Admissions portal & fee eligibility
│   │   ├── campus-life/              # Campus life hub & [slug] facilities
│   │   ├── careers/                  # Career openings & faculty vacancies
│   │   ├── contact/                  # Contact directory & inquiry form
│   │   ├── departments/              # Department index, level pages & [slug] detail
│   │   ├── downloads/                # Searchable academic document repository
│   │   ├── faculty/                  # Institution-wide faculty directory
│   │   ├── gallery/                  # Filterable photo & event showcase
│   │   ├── news-events/              # News & notices listing and [slug] articles
│   │   ├── placements/               # Placement statistics & recruiter marquee
│   │   ├── privacy-policy/           # Privacy policy
│   │   └── terms/                    # Terms and conditions
│   ├── globals.css                   # Tailwind v4 theme tokens, fonts, & layer classes
│   ├── layout.tsx                    # Root HTML document, meta, and fonts
│   ├── manifest.ts                   # Web app manifest generator
│   ├── not-found.tsx                 # Custom 404 page
│   ├── robots.ts                     # Search engine crawler directives
│   └── sitemap.ts                    # Dynamic XML sitemap generator
├── components/                       # Modular UI Component Architecture
│   ├── design-system/                # Dev-only visual component catalog
│   ├── layout/                       # Header, Footer, PageHero, Container, Section
│   ├── sections/                     # Data-driven page sections (HeroSlider, StatsStrip, etc.)
│   ├── shared/                       # Reveal animations, ImageWithFallback, JsonLd, Icons
│   ├── templates/                    # Reusable page templates (ContentPage, ListingPage, etc.)
│   └── ui/                           # Atomic primitives (Button, Card, Badge, Modal, Tabs, etc.)
├── content/                          # Single Source of Truth for Content (TypeScript)
│   ├── about.ts                      # Vision, mission, history, leadership
│   ├── academics.ts                  # Academic committees, policies, statutory docs
│   ├── admissions.ts                 # Eligibility, intake, fee structure, FAQs
│   ├── campus-life.ts                # Library, hostels, transportation, clubs, NSS
│   ├── careers.ts                    # Job openings and application instructions
│   ├── departments/                  # 15 departmental data files (B.Tech, M.Tech, Polytechnic)
│   ├── downloads.ts                  # Prospectus, KTU regulations, syllabus PDFs
│   ├── faculty.ts                    # Faculty profiles, qualifications, emails
│   ├── gallery.ts                    # Campus photo albums and tags
│   ├── home.ts                       # Hero slides, Why MGM, director message, quick links
│   ├── navigation.ts                 # Header mega menu, mobile drawer, footer columns
│   ├── news.ts                       # News updates, circulars, notifications
│   ├── placements.ts                 # Placement stats, recruiter logos, testimonials
│   └── site.ts                       # Global metadata, contact numbers, social URLs
├── docs/                             # Engineering and Content Documentation
│   ├── ADDING-A-PAGE.md              # Guide to creating new pages using templates
│   ├── ARCHITECTURE.md               # Architecture layers, conventions, and mermaid diagram
│   ├── CONTENT-GUIDE.md              # Content editing recipes & placeholder replacement guide
│   ├── DEPLOYMENT.md                 # Firebase project setup, hosting & security rules
│   └── THEMING.md                    # Color token reference and 10-minute re-skinning guide
├── lib/                              # Core Utilities & Infrastructure
│   ├── cn.ts                         # Class merging helper (clsx + tailwind-merge)
│   ├── constants.ts                  # Site constants (base URL, storage paths)
│   └── firebase.ts                   # SSR-safe lazy-initialized Firebase wrapper
├── public/                           # Static Assets & SVGs
│   ├── documents/                    # Static PDF downloads
│   ├── images/                       # Brand logos, hero graphics, facility photos
│   └── reference/                    # Design reference materials
├── types/                            # Strict TypeScript Type Definitions
├── firebase.json                     # Firebase Hosting headers and cleanUrls configuration
├── firestore.rules                   # Strict create-only Firestore security rules
├── next.config.ts                    # Next.js export & dev-only route gating configuration
├── package.json                      # Project dependencies and script definitions
└── tsconfig.json                     # TypeScript strict configuration
```

---

## 🏛️ Architecture Principles

1. **Strict Layer Separation:**
   `content/` (typed data) → `components/sections/` (data-driven) → `components/templates/` (structural templates) → `app/` (thin route wrappers).
2. **Zero Hardcoded Data:**
   Components never contain raw strings, hex colors, phone numbers, or image paths. All copy lives in `/content`, all styling in semantic `@theme` tokens in `app/globals.css`.
3. **WCAG 2.2 AA Compliance:**
   Skip links, visible focus indicators, semantic landmarks, high color contrast (> 4.5:1), keyboard-accessible mega menus and accordions, and `prefers-reduced-motion` safety.
4. **Static Export Reliability:**
   Built with `output: "export"`. Every dynamic route declares `generateStaticParams`. No server dependencies or runtime node processes required.

For comprehensive details on layers and patterns, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 🎨 Design System & Theming

The site design system is driven by semantic CSS variables configured via Tailwind v4's `@theme` directive:
- **Brand (Deep Forest Green):** `#071f14` to `#f2f7f3` (`brand-950` to `brand-50`)
- **Accent (Kerala Temple Gold):** `#8a6420` to `#fdf7ec` (`accent-700` to `accent-50`)
- **Surface & Canvas:** `#ffffff` (surface) and `#faf8f3` (warm parchment canvas)
- **Ink:** `#14201a` to `#c8d4cc` (`ink-900` to `ink-200`)

The entire website can be re-skinned for another institution in under 10 minutes by editing only the color tokens in `app/globals.css`. See [docs/THEMING.md](docs/THEMING.md).

---

## 📝 Content Management

To edit announcements, add news, register a new department, or update contact info, refer to [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md). It contains step-by-step recipes and a checklist of placeholders to replace with verified college data.

---

## 🚀 Deployment

The site is configured for static hosting on **Firebase Hosting** with admission enquiries saved to **Firestore**:

```bash
# 1. Type check & build static assets
npx tsc --noEmit
npm run lint
npm run build

# 2. Deploy security rules & hosting
firebase deploy
```

Detailed deployment instructions, Firestore rules breakdown, and custom domain setup for `www.mgmcet.ac.in` are documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## 📄 License

Copyright © 2026 MGM College of Engineering and Technology. All rights reserved.
