# Media Migration Audit Report — MGMCET (Next.js to ImageKit)

**Date of Audit:** November 5, 2026  
**Audited Directory:** `/home/adarsh/Documents/Websites/mgmcet`  
**Phase:** Phase 1 — Complete Codebase Audit  

---

## 1. Executive Summary

A comprehensive scan and static analysis of the codebase was conducted to identify all locally stored media assets, their references across the Next.js application, unused assets, dynamic references, and external media dependencies.

| Metric | Value |
| :--- | :--- |
| **Total Media Files Discovered** | **135** |
| **Total Storage Size** | **135,840,738 bytes (~129.55 MB)** |
| **Active / Referenced Media Files** | **66** (approx. 127.84 MB) |
| **Potentially Unused Media Files** | **68** (approx. 0.07 MB) |
| **Files with Uncertain / Special Usage** | **1** (`public/images/brand/emblem.png`) |
| **Developer Reference Artifacts (Not for UI)** | **1** (`public/reference/home.png`, 1.64 MB) |
| **Dynamic / Template References in Code** | **4** locations |
| **External Media URLs in Application Code** | **5** PDFs (KTU / Technical Education docs) |
| **Historical Scraped Wix Media URLs** | **719** in `scripts/scrape/output/` |

> [!IMPORTANT]
> **Key Storage Insight:** A single document, `public/documents/aicte-approval-2024-25.pdf`, accounts for **122.62 MB (94.6%)** of the entire project's media storage. All remaining 134 files total only **6.93 MB**. Uploading files >100 MB may require checking your ImageKit account plan's file upload limits.

---

## 2. File Type Breakdown

| Extension | Category | File Count | Total Size | % of Total Size | Notes |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `.pdf` | Documents | 5 | 128,360,000 bytes (~122.41 MB) | 94.5% | Official statutory & compliance documents |
| `.webp` | Images (WebP) | 52 | 2,405,300 bytes (~2.29 MB) | 1.8% | High-quality compressed web photos & logos |
| `.png` | Images (PNG) | 4 | 1,808,200 bytes (~1.72 MB) | 1.3% | Brand logos, emblem, OG image, and reference screenshot |
| `.svg` | Vectors (SVG) | 73 | 68,700 bytes (~0.07 MB) | 0.05% | Brand SVGs (active) + 62 placeholder icons (unused) + 5 Next.js icons |
| `.ico` | Metadata Icon | 1 | 15,086 bytes (~0.01 MB) | 0.01% | Standard Next.js favicon (`app/favicon.ico`) |
| **Total** | | **135** | **135,840,738 bytes (~129.55 MB)** | **100%** | |

*Note: No video files (`.mp4`, `.webm`, `.mov`, `.mkv`) or office documents (`.docx`, `.pptx`, `.xlsx`) were found in the project.*

---

## 3. Existing Local Folder Structure

```text
public/
├── documents/               (5 files: 5 PDFs — 128.36 MB)
├── images/
│   ├── about/              (2 files: 2 unused SVG placeholders)
│   ├── brand/              (6 files: logo.png, logo.svg, logo-light.svg, favicon.svg, emblem.png, og-image.png)
│   ├── campus/             (4 files: about-campus.webp, autobahn-truck.webp, campus-life.svg, campus-main.svg)
│   ├── departments/        (45 files: 15 webp, 1 active design SVG, 29 unused SVG placeholders)
│   ├── facilities/         (9 files: 5 webp, 4 unused SVG placeholders)
│   ├── faculty/            (1 file: placeholder-avatar.svg)
│   ├── gallery/            (14 files: 6 webp, 8 unused SVG placeholders)
│   ├── hero/               (6 files: 3 webp, 3 SVG placeholders)
│   ├── leadership/         (5 files: 5 webp portraits)
│   ├── news/               (12 files: 6 webp, 6 unused SVG placeholders)
│   ├── placeholders/       (6 files: 6 unused SVG placeholders)
│   └── recruiters/         (13 files: 10 webp recruiter logos, 3 unused SVG placeholders)
├── reference/              (1 file: home.png — 1.64 MB UI reference screenshot)
├── (root files)            (5 files: file.svg, globe.svg, next.svg, vercel.svg, window.svg)
app/
└── favicon.ico             (1 file: 15 KB icon)
```

