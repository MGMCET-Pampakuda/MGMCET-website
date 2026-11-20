"use client";

import React, { useState, useEffect, useSyncExternalStore, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { useAdminAuth } from "@/lib/firebase-auth";
import { Loader2, X } from "lucide-react";

interface AdminUIContextType {
  openMobileMenu: () => void;
}

const emptySubscribe = () => () => {};

const AdminUIContext = createContext<AdminUIContextType>({
  openMobileMenu: () => {},
});

export function useAdminUI() {
  return useContext(AdminUIContext);
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAdminAuth();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [mounted, loading, isAuthenticated, isLoginPage, router]);

  // If on login page, render plain without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-canvas">{children}</div>;
  }

  // SSR / Loading state
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas">
        <Loader2 className="h-8 w-8 text-brand-700 animate-spin mb-3" />
        <p className="font-heading font-medium text-sm text-ink-600">
          Loading MGMCET Admin Portal...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminUIContext.Provider
      value={{ openMobileMenu: () => setMobileOpen(true) }}
    >
      <div className="min-h-screen flex bg-canvas text-ink-900 font-body">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block h-screen sticky top-0 shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar Modal */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 w-64 max-w-xs h-full bg-brand-950 flex flex-col shadow-2xl">
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
          {children}
        </div>
      </div>
    </AdminUIContext.Provider>
  );
}
