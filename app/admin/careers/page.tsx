"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Download,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  GraduationCap,
  Clock,
  CheckCircle2,
  Trash2,
  X,
  ExternalLink,
  FileCheck,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  subscribeToLiveJobApplications,
  updateJobApplicationStatus,
  deleteJobApplication,
} from "@/lib/firebase-services";
import { initialJobApplications } from "@/content/job-applications";
import type { JobApplication, ApplicationStatus, JobCategory } from "@/types/careers";

interface PageProps {
  onOpenMobileMenu?: () => void;
}

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; badgeClass: string; borderClass: string }
> = {
  new: {
    label: "New Dossier",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    borderClass: "border-red-400",
  },
  reviewing: {
    label: "Under Review",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    borderClass: "border-amber-400",
  },
  shortlisted: {
    label: "Shortlisted",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    borderClass: "border-blue-400",
  },
  interview: {
    label: "Interview Scheduled",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    borderClass: "border-purple-400",
  },
  offered: {
    label: "Selected / Offered",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    borderClass: "border-emerald-400",
  },
  rejected: {
    label: "Not Shortlisted",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    borderClass: "border-slate-300",
  },
};

const CATEGORY_LABELS: Record<JobCategory, string> = {
  teaching: "Teaching Faculty",
  lab_assistant: "Lab Assistant / Instructor",
  administrative: "Administrative Staff",
  technical: "Technical & IT Staff",
  other: "Other Staff",
};

