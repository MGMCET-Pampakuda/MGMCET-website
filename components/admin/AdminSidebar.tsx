"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  Users,
  Inbox,
  Briefcase,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Award,
  Handshake,
  Camera,
  Compass,
} from "lucide-react";
import { useAdminAuth } from "@/lib/firebase-auth";
import { isFirebaseConfigured } from "@/lib/firebase";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const isFbConnected = isFirebaseConfigured();

  const navLinks = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "News & Events",
      href: "/admin/news",
      icon: Newspaper,
      badge: null,
    },
    {
      label: "Announcements",
      href: "/admin/announcements",
      icon: Megaphone,
      badge: null,
    },
    {
      label: "Faculty & Staff",
      href: "/admin/faculty",
      icon: Users,
      badge: null,
    },
    {
      label: "IQAC Committee",
      href: "/admin/iqac",
      icon: Award,
      badge: "NAAC",
    },
    {
      label: "Industry MoUs",
      href: "/admin/mous",
      icon: Handshake,
      badge: "Partners",
    },
    {
      label: "Clubs & Associations",
      href: "/admin/clubs",
      icon: Compass,
      badge: "Campus",
    },
    {
      label: "Form Enquiries",
      href: "/admin/enquiries",
      icon: Inbox,
      badge: "Live",
    },
    {
      label: "Campus Gallery",
      href: "/admin/gallery",
      icon: Camera,
      badge: "Media",
    },
    {
      label: "Job Applications",
      href: "/admin/careers",
      icon: Briefcase,
      badge: "Recruitment",
    },
    {
      label: "Settings & Cloud",
      href: "/admin/settings",
      icon: Settings,
      badge: isFbConnected ? "Synced" : "Setup",
    },
  ];

  return (
    <aside className="w-64 h-full bg-brand-950 text-white flex flex-col justify-between shrink-0 border-r border-brand-900/60 select-none">
      {/* Top Brand Header */}
      <div>
        <div className="p-5 border-b border-brand-900/70 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-surface/10 border border-brand-700/50 flex items-center justify-center p-1.5 shadow-inner">
            <Image
              src="/images/brand/logo-light.svg"
              alt="MGMCET"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm tracking-wide text-white block">
              MGMCET ADMIN
            </span>
            <span className="text-[10px] text-accent-400 font-semibold uppercase tracking-wider block">
              Content Control
            </span>
          </div>
        </div>

        {/* Database Mode Pill */}
        <div className="px-5 pt-3 pb-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-900/40 border border-brand-800/80 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                isFbConnected ? "bg-mint-400 animate-pulse" : "bg-accent-400"
              }`}
            />
            <span className="text-white/80 font-medium">
              {isFbConnected ? "Firebase Firestore: Active" : "Local / Demo Storage Mode"}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-brand-800 text-white shadow-sm ring-1 ring-brand-700 font-bold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-accent-400" : "text-white/50 group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.badge === "Live"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-accent-400/20 text-accent-300 border border-accent-400/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-accent-400" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-brand-900/80 space-y-3 bg-brand-950/80">
        {/* Visit public website link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors border border-white/5"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-accent-400" />
            <span>Open Live Website</span>
          </span>
          <span className="text-[10px] text-white/40">↗</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4 text-accent-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {user?.displayName || "Admin Desk"}
              </p>
              <p className="text-[10px] text-white/50 truncate">
                {user?.email || "admin@mgmcet.ac.in"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title="Log out of admin session"
            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
