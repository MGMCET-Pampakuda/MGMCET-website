/**
 * Firebase wrapper — lazy-init, SSR-safe.
 * App builds and runs without Firebase keys; forms gracefully degrade and admin operates in demo/preview mode.
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
import type { Auth } from "firebase/auth";
import type { FirebaseStorage } from "firebase/storage";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

const STORAGE_KEY_CUSTOM_CONFIG = "mgmcet_custom_firebase_config";

export interface FirebaseConfigParams {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

/** Get current effective config (from env or custom browser storage override) */
export function getFirebaseConfig(): FirebaseConfigParams {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_CONFIG);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.apiKey && parsed?.projectId) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

/** Set custom browser-level Firebase config override (for instant in-dashboard setup) */
export function saveCustomFirebaseConfig(config: FirebaseConfigParams | null): void {
  if (typeof window === "undefined") return;
  if (!config) {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_CONFIG);
  } else {
    localStorage.setItem(STORAGE_KEY_CUSTOM_CONFIG, JSON.stringify(config));
  }
  // reset cached singletons so new config initializes on next call
  app = null;
  db = null;
  auth = null;
  storage = null;
}

/** Returns true if Firebase keys are configured either in env or browser config */
export function isFirebaseConfigured(): boolean {
  const cfg = getFirebaseConfig();
  return Boolean(cfg.apiKey && cfg.projectId);
}

/**
 * Lazy-initialise Firebase App.
 */
async function getFirebaseApp(): Promise<FirebaseApp | null> {
  if (typeof window === "undefined") return null;
  const config = getFirebaseConfig();
  if (!config.apiKey || !config.projectId) return null;

  if (app) return app;

  const { initializeApp, getApps } = await import("firebase/app");
  app = getApps().length ? getApps()[0]! : initializeApp(config);
  return app;
}

/**
 * Lazy-initialise Firebase and return the Firestore instance.
 * Safe to call on client (returns null server-side or if unconfigured).
 */
export async function getFirestore(): Promise<Firestore | null> {
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;
  if (db) return db;

  const instance = await getFirebaseApp();
  if (!instance) return null;

  const { getFirestore: _getFirestore } = await import("firebase/firestore");
  db = _getFirestore(instance);
  return db;
}

/**
 * Lazy-initialise Firebase Auth.
 */
export async function getFirebaseAuth(): Promise<Auth | null> {
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;
  if (auth) return auth;

  const instance = await getFirebaseApp();
  if (!instance) return null;

  const { getAuth: _getAuth } = await import("firebase/auth");
  auth = _getAuth(instance);
  return auth;
}

/**
 * Lazy-initialise Firebase Storage.
 */
export async function getFirebaseStorage(): Promise<FirebaseStorage | null> {
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;
  if (storage) return storage;

  const instance = await getFirebaseApp();
  if (!instance) return null;

  const { getStorage: _getStorage } = await import("firebase/storage");
  storage = _getStorage(instance);
  return storage;
}