---

## 4. Asset Classification

### 4.1 Referenced Media Files (Active on Site — 66 files)

These files are actively imported, configured in `content/*.ts`, or referenced by Next.js components:

#### A. Documents (`public/documents/`) — 5 files
1. `public/documents/aicte-approval-2024-25.pdf` (122.62 MB) — Referenced in `content/downloads.ts`
2. `public/documents/anti-ragging-committee.pdf` (571 KB) — Referenced in `content/downloads.ts`, `content/academics.ts`
3. `public/documents/mandatory-disclosure-2024.pdf` (591 KB) — Referenced in `content/downloads.ts`
4. `public/documents/nirf-report-2024.pdf` (44.4 KB) — Referenced in `content/downloads.ts`
5. `public/documents/sc-st-committee.pdf` (1.55 MB) — Referenced in `content/downloads.ts`

#### B. Brand Assets (`public/images/brand/` + `app/`) — 6 files
1. `app/favicon.ico` (15 KB) — Root favicon, referenced in `app/manifest.ts`
2. `public/images/brand/logo.png` (94 KB) — Header primary logo in `components/layout/Header.tsx`
3. `public/images/brand/logo.svg` (1.5 KB) — Mobile drawer logo (`MobileDrawer.tsx`), `app/manifest.ts`, JSON-LD schema
4. `public/images/brand/logo-light.svg` (1.6 KB) — Footer white brand logo in `components/layout/Footer.tsx`
5. `public/images/brand/og-image.png` (12.4 KB) — OpenGraph default preview image in `lib/seo.ts`
6. `public/images/brand/favicon.svg` (754 B) — SVG favicon specified in brand configuration

#### C. Campus & Facilities Images — 7 files
1. `public/images/campus/about-campus.webp` (2.7 KB) — About section image in `content/home.ts`
2. `public/images/campus/campus-main.svg` (1.8 KB) — Fallback banner in `ImageWithFallback.tsx`, `PageHero.tsx`, and `app/(site)/campus-life/page.tsx`
3. `public/images/facilities/facility-faculty.webp` (11.6 KB) — `content/campus-life.ts`, `content/faculty.ts`
4. `public/images/facilities/facility-hostel.webp` (13.4 KB) — `content/campus-life.ts`
5. `public/images/facilities/facility-labs.webp` (11.6 KB) — `content/campus-life.ts`
6. `public/images/facilities/facility-library.webp` (33.4 KB) — `content/campus-life.ts`
7. `public/images/facilities/facility-transport.webp` (20.0 KB) — `content/campus-life.ts`

#### D. Department Program Images (`public/images/departments/`) — 16 files
1. `btech-aiml.webp` (36.1 KB) — `content/departments/btech/aiml.ts`
2. `btech-cse.webp` (65.2 KB) — `content/departments/btech/cse.ts`
3. `btech-cyber-security.webp` (52.6 KB) — `content/departments/btech/cse-cyber-security.ts`
4. `btech-ece.webp` (69.8 KB) — `content/departments/btech/ece.ts`
5. `btech-mechanical.webp` (110.0 KB) — `content/departments/btech/mechanical.ts`
6. `mtech-iic.webp` (57.6 KB) — `content/departments/mtech/industrial-instrumentation-control.ts`
7. `mtech-se-cm.webp` (102.5 KB) — `content/departments/mtech/structural-engineering-construction-management.ts`
8. `polytechnic-ai.webp` (87.4 KB) — `content/departments/polytechnic/aiml.ts`
9. `polytechnic-automobile.webp` (98.8 KB) — `content/departments/polytechnic/automobile.ts`
10. `polytechnic-civil.webp` (85.2 KB) — `content/departments/polytechnic/civil.ts`
11. `polytechnic-cse.webp` (100.0 KB) — `content/departments/polytechnic/cse.ts`
12. `polytechnic-ece.webp` (84.7 KB) — `content/departments/polytechnic/ece.ts`
13. `polytechnic-eee.webp` (62.6 KB) — `content/departments/polytechnic/eee.ts`
14. `polytechnic-ev.webp` (13.0 KB) — `content/departments/polytechnic/electrical-ev.ts`
15. `polytechnic-mechanical.webp` (77.9 KB) — `content/departments/polytechnic/mechanical.ts`
16. `btech-aiml.svg` (1.0 KB) — Used in dev preview `components/design-system/DesignSystemPage.tsx`

