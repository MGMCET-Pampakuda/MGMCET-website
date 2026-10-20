import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SmartLink } from "@/components/ui/Link";
import { Home, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | MGM College of Engineering and Technology",
  description: "The page you are looking for does not exist on MGMCET website.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center py-20">
        <Container size="narrow">
          <div className="text-center space-y-6 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-brand-50 text-brand-900 border border-brand-200 shadow-xs">
              <span className="font-heading font-extrabold text-h2">404</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading font-bold text-h2 text-ink-900">
                Page Not Found
              </h1>
              <p className="text-body text-ink-600 leading-relaxed">
                The requested URL might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <SmartLink
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-800 text-white font-heading font-semibold text-body-sm transition-colors shadow-xs"
              >
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </SmartLink>

              <SmartLink
                href="/departments"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface hover:bg-brand-50 text-brand-900 border border-border font-heading font-semibold text-body-sm transition-colors"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Programs</span>
              </SmartLink>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
