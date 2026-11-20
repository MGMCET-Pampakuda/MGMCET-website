"use client";

import React, { useState, useRef } from "react";
import {
  GraduationCap,
  Clock,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  FileCheck,
  X,
  Loader2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { submitJobApplication } from "@/lib/firebase-services";
import type { JobCategory, JobApplication } from "@/types/careers";
import { careers } from "@/content/careers";
import { site } from "@/content/site";

const CATEGORIES: { id: JobCategory; title: string; subtitle: string; icon: string }[] = [
  {
    id: "teaching",
    title: "Teaching Faculty",
    subtitle: "Professors, Associate Professors, Assistant Professors, Guest Lecturers",
    icon: "🎓",
  },
  {
    id: "lab_assistant",
    title: "Lab Assistant / Instructor",
    subtitle: "Computer, Electronics, Mechanical, Civil & Workshop Instructors",
    icon: "🔬",
  },
  {
    id: "administrative",
    title: "Administrative Staff",
    subtitle: "Office Staff, Accountants, Librarians, HR & Receptionists",
    icon: "💼",
  },
  {
    id: "technical",
    title: "Technical & IT Staff",
    subtitle: "Systems Engineers, Network Admins, Hardware Technicians",
    icon: "🛠️",
  },
  {
    id: "other",
    title: "Other Staff / Open Application",
    subtitle: "Campus Facilities, Drivers, Maintenance, Security & Any Role",
    icon: "🏢",
  },
];

const QUALIFICATIONS = [
  "Ph.D (Doctor of Philosophy)",
  "M.Tech / M.E",
  "B.Tech / B.E",
  "MCA (Master of Computer Applications)",
  "MBA (Master of Business Administration)",
  "M.Sc / M.A / M.Com (Postgraduate)",
  "Diploma in Engineering (Polytechnic)",
  "B.Sc / B.A / B.Com (Graduate)",
  "ITI / Vocational Trade Certificate",
  "Higher Secondary (Plus Two) / SSLC",
  "Other Relevant Professional Degree",
];

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Machine Learning",
  "Computer Science (Cyber Security)",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Polytechnic: Automobile Engineering",
  "Polytechnic: Civil Engineering",
  "Polytechnic: Electrical & EV Engineering",
  "Polytechnic: Electrical & Electronics (EEE)",
  "Polytechnic: Mechanical / Computer / AI",
  "M.Tech: Industrial Instrumentation & Control",
  "M.Tech: Structural Engg & Construction Mgmt",
  "Basic Sciences & Humanities (Maths, Physics, Chemistry, English)",
  "Central Library & Information Center",
  "College Administration & Accounts Office",
  "Campus Maintenance, Transportation & Facilities",
  "General / Multiple Departments",
];