#### E. Hero & Leadership Images — 9 files
1. `public/images/hero/campus-main.webp` (60.4 KB) — Hero Slide 1 in `content/home.ts`, `content/about.ts`
2. `public/images/hero/campus-front.webp` (105.0 KB) — Hero Slide 2 in `content/home.ts`
3. `public/images/hero/campus-academic.webp` (91.3 KB) — Hero Slide 3 in `content/home.ts`
4. `public/images/hero/hero-1.svg` (2.4 KB) — Preload tag in `app/(site)/page.tsx`
5. `public/images/leadership/chairman-dr-geevarghese-yohannan.webp` (9.6 KB) — `content/about.ts`
6. `public/images/leadership/director-h-ahinus.webp` (14.2 KB) — `content/home.ts`, `content/about.ts`
7. `public/images/leadership/principal-dr-dhanya-g.webp` (66.7 KB) — `content/faculty.ts`, `content/about.ts`
8. `public/images/leadership/principal-poly-er-nk-rajan.webp` (9.7 KB) — `content/faculty.ts`, `content/about.ts`
9. `public/images/leadership/vice-chairman-vinod-thomas.webp` (21.6 KB) — `content/about.ts`

#### F. Gallery & Campus Life Images (`public/images/gallery/`) — 6 files
1. `arts-fest.webp` (84.4 KB) — `content/campus-life.ts`, `content/gallery.ts`
2. `autobahn-bharatbenz.webp` (100.8 KB) — `content/campus-life.ts`, `content/gallery.ts`
3. `campus-aerial.webp` (39.7 KB) — `content/gallery.ts`
4. `campus-life.webp` (2.7 KB) — `content/campus-life.ts`, `content/news.ts`, `content/home.ts`, `content/gallery.ts`
5. `front-entrance.webp` (105.0 KB) — `content/gallery.ts`
6. `placement-orientation.webp` (35.6 KB) — `content/gallery.ts`

#### G. News & Events Images (`public/images/news/`) — 6 files
1. `comstream-placement.webp` (57.7 KB) — `content/news.ts`
2. `hackathon-achievement.webp` (69.1 KB) — `content/news.ts`
3. `hiring-faculty.webp` (64.1 KB) — `content/news.ts`
4. `placement-2025.webp` (41.7 KB) — `content/news.ts`
5. `placement-training.webp` (47.8 KB) — `content/news.ts`
6. `technical-seminar.webp` (44.5 KB) — `content/news.ts`

#### H. Recruiter Logos (`public/images/recruiters/`) — 10 files
1. `recruiter-01.webp` through `recruiter-10.webp` (total 37.6 KB) — Placement recruiter ticker in `content/placements.ts`

---

### 4.2 Unused Media Files (68 files)

These files are present in the filesystem but are not referenced in application code, components, or content data:

1. **Default Next.js starter assets (5 files):**
   - `public/next.svg`
   - `public/vercel.svg`
   - `public/file.svg`
   - `public/globe.svg`
   - `public/window.svg`