export default function AdminCareersPage({ onOpenMobileMenu = () => {} }: PageProps) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Selected Application for Inspection Modal
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [editStatus, setEditStatus] = useState<ApplicationStatus>("new");
  const [editNotes, setEditNotes] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLiveJobApplications((items) => {
      setApplications(items.length > 0 ? items : initialJobApplications);
    });
    return () => unsubscribe();
  }, []);

  const openAppDetail = (app: JobApplication) => {
    setSelectedApp(app);
    setEditStatus(app.status);
    setEditNotes(app.internalNotes || "");
  };

  const handleSaveReview = async () => {
    if (!selectedApp) return;
    setSavingStatus(true);
    try {
      await updateJobApplicationStatus(selectedApp.id, editStatus, editNotes);
      setSelectedApp({
        ...selectedApp,
        status: editStatus,
        internalNotes: editNotes,
      });
      setToastMessage("Application review updated successfully.");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error("Error updating application:", err);
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this applicant's dossier?")) {
      await deleteJobApplication(id);
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
      setToastMessage("Application deleted.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.phone.includes(searchQuery) ||
        app.roleApplied.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.highestQualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || app.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [applications, searchQuery, statusFilter, categoryFilter]);

  const handleExportCSV = () => {
    const headers = [
      "Application No",
      "Full Name",
      "Category",
      "Role Applied",
      "Department",
      "Highest Qualification",
      "Specialization",
      "Total Experience",
      "Current Employer",
      "Notice Period",
      "Email",
      "Phone",
      "Status",
      "Resume File",
      "Date Applied",
      "Internal Notes",
    ];

    const rows = filteredApplications.map((app) => [
      `"${app.applicationNumber}"`,
      `"${app.fullName.replace(/"/g, '""')}"`,
      `"${CATEGORY_LABELS[app.category] || app.category}"`,
      `"${app.roleApplied.replace(/"/g, '""')}"`,
      `"${app.department.replace(/"/g, '""')}"`,
      `"${app.highestQualification.replace(/"/g, '""')}"`,
      `"${(app.specialization || "").replace(/"/g, '""')}"`,
      `"${app.totalExperienceYears}"`,
      `"${(app.currentEmployer || "").replace(/"/g, '""')}"`,
      `"${app.noticePeriod || ""}"`,
      `"${app.email}"`,
      `"${app.phone}"`,
      `"${app.status}"`,
      `"${app.resumeFileName || "None"}"`,
      `"${new Date(app.createdAt).toLocaleDateString()}"`,
      `"${(app.internalNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `MGMCET_Job_Applications_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusCounts = useMemo(() => {
    return {
      all: applications.length,
      new: applications.filter((a) => a.status === "new").length,
      reviewing: applications.filter((a) => a.status === "reviewing").length,
      shortlisted: applications.filter((a) => a.status === "shortlisted").length,
      interview: applications.filter((a) => a.status === "interview").length,
      offered: applications.filter((a) => a.status === "offered").length,
    };
  }, [applications]);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Job Applications & Recruitment"
        subtitle="Review resumes, candidate dossiers, and qualifications for faculty and staff openings"
        onOpenMobileMenu={onOpenMobileMenu}
        actions={
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas border border-border text-ink-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-brand-700" />
            <span>Export to CSV / Excel</span>
          </button>
        }
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "all"
                ? "bg-brand-900 text-white border-brand-900 shadow-xs"
                : "bg-surface hover:bg-canvas border-border text-ink-700"
            }`}
          >
            <span className="text-[11px] block font-semibold opacity-70">Total Candidates</span>
            <span className="font-heading font-extrabold text-xl">{statusCounts.all}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("new")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "new"
                ? "bg-red-700 text-white border-red-700 shadow-xs"
                : "bg-surface hover:bg-canvas border-border text-ink-700"
            }`}
          >
            <span className="text-[11px] block font-semibold text-red-600">New Dossiers</span>
            <span className="font-heading font-extrabold text-xl text-red-700">
              {statusCounts.new}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("reviewing")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "reviewing"
                ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                : "bg-surface hover:bg-canvas border-border text-ink-700"
            }`}
          >
            <span className="text-[11px] block font-semibold text-amber-600">Under Review</span>
            <span className="font-heading font-extrabold text-xl">{statusCounts.reviewing}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("shortlisted")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "shortlisted"
                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                : "bg-surface hover:bg-canvas border-border text-ink-700"
            }`}
          >
            <span className="text-[11px] block font-semibold text-blue-600">Shortlisted</span>
            <span className="font-heading font-extrabold text-xl">{statusCounts.shortlisted}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("interview")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "interview"
                ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                : "bg-surface hover:bg-canvas border-border text-ink-700"
            }`}
          >
            <span className="text-[11px] block font-semibold text-purple-600">Interview</span>
            <span className="font-heading font-extrabold text-xl">{statusCounts.interview}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("offered")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "offered"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-surface hover:bg-canvas border-border text-ink-700"
            }`}
          >
            <span className="text-[11px] block font-semibold text-emerald-600">Selected</span>
            <span className="font-heading font-extrabold text-xl">{statusCounts.offered}</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, department, qualification, email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-ink-400 shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter by Job Category"
                className="px-3 py-1.5 rounded-xl bg-canvas border border-border text-xs text-ink-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Role Categories</option>
                <option value="teaching">Teaching Faculty</option>
                <option value="lab_assistant">Lab Assistant / Instructor</option>
                <option value="administrative">Administrative Staff</option>
                <option value="technical">Technical Staff</option>
                <option value="other">Other Roles</option>
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
              className="px-3 py-1.5 rounded-xl bg-canvas border border-border text-xs text-ink-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Application Statuses</option>
              <option value="new">New Dossiers</option>
              <option value="reviewing">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview Scheduled</option>
              <option value="offered">Selected / Offered</option>
              <option value="rejected">Not Shortlisted</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center text-ink-500 space-y-2">
              <Briefcase className="h-8 w-8 mx-auto text-ink-300" />
              <p className="font-heading font-semibold text-ink-800 text-sm">
                No job applications found matching your search.
              </p>
              <p className="text-xs text-ink-500">
                Try clearing your search query or switching filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-canvas border-b border-border text-ink-500 uppercase tracking-wider font-semibold text-[11px]">
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Role &amp; Department</th>
                    <th className="py-3 px-4">Qualification &amp; Exp</th>
                    <th className="py-3 px-4">Resume / CV</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredApplications.map((app) => {
                    const statusInfo = STATUS_CONFIG[app.status] || STATUS_CONFIG.new;

                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-brand-50/40 transition-colors cursor-pointer group"
                        onClick={() => openAppDetail(app)}
                      >
                        {/* Applicant Column */}
                        <td className="py-3.5 px-4">
                          <div className="font-heading font-bold text-ink-900 group-hover:text-brand-800 text-sm">
                            {app.fullName}
                          </div>
                          <div className="text-[11px] text-ink-500 flex items-center gap-2 mt-0.5">
                            <span>{app.email}</span>
                            <span>•</span>
                            <span>{app.phone}</span>
                          </div>
                          <span className="text-[10px] font-mono text-ink-400 mt-0.5 block">
                            {app.applicationNumber}
                          </span>
                        </td>

                        {/* Role & Dept Column */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-ink-900">{app.roleApplied}</div>
                          <div className="text-[11px] text-brand-700 font-medium">
                            {app.department}
                          </div>
                          <span className="inline-block px-1.5 py-0.5 rounded-sm bg-brand-50 text-[10px] text-brand-900 font-semibold mt-1">
                            {CATEGORY_LABELS[app.category] || app.category}
                          </span>
                        </td>

                        {/* Qualification & Experience */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-ink-800 flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-brand-700 shrink-0" />
                            <span>{app.highestQualification}</span>
                          </div>
                          <div className="text-[11px] text-ink-500 flex items-center gap-1.5 mt-0.5">
                            <Clock className="h-3 w-3 text-ink-400 shrink-0" />
                            <span>{app.totalExperienceYears} Total</span>
                            {app.currentEmployer && (
                              <span className="truncate max-w-[140px]" title={app.currentEmployer}>
                                • {app.currentEmployer}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Resume / CV column */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={app.resumeFileName || "resume.pdf"}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 text-[11px] font-semibold transition-colors"
                            >
                              <FileText className="h-3.5 w-3.5 text-brand-700" />
                              <span className="max-w-[120px] truncate">
                                {app.resumeFileName || "View Resume"}
                              </span>
                              <ExternalLink className="h-3 w-3 opacity-60" />
                            </a>
                          ) : (
                            <span className="text-ink-400 text-[11px] italic">Not attached</span>
                          )}
                        </td>

                        {/* Status Column */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusInfo.badgeClass}`}
                          >
                            {statusInfo.label}
                          </span>
                        </td>

                        {/* Action Column */}
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openAppDetail(app)}
                              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-canvas border border-border text-ink-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                            >
                              Review
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(app.id)}
                              className="p-1 rounded-lg text-ink-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Delete application"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* APPLICANT DOSSIER MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-surface rounded-2xl border border-border max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 border-b border-border bg-canvas flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-brand-50 text-brand-900 border border-brand-200 font-semibold">
                    {selectedApp.applicationNumber}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      STATUS_CONFIG[selectedApp.status].badgeClass
                    }`}
                  >
                    {STATUS_CONFIG[selectedApp.status].label}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-ink-900 mt-1.5">
                  {selectedApp.fullName}
                </h3>
                <p className="text-xs text-brand-800 font-semibold">
                  {selectedApp.roleApplied} • {selectedApp.department}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-800 hover:bg-surface transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-ink-700">
              {/* Quick Contact Bar */}
              <div className="flex flex-wrap gap-2.5 p-3 rounded-xl bg-brand-50/50 border border-brand-200/60">
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas border border-border text-ink-900 font-semibold transition-colors shadow-2xs"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-700" />
                  <span>Call {selectedApp.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas border border-border text-emerald-800 font-semibold transition-colors shadow-2xs"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${selectedApp.email}?subject=MGMCET%20Recruitment%20Update%20-${encodeURIComponent(
                    selectedApp.applicationNumber
                  )}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas border border-border text-ink-900 font-semibold transition-colors shadow-2xs"
                >
                  <Mail className="h-3.5 w-3.5 text-brand-700" />
                  <span>Email {selectedApp.email}</span>
                </a>

                {selectedApp.linkedinUrl && (
                  <a
                    href={selectedApp.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas border border-border text-blue-800 font-semibold transition-colors shadow-2xs ml-auto"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Grid: Academic & Professional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 rounded-xl bg-canvas border border-border">
                  <h4 className="font-heading font-bold text-ink-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-brand-700" />
                    <span>Academic Qualifications</span>
                  </h4>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-ink-400 block text-[10px]">Highest Qualification</span>
                      <span className="font-semibold text-ink-900 text-xs">
                        {selectedApp.highestQualification}
                      </span>
                    </div>
                    {selectedApp.specialization && (
                      <div>
                        <span className="text-ink-400 block text-[10px]">Specialization</span>
                        <span className="text-ink-800 font-medium">
                          {selectedApp.specialization}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-canvas border border-border">
                  <h4 className="font-heading font-bold text-ink-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-brand-700" />
                    <span>Experience &amp; Current Role</span>
                  </h4>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-ink-400 block text-[10px]">Total Experience</span>
                      <span className="font-semibold text-ink-900 text-xs">
                        {selectedApp.totalExperienceYears}
                      </span>
                      {selectedApp.teachingExperienceYears && (
                        <span className="text-ink-500 text-[11px] block">
                          (Teaching: {selectedApp.teachingExperienceYears} • Industry:{" "}
                          {selectedApp.industryExperienceYears || "0"})
                        </span>
                      )}
                    </div>
                    {selectedApp.currentEmployer && (
                      <div>
                        <span className="text-ink-400 block text-[10px]">Current Employer</span>
                        <span className="text-ink-800 font-medium">
                          {selectedApp.currentEmployer}{" "}
                          {selectedApp.currentDesignation && `(${selectedApp.currentDesignation})`}
                        </span>
                      </div>
                    )}
                    {selectedApp.noticePeriod && (
                      <div>
                        <span className="text-ink-400 block text-[10px]">Notice Period</span>
                        <span className="text-ink-800 font-medium">
                          {selectedApp.noticePeriod}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RESUME / CV DOCUMENT SECTION */}
              <div className="p-4 rounded-xl border border-brand-200 bg-brand-50/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-brand-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="h-4 w-4 text-brand-700" />
                    <span>Uploaded Candidate Resume / CV</span>
                  </h4>
                  {selectedApp.resumeFileSize && (
                    <span className="text-[10px] text-ink-500 font-mono">
                      {(selectedApp.resumeFileSize / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  )}
                </div>

                {selectedApp.resumeUrl ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-surface border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-50 text-red-700">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-ink-900 text-xs">
                          {selectedApp.resumeFileName || "Candidate_Resume.pdf"}
                        </p>
                        <p className="text-[10px] text-ink-500">
                          {selectedApp.resumeFileType || "Document"} • Ready for review
                        </p>
                      </div>
                    </div>

                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={selectedApp.resumeFileName || "Candidate_Resume.pdf"}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download / Open Resume</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-3 text-ink-500 italic bg-surface rounded-lg border border-border">
                    No resume document uploaded for this submission.
                  </div>
                )}
              </div>

              {/* Cover Letter / Statement of Purpose */}
              {selectedApp.coverLetter && (
                <div className="space-y-1.5">
                  <h4 className="font-heading font-bold text-ink-900 text-xs uppercase tracking-wider">
                    Cover Letter &amp; Academic Statement
                  </h4>
                  <div className="p-3.5 rounded-xl bg-canvas border border-border text-xs leading-relaxed text-ink-800 whitespace-pre-wrap">
                    {selectedApp.coverLetter}
                  </div>
                </div>
              )}

              {/* Status Update & HR Reviewer Notes */}
              <div className="p-4 rounded-xl bg-surface border border-brand-300/80 shadow-xs space-y-4">
                <h4 className="font-heading font-bold text-ink-900 text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Hiring Committee &amp; Review Workflow</span>
                  <span className="text-[10px] text-ink-400 font-normal">
                    Applied on: {new Date(selectedApp.createdAt).toLocaleString()}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                      Application Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as ApplicationStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-xs font-semibold text-ink-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="new">New Dossier</option>
                      <option value="reviewing">Under Review</option>
                      <option value="shortlisted">Shortlisted for Round 2</option>
                      <option value="interview">Interview Scheduled</option>
                      <option value="offered">Selected / Offered Position</option>
                      <option value="rejected">Not Shortlisted</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                      Internal Committee Notes / Interview Feedback
                    </label>
                    <textarea
                      rows={2}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add interviewer remarks, demo score, salary discussions, or next steps..."
                      className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-xs text-ink-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/80">
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedApp.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Application</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveReview}
                    disabled={savingStatus}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-400" />
                    <span>{savingStatus ? "Saving..." : "Save Review Decisions"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
