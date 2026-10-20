# MGMCET Theming & Re-Skinning Guide

This guide details how the design token architecture in `app/globals.css` enables you to re-brand the entire website for another college, university, or polytechnic institution in **under 10 minutes** without changing any component markup or layouts.

---

## 1. Token Architecture Overview

Tailwind CSS v4 introduces the `@theme` directive, allowing standard CSS variables to act as first-class utility tokens. Every component in this repository uses semantic classes (e.g., `bg-brand-900`, `text-accent-500`, `border-border`) rather than hardcoded hex colors or arbitrary pixel values.

### Color Tokens

| Category | Token | Current Hex (MGMCET) | Semantic Role |
|---|---|---|---|
| **Brand (Deep)** | `--color-brand-950` | `#071f14` | High-contrast header, dark footer background |
| | `--color-brand-900` | `#0f3d2b` | Hero overlays, dark sections, CTA cards |
| | `--color-brand-800` | `#14513a` | Hover states for primary elements, cards |
| | `--color-brand-700` | `#1a6a4a` | Primary institutional button background, active borders |
| | `--color-brand-600` | `#218a5e` | Secondary accents, focus outlines, hover highlights |
| | `--color-brand-500` | `#2bab74` | Vibrant green badges, success markers |
| **Brand (Light/Mint)** | `--color-brand-200` | `#a8d8be` | Card borders in mint sections, badge borders |
| | `--color-brand-100` | `#e4efe7` | Soft pill backgrounds, icon boxes |
| | `--color-brand-50` | `#f2f7f3` | Soft mint section background tone (`tone="mint"`) |
| **Accent (Gold)** | `--color-accent-700` | `#8a6420` | Dark gold text against light backgrounds |
| | `--color-accent-600` | `#b98a2e` | Active gold hover states |
| | `--color-accent-500` | `#c9a24b` | Primary gold "Apply Now" CTA, badges |
| | `--color-accent-400` | `#d9bb72` | Script headline accent text |
| | `--color-accent-100` | `#f6ebd0` | Subtle gold badge fills |
| | `--color-accent-50` | `#fdf7ec` | Card tinted tone background |
| **Ink (Typography)** | `--color-ink-900` | `#14201a` | Main body headings, high-contrast text |
| | `--color-ink-700` | `#2a3a30` | Standard body paragraphs |
| | `--color-ink-600` | `#4a5a52` | Subtitles, meta tags, secondary content |
| | `--color-ink-400` | `#8a9a92` | Placeholders, disabled states, borders |
| | `--color-ink-200` | `#c8d4cc` | Subtle hairline dividers |
| **Canvas & Surfaces**| `--color-surface` | `#ffffff` | Pure white card surfaces |
| | `--color-canvas` | `#faf8f3` | Warm parchment canvas background (`tone="canvas"`) |
| | `--color-border` | `#e3e8e4` | Hairline card and divider borders |
| | `--color-border-strong` | `#c8d4cc` | Emphasized input and table borders |

---

## 2. Re-Skinning in Under 10 Minutes (Step-by-Step)

To apply an entirely new visual identity for a new institution, follow these three steps:

### Step 1: Pick Primary & Accent Colors
Select:
1. **Primary Institutional Color:** (e.g. Royal Navy Blue, Crimson Red, or Slate)
2. **Secondary Accent Color:** (e.g. Amber Gold, Flame Orange, or Teal)

### Step 2: Update `app/globals.css`
Open `app/globals.css` and replace the values inside the `@theme` block:

```css
/* app/globals.css */
@theme {
  /* Replace Brand with your primary color scale (950 down to 50) */
  --color-brand-950: #0a192f;
  --color-brand-900: #112240;
  --color-brand-800: #1d3557;
  --color-brand-700: #2a4d7a;
  --color-brand-600: #3a689f;
  --color-brand-500: #457b9d;
  --color-brand-200: #c5d8e8;
  --color-brand-100: #e4edf5;
  --color-brand-50:  #f4f8fb;

  /* Replace Accent with your secondary color scale */
  --color-accent-700: #a84200;
  --color-accent-600: #d05300;
  --color-accent-500: #e76f51;
  --color-accent-400: #f4a261;
  --color-accent-100: #fae1dd;
  --color-accent-50:  #fdf0ed;
}
```

