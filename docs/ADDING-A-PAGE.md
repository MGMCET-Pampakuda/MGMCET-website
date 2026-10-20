# Adding a Page to MGMCET Website

This guide walks you through creating a new page using the project's pre-built layout templates in `components/templates/`. By using existing templates, you ensure uniform typography, accessible landmarks, consistent spacing, and automatic SEO generation without writing custom CSS or duplicating HTML.

---

## 1. Choose the Right Template

Every inner page in the website corresponds to one of the battle-tested templates:

| Template | File | Best Used For |
|---|---|---|
| **`ContentPage`** | `components/templates/ContentPage.tsx` | Policies, statutory disclosures, institutional committees, centers of excellence, overview narratives. |
| **`DocumentsPage`** | `components/templates/DocumentsPage.tsx` | Categorized, searchable PDF or document download repositories. |
| **`ListingPage`** | `components/templates/ListingPage.tsx` | Filterable card grids (e.g. news archives, photo galleries, faculty rosters). |
| **`DetailPage`** | `components/templates/DetailPage.tsx` | Individual news articles, press releases, or event summaries. |
| **`DepartmentPage`** | `components/templates/DepartmentPage.tsx` | Academic department portals with anchored tab sections (labs, syllabus, faculty, HOD). |
| **`ProgramLevelPage`** | `components/templates/ProgramLevelPage.tsx` | Program tier landing pages (e.g. B.Tech overview, Polytechnic overview). |

---

## 2. Step-by-Step Tutorial: Adding a New Content Page

Let's walk through an example: **Adding an "Institutional Innovation Council (IIC)" page** under `/academics/innovation-council`.

### Step 1: Define Structured Content
Open or create a data object in `content/academics.ts` (or a dedicated file in `content/`):

```typescript
// content/academics.ts
export const innovationCouncilContent = {
  title: "Institutional Innovation Council (IIC)",
  eyebrow: "Research & Entrepreneurship",
  badge: "MoE Initiative",
  heroDescription: "Fostering a culture of innovation, patent drafting, and student-led entrepreneurship in collaboration with the Ministry of Education's Innovation Cell (MIC).",
  heroImage: "/images/campus/campus-main.svg",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Academics", href: "/academics" },
    { label: "Innovation Council", current: true },
  ],
  sidebarNav: [
    { id: "overview", label: "Overview" },
    { id: "objectives", label: "Core Objectives" },
    { id: "committee", label: "Council Members" },
    { id: "activities", label: "Recent Initiatives" },
  ],
  contentSections: [
    {
      id: "overview",
      title: "About MGMCET IIC",
      content: `
        The Institutional Innovation Council (IIC) at MGMCET was established in accordance with the norms of the Ministry of Education (MoE), Government of India. The council systematically fosters the culture of innovation amongst students and faculty members.
      `,
    },
    {
      id: "objectives",
      title: "Key Objectives",
      content: `
        - Organize periodic innovation and entrepreneurship-related activities.
        - Mentor student ideas through hackathons and ideation challenges.
        - Facilitate IP generation and patent filing support for undergraduate researchers.
        - Partner with Kerala Startup Mission (KSUM) for pre-incubation grants.
      `,
    },
  ],
  relatedDownloads: [
    {
      title: "MoE IIC Establishment Certificate 2026",
      href: "/documents/iic-certificate-2026.pdf",
      size: "1.2 MB",
    },
  ],
};
```

---

### Step 2: Create the Next.js Route Page
Create a new directory and `page.tsx` file at `app/(site)/academics/innovation-council/page.tsx`:

```tsx
// app/(site)/academics/innovation-council/page.tsx
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates";
import { innovationCouncilContent } from "@/content/academics";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Institutional Innovation Council (IIC) | MGMCET",
  description: "Fostering student innovation, hackathons, and patent filings at MGM College of Engineering and Technology.",
  alternates: {
    canonical: `${BASE_URL}/academics/innovation-council/`,
  },
  openGraph: {
    title: "Institutional Innovation Council (IIC) | MGMCET",
    description: "Fostering student innovation and patent filings at MGMCET.",
    url: `${BASE_URL}/academics/innovation-council/`,
  },
};

export default function InnovationCouncilPage() {
  return (
    <ContentPage
      title={innovationCouncilContent.title}
      eyebrow={innovationCouncilContent.eyebrow}
      badge={innovationCouncilContent.badge}
      description={innovationCouncilContent.heroDescription}
      image={innovationCouncilContent.heroImage}
      breadcrumbItems={innovationCouncilContent.breadcrumbs}
      sections={innovationCouncilContent.contentSections}
      sidebarNavItems={innovationCouncilContent.sidebarNav}
      downloads={innovationCouncilContent.relatedDownloads}
    />
  );
}
```

---

### Step 3: Register in Navigation (`content/navigation.ts`)
Add the link to the Header mega menu and the Footer so visitors can discover the page:

```typescript
// content/navigation.ts
export const navigation: NavigationConfig = {
  header: [
    {
      label: "Academics",
      href: "/academics",
      children: [
        { label: "Overview", href: "/academics" },
        { label: "Innovation Council (IIC)", href: "/academics/innovation-council" }, // Added here
        // ...
      ],
    },
    // ...
  ],
};
```

---

### Step 4: Verify and Build
Run the automated verification suite to confirm there are zero TypeScript, ESLint, or static export errors:

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint check
npm run lint

# 3. Static production build
npm run build
```
Verify that `out/academics/innovation-council/index.html` is generated cleanly.

---

## 3. Important Rules for Creating Pages

1. **Static Export Constraint:**
   The site is statically exported (`output: "export"`). Do not use Node server APIs, Express middleware, server actions, or `cookies()`.
2. **Dynamic Routes Requirement:**
   If your page route has dynamic path segments (e.g., `[slug]/page.tsx`), you **must** export a `generateStaticParams()` function that returns all possible slug parameters at build time.
3. **No Hardcoded Copy or Hex Values:**
   Never write raw paragraph text or CSS hex strings in `page.tsx`. Everything must flow from `/content` and use semantic token classes.
4. **Always Provide Canonical Metadata:**
   Always include `alternates: { canonical: ... }` in your `metadata` export to ensure perfect SEO scoring.
