/**
 * Authentication module for MGMCET Admin Dashboard.
 * Integrates 100% with Firebase Authentication.
 * Only verified Firebase accounts can access administrative tools.
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { getFirebaseAuth, isFirebaseConfigured } from "./firebase";
import type { User as FirebaseUserType } from "firebase/auth";

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "superadmin" | "editor" | "admissions";
}

/**
 * React hook to manage admin authentication strictly via Firebase Auth.
 */
export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(() => isFirebaseConfigured());

  // Sync state strictly with Firebase onAuthStateChanged
  useEffect(() => {
    let isMounted = true;
    let authUnsubscribe: (() => void) | null = null;

    if (!isFirebaseConfigured()) {
      return;
    }

    getFirebaseAuth().then(async (auth) => {
      if (!auth || !isMounted) {
        if (isMounted) setLoading(false);
        return;
      }

      const { onAuthStateChanged } = await import("firebase/auth");
      authUnsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUserType | null) => {
        if (!isMounted) return;

        if (fbUser) {
          const adminUser: AdminUser = {
            uid: fbUser.uid,
            email: fbUser.email || "",
            displayName:
              fbUser.displayName ||
              fbUser.email?.split("@")[0] ||
              "Administrator",
            role: "superadmin",
          };
          setUser(adminUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    });

    return () => {
      isMounted = false;
      if (authUnsubscribe) authUnsubscribe();
    };
  }, []);

  const login = useCallback(
    async (
      email: string,
      pass: string,
      rememberMe = true
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);

      const trimmedEmail = email.trim();
      const trimmedPass = pass.trim();

      if (!isFirebaseConfigured()) {
        setLoading(false);
        return {
          success: false,
          error:
            "Firebase Authentication is not configured. Please ensure Firebase environment variables are provided.",
        };
      }

      try {
        const auth = await getFirebaseAuth();
        if (!auth) {
          setLoading(false);
          return {
            success: false,
            error: "Failed to initialize Firebase Auth instance.",
          };
        }

        const {
          signInWithEmailAndPassword,
          setPersistence,
          browserLocalPersistence,
          browserSessionPersistence,
        } = await import("firebase/auth");

        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        const credential = await signInWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPass
        );

        const adminUser: AdminUser = {
          uid: credential.user.uid,
          email: credential.user.email || trimmedEmail,
          displayName:
            credential.user.displayName ||
            credential.user.email?.split("@")[0] ||
            "Administrator",
          role: "superadmin",
        };

        setUser(adminUser);
        setLoading(false);
        return { success: true };
      } catch (err: unknown) {
        setLoading(false);
        const errObj = err as { code?: string; message?: string };
        let message = "Invalid email or password. Please verify credentials.";

        if (
          errObj.code === "auth/invalid-credential" ||
          errObj.code === "auth/wrong-password"
        ) {
          message = "Invalid email or password. Please verify your credentials.";
        } else if (errObj.code === "auth/user-not-found") {
          message = "No administrator account found with this email.";
        } else if (errObj.code === "auth/too-many-requests") {
          message =
            "Access temporarily disabled due to many failed attempts. Please try again later.";
        } else if (errObj.code === "auth/invalid-email") {
          message = "Please enter a valid email address.";
        } else if (errObj.message) {
          message = errObj.message;
        }

        return { success: false, error: message };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const auth = await getFirebaseAuth();
      if (auth) {
        const { signOut } = await import("firebase/auth");
        await signOut(auth);
      }
    } catch (err) {
      console.error("Firebase logout error:", err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}
