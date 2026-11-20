import ReactDOM from "react-dom";
import type { Metadata } from "next";
import { home } from "@/content/home";
import { news } from "@/content/news";
import {
  btechDepartments,
  polytechnicDepartments,
} from "@/content/departments";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/shared";
import {
  HeroSlider,
  StatsStrip,
  AboutSplit,
  ProgramCards,
  FeatureGrid,
  DepartmentGrid,
  CampusLifeSplit,
  DirectorQuote,
  NewsGrid,
  CTABanner,
  EnquirySection,
} from "@/components/sections";

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata({
      title:
        "MGM College of Engineering and Technology (MGMCET) | Top Engineering & Polytechnic College in Pampakuda, Ernakulam, Kerala",
      description:
        "MGM College of Engineering and Technology (MGMCET), Pampakuda, Ernakulam, Kerala is an AICTE-approved, KTU-affiliated premier engineering institution. Offering B.Tech in CSE, AI & ML, Cyber Security, Mechanical, ECE; M.Tech; and Polytechnic Diploma courses. Admissions open 2025-26. KEAM Code: MGE.",
      path: "/",
      keywords: [
        "MGM College of Engineering and Technology Pampakuda",
        "MGMCET Pampakuda",
        "Best Engineering Colleges in Kerala",
        "Top Engineering Colleges in Ernakulam",
        "Engineering Colleges in Kochi",
        "KTU Affiliated Engineering Colleges Kerala",
        "AICTE Approved Colleges Kerala",
        "B.Tech Admissions Kerala 2025",
        "KEAM College Code MGE",
        "Polytechnic College Pampakuda",
      ],
    }),
    title: {
      absolute:
        "MGM College of Engineering and Technology (MGMCET) | Top Engineering & Polytechnic College in Pampakuda, Ernakulam, Kerala",
    },
  };
}

/**
 * Home Page composed strictly per BUILD_SPEC.md Section 5.
 * All sections are modular, data-driven, and animated via Reveal.
 */
export default function HomePage() {
  ReactDOM.preload("/images/hero/campus-main.webp", {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
  });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 2. Hero slider (3 slides) */}
      <HeroSlider slides={home.hero} />

      {/* 4. Stats card / strip */}
      <Reveal direction="up" delay={0.1}>
        <StatsStrip stats={home.stats} />
      </Reveal>

      {/* 5. About split */}
      <Reveal direction="up" delay={0.1}>
        <AboutSplit about={home.about} />
      </Reveal>

      {/* 6. Academic Programs */}
      <Reveal direction="up" delay={0.1}>
        <ProgramCards programs={home.programs} />
      </Reveal>

      {/* 7. Why MGM */}
      <Reveal direction="up" delay={0.1}>
        <FeatureGrid why={home.why} />
      </Reveal>

      {/* 8. Explore Our Departments */}
      <Reveal direction="up" delay={0.1}>
        <DepartmentGrid
          btechDepartments={btechDepartments}
          polytechnicDepartments={polytechnicDepartments}
        />
      </Reveal>

      {/* 9. Campus Life split */}
      <Reveal direction="up" delay={0.1}>
        <CampusLifeSplit campusLife={home.campusLife} />
      </Reveal>

      {/* 10. Director's message strip */}
      {home.directorQuote && (
        <Reveal direction="up" delay={0.1}>
          <DirectorQuote directorQuote={home.directorQuote} />
        </Reveal>
      )}

      {/* 11. News & Events */}
      <Reveal direction="up" delay={0.1}>
        <NewsGrid news={news} />
      </Reveal>

      {/* 12. CTA Banner */}
      <Reveal direction="up" delay={0.1}>
        <CTABanner ctaBanner={home.ctaBanner} />
      </Reveal>

      {/* 13. Quick enquiry form */}
      <Reveal direction="up" delay={0.1}>
        <EnquirySection />
      </Reveal>
    </div>
  );
}
