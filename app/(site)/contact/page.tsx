import React from "react";
import type { Metadata } from "next";
import { ContactPage } from "@/components/templates/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Contact MGMCET | Admissions Helpline, Campus Address & Location Map | Pampakuda",
  description:
    "Get in touch with MGM College of Engineering and Technology (MGMCET), Pampakuda, Memury P.O, Muvattupuzha, Ernakulam District, Kerala 686667. Phone: +91-9946485111, +91-7902995111. Email: mail@mgmcet.ac.in.",
  path: "/contact",
  keywords: [
    "Contact MGMCET",
    "MGMCET Pampakuda Phone Number",
    "Engineering College Address Muvattupuzha",
    "MGMCET Admissions Helpline",
    "How to reach MGMCET Pampakuda",
  ],
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
