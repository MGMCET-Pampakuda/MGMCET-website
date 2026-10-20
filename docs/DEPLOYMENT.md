# Deployment Guide — MGM College of Engineering and Technology (MGMCET)

This guide explains how to configure Firebase, build the static export, deploy to Firebase Hosting, and configure a custom domain.

---

## 1. Prerequisites

- **Node.js:** v18 or later
- **npm:** v9 or later
- **Firebase CLI:** Install globally via `npm install -g firebase-tools`
- **Firebase Account:** An active Google Cloud / Firebase console account with owner permissions

---

## 2. Firebase Project Setup

1. Open the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Name the project (e.g., `mgmcet-portal`).
3. (Optional) Disable Google Analytics if not needed, then create the project.
4. Navigate to **Project Settings** > **General** > **Your apps** and click the **Web icon (`</>`)** to register a web app.
5. Copy the `firebaseConfig` object keys provided.

### Provision Firestore Database
1. In the Firebase console left menu, go to **Build** > **Firestore Database**.
2. Click **Create database** and select your regional location (e.g., `asia-south1` Mumbai).
3. Start in **Production mode** (security rules will be deployed via our repository).

---

## 3. Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your registered Firebase web credentials:

```ini
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mgmcet-portal.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mgmcet-portal
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mgmcet-portal.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

> **Important:** The application is architected to build and run even with **zero environment keys**. When keys are absent, forms gracefully operate in a demo fallback mode without crashing.
> 
> **Developer Route Gating:** Never set `NEXT_PUBLIC_SHOW_DESIGN_SYSTEM=true` in production deployments. Leaving this flag unset ensures the `/design-system` component catalog is completely excluded from the static build and search index.

---

## 4. Deploying Firestore Security Rules

Copy `.firebaserc.example` to `.firebaserc` and add your project ID:

```json
{
  "projects": {
    "default": "YOUR_ACTUAL_FIREBASE_PROJECT_ID"
  }
}
```

Deploy the strict create-only security rules defined in `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

### Security Rules Rationale
- **Create-only:** Anyone can submit an admission/general enquiry.
- **Strict Validation:** Names, emails, phones, and messages have enforced types and max character boundaries (e.g., phone 7–20 chars, message <= 2000 chars).
- **Anti-bot Honeypot:** Automated submissions with hidden field values are rejected on client before submission.
- **Zero Reads/Updates/Deletes:** Client browsers have no read permissions on the `enquiries` collection, protecting student data privacy.

---

## 5. Building and Deploying the Website

Next.js is configured for static export (`output: "export"` in `next.config.ts`), generating all static HTML, CSS, JavaScript, and images into the `out/` folder.

### Step 1: Run Quality Checks & Build
```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint check
npm run lint

# 3. Static production export
npm run build
```

Verify that the `out/` directory contains `index.html`, `about/index.html`, `departments/...`, etc.

### Step 2: Deploy to Firebase Hosting
```bash
# Log in to Firebase CLI
firebase login

# Deploy the static export
firebase deploy --only hosting
```

---

## 6. Custom Domain Setup (`www.mgmcet.ac.in`)

1. In the Firebase console, navigate to **Hosting** > **View** > **Add custom domain**.
2. Enter the college domain: `www.mgmcet.ac.in` (and optionally `mgmcet.ac.in` with redirect).
3. Firebase will provide DNS TXT and A records.
4. Add the provided DNS records to your domain registrar (e.g., ERNET / GoDaddy / Cloudflare DNS).
5. Once DNS propagation finishes, Firebase automatically issues and provisions a free Let's Encrypt SSL/TLS certificate.
