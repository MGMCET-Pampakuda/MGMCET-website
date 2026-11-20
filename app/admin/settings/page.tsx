"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  RotateCcw,
  Key,
  Server,
  Zap,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  fetchLiveSettings,
  saveSiteSettings,
  seedInitialDataToFirestore,
  type SiteSettingsData,
} from "@/lib/firebase-services";
import { news as staticNews } from "@/content/news";
import { site } from "@/content/site";
import { faculty as staticFaculty } from "@/content/faculty";
import { gallery as staticGallery } from "@/content/gallery";
import {
  isFirebaseConfigured,
  getFirebaseConfig,
  saveCustomFirebaseConfig,
  getFirestore,
} from "@/lib/firebase";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminSettingsPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [settings, setSettings] = useState<SiteSettingsData>({
    admissionsOpen: true,
    admissionsNotice: "Admissions Open 2026-27 for B.Tech, M.Tech & Polytechnic Programmes.",
    emergencyAlertActive: false,
    emergencyAlertText: "",
    admissionsPhone: "+91 94471 23456",
    admissionsEmail: "admissions@mgmcet.ac.in",
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom Firebase Config form initialized safely
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === "undefined") return "";
    return getFirebaseConfig().apiKey || "";
  });
  const [authDomain, setAuthDomain] = useState(() => {
    if (typeof window === "undefined") return "";
    return getFirebaseConfig().authDomain || "";
  });
  const [projectId, setProjectId] = useState(() => {
    if (typeof window === "undefined") return "";
    return getFirebaseConfig().projectId || "";
  });
  const [storageBucket, setStorageBucket] = useState(() => {
    if (typeof window === "undefined") return "";
    return getFirebaseConfig().storageBucket || "";
  });
  const [messagingSenderId, setMessagingSenderId] = useState(() => {
    if (typeof window === "undefined") return "";
    return getFirebaseConfig().messagingSenderId || "";
  });
  const [appId, setAppId] = useState(() => {
    if (typeof window === "undefined") return "";
    return getFirebaseConfig().appId || "";
  });

  const [pingStatus, setPingStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [pingMessage, setPingMessage] = useState<string | null>(null);

  const isFbConnected = isFirebaseConfigured();

  useEffect(() => {
    fetchLiveSettings().then((s) => setSettings(s));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    await saveSiteSettings(settings);
    setSavingSettings(false);
    showToast("Site settings updated successfully!");
  };

  const handleSaveFirebaseConfig = () => {
    if (!apiKey || !projectId) {
      alert("Please provide at least API Key and Project ID.");
      return;
    }

    saveCustomFirebaseConfig({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    });

    showToast("Firebase Cloud credentials saved! Reloading...");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleResetFirebaseConfig = () => {
    saveCustomFirebaseConfig(null);
    showToast("Reset to environment variable defaults.");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleTestPing = async () => {
    setPingStatus("testing");
    setPingMessage(null);

    try {
      if (!isFirebaseConfigured()) {
        throw new Error("Firebase keys are not configured yet.");
      }

      const db = await getFirestore();
      if (!db) {
        throw new Error("Could not initialize Firestore instance.");
      }

      const { collection, getDocs, limit, query } = await import("firebase/firestore");
      const q = query(collection(db, "news"), limit(1));
      await getDocs(q);

      setPingStatus("success");
      setPingMessage("Connection verified! Google Cloud Firestore is responding properly.");
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      setPingStatus("error");
      setPingMessage(`Connection test failed: ${errMessage}`);
    }
  };

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const result = await seedInitialDataToFirestore({
        newsItems: staticNews,
        announcements: site.announcements,
        facultyMembers: staticFaculty,
        galleryItems: staticGallery,
      });
      showToast(result.message);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      showToast(`Seeding error: ${errMessage}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Settings & Cloud Sync"
        subtitle="Configure live website variables and Google Firebase Firestore integration"
        onOpenMobileMenu={onOpenMobileMenu}
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-5xl mx-auto w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* 1. Website Quick Controls */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border">
            <Settings className="h-5 w-5 text-brand-700" />
            <div>
              <h3 className="font-heading font-bold text-base text-ink-900">
                Live Website Variables
              </h3>
              <p className="text-xs text-ink-500">
                Toggle emergency banners and admissions alerts displayed across all pages
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            {/* Admissions status */}
            <div className="p-4 rounded-xl bg-canvas border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-heading font-bold text-xs text-ink-900 block">
                  Admissions Status
                </span>
                <span className="text-[11px] text-ink-500">
                  Controls the &apos;Admissions Open&apos; badge on the homepage header and hero strip
                </span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-ink-800 shrink-0">
                <input
                  type="checkbox"
                  checked={settings.admissionsOpen}
                  onChange={(e) =>
                    setSettings({ ...settings, admissionsOpen: e.target.checked })
                  }
                  className="rounded border-border text-brand-700 focus:ring-brand-600"
                />
                <span className={settings.admissionsOpen ? "text-emerald-700" : "text-ink-400"}>
                  {settings.admissionsOpen ? "Admissions Open (Active)" : "Admissions Closed"}
                </span>
              </label>
            </div>

            {/* Emergency alert banner */}
            <div className="p-4 rounded-xl bg-canvas border border-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-xs text-ink-900 block">
                    Emergency Alert Marquee
                  </span>
                  <span className="text-[11px] text-ink-500">
                    Displays high-priority red alert strip at the very top of all pages (e.g. holiday notice, weather advisory)
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-ink-800 shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.emergencyAlertActive}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emergencyAlertActive: e.target.checked,
                      })
                    }
                    className="rounded border-border text-red-600 focus:ring-red-500"
                  />
                  <span className={settings.emergencyAlertActive ? "text-red-700" : "text-ink-400"}>
                    {settings.emergencyAlertActive ? "Alert Active" : "Disabled"}
                  </span>
                </label>
              </div>

              {settings.emergencyAlertActive && (
                <div>
                  <input
                    type="text"
                    value={settings.emergencyAlertText || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emergencyAlertText: e.target.value,
                      })
                    }
                    placeholder="e.g. College will remain closed tomorrow due to heavy rainfall advisory."
                    className="w-full px-3.5 py-2 rounded-xl border border-red-300 bg-red-50/50 text-xs text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}
            </div>

            {/* Contact Hotline Overrides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Admissions Hotline Phone
                </label>
                <input
                  type="text"
                  value={settings.admissionsPhone || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, admissionsPhone: e.target.value })
                  }
                  placeholder="+91 94471 23456"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Admissions Desk Email
                </label>
                <input
                  type="email"
                  value={settings.admissionsEmail || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, admissionsEmail: e.target.value })
                  }
                  placeholder="admissions@mgmcet.ac.in"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {savingSettings ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>Save Live Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2. Firebase Cloud Integration */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <Server className="h-5 w-5 text-brand-700" />
              <div>
                <h3 className="font-heading font-bold text-base text-ink-900">
                  Google Firebase Cloud Integration
                </h3>
                <p className="text-xs text-ink-500">
                  Connect your Firebase project to sync data across all admin users and live visitors
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isFbConnected
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {isFbConnected ? "● Firestore Connected" : "○ Local Storage Mode"}
            </span>
          </div>

          {/* Test connection results */}
          {pingMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2 ${
                pingStatus === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-red-50 border-red-200 text-red-900"
              }`}
            >
              {pingStatus === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span>{pingMessage}</span>
            </div>
          )}

          {/* Credentials Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY)
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID)
                </label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="mgmcet-production"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Auth Domain (NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
                </label>
                <input
                  type="text"
                  value={authDomain}
                  onChange={(e) => setAuthDomain(e.target.value)}
                  placeholder="mgmcet.firebaseapp.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Storage Bucket (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
                </label>
                <input
                  type="text"
                  value={storageBucket}
                  onChange={(e) => setStorageBucket(e.target.value)}
                  placeholder="mgmcet.appspot.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Messaging Sender ID (NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
                </label>
                <input
                  type="text"
                  value={messagingSenderId}
                  onChange={(e) => setMessagingSenderId(e.target.value)}
                  placeholder="1234567890"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  App ID (NEXT_PUBLIC_FIREBASE_APP_ID)
                </label>
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="1:1234567890:web:abcdef"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestPing}
                  disabled={pingStatus === "testing"}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-canvas hover:bg-surface border border-border text-xs font-semibold text-ink-800 cursor-pointer disabled:opacity-50"
                >
                  {pingStatus === "testing" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Zap className="h-3.5 w-3.5 text-accent-500" />
                  )}
                  <span>Test Live Firestore Ping</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetFirebaseConfig}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-ink-500 hover:text-ink-900 cursor-pointer"
                  title="Clear custom config"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset to Defaults</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveFirebaseConfig}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Key className="h-4 w-4" />
                <span>Save Firebase Cloud Keys</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. 1-Click Database Content Initializer */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <Database className="h-5 w-5 text-brand-700" />
            <div>
              <h3 className="font-heading font-bold text-base text-ink-900">
                1-Click Initial Content Seed
              </h3>
              <p className="text-xs text-ink-500">
                Instantly populate your database collections with verified MGMCET news, announcements, faculty, and campus gallery records.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200/80 text-xs text-brand-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold block">
                Recommended for fresh Firestore deployments
              </span>
              <p className="text-ink-600 text-[11px]">
                Copies default content into collections so you can edit and delete immediately without retyping everything.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50"
            >
              {seeding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4 text-accent-400" />
              )}
              <span>{seeding ? "Syncing Database..." : "Push Static Content to Database"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
