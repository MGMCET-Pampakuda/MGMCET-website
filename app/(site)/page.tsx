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
  AnnouncementStrip,
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
  return buildMetadata({
    title: "MGM College of Engineering and Technology | MGMCET Pampakuda",
    description:
      "AICTE Approved, KTU Affiliated premier engineering college in Pampakuda, Ernakulam, Kerala. Offering B.Tech, M.Tech and Polytechnic diploma programmes in AI/ML, CSE, ECE, Mechanical and more.",
    path: "/",
  });
}

/**
 * Home Page composed strictly per BUILD_SPEC.md Section 5.
 * All sections are modular, data-driven, and animated via Reveal.
 */
export default function HomePage() {
  ReactDOM.preload("/images/hero/hero-1.svg", {
    as: "image",
    type: "image/svg+xml",
    fetchPriority: "high",
  });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 2. Hero slider (3 slides) */}
      <HeroSlider slides={home.hero} />

      {/* 3. Announcement strip */}
      <AnnouncementStrip />

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
