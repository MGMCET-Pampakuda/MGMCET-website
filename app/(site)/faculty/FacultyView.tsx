"use client";

import React, { useState, useMemo } from "react";
import { Award } from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { faculty } from "@/content/faculty";

const FILTERS = [
  { label: "All Faculty", value: "all" },
  { label: "B.Tech Departments", value: "btech" },
  { label: "M.Tech Programs", value: "mtech" },
  { label: "Polytechnic Diploma", value: "polytechnic" },
];

export function FacultyView() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredFaculty = useMemo(() => {
    if (activeFilter === "all") return faculty;
    return faculty.filter((f) => f.departmentLevel === activeFilter);
  }, [activeFilter]);

  return (
    <ListingPage
      title="Faculty Directory"
      description="Our distinguished faculty members bring rich pedagogical expertise, research credentials, and industry mentorship to MGMCET."
      badge="Academic Leadership &amp; Faculty"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Faculty", href: "/faculty" },
      ]}
      filters={FILTERS}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      totalCount={filteredFaculty.length}
      emptyMessage="No faculty records found for this department level."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFaculty.map((member) => (
          <Card
            key={member.id}
            variant="outlined"
            padding="md"
            className="flex flex-col items-center text-center group hover:shadow-card hover:-translate-y-1 transition-all"
          >
            <div className="relative mb-4">
              <Avatar
                src={member.image}
                name={member.name}
                size="xl"
                className="ring-4 ring-brand-100 group-hover:ring-accent-400 transition-all"
              />
              {member.isHOD && (
                <span className="absolute -bottom-2 -right-1 p-1.5 rounded-full bg-accent-500 text-white shadow-xs" title="Head of Department">
                  <Award className="h-3.5 w-3.5" />
                </span>
              )}
            </div>

            <h3 className="font-heading font-bold text-h4 text-ink-900 group-hover:text-brand-700 transition-colors">
              {member.name}
            </h3>

            <p className="text-body-sm font-medium text-brand-800 mt-1">
              {member.designation}
            </p>

            <span className="text-xs text-ink-500 mt-0.5">
              {member.qualification}
            </span>

            <div className="mt-3 pt-3 border-t border-border/80 w-full">
              <Badge variant="mint" size="sm" className="max-w-full truncate">
                {member.department}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </ListingPage>
  );
}
