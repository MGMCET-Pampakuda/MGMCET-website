/**
 * Firebase wrapper — lazy-init, SSR-safe.
 * App builds and runs without Firebase keys; forms gracefully degrade.
 *
 * Configure via environment variables (see .env.example):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 */

import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

/** Returns true if Firebase env keys are configured */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  );
}

/**
 * Lazy-initialise Firebase and return the Firestore instance.
 * Safe to call on the server and in SSR context (returns null server-side).
 * Returns null if keys are not configured.
 */
export async function getFirestore(): Promise<Firestore | null> {
  // Do not initialise on the server
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;

  if (db) return db;

  const { initializeApp, getApps } = await import("firebase/app");
  const { getFirestore: _getFirestore } = await import("firebase/firestore");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  db = _getFirestore(app);

  return db;
}
