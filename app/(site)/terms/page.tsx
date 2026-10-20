import React from "react";
import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { legalContent } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | MGM College of Engineering and Technology",
  description:
    "Terms of Use and conditions governing the access and usage of the MGM College of Engineering and Technology website.",
  path: "/terms",
});

export default function TermsPage() {
  const content = legalContent.terms;
  const sideNavItems = content.sideNavItems.map((item) => ({
    ...item,
    active: item.href === "/terms",
  }));

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: content.title, href: "/terms" },
      ]}
      badge={content.badge}
      sideNavTitle="Legal &amp; Terms"
      sideNavItems={sideNavItems}
    >
      {content.sections.map((section, idx) => (
        <section
          key={idx}
          className={cn("space-y-4", idx > 0 && "pt-4 border-t border-border")}
        >
          <h2 className="font-heading font-bold text-h3 text-ink-900">
            {section.title}
          </h2>
          <p className="text-ink-700 leading-relaxed">{section.body}</p>
          {section.items && (
            <ul className="list-disc pl-6 space-y-2 text-ink-700">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </ContentPage>
  );
}

