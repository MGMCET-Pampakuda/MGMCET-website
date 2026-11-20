"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Users, Building2 } from "lucide-react";
import { subscribeToLiveIqacCommittee } from "@/lib/firebase-services";
import { defaultIqacMembers } from "@/content/academics";
import type { IqacMember } from "@/types/academics";

function getRoleBadgeVariant(role: string): { bg: string; text: string; border: string } {
  const lower = role.toLowerCase();
  if (lower.includes("chairperson") || lower.includes("principal")) {
    return {
      bg: "bg-amber-500/10",
      text: "text-amber-800",
      border: "border-amber-300/60",
    };
  }
  if (lower.includes("management") || lower.includes("director")) {
    return {
      bg: "bg-brand-800/10",
      text: "text-brand-900",
      border: "border-brand-300/60",
    };
  }
  if (lower.includes("coordinator")) {
    return {
      bg: "bg-emerald-500/10",
      text: "text-emerald-800",
      border: "border-emerald-300/60",
    };
  }
  if (lower.includes("industry")) {
    return {
      bg: "bg-sky-500/10",
      text: "text-sky-800",
      border: "border-sky-300/60",
    };
  }
  if (lower.includes("society")) {
    return {
      bg: "bg-purple-500/10",
      text: "text-purple-800",
      border: "border-purple-300/60",
    };
  }
  return {
    bg: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-300/70",
  };
}

export function IqacCommitteeTable() {
  const [members, setMembers] = useState<IqacMember[]>(defaultIqacMembers);

  useEffect(() => {
    const unsubscribe = subscribeToLiveIqacCommittee((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setMembers(data);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <h3 className="font-heading font-bold text-h4 text-ink-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-800 shrink-0" />
            IQAC Committee Members
          </h3>
          <p className="text-body-sm text-ink-600">
            Constituted committee for institutional quality assurance and academic governance
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-900 font-semibold border border-brand-200">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-600" />
            {members.length} Members
          </span>
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border text-ink-600 font-semibold text-xs tracking-wider uppercase">
                <th scope="col" className="py-3.5 px-4 w-14 text-center">
                  Sl. No.
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Committee Role
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Name
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Designation
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Department / Organization
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-body-sm">
              {members.map((member, index) => {
                const badge = getRoleBadgeVariant(member.role);
                return (
                  <tr
                    key={member.id || `iqac-${index}`}
                    className="hover:bg-canvas/60 transition-colors group"
                  >
                    <td className="py-3 px-4 text-center text-ink-500 font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-ink-900 group-hover:text-brand-900 transition-colors">
                      {member.name}
                    </td>
                    <td className="py-3 px-4 text-ink-700">
                      {member.designation}
                    </td>
                    <td className="py-3 px-4 text-ink-600 font-medium">
                      {member.department || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Stack View */}
      <div className="block md:hidden space-y-3">
        {members.map((member, index) => {
          const badge = getRoleBadgeVariant(member.role);
          return (
            <div
              key={member.id || `mobile-iqac-${index}`}
              className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-ink-400">
                  #{String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                >
                  {member.role}
                </span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-ink-900 text-body">
                  {member.name}
                </h4>
                <p className="text-body-sm text-ink-700 mt-0.5">
                  {member.designation}
                </p>
              </div>

              {member.department && (
                <div className="pt-2 border-t border-border/60 flex items-center gap-1.5 text-xs text-ink-600">
                  <Building2 className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                  <span className="font-medium">{member.department}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