export function CareersView() {
  const [activeTab, setActiveTab] = useState<"form" | "openings">("form");

  // Form State
  const [category, setCategory] = useState<JobCategory>("teaching");
  const [roleApplied, setRoleApplied] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[1]);
  const [specialization, setSpecialization] = useState("");
  const [totalExperienceYears, setTotalExperienceYears] = useState("0-1 Years (Fresher)");
  const [currentEmployer, setCurrentEmployer] = useState("");
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  // Resume File State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<JobApplication | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }

    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setFormError("Please provide a valid email address.");
      return;
    }

    if (!phone.trim() || phone.replace(/[^0-9]/g, "").length < 7) {
      setFormError("Please enter a valid phone or WhatsApp number.");
      return;
    }

    if (!roleApplied.trim()) {
      setFormError("Please specify the position/role you are applying for.");
      return;
    }

    setSubmitting(true);
    try {
      const created = await submitJobApplication(
        {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          category,
          roleApplied: roleApplied.trim(),
          department,
          highestQualification,
          specialization: specialization.trim(),
          totalExperienceYears,
          currentEmployer: currentEmployer.trim(),
          currentDesignation: currentDesignation.trim(),
          noticePeriod,
          expectedSalary: expectedSalary.trim(),
          linkedinUrl: linkedinUrl.trim(),
          coverLetter: coverLetter.trim(),
        },
        resumeFile
      );

      setSubmittedApplication(created);
      // Scroll to top of form
      window.scrollTo({ top: 300, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFormError(`Submission failed: ${msg}. Please try again or email us directly.`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedApplication(null);
    setRoleApplied("");
    setFullName("");
    setEmail("");
    setPhone("");
    setSpecialization("");
    setCurrentEmployer("");
    setCurrentDesignation("");
    setExpectedSalary("");
    setLinkedinUrl("");
    setCoverLetter("");
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <ListingPage
      title="Careers & Recruitment Portal"
      description="MGMCET invites qualified educators, lab instructors, administrative staff, and technical personnel to join our institution. Apply directly using our online recruitment portal."
      badge="Join Our Team"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Careers", href: "/careers" },
      ]}
      filters={[
        { label: "Online Application Form", value: "form" },
        { label: "Listed Openings", value: "openings" },
      ]}
      activeFilter={activeTab}
      onFilterChange={(v) => setActiveTab(v as "form" | "openings")}
      totalCount={careers.length}
    >
      <div className="space-y-10">
        {activeTab === "form" ? (
          <div>
            {/* SUCCESS BANNER */}
            {submittedApplication ? (
              <div className="rounded-3xl bg-surface border-2 border-emerald-500/40 p-8 sm:p-12 shadow-xl text-center max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                    Application Received
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900">
                    Thank You, {submittedApplication.fullName}!
                  </h3>
                  <p className="text-body-sm text-ink-600 max-w-lg mx-auto">
                    Your application for the position of{" "}
                    <strong className="text-ink-900">{submittedApplication.roleApplied}</strong> in{" "}
                    <strong className="text-ink-900">{submittedApplication.department}</strong> has
                    been successfully submitted to the MGMCET Recruitment Cell.
                  </p>
                </div>

                {/* Application Reference Card */}
                <div className="p-5 rounded-2xl bg-canvas border border-border inline-block text-left max-w-md w-full">
                  <span className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider block">
                    Application Reference Number
                  </span>
                  <div className="font-mono font-bold text-lg text-brand-900 mt-0.5">
                    {submittedApplication.applicationNumber}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/80 text-xs text-ink-600 space-y-1">
                    <p>
                      <strong>Applicant Email:</strong> {submittedApplication.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {submittedApplication.phone}
                    </p>
                    {submittedApplication.resumeFileName && (
                      <p className="flex items-center gap-1.5 text-brand-800 font-medium">
                        <FileText className="h-3.5 w-3.5" />
                        <span>Resume: {submittedApplication.resumeFileName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-ink-500 max-w-md mx-auto leading-relaxed">
                  Our selection committee evaluates incoming dossiers continuously. Qualified
                  candidates will be contacted directly via email or telephone for interview
                  schedules.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-xs transition-colors shadow-xs"
                  >
                    Submit Another Application
                  </button>
                  <a
                    href="mailto:principal@mgmcet.ac.in"
                    className="px-6 py-2.5 rounded-full bg-surface hover:bg-canvas border border-border text-ink-800 font-heading font-semibold text-xs transition-colors"
                  >
                    Contact Principal’s Office
                  </a>
                </div>
              </div>
            ) : (
              /* APPLICATION FORM CONTAINER */
              <div className="rounded-3xl bg-surface border border-border p-6 sm:p-10 shadow-card max-w-4xl mx-auto space-y-8">
                {/* Form Header */}
                <div className="border-b border-border pb-6 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-brand-700" />
                    <span>Open Recruitment Desk 2026-27</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-ink-900 tracking-tight">
                    Apply for Faculty, Technical &amp; Supporting Staff Positions
                  </h3>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    We welcome applications across all disciplines. Whether applying for an academic
                    professorship, lab instructorship, administrative opening, or support role,
                    submit your details and resume below.
                  </p>
                </div>

                {formError && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2.5">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 text-xs">
                  {/* STEP 1: Select Category */}
                  <div className="space-y-3">
                    <label className="font-heading font-bold text-ink-900 text-sm block">
                      1. What type of role are you applying for?{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {CATEGORIES.map((cat) => {
                        const isSelected = category === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected
                                ? "bg-brand-50/70 border-brand-700 shadow-xs"
                                : "bg-canvas border-border hover:border-brand-300"
                            }`}
                          >
                            <span className="text-2xl shrink-0 mt-0.5">{cat.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-heading font-bold text-ink-900 text-xs">
                                {cat.title}
                              </h4>
                              <p className="text-[11px] text-ink-500 line-clamp-2 mt-0.5 leading-snug">
                                {cat.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 2: Position Details */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-heading font-bold text-ink-900 text-sm">
                      2. Position &amp; Department Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Position / Designation Applied For <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={roleApplied}
                          onChange={(e) => setRoleApplied(e.target.value)}
                          placeholder="e.g. Assistant Professor, Lab Instructor, Accountant, Driver"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                        <span className="text-[11px] text-ink-400 mt-1 block">
                          You can specify any position title you wish to apply for.
                        </span>
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Target Department / Discipline <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        >
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: Personal & Contact Information */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-heading font-bold text-ink-900 text-sm">
                      3. Personal &amp; Contact Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Full Name (with Initials) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Anand K. Menon"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. anand.menon@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Phone / WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 94471 23456"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 4: Educational Qualifications & Experience */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-heading font-bold text-ink-900 text-sm">
                      4. Qualifications &amp; Prior Experience
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Highest Qualification <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={highestQualification}
                          onChange={(e) => setHighestQualification(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        >
                          {QUALIFICATIONS.map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Specialization / Major Subject
                        </label>
                        <input
                          type="text"
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          placeholder="e.g. Power Electronics, Data Science, Accounting"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Total Relevant Experience
                        </label>
                        <select
                          value={totalExperienceYears}
                          onChange={(e) => setTotalExperienceYears(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="0-1 Years (Fresher)">Fresher / Less than 1 Year</option>
                          <option value="1-3 Years">1 - 3 Years</option>
                          <option value="3-5 Years">3 - 5 Years</option>
                          <option value="5-8 Years">5 - 8 Years</option>
                          <option value="8-12 Years">8 - 12 Years</option>
                          <option value="12+ Years">12+ Years</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Current / Last Employer
                        </label>
                        <input
                          type="text"
                          value={currentEmployer}
                          onChange={(e) => setCurrentEmployer(e.target.value)}
                          placeholder="e.g. ABC College of Engineering"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Current Designation
                        </label>
                        <input
                          type="text"
                          value={currentDesignation}
                          onChange={(e) => setCurrentDesignation(e.target.value)}
                          placeholder="e.g. Assistant Professor"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Available Joining Notice Period
                        </label>
                        <select
                          value={noticePeriod}
                          onChange={(e) => setNoticePeriod(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="Immediate">Immediate</option>
                          <option value="15 Days">15 Days</option>
                          <option value="1 Month">1 Month</option>
                          <option value="2 Months">2 Months</option>
                          <option value="3 Months">3 Months</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          Expected Remuneration (Optional)
                        </label>
                        <input
                          type="text"
                          value={expectedSalary}
                          onChange={(e) => setExpectedSalary(e.target.value)}
                          placeholder="e.g. As per AICTE norms / ₹45,000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-ink-700 font-semibold mb-1.5">
                          LinkedIn or Google Scholar / Portfolio URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 5: RESUME / CV UPLOAD */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-ink-900 text-sm flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-brand-700" />
                        <span>5. Attach Your Resume / Curriculum Vitae</span>
                      </h4>
                      <span className="text-[11px] text-ink-500">PDF, DOC, DOCX up to 10MB</span>
                    </div>

                    <div className="p-6 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/30 text-center hover:bg-brand-50/60 transition-colors">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        id="resume-file-input"
                      />

                      {resumeFile ? (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-surface border border-brand-200 max-w-lg mx-auto text-left shadow-xs">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-brand-50 text-brand-800">
                              <FileText className="h-6 w-6" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-ink-900 text-xs truncate max-w-[220px]">
                                {resumeFile.name}
                              </p>
                              <p className="text-[10px] text-ink-500">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1.5 rounded-lg text-ink-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="resume-file-input"
                          className="cursor-pointer space-y-2 block"
                        >
                          <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center mx-auto">
                            <UploadCloud className="h-6 w-6" />
                          </div>
                          <div>
                            <span className="font-heading font-bold text-brand-900 hover:underline text-xs">
                              Click to choose a file
                            </span>
                            <span className="text-ink-500 text-xs"> or drag and drop here</span>
                          </div>
                          <p className="text-[11px] text-ink-400">
                            Upload your updated CV with complete educational and employment history
                          </p>
                        </label>
                      )}

                      {fileError && (
                        <p className="text-xs text-red-600 font-semibold mt-2">{fileError}</p>
                      )}
                    </div>
                  </div>

                  {/* STEP 6: Cover Letter */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <label className="block text-ink-700 font-semibold">
                      Cover Letter / Brief Academic Philosophy (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Briefly state your academic achievements, teaching methodology, or why you wish to join MGMCET..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-border text-ink-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-ink-500">
                      By submitting, you certify that all information submitted is accurate and
                      verifiable.
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-accent-400" />
                          <span>Transmitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application Dossier</span>
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* CURRENT OPENINGS VIEW */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careers.map((job) => (
                <Card key={job.id} variant="outlined" padding="lg" className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="mint" size="sm" className="capitalize">
                        {job.type}
                      </Badge>
                      <h3 className="font-heading font-bold text-h4 text-ink-900 mt-2">
                        {job.title}
                      </h3>
                      <p className="text-body-sm font-medium text-brand-800">
                        {job.department}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-body-sm text-ink-600">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-brand-700 shrink-0" />
                      <span>{job.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-brand-700 shrink-0" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <p className="text-body-sm text-ink-700 leading-relaxed pt-2 border-t border-border">
                    {job.description}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRoleApplied(job.title);
                        if (job.department) setDepartment(job.department);
                        setCategory(job.type === "teaching" ? "teaching" : "technical");
                        setActiveTab("form");
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <span>Apply via Online Portal</span>
                      <ChevronRight className="h-3.5 w-3.5 text-accent-400" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Principal's Recruitment Desk Banner */}
        <div className="rounded-3xl bg-brand-900 text-white p-8 sm:p-10 shadow-card">
          <div className="max-w-2xl space-y-4">
            <Badge
              variant="outline"
              size="sm"
              className="bg-white/10 text-accent-300 border-white/20"
            >
              CENTRAL RECRUITMENT CELL
            </Badge>
            <h3 className="font-heading font-bold text-h3 text-white">
              Spontaneous Applications &amp; Research Scholars
            </h3>
            <p className="text-body-sm text-brand-100 leading-relaxed">
              We continually welcome applications from doctorates, M.Tech scholars, and certified
              industry practitioners passionate about engineering pedagogy and sponsored research.
              Candidates can also submit hard copies or contact the Principal’s office directly.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`mailto:${site.contact.email}?subject=Spontaneous%20Application%20-%20MGMCET`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Email {site.contact.email}</span>
              </a>
              <a
                href={`tel:${site.contact.phones[0] || "+919447123456"}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-body-sm transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Call {site.contact.phones[0] || "Office"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ListingPage>
  );
}
