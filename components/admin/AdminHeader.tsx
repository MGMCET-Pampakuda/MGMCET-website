"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  ExternalLink,
  CloudCheck,
  HardDrive,
} from "lucide-react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAdminUI } from "./AdminLayoutClient";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  actions?: React.ReactNode;
}

export function AdminHeader({
  title,
  subtitle,
  onOpenMobileMenu,
  actions,
}: AdminHeaderProps) {
  const isFbConnected = isFirebaseConfigured();
  const ui = useAdminUI();

  const handleOpenMobile = onOpenMobileMenu || ui.openMobileMenu;

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/90 backdrop-blur-md border-b border-border px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left side: Hamburger (mobile) + Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleOpenMobile}
          className="lg:hidden p-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-canvas transition-colors cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="font-heading font-bold text-h4 sm:text-h3 text-ink-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:block text-xs text-ink-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side: Database status pill + Actions */}
      <div className="flex items-center gap-3">
        {/* Firebase indicator badge */}
        <div
          className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isFbConnected
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
          title={
            isFbConnected
              ? "Connected to live Google Firebase Firestore"
              : "Operating in fast Local Storage demo mode"
          }
        >
          {isFbConnected ? (
            <CloudCheck className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <HardDrive className="h-3.5 w-3.5 text-amber-600" />
          )}
          <span>{isFbConnected ? "Firebase Live" : "Local Mode"}</span>
        </div>

        {/* Custom page action buttons */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {/* Direct link to website */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </header>
  );
}
