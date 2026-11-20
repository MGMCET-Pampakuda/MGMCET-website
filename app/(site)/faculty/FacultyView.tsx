"use client";

import React, { useState, useMemo, useEffect } from "react";
import { BookOpen, Search, UserCheck } from "lucide-react";
import { ListingPage } from "@/components/templates/ListingPage";
import { faculty as staticFaculty } from "@/content/faculty";
import { subscribeToLiveFaculty } from "@/lib/firebase-services";
import type { FacultyMember } from "@/types/faculty";

const DEPARTMENT_FILTERS = [
  { label: "All Departments", value: "all" },
  { label: "Computer Science", value: "Computer Science & Engineering" },
  { label: "Science & Humanities", value: "Science & Humanities" },
  { label: "Mechanical", value: "Mechanical Engineering" },
  { label: "EEE", value: "Electrical & Electronics Engineering" },
  { label: "ECE", value: "Electronics & Communication Engineering" },
];

export function FacultyView() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [allFaculty, setAllFaculty] = useState<FacultyMember[]>(staticFaculty);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToLiveFaculty((items) => {
      if (items && items.length > 0) {
        setAllFaculty(items);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredFaculty = useMemo(() => {
    return allFaculty.filter((f) => {
      // Department filter
      if (activeFilter !== "all") {
        if (!f.department.toLowerCase().includes(activeFilter.toLowerCase())) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = f.name.toLowerCase().includes(q);
        const mDesig = f.designation.toLowerCase().includes(q);
        const mQual = (f.qualification || "").toLowerCase().includes(q);
        const mDept = f.department.toLowerCase().includes(q);
        return mName || mDesig || mQual || mDept;
      }

      return true;
    });
  }, [allFaculty, activeFilter, searchQuery]);

  // Group by department
  const departmentsList = useMemo(() => {
    const map = new Map<string, FacultyMember[]>();
    filteredFaculty.forEach((member) => {
      const dept = member.department || "Other";
      if (!map.has(dept)) {
        map.set(dept, []);
      }
      map.get(dept)!.push(member);
    });
    return Array.from(map.entries());
  }, [filteredFaculty]);

  return (
    <ListingPage
      title="Meet Our Faculty at MGM"
      description="Distinguished academic faculty, professors, and subject matter experts across all engineering and basic science departments."
      badge="Academic Faculty"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Faculty", href: "/faculty" },
      ]}
      filters={DEPARTMENT_FILTERS}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      totalCount={filteredFaculty.length}
      emptyMessage="No faculty records found for this department."
    >
      <div className="space-y-8">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, qualification, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-body-sm rounded-xl border border-border bg-surface text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600 shadow-xs"
          />
        </div>

        {/* Grouped Department Tables */}
        {departmentsList.map(([departmentName, members]) => (
          <div key={departmentName} className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-brand-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-800" />
                <h3 className="font-heading font-bold text-h4 text-ink-900 uppercase tracking-wide">
                  {departmentName}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-brand-200">
                {members.length} Faculty
              </span>
            </div>

            {/* Desktop / Tablet Table */}
            <div className="hidden sm:block overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-canvas border-b border-border text-ink-600 font-semibold text-xs tracking-wider uppercase">
                    <th scope="col" className="py-3 px-4 w-16 text-center">
                      Sl. No.
                    </th>
                    <th scope="col" className="py-3 px-4 min-w-[200px]">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4 min-w-[160px]">
                      Designation
                    </th>
                    <th scope="col" className="py-3 px-4 min-w-[140px]">
                      Qualification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-body-sm">
                  {members.map((member, index) => (
                    <tr
                      key={member.id}
                      className="hover:bg-canvas/60 transition-colors group"
                    >
                      <td className="py-3 px-4 text-center font-mono text-xs text-ink-400">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                          <span>{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-ink-700 font-medium">
                        {member.designation}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200">
                          {member.qualification || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Stack */}
            <div className="block sm:hidden space-y-2.5">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="p-3.5 rounded-xl border border-border bg-surface shadow-xs flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-ink-400 font-bold">
                        #{index + 1}
                      </span>
                      <h4 className="font-heading font-bold text-ink-900 text-body-sm">
                        {member.name}
                      </h4>
                    </div>
                    <p className="text-xs text-ink-600 pl-6">
                      {member.designation}
                    </p>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-brand-50 text-brand-900 border border-brand-200 shrink-0">
                    {member.qualification || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ListingPage>
  );
}