### Step 3: Verify Contrast & Rebuild
Ensure the new contrast between `--color-accent-500` and its text color (`--color-ink-900` or `#ffffff`) is at least **4.5:1** (WCAG AA).

```bash
# Run type check and verify build
npx tsc --noEmit
npm run build
```

Every button, header, hero slide, badge, border, and section background will instantly update.

---

## 3. Commented Alternate Theme Example (Royal Navy & Amber)

Below is an alternate institutional theme configuration suitable for a modern polytechnic or technical university:

```css
/* =============================================================================
   ALTERNATE THEME: Royal Navy & Warm Amber
   Copy and paste this into app/globals.css inside the @theme block
   ============================================================================= */
@theme {
  /* --- Brand (Deep Royal Navy) --- */
  --color-brand-950: #051329; /* Darkest footer & header background */
  --color-brand-900: #0b1f3a; /* Dark sections & hero gradient start */
  --color-brand-800: #102a4c; /* Secondary dark surfaces */
  --color-brand-700: #183b6b; /* Primary button background */
  --color-brand-600: #225191; /* Hover states & focus rings */
  --color-brand-500: #2d68b8; /* Mid-tone vibrant blue */
  --color-brand-200: #b9d2f3; /* Light borders */
  --color-brand-100: #dce9f9; /* Icon box backgrounds */
  --color-brand-50:  #f0f5fc; /* Soft cool-tinted section background */

  /* --- Accent (Warm Amber / Saffron) --- */
  --color-accent-700: #8f5300; /* High-contrast gold text */
  --color-accent-600: #bf7000; /* Active gold buttons */
  --color-accent-500: #e08500; /* Primary Apply Now CTA */
  --color-accent-400: #f5a623; /* Script headline accents */
  --color-accent-100: #fde8c2; /* Badge backgrounds */
  --color-accent-50:  #fff7ea; /* Warm highlight cards */

  /* --- Surface & Canvas --- */
  --color-surface: #ffffff;
  --color-canvas:  #f8fafc; /* Crisp cool canvas */

  /* --- Ink (Neutral Slate Text) --- */
  --color-ink-900: #0f172a; /* Slate 900 */
  --color-ink-700: #334155; /* Slate 700 */
  --color-ink-600: #475569; /* Slate 600 */
  --color-ink-400: #94a3b8; /* Slate 400 */
  --color-ink-200: #e2e8f0; /* Slate 200 */

  /* --- Border --- */
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;
}
```

---

## 4. Typography Customization

The typography system uses three font variables configured in `app/layout.tsx` and consumed in `app/globals.css`:

1. `--font-heading`: Configured to **Poppins** for bold, modern headings.
2. `--font-body`: Configured to **Inter** for legible, crisp body copy.
3. `--font-script`: Configured to **Caveat** for elegant handwritten accent titles.

To change institutional fonts:
1. Open `app/layout.tsx`.
2. Import your desired Google fonts from `next/font/google` (e.g., `Playfair_Display`, `Merriweather`, `Plus_Jakarta_Sans`).
3. Assign the CSS variable names (`--font-poppins`, `--font-inter`, etc.) in the font initialization options.

---

## 5. Accessibility & Contrast Verification

When adjusting color tokens, always maintain WCAG 2.2 AA compliance:
- Normal body text (`16px`): Contrast ratio must be **≥ 4.5:1** against the background.
- Large text (`≥ 18px bold` or `≥ 24px regular`): Contrast ratio must be **≥ 3:1**.
- UI components & icons: Contrast ratio must be **≥ 3:1** against adjacent colors.

You can verify contrast instantaneously by running:
```bash
NEXT_PUBLIC_SHOW_DESIGN_SYSTEM=true npm run dev
```
and inspecting the color swatches on [http://localhost:3000/design-system/#tokens](http://localhost:3000/design-system/#tokens).
