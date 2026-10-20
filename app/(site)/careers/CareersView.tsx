"use client";

import React, { useState } from "react";
import { Mail, GraduationCap, Clock } from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SmartLink } from "@/components/ui/Link";
import { careers } from "@/content/careers";
import { site } from "@/content/site";

export function CareersView() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All Positions", value: "all" },
    { label: "Teaching Faculty", value: "teaching" },
    { label: "Technical & Non-Teaching", value: "non-teaching" },
  ];

  const filteredCareers = activeFilter === "all"
    ? careers
    : careers.filter((c) => c.type === activeFilter);

  return (
    <ListingPage
      title="Careers at MGMCET"
      description="Join our vibrant academic community. We seek dedicated educators, researchers, and administrative professionals passionate about engineering education."
      badge="Career Opportunities"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Careers", href: "/careers" },
      ]}
      filters={filters}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      totalCount={filteredCareers.length}
      emptyMessage="There are currently no active job openings listed."
    >
      <div className="space-y-8">
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCareers.map((job) => (
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
                  <SmartLink
                    href={job.applyHref ?? "mailto:principal@mgmcet.ac.in"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-xs transition-colors"
                  >
                    <span>Apply for Position</span>
                    <Mail className="h-3.5 w-3.5" />
                  </SmartLink>
                </div>
              </Card>
            ))}
          </div>
        ) : null}

        {/* General Application & Resume Drop Box */}
        <div className="rounded-2xl bg-brand-900 text-white p-8 sm:p-10 shadow-card">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" size="sm" className="bg-white/10 text-accent-300 border-white/20">
              GENERAL RECRUITMENT DESK
            </Badge>
            <h3 className="font-heading font-bold text-h3 text-white">
              Spontaneous Applications &amp; Faculty Database
            </h3>
            <p className="text-body-sm text-brand-100 leading-relaxed">
              We continually welcome applications from qualified academicians and research scholars holding M.Tech, Ph.D, or industry expertise in emerging technical fields. Send your detailed resume with academic credentials directly to the Principal’s office.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${site.contact.email}?subject=Job%20Application%20-%20MGMCET`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Email Resume to {site.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ListingPage>
  );
}
