import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Bus,
  Train,
  Plane,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { EnquirySection } from "@/components/sections/EnquirySection";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface ContactPageProps {
  breadcrumbItems?: BreadcrumbItem[];
  heroImage?: string;
  className?: string;
}

/**
 * ContactPage template featuring contact information cards,
 * interactive enquiry form, responsive lazy Google Maps embed, and transit directions.
 */
export function ContactPage({
  breadcrumbItems,
  heroImage,
  className,
}: ContactPageProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <PageHero
        title="Contact Us"
        description="We are here to assist prospective students, parents, alumni, and industry partners. Get in touch with our admissions desk or campus administration."
        breadcrumbItems={breadcrumbItems}
        image={heroImage}
        badge="Helpdesk &amp; Location"
      />

      {/* 1. Contact Information Cards */}
      <Section tone="canvas" spacing="sm">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-brand-50 text-brand-700 inline-block">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                Campus Location
              </h3>
              <p className="text-body-sm text-ink-600 leading-relaxed">
                {site.contact.address},<br />
                {site.contact.district},<br />
                {site.contact.state} &mdash; {site.contact.pincode}
              </p>
              <span className="inline-block text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                College Code: {site.collegeCode}
              </span>
            </div>

            {/* Phone */}
            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-brand-50 text-brand-700 inline-block">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                Phone Enquiries
              </h3>
              <div className="space-y-1.5 text-body-sm">
                {site.contact.phones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone}`}
                    className="block font-medium text-brand-800 hover:text-brand-900 hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <p className="text-xs text-ink-500">
                Admissions Helpdesk: 9:00 AM – 5:00 PM
              </p>
            </div>

            {/* Email */}
            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-brand-50 text-brand-700 inline-block">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                Email Desks
              </h3>
              <div className="space-y-1 text-body-sm">
                <p className="text-xs text-ink-500">General Enquiries &amp; Principal:</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block font-medium text-brand-800 hover:text-brand-900 hover:underline truncate"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-accent-50 text-accent-700 inline-block">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-h4 text-ink-900">
                Office Hours
              </h3>
              <div className="space-y-1 text-body-sm text-ink-600">
                <p>
                  <strong>Mon &ndash; Fri:</strong> 8:45 AM &ndash; 4:45 PM
                </p>
                <p>
                  <strong>Saturday:</strong> 9:00 AM &ndash; 1:00 PM
                </p>
                <p className="text-xs text-ink-500 pt-1">
                  Closed on Sundays and State Public Holidays.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Enquiry Form Section */}
      <EnquirySection />

      {/* 3. Embedded Map & Transit Directions */}
      <Section tone="white" spacing="default">
        <Container>
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <Badge variant="mint" size="sm">
                CAMPUS NAVIGATION
              </Badge>
              <h2 className="font-heading font-bold text-h2 text-ink-900">
                How to Reach MGMCET Pampakuda
              </h2>
              <p className="text-body text-ink-600">
                Conveniently situated on the Muvattupuzha &ndash; Piravom road in Ernakulam District, Kerala.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Google Map Embed */}
              <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-border shadow-xs aspect-[16/10] sm:aspect-[16/9] w-full bg-brand-50">
                <iframe
                  title="MGM College of Engineering and Technology Location Map"
                  src={site.contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Transit Directions */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-xl bg-canvas border border-border p-5 space-y-2">
                  <div className="flex items-center gap-2 text-brand-700 font-heading font-bold text-body-sm">
                    <Bus className="h-4 w-4" />
                    <span>By Bus</span>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    Direct KSRTC and private buses connect Pampakuda from Muvattupuzha (14 km), Piravom (9 km), and Ernakulam / Kaloor (38 km).
                  </p>
                </div>

                <div className="rounded-xl bg-canvas border border-border p-5 space-y-2">
                  <div className="flex items-center gap-2 text-brand-700 font-heading font-bold text-body-sm">
                    <Train className="h-4 w-4" />
                    <span>By Train</span>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    Nearest Railway Stations: Piravom Road (16 km), Ernakulam Junction / South (38 km), and Aluva (42 km).
                  </p>
                </div>

                <div className="rounded-xl bg-canvas border border-border p-5 space-y-2">
                  <div className="flex items-center gap-2 text-brand-700 font-heading font-bold text-body-sm">
                    <Plane className="h-4 w-4" />
                    <span>By Air</span>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed">
                    Cochin International Airport (COK), Nedumbassery is 45 km from the campus (approx. 70 minutes via MC Road).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
