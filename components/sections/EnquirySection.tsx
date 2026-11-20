"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/validators/enquiry";
import { isFirebaseConfigured } from "@/lib/firebase";
import { createEnquirySubmission } from "@/lib/firebase-services";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const KERALA_DISTRICTS = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
  "Other State / Outside Kerala",
];

function isRateLimited(): boolean {
  if (typeof window === "undefined") return false;
  const lastSubmitTime = localStorage.getItem("mgmcet_last_enquiry");
  if (!lastSubmitTime) return false;
  const now = Date.now();
  return now - parseInt(lastSubmitTime, 10) < 10000;
}

function recordSubmissionTime(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("mgmcet_last_enquiry", Date.now().toString());
  }
}

export interface EnquirySectionProps {
  className?: string;
}

/**
 * Quick Enquiry Form Section allowing prospective students and parents to submit questions.
 * Integrated with react-hook-form, zod validation, client rate limiting, honeypot field,
 * and Firebase Firestore (with graceful fallback when unconfigured).
 */
export function EnquirySection({ className }: EnquirySectionProps) {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      district: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: EnquiryInput) => {
    // 1. Honeypot verification (anti-bot)
    if (data.website) {
      setSubmitStatus("error");
      setFeedbackMessage("Submission rejected.");
      return;
    }

    // 2. Simple client-side rate limit (10s between submissions)
    if (isRateLimited()) {
      setSubmitStatus("error");
      setFeedbackMessage(
        "Please wait a few seconds before submitting another enquiry."
      );
      return;
    }

    setSubmitStatus("loading");

    try {
      await createEnquirySubmission({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        district: data.district,
        message: data.message,
        source: "home_page",
      });

      recordSubmissionTime();
      setSubmitStatus("success");
      setFeedbackMessage(
        isFirebaseConfigured()
          ? "Thank you! Your enquiry has been received. Our admissions desk will contact you soon."
          : "Thank you! Your enquiry was received and logged in the Admin Desk."
      );
      reset();
    } catch {
      setSubmitStatus("error");
      setFeedbackMessage(
        "An unexpected error occurred while sending your message. Please reach us directly via phone."
      );
    }
  };

  return (
    <section
      aria-labelledby="enquiry-heading"
      className={cn("py-12 sm:py-20 bg-canvas", className)}
    >
      <Container size="narrow">
        <div className="rounded-2xl bg-surface border border-border shadow-card p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <p className="font-heading text-eyebrow font-bold uppercase tracking-widest text-accent-600">
              ADMISSIONS &amp; QUERIES
            </p>
            <h2
              id="enquiry-heading"
              className="font-heading text-h2 font-bold text-ink-900 tracking-tight leading-tight"
            >
              Got Questions for Us?
            </h2>
            <p className="text-body-sm sm:text-body text-ink-600 leading-relaxed">
              Fill out this quick form and our academic counsellors will get back
              to you promptly with complete details.
            </p>
          </div>

          {/* Feedback Banner */}
          {submitStatus === "success" && (
            <div className="p-4 rounded-xl bg-success-bg border border-success/30 flex items-start gap-3 text-success animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-body-sm font-medium">
                {feedbackMessage}
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 rounded-xl bg-danger-bg border border-danger/30 flex items-start gap-3 text-danger animate-in fade-in duration-200">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-body-sm font-medium">
                {feedbackMessage}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Honeypot field (hidden from view) */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...register("website")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <Input
                id="enquiry-fullName"
                label="Full Name"
                placeholder="e.g. Rahul Sharma"
                required
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              {/* Email */}
              <Input
                id="enquiry-email"
                type="email"
                label="Email Address"
                placeholder="rahul@example.com"
                required
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone */}
              <Input
                id="enquiry-phone"
                type="tel"
                label="Mobile Phone"
                placeholder="9876543210 (10 digits)"
                required
                error={errors.phone?.message}
                {...register("phone")}
              />

              {/* District */}
              <Select
                id="enquiry-district"
                label="District / Location"
                required
                placeholder="Select your district"
                error={errors.district?.message}
                {...register("district")}
              >
                <option value="">Select your district</option>
                {KERALA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </Select>
            </div>

            {/* Message */}
            <Textarea
              id="enquiry-message"
              label="Your Message / Query"
              placeholder="Ask about courses, eligibility, fee structure, scholarships, or hostel facilities..."
              rows={4}
              required
              error={errors.message?.message}
              {...register("message")}
            />

            {/* Helper Note regarding fast phone response */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-brand-50/70 border border-brand-100 text-ink-600 text-xs">
              <Info className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                <strong>Tip for faster response:</strong> For urgent admission-related queries, we suggest calling our helpdesk directly at{" "}
                <a
                  href={`tel:${site.contact.phones[0]}`}
                  className="font-bold text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  {site.contact.phones[0]}
                </a>{" "}
                or{" "}
                <a
                  href={`tel:${site.contact.phones[1]}`}
                  className="font-bold text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  {site.contact.phones[1]}
                </a>
                .
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              pill
              fullWidth
              isLoading={submitStatus === "loading"}
              className="font-bold tracking-wide shadow-sm"
            >
              <Send className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Submit Enquiry</span>
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
