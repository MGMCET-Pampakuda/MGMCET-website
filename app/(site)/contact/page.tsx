import React from "react";
import type { Metadata } from "next";
import { ContactPage } from "@/components/templates/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | MGM College of Engineering and Technology",
  description:
    "Get in touch with MGM College of Engineering and Technology, Pampakuda, Ernakulam. Admissions helpline, contact addresses, phone numbers, and directions.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <ContactPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Contact Us", href: "/contact" },
      ]}
    />
  );
}