2. **Replaced / Deprecated SVG Placeholders (62 files):**
   These were early mock vector graphics created during initial scaffold, later replaced by real `.webp` photos:
   - `public/images/about/about-college.svg`, `director.svg` (2 files)
   - `public/images/campus/campus-life.svg` (1 file)
   - `public/images/departments/*.svg` (29 files: `btech-*.svg`, `poly-*.svg`, `mtech-*.svg`, and `-thumb.svg`)
   - `public/images/facilities/` (4 files: `transport.svg`, `hostel.svg`, `library.svg`, `labs.svg`)
   - `public/images/faculty/placeholder-avatar.svg` (1 file)
   - `public/images/gallery/` (8 files: `gallery-1.svg` through `gallery-8.svg`)
   - `public/images/hero/` (2 files: `hero-2.svg`, `hero-3.svg`)
   - `public/images/news/` (6 files: `news-1.svg` through `news-6.svg`)
   - `public/images/placeholders/` (6 files: `sports-club.svg`, `arts-club.svg`, `clubs.svg`, `etcetera.svg`, `women-cell.svg`, `nss.svg`)
   - `public/images/recruiters/` (3 files: `tcs.svg`, `infosys.svg`, `wipro.svg`)
3. **Exact Binary Duplicate (1 file):**
   - `public/images/campus/autobahn-truck.webp` (100.8 KB) — MD5 checksum `2af7494cf947e2c97a12f493bd0ce206` matches `public/images/gallery/autobahn-bharatbenz.webp`. Code references the latter.

---

### 4.3 Files with Uncertain Usage & Developer References (2 files)

1. `public/images/brand/emblem.png` (96.5 KB):
   - Official crest emblem shield. Documented in `docs/CONTENT-GUIDE.md` as an official brand asset, but not directly rendered in current page components (which use `logo.png` or `logo.svg`).
   - *Recommendation:* Upload to `/mgmcet/images/general/` or `/mgmcet/images/brand/` in ImageKit so it is available for future headers, badges, or certificates.
2. `public/reference/home.png` (1.64 MB):
   - Mockup design reference screenshot. Referenced only in `AGENTS.md` and `BUILD_SPEC.md` as a developer visual guide.
   - *Recommendation:* Exclude from migration.

---

### 4.4 Dynamic References & String Interpolations

| File | Line | Code Snippet | Notes |
| :--- | :---: | :--- | :--- |
| `app/(site)/layout.tsx` | 18 | `logo: \`${BASE_URL}/images/brand/logo.svg\`` | Schema.org structured data. When migrating, this must point to ImageKit absolute URL. |
| `app/(site)/news-events/[slug]/page.tsx` | 92 | `url: \`${BASE_URL}/images/brand/logo.svg\`` | Article publisher logo schema. Must receive ImageKit absolute URL. |
| `lib/seo.ts` | 19, 29, 35 | `const ogImage = image \|\| "/images/brand/og-image.png"; ... \`${BASE_URL}${ogImage}\`` | OpenGraph/Twitter meta tag image generator. |
| `app/(site)/page.tsx` | 40 | `ReactDOM.preload("/images/hero/hero-1.svg", { as: "image", fetchPriority: "high" })` | Outdated preload tag targeting old SVG instead of modern hero slide WebP (`campus-main.webp`). |
| `components/shared/ImageWithFallback.tsx` | 19 | `fallbackSrc = "/images/campus/campus-main.svg"` | Component fallback image default prop. |
| `components/layout/PageHero.tsx` | 29 | `image = "/images/campus/campus-main.svg"` | PageHero default banner image prop. |

---

### 4.5 External Media URLs (Should NOT be migrated without explicit request)

In `content/downloads.ts`, there are 5 direct download links pointing to the historical Wix CDN:
- `https://www.mgmcet.ac.in/_files/ugd/d90d18_65b15d9cb0494f99a097b6428817f406.pdf` (KTU Academic Calendar 2024–25)
- `https://www.mgmcet.ac.in/_files/ugd/d90d18_9a8d824a353841bfb624181f38589250.pdf` (KTU B.Tech Regulations 2019)
- `https://www.mgmcet.ac.in/_files/ugd/d90d18_81c625c975e044d6a6503ccb3b8c4d04.pdf` (KTU B.Tech Curriculum 2019)
- `https://www.mgmcet.ac.in/_files/ugd/d90d18_ccf58f557c2f42f4baa54befc003661f.pdf` (Polytechnic Academic Calendar 2024–25)
- `https://www.mgmcet.ac.in/_files/ugd/d90d18_1d318eef77f4418d996fe73d83a1207b.pdf` (State Board of Tech. Education Curriculum)

