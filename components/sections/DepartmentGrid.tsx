"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { DepartmentMeta } from "@/types";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SmartLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

export interface DepartmentGridProps {
  btechDepartments: DepartmentMeta[];
  polytechnicDepartments: DepartmentMeta[];
  className?: string;
}

/**
 * "Explore Our Departments" showcase featuring toggleable B.Tech (5) and Polytechnic (8) streams,
 * high-resolution department cards, and smooth horizontal scrolling on mobile viewports.
 */
export function DepartmentGrid({
  btechDepartments,
  polytechnicDepartments,
  className,
}: DepartmentGridProps) {
  const [activeTab, setActiveTab] = useState<"btech" | "polytechnic">("btech");

  const displayedDepts =
    activeTab === "btech" ? btechDepartments : polytechnicDepartments;

  return (
    <section
      aria-labelledby="explore-departments-heading"
      className={cn("py-16 sm:py-24 bg-surface", className)}
    >
      <Container>
        <SectionHeader
          eyebrow="OUR DEPARTMENTS"
          title="Explore Our Departments"
          description="Industry-focused curriculum, state-of-the-art laboratory facilities, and experiential engineering education."
          action={
            <SmartLink
              href="/departments"
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-brand-700 hover:text-brand-900 group"
            >
              <span>View All Departments</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </SmartLink>
          }
        />

        {/* Level Switcher Segmented Control */}
        <div className="flex items-center justify-center sm:justify-start mb-6 sm:mb-8">
          <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex p-1 sm:p-1.5 rounded-xl bg-brand-50 border border-brand-100/90 gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("btech")}
              className={cn(
                "px-2.5 sm:px-5 py-2 rounded-lg font-heading text-xs sm:text-body-sm font-semibold transition-all cursor-pointer whitespace-nowrap text-center",
                activeTab === "btech"
                  ? "bg-surface text-brand-900 shadow-sm"
                  : "text-ink-600 hover:text-ink-900"
              )}
            >
              <span>B.Tech</span>{" "}
              <span className="hidden sm:inline">Programmes</span>{" "}
              <span>({btechDepartments.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("polytechnic")}
              className={cn(
                "px-2.5 sm:px-5 py-2 rounded-lg font-heading text-xs sm:text-body-sm font-semibold transition-all cursor-pointer whitespace-nowrap text-center",
                activeTab === "polytechnic"
                  ? "bg-surface text-brand-900 shadow-sm"
                  : "text-ink-600 hover:text-ink-900"
              )}
            >
              <span>Polytechnic</span>{" "}
              <span className="hidden sm:inline">Diploma</span>{" "}
              <span>({polytechnicDepartments.length})</span>
            </button>
          </div>
        </div>

        {/* Department Cards Grid / Mobile Carousel */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {displayedDepts.map((dept) => (
            <SmartLink
              key={dept.id}
              href={dept.href}
              className="flex-[0_0_210px] sm:flex-auto group block rounded-card bg-surface border border-border shadow-xs hover:border-brand-600 hover:shadow-pop hover:-translate-y-1 transition-all overflow-hidden snap-start flex flex-col"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/11] w-full bg-brand-50 overflow-hidden">
                <Image
                  src={dept.thumbnail || dept.image}
                  alt={dept.name}
                  fill
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>

              {/* Card Details */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-xs sm:text-body text-ink-900 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                    {dept.name}
                  </h3>
                  <p className="text-[11px] sm:text-caption text-ink-500 mt-1">
                    {dept.duration} • Intake: {dept.intake}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-border/50 text-[11px] sm:text-xs text-brand-700 font-semibold font-heading">
                  <span className="truncate">{dept.level === "btech" ? "View Details" : "Polytechnic Hub"}</span>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors shrink-0 ml-1">
                    <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
