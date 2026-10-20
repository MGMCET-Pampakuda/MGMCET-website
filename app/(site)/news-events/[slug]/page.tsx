import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { DetailPage } from "@/components/templates/DetailPage";
import { news } from "@/content/news";
import { SmartLink } from "@/components/ui/Link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/shared";
import { site } from "@/content/site";
import { BASE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

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
    title: `${item.title} | MGMCET News`,
    description: item.excerpt,
    path: `/news-events/${slug}`,
    image: item.image,
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  const relatedNews = news.filter((n) => n.slug !== slug).slice(0, 3);

  const articleSchema =
    item.category === "event"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: item.title,
          description: item.excerpt,
          startDate: item.date,
          image: [`${BASE_URL}${item.image}`],
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
          image: [`${BASE_URL}${item.image}`],
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
      <DetailPage
      title={item.title}
      subtitle={item.excerpt}
      date={item.date}
      category={item.category === "event" ? "Campus Event" : "News Bulletin"}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "News & Events", href: "/news-events" },
        { label: item.title, href: `/news-events/${slug}` },
      ]}
      featuredImage={item.image}
      backLink={{ label: "All News & Events", href: "/news-events" }}
      relatedItems={
        relatedNews.length > 0 ? (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-h3 text-ink-900 border-b border-border pb-3">
              More Recent Updates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((rel) => (
                <Card
                  key={rel.id}
                  variant="outlined"
                  padding="none"
                  className="group overflow-hidden flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas">
                    <Image
                      src={rel.image}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge
                        variant={rel.category === "event" ? "accent" : "mint"}
                        size="sm"
                        className="capitalize text-xs"
                      >
                        {rel.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-heading font-bold text-body text-ink-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                      <SmartLink href={`/news-events/${rel.slug}`}>
                        {rel.title}
                      </SmartLink>
                    </h4>
                    <p className="text-xs text-ink-600 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6 text-body text-ink-700 leading-relaxed">
        <p className="text-body-lg font-medium text-ink-900 leading-relaxed">
          {item.excerpt}
        </p>

        <p>
          MGM College of Engineering and Technology continues to uphold its rich legacy of empowering students through technical immersion, industry-sponsored workshops, and national-level competitive platforms.
        </p>

        <p>
          Students, faculty, and industry partners engaged collaboratively throughout the session, reinforcing MGMCET’s academic vision of molding globally competent professionals with high social commitment.
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Categorized under:
            </span>
            {item.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm" className="capitalize">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </DetailPage>
    </>
  );
}
