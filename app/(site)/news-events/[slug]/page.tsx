import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { news } from "@/content/news";
import { JsonLd } from "@/components/shared";
import { site } from "@/content/site";
import { BASE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { NewsDetailClientView } from "./NewsDetailClientView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return { title: "News & Events | MGMCET" };

  return buildMetadata({
    title: `${item.title} | MGMCET News & Events`,
    description: item.excerpt,
    path: `/news-events/${slug}`,
    image: item.image || "/images/brand/og-image.png",
    type: "article",
    publishedTime: item.date,
    keywords: [
      item.title,
      "MGMCET News",
      "MGM College of Engineering and Technology Events",
      "Pampakuda Engineering College",
    ],
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  const relatedNews = news.filter((n) => n.slug !== slug).slice(0, 3);
  const ogImage = item.image ? `${BASE_URL}${item.image}` : `${BASE_URL}/images/brand/logo.svg`;

  const articleSchema =
    item.category === "event"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: item.title,
          description: item.excerpt,
          startDate: item.date,
          image: [ogImage],
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: site.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.contact.address,
              addressLocality: site.contact.district,
              addressRegion: site.contact.state,
              postalCode: site.contact.pincode,
              addressCountry: "IN",
            },
          },
          organizer: {
            "@type": "CollegeOrUniversity",
            name: site.name,
            url: BASE_URL,
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: item.title,
          description: item.excerpt,
          datePublished: item.date,
          image: [ogImage],
          author: {
            "@type": "CollegeOrUniversity",
            name: site.name,
            url: BASE_URL,
          },
          publisher: {
            "@type": "CollegeOrUniversity",
            name: site.name,
            logo: {
              "@type": "ImageObject",
              url: `${BASE_URL}/images/brand/logo.svg`,
            },
          },
        };

  return (
    <>
      <JsonLd data={articleSchema} />
      <NewsDetailClientView
        initialItem={item}
        relatedNews={relatedNews}
        slug={slug}
      />
    </>
  );
}
