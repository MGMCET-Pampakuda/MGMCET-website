"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  Megaphone,
  Users,
  Inbox,
  Briefcase,
  PlusCircle,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Calendar,
  Award,
  Handshake,
  Compass,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  fetchLiveNews,
  fetchLiveAnnouncements,
  fetchLiveFaculty,
  fetchLiveEnquiries,
  fetchLiveJobApplications,
  seedInitialDataToFirestore,
  type SeedResult,
} from "@/lib/firebase-services";
import { news as staticNews } from "@/content/news";
import { site } from "@/content/site";
import { faculty as staticFaculty } from "@/content/faculty";
import { gallery as staticGallery } from "@/content/gallery";
import { initialJobApplications } from "@/content/job-applications";
import { isFirebaseConfigured, getFirebaseConfig } from "@/lib/firebase";
import type { NewsItem } from "@/types/news";
import type { EnquirySubmission } from "@/types/forms";
import type { JobApplication } from "@/types/careers";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminDashboardPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [announcementsCount, setAnnouncementsCount] = useState<number>(0);
  const [facultyCount, setFacultyCount] = useState<number>(0);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<SeedResult | null>(null);

  const isFbConnected = isFirebaseConfigured();
  const fbConfig = getFirebaseConfig();

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const [newsData, annData, facData, enqData, jobData] = await Promise.all([
          fetchLiveNews(),
          fetchLiveAnnouncements(),
          fetchLiveFaculty(),
          fetchLiveEnquiries(),
          fetchLiveJobApplications(),
        ]);

        setNewsList(newsData.length > 0 ? newsData : staticNews);
        setAnnouncementsCount(annData.length > 0 ? annData.length : site.announcements.length);
        setFacultyCount(facData.length > 0 ? facData.length : staticFaculty.length);
        setEnquiries(enqData);
        setJobApplications(jobData);
      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedResult(null);

    try {
      const result = await seedInitialDataToFirestore({
        newsItems: staticNews,
        announcements: site.announcements,
        facultyMembers: staticFaculty,
        galleryItems: staticGallery,
        jobApplications: initialJobApplications,
      });
      setSeedResult(result);

      // Refresh stats
      const [newsData, annData, facData, enqData, jobData] = await Promise.all([
        fetchLiveNews(),
        fetchLiveAnnouncements(),
        fetchLiveFaculty(),
        fetchLiveEnquiries(),
        fetchLiveJobApplications(),
      ]);
      setNewsList(newsData);
      setAnnouncementsCount(annData.length);
      setFacultyCount(facData.length);
      setEnquiries(enqData);
      setJobApplications(jobData);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      setSeedResult({
        success: false,
        newsCount: 0,
        announcementsCount: 0,
        facultyCount: 0,
        galleryCount: 0,
        message: `Seeding encountered error: ${errMessage}`,
      });
    } finally {
      setSeeding(false);
    }
  };

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const newJobsCount = jobApplications.filter((j) => j.status === "new").length;

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Manage all real-time college content and admissions workflows"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <button
            type="button"
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-brand-950 font-heading font-bold text-xs transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {seeding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Database className="h-3.5 w-3.5" />
            )}
            <span>{seeding ? "Syncing..." : "1-Click Firebase Seed"}</span>
          </button>
        }
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white p-6 sm:p-8 shadow-md">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-accent-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>MGMCET Portal v2.0 • Pampakuda Campus</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Welcome to the College Admin Portal
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Add news bulletins, event photo galleries, emergency announcements, and manage incoming admission forms without touching a single line of code.
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center gap-2 bg-surface/10 border border-white/10 rounded-xl p-4 text-center">
              <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                System Time
              </span>
              <span className="font-mono text-lg font-bold text-accent-400">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* 1-Click Database Notification if triggered */}
        {seedResult && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              seedResult.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <p className="font-bold text-sm">{seedResult.message}</p>
              <p className="mt-1 opacity-80">
                Synchronized {seedResult.newsCount} news articles, {seedResult.announcementsCount} announcements, {seedResult.facultyCount} faculty records, and {seedResult.galleryCount} gallery items into the active database.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSeedResult(null)}
              className="text-xs opacity-60 hover:opacity-100 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 5 Primary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: News */}
          <Link
            href="/admin/news"
            className="group p-5 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                News
              </span>
              <div className="p-2 rounded-xl bg-brand-50 text-brand-800 group-hover:bg-brand-800 group-hover:text-white transition-colors">
                <Newspaper className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl text-ink-900">
                {loading ? "..." : newsList.length}
              </span>
              <p className="text-xs text-ink-500 mt-1 flex items-center justify-between">
                <span>Articles</span>
                <span className="text-brand-700 font-semibold group-hover:underline">
                  Manage →
                </span>
              </p>
            </div>
          </Link>

          {/* Card 2: Announcements */}
          <Link
            href="/admin/announcements"
            className="group p-5 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                Notices
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Megaphone className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl text-ink-900">
                {loading ? "..." : announcementsCount}
              </span>
              <p className="text-xs text-ink-500 mt-1 flex items-center justify-between">
                <span>Ticker strips</span>
                <span className="text-brand-700 font-semibold group-hover:underline">
                  Manage →
                </span>
              </p>
            </div>
          </Link>

          {/* Card 3: Faculty */}
          <Link
            href="/admin/faculty"
            className="group p-5 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                Faculty
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl text-ink-900">
                {loading ? "..." : facultyCount}
              </span>
              <p className="text-xs text-ink-500 mt-1 flex items-center justify-between">
                <span>Profiles</span>
                <span className="text-brand-700 font-semibold group-hover:underline">
                  Manage →
                </span>
              </p>
            </div>
          </Link>

          {/* Card 4: Enquiries */}
          <Link
            href="/admin/enquiries"
            className="group p-5 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                Enquiries
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-800 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <Inbox className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-3xl text-ink-900">
                  {loading ? "..." : enquiries.length}
                </span>
                {newEnquiriesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                    {newEnquiriesCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-500 mt-1 flex items-center justify-between">
                <span>Admissions</span>
                <span className="text-brand-700 font-semibold group-hover:underline">
                  Review →
                </span>
              </p>
            </div>
          </Link>

          {/* Card 5: Job Applications */}
          <Link
            href="/admin/careers"
            className="group p-5 rounded-2xl bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                Recruitment
              </span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-800 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-3xl text-ink-900">
                  {loading ? "..." : jobApplications.length}
                </span>
                {newJobsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                    {newJobsCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-500 mt-1 flex items-center justify-between">
                <span>Job Applications</span>
                <span className="text-brand-700 font-semibold group-hover:underline">
                  Review →
                </span>
              </p>
            </div>
          </Link>
        </div>

        {/* Quick Action Buttons */}
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-xs">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-ink-500 mb-3">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/news?action=new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5 text-accent-400" />
              <span>Publish News &amp; Event</span>
            </Link>

            <Link
              href="/admin/announcements?action=new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 text-xs font-semibold transition-colors"
            >
              <Megaphone className="h-3.5 w-3.5 text-brand-700" />
              <span>Post New Notice</span>
            </Link>

            <Link
              href="/admin/faculty?action=new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 text-xs font-semibold transition-colors"
            >
              <Users className="h-3.5 w-3.5 text-brand-700" />
              <span>Add Faculty Member</span>
            </Link>

            <Link
              href="/admin/careers"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-semibold transition-colors"
            >
              <Briefcase className="h-3.5 w-3.5 text-purple-700" />
              <span>Review Job Applications</span>
            </Link>

            <Link
              href="/admin/iqac"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors"
            >
              <Award className="h-3.5 w-3.5 text-amber-700" />
              <span>IQAC Committee</span>
            </Link>

            <Link
              href="/admin/mous"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-colors"
            >
              <Handshake className="h-3.5 w-3.5 text-emerald-700" />
              <span>Industry MoUs</span>
            </Link>

            <Link
              href="/admin/clubs"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-semibold transition-colors"
            >
              <Compass className="h-3.5 w-3.5 text-sky-700" />
              <span>Clubs &amp; Associations</span>
            </Link>

            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-canvas hover:bg-surface text-ink-700 border border-border text-xs font-semibold transition-colors ml-auto"
            >
              <span>Cloud &amp; Settings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Split Grid: Recent Enquiries & Latest News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Recent Enquiries */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-brand-700" />
                  <h3 className="font-heading font-bold text-h4 text-ink-900">
                    Recent Enquiries
                  </h3>
                </div>
                <Link
                  href="/admin/enquiries"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                >
                  View All ({enquiries.length}) →
                </Link>
              </div>

              <div className="divide-y divide-border/60 mt-2">
                {enquiries.slice(0, 4).map((enq) => (
                  <div key={enq.id} className="py-3.5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs text-ink-900">
                        {enq.fullName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          enq.status === "new"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : enq.status === "contacted"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>

                    <p className="text-xs text-ink-600 line-clamp-1">
                      {enq.message}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-ink-400">
                      <span>{enq.phone}</span>
                      <span>•</span>
                      <span>{enq.district}</span>
                      <span>•</span>
                      <span>
                        {new Date(enq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {enquiries.length === 0 && (
                  <div className="py-8 text-center text-xs text-ink-500">
                    No enquiries received yet.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-border flex justify-end">
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
              >
                <span>Manage &amp; Export All Enquiries</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Latest Published News */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-brand-700" />
                  <h3 className="font-heading font-bold text-h4 text-ink-900">
                    Latest News &amp; Events
                  </h3>
                </div>
                <Link
                  href="/admin/news"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                >
                  View All ({newsList.length}) →
                </Link>
              </div>

              <div className="divide-y divide-border/60 mt-2">
                {newsList.slice(0, 4).map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      item.category === "event" ? "bg-accent-50 text-accent-800" : "bg-brand-50 text-brand-800"
                    }`}>
                      {item.category === "event" ? (
                        <Calendar className="h-5 w-5" />
                      ) : (
                        <Newspaper className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                            item.category === "event"
                              ? "bg-accent-100 text-accent-900"
                              : "bg-brand-50 text-brand-800"
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-[10px] text-ink-400">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-heading font-semibold text-xs text-ink-900 truncate mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                    <Link
                      href={`/news-events/${item.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-ink-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                      title="View on public site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-border flex justify-end">
              <Link
                href="/admin/news?action=new"
                className="text-xs font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
              >
                <span>+ Create New News Article</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Database Status Info Box */}
        <div className="rounded-2xl bg-canvas border border-border p-5 text-xs text-ink-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-heading font-bold text-ink-900 block">
              Database Connection: {isFbConnected ? "Google Firebase Cloud" : "Local Storage Demo"}
            </span>
            <p className="text-[11px] text-ink-500">
              {isFbConnected
                ? `Active Firebase Project: ${fbConfig.projectId || "Configured"}. All changes are immediately synced to cloud Firestore.`
                : "Changes are stored in your browser's persistent local storage. To sync across devices, add your Firebase keys in Settings."}
            </p>
          </div>

          <Link
            href="/admin/settings"
            className="px-3.5 py-1.5 rounded-lg bg-surface hover:bg-brand-50 text-brand-800 font-semibold border border-brand-200 transition-colors shrink-0"
          >
            Configure Cloud Sync
          </Link>
        </div>
      </div>
    </div>
  );
}
