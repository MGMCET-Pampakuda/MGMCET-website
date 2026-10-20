import React from "react";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { SmartLink } from "@/components/ui/Link";
import { CTABanner } from "@/components/sections/CTABanner";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface AdmissionsPageProps {
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  className?: string;
}

const ELIGIBILITY_LEVELS = [
  {
    level: "B.Tech Undergraduate",
    duration: "4 Years (8 Semesters)",
    intake: "5 Specializations",
    criteria: [
      "Passed 10+2 / Higher Secondary Examination with Physics, Chemistry and Mathematics.",
      "Minimum 45% marks in PCM subjects combined (40% for reserved categories).",
      "Valid rank in KEAM (Kerala Engineering Architecture Medical) examination for merit seats, or direct application under Management / NRI quota.",
    ],
    streams: "AI & ML, CSE, CSE (Cyber Security), ECE, Mechanical Engineering",
  },
  {
    level: "M.Tech Postgraduate",
    duration: "2 Years (4 Semesters)",
    intake: "2 Specializations",
    criteria: [
      "B.Tech / B.E. degree in relevant discipline from KTU or AICTE-approved institution.",
      "Minimum 60% aggregate marks (or equivalent CGPA).",
      "Valid GATE score preferred. Non-GATE candidates admitted based on DTE Kerala merit ranking.",
    ],
    streams: "Industrial Instrumentation & Control, Structural Engineering & Construction Mgmt",
  },
  {
    level: "Polytechnic Diploma",
    duration: "3 Years (6 Semesters)",
    intake: "8 Disciplines",
    criteria: [
      "Passed SSLC / Class 10 examination with Mathematics, Science and English.",
      "Direct Second Year Lateral Entry available for ITI (2 Years) or +2 Science / Vocational passed students.",
      "Admissions governed by Directorate of Technical Education (DTE), Kerala.",
    ],
    streams: "AI & ML, Automobile, Civil, CSE, ECE, EEE, Electrical & EV, Mechanical",
  },
];

const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Enquiry & Course Selection",
    description: "Explore our academic programs and connect with academic counselors to select the right engineering discipline.",
  },
  {
    step: 2,
    title: "Application Submission",
    description: "Submit the online registration form via our portal or visit the campus admission desk with academic credentials.",
  },
  {
    step: 3,
    title: "Verification & Counseling",
    description: "Submit original certificates (10th/12th marklists, KEAM score card/hall ticket, transfer certificate) for verification.",
  },
  {
    step: 4,
    title: "Seat Confirmation & Enrollment",
    description: "Complete fee remittance and confirm admission to secure your seat for Academic Year 2026-2027.",
  },
];

const ADMISSION_FAQS = [
  {
    id: "faq-1",
    question: "What is the college code for MGMCET in KEAM counseling?",
    answer: "The official KEAM College Code for MGM College of Engineering and Technology, Pampakuda is MGE. Use code MGE when selecting options in the CEE allotment portal.",
  },
  {
    id: "faq-2",
    question: "What is Mammooty's Vidyamrutham Scholarship?",
    answer: "Mammooty's Vidyamrutham Scholarship is a flagship philanthropic initiative by the MGM Group of Institutions providing substantial fee waivers and financial assistance to meritorious students from economically disadvantaged backgrounds.",
  },
  {
    id: "faq-3",
    question: "Are hostel and transportation facilities available on campus?",
    answer: "Yes, MGMCET provides secure, separate on-campus hostels for boys and girls with modern amenities, round-the-clock security, Wi-Fi, and nutritious dining. College buses operate across major routes connecting Ernakulam, Piravom, Muvattupuzha, Thodupuzha, and Kottayam.",
  },
  {
    id: "faq-4",
    question: "Can I get direct admission under the Management / NRI quota?",
    answer: "Yes, seats are available under Management and NRI quotas as per Kerala Government and KTU norms. Contact our admissions desk directly at +91 9946485111 or +91 7902995111 for quota availability and fee structure.",
  },
  {
    id: "faq-5",
    question: "Is there Lateral Entry admission for Polytechnic Diploma holders into B.Tech?",
    answer: "Yes, candidates who hold a 3-year Polytechnic Diploma with minimum qualifying marks are eligible for direct admission into the second year (3rd semester) of B.Tech programmes via the Kerala B.Tech Lateral Entry Entrance Examination (LET).",
  },
];

/**
 * AdmissionsPage template featuring eligibility requirements across degree levels,
 * admission roadmap, scholarship spotlights, and FAQ accordion.
 */