*Per instructions (Phase 1.3), external media URLs are identified and will not be migrated automatically.*

---

## 5. Proposed ImageKit Folder Mapping

According to the folder structure specified in Phase 3 (`mgmcet/...`), the 66 active files + 1 emblem are mapped as follows:

| Local Folder / File | Destination ImageKit Folder | Target Files |
| :--- | :--- | :--- |
| `public/documents/aicte-approval-2024-25.pdf` | `/mgmcet/documents/reports` | AICTE approval document |
| `public/documents/nirf-report-2024.pdf` | `/mgmcet/documents/reports` | NIRF report |
| `public/documents/mandatory-disclosure-2024.pdf` | `/mgmcet/documents/notices` | Mandatory disclosure |
| `public/documents/anti-ragging-committee.pdf` | `/mgmcet/documents/academic` | Anti-ragging cell notification |
| `public/documents/sc-st-committee.pdf` | `/mgmcet/documents/academic` | SC/ST committee notification |
| `public/images/brand/*` | `/mgmcet/images/general` | `logo.png`, `logo.svg`, `logo-light.svg`, `favicon.svg`, `og-image.png`, `emblem.png` |
| `app/favicon.ico` | `/mgmcet/images/general` | Favicon |
| `public/images/campus/*` | `/mgmcet/images/campus` | `about-campus.webp`, `campus-main.svg` |
| `public/images/facilities/*` | `/mgmcet/images/facilities` | 5 facility `.webp` images |
| `public/images/departments/*` | `/mgmcet/images/departments` | 15 department `.webp` images + 1 `.svg` |
| `public/images/hero/*` | `/mgmcet/images/campus` | `campus-main.webp`, `campus-front.webp`, `campus-academic.webp` |
| `public/images/leadership/*` | `/mgmcet/images/faculty` | 5 leadership portraits |
| `public/images/news/*` | `/mgmcet/events/other` | 6 news & event announcement images |
| `public/images/gallery/*` | `/mgmcet/gallery/2025` | 6 campus life & event gallery images |
| `public/images/recruiters/*` | `/mgmcet/images/general` | 10 recruiter logos (`recruiter-01.webp` to `10.webp`) |

---

## 6. Items Requiring Attention Before Migration

1. **AICTE Approval PDF File Size (122.62 MB):**
   - The ImageKit standard free account limit per file is typically 25 MB for media and documents unless upgraded.
   - We must verify whether your ImageKit account permits uploading files larger than 100 MB, or whether this PDF should be compressed or handled as an external document link.
2. **Duplicate Assets:**
   - `public/images/campus/autobahn-truck.webp` is identical to `public/images/gallery/autobahn-bharatbenz.webp`. We will upload the referenced file (`autobahn-bharatbenz.webp`) and skip the duplicate.
   - `public/images/gallery/front-entrance.webp` and `public/images/hero/campus-front.webp` share identical image content.
3. **Outdated Hero Preload:**
   - `app/(site)/page.tsx` line 40 preloads `/images/hero/hero-1.svg`. During Phase 5, this should be updated to point to the actual active hero slide on ImageKit.
4. **Next.js Static Export Configuration:**
   - In `next.config.ts`, `output: "export"` is enabled with `images: { unoptimized: true }`.
   - When migrating images to ImageKit URLs (`https://ik.imagekit.io/...`), `next/image` with unoptimized works seamlessly with remote URLs without requiring server-side image optimization proxying, though configuring `images.remotePatterns` is still best practice for domain safety and validation.

---

## 7. Next Steps

As required by the workflow instructions:
- **Phase 1 Audit is now complete.**
- Please review this report and confirm approval before we proceed to:
  - **Phase 2:** ImageKit configuration (`imagekit` SDK, `.env.local` credentials, utility helpers).
  - **Phase 3:** Automatic creation of the `mgmcet` folder structure in ImageKit.
  - **Phase 4:** Dry-run and Bulk Media Upload with `media-manifest.json`.
