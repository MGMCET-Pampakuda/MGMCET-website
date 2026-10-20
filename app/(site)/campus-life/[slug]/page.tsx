import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/templates/DetailPage";
import { campusLife } from "@/content/campus-life";
import { SmartLink } from "@/components/ui/Link";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return campusLife.features
    .filter((f) => !f.isExternal)
    .map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = campusLife.features.find((f) => f.slug === slug);
  if (!feature) return { title: "Campus Life | MGMCET" };

  return buildMetadata({
    title: `${feature.title} | Campus Life | MGMCET`,
    description: feature.description,
    path: `/campus-life/${slug}`,
    image: feature.image,
  });
}

export default async function CampusLifeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const feature = campusLife.features.find((f) => f.slug === slug);

  if (!feature || feature.isExternal) {
    notFound();
  }

  const details = campusLife.facilityDetails[slug];


  return (
    <DetailPage
      title={feature.title}
      subtitle={feature.description}
      category={details?.category || "Campus Life"}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Campus Life", href: "/campus-life" },
        { label: feature.title, href: `/campus-life/${slug}` },
      ]}
      featuredImage={feature.image}
      backLink={{ label: "All Campus Facilities & Clubs", href: "/campus-life" }}
    >
      <div className="space-y-6">
        {details?.body.map((para, idx) => (
          <p key={idx} className="text-body text-ink-700 leading-relaxed">
            {para}
          </p>
        ))}

        {details?.highlights && details.highlights.length > 0 && (
          <div className="my-8 p-6 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-4">
            <h3 className="font-heading font-bold text-h4 text-brand-900">
              Key Features &amp; Infrastructure
            </h3>
            <ul className="space-y-2.5">
              {details.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-body-sm text-ink-700">
                  <span className="text-accent-600 font-bold mt-0.5">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {details?.contactInfo && (
          <div className="pt-4 border-t border-border">
            <h4 className="font-heading font-bold text-ink-900 text-body mb-1">
              Contact &amp; Administrative Information
            </h4>
            <p className="text-body-sm text-ink-600">
              {details.contactInfo}
            </p>
          </div>
        )}

        <div className="pt-6 flex flex-wrap gap-4">
          <SmartLink
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-heading font-semibold text-body-sm transition-colors shadow-xs"
          >
            Apply for Admission
          </SmartLink>
          <SmartLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-body-sm transition-colors"
          >
            Contact Campus Helpdesk
          </SmartLink>
        </div>
      </div>
    </DetailPage>
  );
}