export function AdmissionsPage({
  breadcrumbItems,
  heroImage,
  className,
}: AdmissionsPageProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title="Admissions 2026"
        description="Begin your journey towards an engineering career with MGM College of Engineering and Technology, Pampakuda. Admissions open for B.Tech, M.Tech, and Polytechnic Diploma programmes."
        breadcrumbItems={breadcrumbItems}
        image={heroImage}
        badge="Admissions Open 2026-27"
        actions={
          <div className="flex flex-wrap gap-3">
            <SmartLink
              href={site.applyNowUrl}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm shadow-card transition-all"
            >
              Apply Online Now &rarr;
            </SmartLink>
            <SmartLink
              href="/downloads"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-body-sm border border-white/20 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download Prospectus</span>
            </SmartLink>
          </div>
        }
      />

      {/* 1. Eligibility Criteria Section */}
      <Section tone="canvas" spacing="default">
        <Container>
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <Badge variant="mint" size="sm">
                PROGRAMME ELIGIBILITY
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900">
                Admission Requirements by Programme
              </h2>
              <p className="text-body text-ink-600">
                Review the qualifying examination criteria, entrance exam guidelines, and durations for each level:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {ELIGIBILITY_LEVELS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-surface border border-border p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 hover:border-brand-500 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase text-accent-700 bg-accent-100/70 px-2.5 py-0.5 rounded">
                        {item.duration}
                      </span>
                      <h3 className="font-heading font-bold text-h3 text-ink-900 pt-1">
                        {item.level}
                      </h3>
                      <p className="text-xs font-semibold text-brand-700">
                        {item.intake}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border">
                      <p className="text-xs font-bold text-ink-900 uppercase tracking-wider">
                        Criteria &amp; Qualifications:
                      </p>
                      <ul className="space-y-2">
                        {item.criteria.map((c, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-body-sm text-ink-600 leading-relaxed"
                          >
                            <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border text-xs text-ink-500">
                    <strong className="text-ink-800">Specializations:</strong>{" "}
                    {item.streams}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Admission Process Roadmap */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="space-y-8 max-w-3xl">
            <Badge variant="mint" size="sm">
              HOW TO APPLY
            </Badge>
            <h2 className="font-heading font-bold text-h2 text-ink-900">
              Admission Process &amp; Counseling Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-brand-50 border border-brand-100 p-6 shadow-xs space-y-3"
              >
                <span className="font-mono text-xs font-bold text-brand-900 bg-brand-200/60 px-3 py-1 rounded-full inline-block">
                  STEP 0{step.step}
                </span>
                <h3 className="font-heading font-bold text-h4 text-ink-900">
                  {step.title}
                </h3>
                <p className="text-body-sm text-ink-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Scholarships Section (Mammooty's Vidyamrutham Spotlight) */}
      <Section tone="mint" spacing="default">
        <Container>
          <div className="rounded-2xl bg-brand-900 text-white p-6 sm:p-10 lg:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-semibold border border-accent-400/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Scholarships &amp; Fee Concessions</span>
              </div>
              <h2 className="font-heading font-bold text-h2 text-white">
                Mammooty&apos;s Vidyamrutham Scholarship
              </h2>
              <p className="text-body text-brand-100 leading-relaxed max-w-2xl">
                A prestigious philanthropic scholarship program established by MGM Group of Institutions to empower talented, deserving students from rural and economically constrained backgrounds. In addition, merit scholarships are awarded to KEAM high-rank holders.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <SmartLink
                  href={site.scholarshipUrl || "/contact"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm transition-all shadow-card"
                >
                  <span>Apply for Scholarship</span>
                  <ArrowRight className="h-4 w-4" />
                </SmartLink>
                <SmartLink
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-body-sm border border-white/20 transition-all"
                >
                  Contact Counselor
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-h4 text-white">
                Available Concessions
              </h3>
              <ul className="space-y-3 text-body-sm text-brand-100">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-400 shrink-0 mt-0.5" />
                  <span>Full tuition waiver for KEAM top rankers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-400 shrink-0 mt-0.5" />
                  <span>Merit-cum-means assistance up to 100%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-400 shrink-0 mt-0.5" />
                  <span>Sports excellence &amp; cultural achiever quotas</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Frequently Asked Questions */}
      <Section tone="white" spacing="default">
        <Container size="narrow">
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <Badge variant="mint" size="sm">
                ADMISSION FAQS
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900">
                Frequently Asked Questions
              </h2>
              <p className="text-body text-ink-600">
                Common questions regarding eligibility, KEAM counseling, scholarships, and campus facilities.
              </p>
            </div>

            <div className="rounded-2xl bg-surface border border-border p-4 sm:p-8 shadow-xs">
              <Accordion type="single" defaultValue={ADMISSION_FAQS[0]?.id}>
                {ADMISSION_FAQS.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. CTA Banner */}
      <CTABanner
        ctaBanner={{
          eyebrow: "READY TO JOIN MGMCET?",
          title: "Admissions Open for Academic Year 2026",
          description: "Take the first step towards a rewarding engineering career. Fill out our online application or speak directly with our admissions desk.",
          primaryCta: { label: "Apply Online", href: site.applyNowUrl },
          secondaryCta: { label: "Download Prospectus", href: "/downloads" },
        }}
      />
    </div>
  );
}
