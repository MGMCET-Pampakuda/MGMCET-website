# ANTIGRAVITY MASTER PROMPT — MGMCET College Website Rebuild

## 0. ROLE & MISSION

You are a senior frontend architect + UI/UX engineer. Rebuild the website of **MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam, Kerala** (current site: https://www.mgmcet.ac.in/, built on Wix) as a **production-grade, multi-page, fully static-capable college website**.

Primary goals, in priority order:
1. **Reusable, modular architecture** — a design system + content layer so any college can be re-skinned by editing tokens and content files only.
2. **Easy maintainability** — the next developer (possibly a non-expert) must be able to add a page, edit text, add news, add a department, or change colors **without touching components**.
3. **Professional, modern, accessible, fast UI** matching the attached reference image (landing page).
4. **Accurate content** sourced from the original site (Section 3). Never invent facts.

Work autonomously. Plan first, then build in the phases in Section 12. Do not ask questions; where information is missing, use clearly marked placeholders (Section 3.4).

---

## 1. TECH STACK (fixed)

- **Next.js (latest stable, App Router)** + **TypeScript (strict)**
- **Tailwind CSS v4** (CSS-first config with `@theme` tokens in `globals.css`). If v4 causes issues, fall back to v3 with `tailwind.config.ts` — but the token-driven approach stays identical.
- **Utilities:** `clsx` + `tailwind-merge` (a single `cn()` helper), `class-variance-authority` (variants)
- **Icons:** `lucide-react`
- **Animation:** `framer-motion` (subtle only; respect `prefers-reduced-motion`)
- **Carousel:** `embla-carousel-react`
- **Forms:** `react-hook-form` + `zod` (+ `@hookform/resolvers`)
- **Fonts:** `next/font/google` — headings: **Poppins** (or Plus Jakarta Sans), body: **Inter**, accent script (used sparingly for photo overlay captions like "Where Ideas Grow"): **Caveat**
- **Backend:** NONE. Use **Firebase only where required**:
  - Firestore → contact/enquiry form submissions (and optional newsletter)
  - Firebase Hosting for deployment (static export)
  - Firebase config via `NEXT_PUBLIC_*` env vars, wrapped in a single `lib/firebase.ts`. App must **build and run without Firebase keys** (form falls back to a graceful "not configured" state in dev).
- **Rendering:** configure for **static export** (`output: 'export'`, `images.unoptimized: true` if required) so it deploys to Firebase Hosting / any static host. All pages statically generated; dynamic routes use `generateStaticParams`.
- **Quality tooling:** ESLint, Prettier (+ `prettier-plugin-tailwindcss`), `husky` optional, absolute imports via `@/`.
- **No** Redux, no heavy UI kits (no MUI/Chakra/Bootstrap). Build components in-house on Tailwind.

---

## 2. ARCHITECTURE (strict — follow exactly)

```
/
├─ app/
│  ├─ (site)/                      # public route group, shares Header/Footer layout
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                  # Home
│  │  ├─ about/page.tsx
│  │  ├─ admissions/page.tsx
│  │  ├─ academics/
│  │  │  ├─ page.tsx               # Academics overview
│  │  │  ├─ iqac/page.tsx
│  │  │  ├─ nirf/page.tsx
│  │  │  ├─ mous/page.tsx
│  │  │  ├─ anti-ragging/page.tsx
│  │  │  ├─ aicte-approval/page.tsx
│  │  │  ├─ sc-st-committee/page.tsx
│  │  │  ├─ mandatory-disclosure/page.tsx
│  │  │  ├─ aicte-feedback/page.tsx
│  │  │  ├─ research-and-development/page.tsx
│  │  │  └─ grievance-cell/page.tsx
│  │  ├─ departments/
│  │  │  ├─ page.tsx               # all programs overview (tabs: B.Tech / M.Tech / Polytechnic)
│  │  │  ├─ btech/page.tsx
│  │  │  ├─ mtech/page.tsx
│  │  │  ├─ polytechnic/page.tsx
│  │  │  └─ [level]/[slug]/page.tsx   # department detail (SSG from content)
│  │  ├─ campus-life/
│  │  │  ├─ page.tsx
│  │  │  ├─ [slug]/page.tsx        # facilities & clubs detail (library, labs, hostel, transport, nss, women-cell, arts-club, sports-club, associations-and-clubs, etc.)
│  │  ├─ placements/page.tsx       # Training & Placement Cell
│  │  ├─ faculty/page.tsx
│  │  ├─ news-events/
│  │  │  ├─ page.tsx               # list with filter (All / News / Events) + pagination
│  │  │  └─ [slug]/page.tsx
│  │  ├─ gallery/page.tsx
│  │  ├─ careers/page.tsx
│  │  ├─ downloads/page.tsx        # all PDFs/forms in one place
│  │  ├─ contact/page.tsx
│  │  ├─ privacy-policy/page.tsx
│  │  └─ terms/page.tsx
│  ├─ not-found.tsx
│  ├─ sitemap.ts   robots.ts   manifest.ts   opengraph-image (static)
│  ├─ layout.tsx                   # root: fonts, metadata, providers
│  └─ globals.css                  # ONLY place for design tokens + base layer
│
├─ components/
│  ├─ ui/                          # primitives (no business logic, fully reusable)
│  │  Button, Badge, Card, Input, Textarea, Select, Tabs, Accordion, Modal, Tooltip,
│  │  Breadcrumb, Pagination, Skeleton, Divider, IconBox, Avatar, Link (smart: internal/external/pdf)
│  ├─ layout/
│  │  Header, MegaMenu/NavDropdown, MobileDrawer, Footer, TopBar, AnnouncementBar,
│  │  Container, Section, SectionHeader, PageHero, PageShell, BackToTop
│  ├─ sections/                    # composable page sections, all data-driven via props
│  │  HeroSlider, StatsStrip, AboutSplit, VisionMission, ProgramCards, FeatureGrid,
│  │  DepartmentGrid, CampusLifeSplit, NewsGrid, CTABanner, FacultyGrid, Timeline,
│  │  DocumentList, GalleryGrid, ContactSection, RichContent, FAQ, CourseTable
│  ├─ forms/                       # ContactForm, EnquiryForm (shared FormField wrappers)
│  └─ shared/                      # SEO/JsonLd, ScrollReveal, ImageWithFallback, Icon registry
│
├─ content/                        # ALL editable text/data lives here (typed, no JSX)
│  ├─ site.ts                      # name, short name, logo, address, phones, email, socials, code (MGE), colors meta
│  ├─ navigation.ts                # header/footer/quick-links/mega-menu — single source
│  ├─ home.ts
│  ├─ about.ts
│  ├─ academics.ts                 # IQAC, NIRF, MoUs, committees, policies
│  ├─ departments/
│  │  ├─ index.ts                  # registry
│  │  ├─ btech/{aiml,cse,cse-cyber-security,ece,mechanical}.ts
│  │  ├─ mtech/{industrial-instrumentation-control,structural-engineering-construction-management}.ts
│  │  └─ polytechnic/{aiml,civil,cse,automobile,mechanical,eee,ece,electrical-ev}.ts
│  ├─ campus-life.ts
│  ├─ placements.ts
│  ├─ faculty.ts
│  ├─ news.ts                      # news & events array (newest first)
│  ├─ gallery.ts
│  ├─ downloads.ts                 # PDFs + external links
│  └─ careers.ts
│
├─ lib/
│  ├─ cn.ts   firebase.ts   seo.ts   format.ts   constants.ts
│  └─ validators/ (zod schemas)
├─ types/                          # shared TS types for every content shape
├─ hooks/                          # useMediaQuery, useScrollSpy, useDisclosure ...
├─ public/
│  ├─ images/{brand,hero,campus,departments,news,placeholders}/
│  └─ documents/                   # PDFs
├─ docs/
│  ├─ ARCHITECTURE.md   CONTENT-GUIDE.md   THEMING.md   ADDING-A-PAGE.md   DEPLOYMENT.md
├─ .env.example
└─ README.md
```

### Architecture rules (non-negotiable)
1. **Pages are thin.** A page file only imports sections and passes content: `<PageHero {...about.hero} /> <AboutSplit {...about.intro} />`. No hardcoded copy in pages or components.
2. **Content is typed data.** Every section component takes a typed props interface from `/types`. Editing `/content/*.ts` must update the site with zero component edits.
3. **Nav is data.** Header, mobile drawer, footer links, and sitemap all read from `content/navigation.ts`.
4. **Adding a department = adding one file** in `/content/departments/...` + registering it in the index. The detail page, listing cards, nav entries, footer links, and sitemap update automatically.
5. **Adding news = adding one object** to `content/news.ts`. List, detail page, home “Latest Updates”, and sitemap update automatically.
6. **No duplicated markup.** If a pattern appears twice, extract it.
7. Components: one component per file, named exports, props typed, `className` prop merged via `cn()` on every component for override-ability.
8. Server Components by default; `"use client"` only where needed (slider, mobile menu, tabs, forms, animations).
9. Barrel `index.ts` per component folder.

---

## 3. CONTENT (use the real content from the original site)

### 3.1 Brand / contact (put in `content/site.ts`)
- Name: **MGM College of Engineering and Technology** (short: **MGMCET**), part of **MGM Group of Institutions**
- Location: **Pampakuda, Ernakulam (Dist.), Kerala**
- Phones: **9946485111, 7902995111**
- College code: **MGE**
- Tagline on original: “Excellence Since 1994”, “Spark Your Future at MGM College of Engineering and Technology”
- Affiliation text: **AICTE Approved • Affiliated to APJ Abdul Kalam Technological University (KTU)**
- Credits in footer: “Developed by Dept of CSE” → replace with configurable `credits` field
- Admission Apply link (Google Form): use the existing form URL from the original site's “Apply Now” button
- Social links: placeholders in `site.ts`

### 3.2 Real text to reuse
**Announcement bar:** “Admissions Open for 2026, Apply Now!” · “Mammooty's Vidyamrutham Scholarship is live now! Click Here to Apply”

**Hero:** “Excellence Since 1994 — Spark Your Future at MGM College of Engineering and Technology. Transform your passion into expertise with cutting edge technologies, state of the art facilities, and industry connections at Pampakuda's premier engineering institution.” CTAs: **B-Tech**, **Polytechnic** (+ Apply Now).

**Hero badges:** “40+ Industry Partners / Global Connections” · “A+ AICTE Approved, Affiliated to KTU” — (verify wording; keep as editable data)

**Vision & Mission (About):**
> MGM College of Engineering & Technology, a renowned institution committed to developing globally competent professionals in technology and management with refined attitudes. Our vision is to be a center of excellence, molding individuals into leaders who excel on a global scale. With a mission to provide teaching and learning at international standards, we prepare students for the challenges of a rapidly evolving world. Our career-oriented programs and industry interactions ensure students gain practical exposure and excellent opportunities to succeed in global competitions. We emphasize social commitment, and nurturing responsible individuals ready to make a positive impact. By fostering innovation and problem-solving, we empower students to approach challenges creatively.

Split this into a clean **Vision** card and **Mission** card (editorially, without changing meaning).

**Campus-life block:** “Beyond Books. Into the Real World — Explore, Express, Evolve. At MGMCET, we believe that education goes hand in hand with experience. From idea labs to cultural fests, student-led clubs to sports arenas — our campus is built to unlock your full potential. Join a community where learning is a lifestyle, and every day brings new opportunities to grow.”
Stats: Activity Clubs **10+** · Student Events **10+** · Volunteering Activities **5+** · Educational Programs **15+**

**Director quote:** “At MGMCET, we are committed to creating an academic ecosystem that inspires excellence and fuels innovation preparing students to thrive in a changing world.” — Director, MGMCET, Pampakuda

**“What MGMCET Offers You” (Why MGM):**
1. Well-Qualified Faculty — committed to providing a challenging and supportive educational environment.
2. Labs & Workshop — state-of-the-art labs and workshops fully equipped with the latest technology and equipment.
3. Library — traditional hard copies to e-books; an extensive collection tailored to education needs.
4. Boys & Girls Hostel — safe, comfortable, modern amenities; a home away from home.
5. Transportation Facilities — comprehensive, reliable and safe transportation service.

**CTA:** “Ready to Begin Your Journey? Join MGM College of Engineering and Technology to unlock your potential and build a successful career in the field of engineering and technology.” → Apply Now

**Contact form fields:** Full Name*, Email, Phone* (India +91), District*, Message*. Helper note: “For faster response regarding admission related queries, we suggest you to contact us through any of the phone numbers provided in the site.”

### 3.3 Programs (authoritative list — overrides the reference image)
**B.Tech:** Artificial Intelligence & Machine Learning · Computer Science & Engineering (Cyber Security) · Computer Science & Engineering · Electronics & Communication Engineering · Mechanical Engineering
**M.Tech:** Industrial Instrumentation & Control · Structural Engineering & Construction Management
**Polytechnic / Diploma:** Artificial Intelligence & Machine Learning · Civil Engineering · Computer Science & Engineering · Automobile Engineering · Mechanical Engineering · Electrical and Electronics Engineering · Electronics and Communication Engineering · Electrical Engineering and Electric Vehicle Technology

### 3.4 Navigation (authoritative — mirror original, modernize grouping)
- Home
- About Us
- Academics ▾ — IEDC (external: https://iedc.mgmcet.ac.in/), IQAC, NIRF (PDF), MoUs, Anti-Ragging, AICTE Approval (PDF), SC-ST Committee (PDF), Mandatory Disclosure (PDF), AICTE Feedback Facility, Research and Development, Grievance Cell
- Departments ▾ — B.Tech, M.Tech, Polytechnic (mega menu lists every department under each)
- Campus Life
- News & Events
- Contact Us
- More ▾ — NSS, Careers, Faculty, Women Cell, Arts Club, Sports Club, Etcetera Club (external: http://bento.me/etcetera), Associations and Clubs, Training and Placement Cell
- Header right: Search icon (client-side search over nav + departments + news), **Apply Now** button (gold)

Keep the original PDF links (NIRF, AICTE Approval, SC-ST, Mandatory Disclosure) as the `href` values in `content/downloads.ts` — these open in a new tab. Optionally copy to `/public/documents/` later.

### 3.5 Footer (from original)
Columns: **MGM College** (about blurb + address/phones/code) · **Quick Links** (Home, Academics, Campus Life, About Us, News & Events, Admissions) · **Engineering Programs** (B.Tech & M.Tech lists) · **Polytechnic / Diploma Courses** · **Student Zone** (Downloads, Mandatory Disclosure, Grievance Cell, Anti-Ragging, Faculty) · **Follow Us** (socials). Bottom: © {year} MGM College of Engineering and Technology. All rights reserved. · Privacy Policy · Terms & Conditions. All generated from `navigation.ts`.

### 3.6 Content discipline
- **Reference image ≠ source of truth for facts.** The image contains illustrative text/numbers (e.g., “30+ Years”, “1000+ Students”, “150+ Faculty”, “MBA”, “Ph.D”, Civil/EEE under B.Tech, “Mammooty…” scholarship strip, news items). **Use it only for layout, style and component structure.** Replace with real data from Sections 3.1–3.5. “Excellence Since 1994” → compute “years of excellence” from `foundedYear: 1994` dynamically.
- For anything not available on the original (department descriptions, HOD names, lab lists, faculty profiles, placement stats, news items, gallery images, syllabus), generate **clearly labeled placeholder content**: `// TODO(content): replace with real data`, show realistic but obviously editable data, and **list every placeholder in `docs/CONTENT-GUIDE.md` under “Placeholders to replace”**. Never present placeholder numbers (placements, rankings, packages) as real.
- Images: use `/public/images/placeholders/*` (generate simple neutral SVG/gradient placeholders) wired through `ImageWithFallback`, so real photos can be dropped in later by changing paths in content files. Document required image sizes/aspect ratios.

---

## 4. DESIGN SYSTEM (derived from the reference image)

### 4.1 Look & feel
Clean, premium, institutional. Deep forest green + gold accent on warm off-white/mint surfaces. Generous whitespace, soft 1px borders, rounded-xl cards, very subtle shadows, small uppercase eyebrow labels in gold/green above section titles, thin-line icons, arrow-right micro-CTAs. Photography with a dark green gradient overlay in heroes.

### 4.2 Tokens (define ONLY in `globals.css` via `@theme`; components must use semantic tokens, never raw hex)
```
--color-brand-950 #0B2E1F   (footer / deepest)
--color-brand-900 #0F3D2B   (primary dark, hero overlay, CTA banner)
--color-brand-800 #14513A
--color-brand-700 #1A6A4A   (primary)
--color-brand-100 #E4EFE7
--color-brand-50  #F2F7F3   (section tint, mint)
--color-accent-600 #B98A2E
--color-accent-500 #C9A24B  (gold: buttons, eyebrows, highlights)
--color-accent-100 #F6EBD0
--color-surface #FFFFFF   --color-canvas #FAF8F3 (warm off-white)
--color-ink-900 #14201A   --color-ink-600 #4A5A52   --color-ink-400 #8A9A92
--color-border #E3E8E4
--color-success / warning / danger (for forms/alerts)
```
Also define: radius scale (`--radius-card: 1rem`, `--radius-pill`), shadow scale (`--shadow-card`, `--shadow-pop`), container width (`max-w-7xl`), section spacing scale (`--space-section: clamp(3.5rem, 6vw, 6rem)`), type scale (fluid `clamp()` for h1–h4, body, eyebrow), and z-index scale.
Provide a **single-file theme swap**: changing the brand/accent tokens must fully re-skin the site. Document in `docs/THEMING.md`, with an example alternate theme (e.g., navy + orange) commented out.

### 4.3 Reusable style layer
- Use `@layer components` in `globals.css` for a **small** set of semantic utility classes only where composition is awkward (e.g., `.eyebrow`, `.section-title`, `.prose-college`), everything else via component variants using `cva`.
- All Buttons/Badges/Cards/Section backgrounds are variant-driven: `Button variant="primary|accent|outline|ghost|link" size="sm|md|lg"`, `Section tone="white|mint|canvas|dark"`, `Card variant="plain|outlined|elevated|image"`.
- Dark mode: **not required**. Do not add it.

### 4.4 Layout primitives (used on every page)
`<Container>`, `<Section tone spacing>`, `<SectionHeader eyebrow title description action>`, `<PageHero title breadcrumb image>`, `<PageShell>`. Every inner page = PageHero + Sections. This is what guarantees multi-page consistency.

---

## 5. HOME PAGE (match the reference image section-by-section, top to bottom)

1. **Header** — logo left; nav center with active underline (green) and chevrons for dropdowns; search icon; gold pill **Apply Now**. Sticky, shrinks on scroll, white with bottom border. Mega-menu panels for Academics/Departments/More. Mobile: slide-in drawer with accordion.
2. **Hero slider (3 slides)** — full-width campus photo with dark-green left-to-right gradient; eyebrow “MGM College of Engineering and Technology”; H1 “Build Your Future” + gold second line “with Us” (rework using real hero copy: “Spark Your Future at MGMCET”); short paragraph; CTAs: gold **Explore Programs** + outline **Watch Campus Tour** (opens video modal; placeholder video URL in content); bottom-right slide counter “01 / 03” with prev/next circular buttons; autoplay, pause on hover, keyboard accessible.
3. **Announcement strip** — megaphone icon, “Admissions Open for 2026 – Apply Now!” | divider | “Mammooty's Vidyamrutham Scholarship is live now! Click Here to Apply →”. Content-driven; can be hidden via a flag.
4. **Stats card** — floating rounded card with 4 stats and icons, vertical dividers, animated count-up on scroll. Real data: Years of Excellence (computed from 1994), Engineering Programs (count from content: 5 B.Tech + 2 M.Tech, or as designed), Industry Partners 40+, AICTE Approved (A+ text per original). Student/Faculty counts only if provided; otherwise use placeholder flagged TODO.
5. **About split** — left rounded campus image with play button + script caption “Where Ideas Grow”; center: eyebrow “ABOUT MGM”, title “Empowering Minds, Shaping Tomorrow”, paragraph, “Learn More →”; right: two stacked tinted cards **Our Vision** / **Our Mission** with icons.
6. **Academic Programs** — eyebrow “COURSES WE OFFER”, title, description, “View All Programs →”; **3 cards (B.Tech, M.Tech, Polytechnic)** with line icons, level + duration + “N programs” and arrow (do NOT include MBA/Ph.D).
7. **Why MGM** (mint background with decorative gold/green diagonal ribbon shape at right edge) — left: eyebrow, title “More Than Just An Education”, paragraph, gold **Why Choose MGM →**; right: 2×3 icon grid with vertical/horizontal hairline separators. Use the 5 real offerings (Faculty, Labs & Workshop, Library, Hostel, Transportation) + 1 more from campus content (e.g., Training & Placement).
8. **Explore Our Departments** — row of 5 image cards with title + arrow; horizontally scrollable on mobile; “View All Departments →”. Data from the **B.Tech department registry** (real 5 departments); tabs or toggle to switch to Polytechnic.
9. **Campus Life split** — big rounded image with script caption “Where Life Meets MGM”, gold corner accent shapes; text: eyebrow, “Learn. Make Friends. Create Memories.”, paragraph, “Explore Campus Life →”; right: vertical link list with icons (Clubs & Associations, Sports & Fitness, Hostel Facilities, Cultural Events, Gallery) separated by hairlines. Include the 4 activity stats from Section 3.2.
10. **Director's message** strip (quote + photo + name) — optional compact band, placed near the Campus Life section.
11. **News & Events** — eyebrow “LATEST UPDATES”, 4 cards: image, green “Event”/“News” badge, title, calendar icon + date, arrow. Reads newest 4 from `content/news.ts`.
12. **CTA Banner** — dark green rounded banner: eyebrow “JOIN US”, “Admissions Open for 2026”, subtext; gold **Apply Now** + outline **Download Prospectus**.
13. **Quick enquiry form** (“Got questions for us? Fill out this form!”) — real fields; Firestore submission; success/error toasts.
14. **Footer** — dark green, logo, address, phones, code; link columns; social icons; bottom bar with © and Privacy/Terms.

---

## 6. INNER PAGE TEMPLATES (design all by analysing the original site's structure + the same design system)

Create **reusable page templates** so most pages are just content:

| Template | Used by | Structure |
|---|---|---|
| **ContentPage** | About, IQAC, Anti-Ragging, Grievance Cell, R&D, Women Cell, NSS, Privacy, Terms, AICTE Feedback | PageHero → breadcrumb → 2-col (rich content + sticky side nav/related links) |
| **DocumentsPage** | NIRF, AICTE Approval, SC-ST Committee, Mandatory Disclosure, Downloads, MoUs | PageHero → searchable/filterable `DocumentList` (title, category, year, file-type icon, Download/View) |
| **ProgramLevelPage** | B.Tech, M.Tech, Polytechnic | PageHero → intro → grid of DepartmentCards → admission CTA |
| **DepartmentPage** `[level]/[slug]` | each department | Hero (image, name, level, intake/duration badges) → tabs/anchored sections: Overview, Vision & Mission, Programme Outcomes/PEOs, Curriculum/Syllabus links, Labs & Facilities, Faculty, Research & Projects, Placements, Achievements, Contact → CTA |
| **ListingPage** | News & Events, Gallery, Faculty, Careers | filters + grid/list + pagination |
| **DetailPage** | News item, Campus-life detail (Library, Labs, Hostel, Transport, Clubs…) | hero image → article/prose → gallery → related items |
| **PlacementsPage** | Training & Placement Cell | stats strip, recruiters logo marquee, process timeline, placement team, past drives, contact |
| **ContactPage** | Contact Us | contact cards (address, phones, email, hours), Firestore-backed form, embedded Google Map (iframe, lazy), directions |
| **AdmissionsPage** | Admissions | eligibility per level, process Timeline, scholarships (incl. Mammooty's Vidyamrutham), FAQ accordion, Apply CTA (Google Form link) |

Campus-life detail pages required (slug → title): `library`, `labs-and-workshops`, `hostel`, `transportation`, `nss`, `women-cell`, `arts-club`, `sports-club`, `etcetera-club`(external), `associations-and-clubs`, `iedc`(external).

---

## 7. FIREBASE (minimal, optional)

- `lib/firebase.ts`: lazy-init, SSR-safe, reads `NEXT_PUBLIC_FIREBASE_*`.
- Collections: `enquiries` (name, email, phone, district, message, createdAt, source). Add client-side honeypot + simple rate-limit (localStorage timestamp). Provide recommended **Firestore security rules** (create-only, field validation, no reads) in `docs/DEPLOYMENT.md`.
- `.env.example` with every key. App must not crash without them.
- `firebase.json` + `.firebaserc.example` configured for static hosting from `out/`, with cache headers for `/_next/static` and images, and clean URLs.

---

## 8. QUALITY BAR

- **Responsive:** mobile-first; test 360, 768, 1024, 1280, 1536. No horizontal scroll. Touch targets ≥ 44px.
- **Accessibility (WCAG 2.2 AA):** semantic landmarks, skip-to-content link, visible focus rings, ARIA for menus/tabs/accordion/carousel/modal, keyboard-navigable mega menu, alt text from content, color contrast ≥ 4.5:1, `prefers-reduced-motion` respected.
- **Performance:** Lighthouse ≥ 95 (Perf/A11y/SEO/Best Practices) on Home. `next/image` with explicit sizes, `priority` only on hero LCP image, lazy everything else, fonts via `next/font` with `display: swap`, no layout shift, minimal client JS.
- **SEO:** per-page `generateMetadata` from content, canonical URLs, OpenGraph/Twitter, `sitemap.ts`, `robots.ts`, JSON-LD (`CollegeOrUniversity` / `EducationalOrganization`, `BreadcrumbList`, `NewsArticle`, `Event`).
- **Code quality:** TypeScript strict with no `any`; no unused code; consistent naming (PascalCase components, camelCase data, kebab-case files/routes); JSDoc on every public component with prop table summary; zero ESLint errors; `npm run build` passes clean.
- **Motion:** fade/slide-up on scroll via a single `<Reveal>` wrapper (reusable), hover lift on cards, count-up on stats. Nothing flashy.

---

## 9. DOCUMENTATION (generate all)

- `README.md` — quick start, scripts, folder map, how to deploy.
- `docs/ARCHITECTURE.md` — layers (content → sections → templates → pages), diagram, conventions.
- `docs/CONTENT-GUIDE.md` — “How do I…?” recipes: edit text, change hero slides, add news, add a department, add a PDF, add a faculty member, add a nav item, replace images; **Placeholders to replace** checklist.
- `docs/THEMING.md` — token reference, how to re-skin for another institution in < 10 minutes.
- `docs/ADDING-A-PAGE.md` — step-by-step with code snippet using templates.
- `docs/DEPLOYMENT.md` — Firebase Hosting + Firestore rules + env vars.
- A `/design-system` route (dev-only, excluded from sitemap/production via env flag) showing every UI primitive & section variant (a mini Storybook).

---

## 10. DO NOT

- Do not hardcode text, colors, links or image paths inside components or pages.
- Do not copy the reference image's fake statistics/news/programs as facts.
- Do not add a backend, auth, CMS, or database other than the minimal Firestore enquiry form.
- Do not use inline styles, arbitrary one-off hex values, or duplicated Tailwind class blobs across files (extract to variants).
- Do not add dark mode, i18n, or unrelated features.
- Do not leave `console.log`, dead code, or unreferenced assets.

---

## 11. DEFINITION OF DONE

- [ ] All routes in Section 2 render with no errors; `npm run build` + static export succeed.
- [ ] Home page visually matches the reference layout section-by-section, using real content from Section 3.
- [ ] Changing `brand-*` / `accent-*` tokens in `globals.css` re-skins the entire site.
- [ ] Adding one department file / one news object / one nav item shows up everywhere without touching components.
- [ ] Every inner page uses a shared template (Section 6) — consistent header, spacing, typography.
- [ ] Contact + enquiry forms validate and write to Firestore (or fail gracefully without keys).
- [ ] Lighthouse ≥ 95 on Home and one inner page; axe-core: 0 critical issues.
- [ ] Docs in Section 9 exist and are accurate; placeholders list complete.

---

## 12. EXECUTION PLAN (follow in order, verify at each phase end)

1. **Plan & scaffold** — create project, install deps, set up lint/prettier, folder structure, `cn()`, tokens in `globals.css`, fonts. Write a short implementation plan artifact.
2. **Content layer** — define all TS types, then populate `content/*` from Section 3 (real data) with flagged placeholders.
3. **UI primitives** (`components/ui`) + layout primitives (`Container`, `Section`, `PageHero`…).
4. **Layout shell** — Header (mega menu, mobile drawer, search), AnnouncementBar, Footer — all from `navigation.ts`.
5. **Home sections** — build each section as a standalone data-driven component, compose Home, compare against the reference image, iterate on spacing/typography until it matches.
6. **Templates & inner pages** — ContentPage, DocumentsPage, ProgramLevelPage, DepartmentPage, ListingPage, DetailPage, PlacementsPage, ContactPage, AdmissionsPage; then wire every route.
7. **Firebase** — forms, rules docs, hosting config.
8. **SEO, a11y, performance pass** — metadata, JSON-LD, sitemap, axe + Lighthouse fixes.
9. **Docs + `/design-system` page.**
10. **Final audit** — run build, lint, type-check; verify Definition of Done; output a summary of what was built, all placeholders needing real content, and any deviations from this spec.

Begin with Phase 1 now.