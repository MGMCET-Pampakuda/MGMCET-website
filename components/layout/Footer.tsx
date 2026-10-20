import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Building, ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { SmartLink } from "@/components/ui/Link";
import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/cn";

export interface FooterProps {
  className?: string;
}

/**
 * Institutional Footer built entirely from navigation.ts and site.ts.
 * Deep forest green (#071f14) tone with structured links, accreditation details,
 * verified contact information, and social media connectivity.
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = site.credits.replace("{year}", currentYear.toString());

  const socialLinks = [
    { name: "Facebook", href: site.social.facebook, icon: "Facebook" },
    { name: "Instagram", href: site.social.instagram, icon: "Instagram" },
    { name: "Youtube", href: site.social.youtube, icon: "Youtube" },
    { name: "Linkedin", href: site.social.linkedin, icon: "Linkedin" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer
      role="contentinfo"
      aria-label="College Footer"
      className={cn(
        "bg-brand-950 text-white border-t border-brand-800/80 pt-16 sm:pt-20 pb-12",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Institution Card + 4 Structured Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-brand-800/60">
          {/* Column 1 (4 cols): MGM College Details */}
          <div className="lg:col-span-4 space-y-5">
            <SmartLink href="/" className="inline-block focus-visible:outline-2 focus-visible:outline-accent-400">
              <Image
                src="/images/brand/logo-light.svg"
                alt={site.name}
                width={240}
                height={64}
                className="h-12 w-auto"
              />
            </SmartLink>

            <p className="text-body-sm text-brand-100/80 leading-relaxed max-w-sm">
              {site.taglines[1] || site.taglines[0]}. Offering KTU-affiliated and AICTE-approved
              technical education excellence in Ernakulam, Kerala since {site.foundedYear}.
            </p>

            <div className="space-y-2.5 text-body-sm text-brand-100/90 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent-500 shrink-0 mt-1" aria-hidden="true" />
                <span>
                  {site.contact.address}, {site.contact.district}, {site.contact.state} - {site.contact.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent-500 shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap gap-x-2">
                  {site.contact.phones.map((phone, idx) => (
                    <span key={phone}>
                      {idx > 0 && <span className="mr-2 text-white/40">/</span>}
                      <a
                        href={`tel:${phone}`}
                        className="hover:text-accent-400 transition-colors"
                      >
                        {phone}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-500 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-accent-400 transition-colors"
                >
                  {site.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Building className="h-4 w-4 text-accent-500 shrink-0" aria-hidden="true" />
                <span className="font-heading font-semibold text-xs tracking-wider uppercase text-accent-400">
                  College Code: {site.collegeCode}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            {navigation.footer.showSocial && socialLinks.length > 0 && (
              <div className="pt-2">
                <p className="font-heading text-xs uppercase tracking-wider text-accent-400 font-bold mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.name} (opens in new tab)`}
                      className="h-9 w-9 rounded-full bg-brand-900 border border-brand-800 flex items-center justify-center text-brand-100 hover:text-white hover:bg-brand-800 hover:border-accent-500 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400"
                    >
                      <Icon name={s.icon} size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation link columns (8 cols divided across the 4 columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {navigation.footer.columns.map((col) => (
              <div key={col.heading} className="space-y-4">
                <h3 className="font-heading font-bold text-body-sm uppercase tracking-wider text-accent-400 border-b border-brand-800/80 pb-2.5">
                  {col.heading}
                </h3>
                <ul className="space-y-2 text-body-sm text-brand-100/80">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        isExternal={link.isExternal}
                        isPdf={link.isPdf}
                        className="inline-flex items-center gap-1 hover:text-white hover:translate-x-0.5 transition-all focus-visible:outline-2 focus-visible:outline-accent-400 rounded-xs"
                      >
                        <span>{link.label}</span>
                        {link.isExternal && (
                          <ArrowUpRight className="h-3 w-3 opacity-60 shrink-0" aria-hidden="true" />
                        )}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliation Banner */}
        <div className="py-6 border-b border-brand-800/60 text-center">
          <p className="text-body-sm text-brand-100/70 font-heading">
            {site.affiliationText}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-100/60">
          <p>{copyrightText}</p>

          <div className="flex items-center gap-6">
            <SmartLink
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </SmartLink>
            <span>•</span>
            <SmartLink
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
