"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Server,
  Zap,
  ShieldCheck,
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
import { isFirebaseConfigured, getFirestore } from "@/lib/firebase";

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

  const handleTestPing = async () => {
    setPingStatus("testing");
    setPingMessage(null);

    try {
      if (!isFirebaseConfigured()) {
        throw new Error("Firebase keys are not configured in your .env file.");
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
    if (
      !confirm(
        "Are you sure you want to seed default static content (news, announcements, faculty, gallery) to your database? Existing records with the same IDs will be preserved or refreshed."
      )
    ) {
      return;
    }

    setSeeding(true);
    try {
      await seedInitialDataToFirestore({
        newsItems: staticNews,
        announcements: site.announcements,
        facultyMembers: staticFaculty,
        galleryItems: staticGallery,
      });
      showToast("Initial content successfully seeded to Firestore!");
    } catch (err) {
      console.error(err);
      alert("Failed to seed database: " + String(err));
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        title="Site Settings & Cloud Integration"
        subtitle="Manage global college contact info, admissions status, and Firebase sync"
        onOpenMobileMenu={onOpenMobileMenu}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-brand-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Admissions & Banner Settings */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border">
            <Settings className="h-5 w-5 text-brand-700" />
            <div>
              <h3 className="font-heading font-bold text-base text-ink-900">
                General Site &amp; Admissions Notice
              </h3>
              <p className="text-xs text-ink-500">
                Controls the active status banner and enquiry contact info across the public portal
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Admissions Open Toggle */}
              <div className="sm:col-span-2 p-4 rounded-xl bg-canvas border border-border flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-xs text-ink-900 block">
                    Admissions Currently Open
                  </span>
                  <p className="text-xs text-ink-500">
                    Displays &ldquo;Admissions Open&rdquo; badge in the navigation bar and enables primary CTA
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.admissionsOpen}
                    onChange={(e) =>
                      setSettings({ ...settings, admissionsOpen: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Admissions Notice Text */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Admissions Banner Notice Text
                </label>
                <input
                  type="text"
                  value={settings.admissionsNotice}
                  onChange={(e) =>
                    setSettings({ ...settings, admissionsNotice: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Emergency Alert Toggle */}
              <div className="sm:col-span-2 p-4 rounded-xl bg-canvas border border-border flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-xs text-ink-900 block">
                    Campus Emergency / Weather Alert
                  </span>
                  <p className="text-xs text-ink-500">
                    Displays a prominent warning banner across the very top of all public pages
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emergencyAlertActive}
                    onChange={(e) =>
                      setSettings({ ...settings, emergencyAlertActive: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              {settings.emergencyAlertActive && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-semibold text-red-800 mb-1">
                    Emergency Alert Message
                  </label>
                  <input
                    type="text"
                    value={settings.emergencyAlertText}
                    onChange={(e) =>
                      setSettings({ ...settings, emergencyAlertText: e.target.value })
                    }
                    placeholder="e.g., Campus will remain closed on Friday due to weather advisory."
                    className="w-full px-3.5 py-2 rounded-xl border border-red-300 bg-red-50/50 text-xs text-red-950 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              )}

              {/* Admissions Phone */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Admissions Helpline Phone
                </label>
                <input
                  type="text"
                  value={settings.admissionsPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, admissionsPhone: e.target.value })
                  }
                  placeholder="+91 9946485111"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Admissions Email */}
              <div>
                <label className="block text-xs font-heading font-semibold text-ink-800 mb-1">
                  Admissions Contact Email
                </label>
                <input
                  type="email"
                  value={settings.admissionsEmail}
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

        {/* 2. Firebase Cloud Integration Status */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <Server className="h-5 w-5 text-brand-700" />
              <div>
                <h3 className="font-heading font-bold text-base text-ink-900">
                  Google Firebase Cloud Integration
                </h3>
                <p className="text-xs text-ink-500">
                  Firebase status managed securely via environment variables (.env)
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isFbConnected
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              {isFbConnected ? "● Firestore Connected" : "○ Keys Not Loaded"}
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

          <div className="p-4 rounded-xl bg-canvas border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Environment-Based Security</span>
              </div>
              <p className="text-xs text-ink-600">
                All Firebase and Firestore credentials are read directly from your server environment file (.env). No credentials are ever stored in browser storage.
              </p>
            </div>

            <button
              type="button"
              onClick={handleTestPing}
              disabled={pingStatus === "testing"}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface hover:bg-canvas border border-border text-xs font-semibold text-ink-900 shadow-2xs transition-colors shrink-0 cursor-pointer disabled:opacity-50"
            >
              {pingStatus === "testing" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Zap className="h-3.5 w-3.5 text-accent-500" />
              )}
              <span>Test Live Connection</span>
            </button>
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
