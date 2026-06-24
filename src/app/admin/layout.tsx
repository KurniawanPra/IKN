"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import ThemeToggle from "@/components/theme-toggle";

const AdminSidebar = dynamic(() => import("@/components/admin/AdminSidebar"), { ssr: false });

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Admin Overview",
  "/admin/produk": "Kelola Produk",
  "/admin/pesanan": "Pesanan Masuk",
  "/admin/pelanggan": "Data Pelanggan",
  "/admin/analitik": "Analitik",
  "/admin/pengaturan": "Pengaturan",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const loggedIn = localStorage.getItem("ikn_logged_in");
    const role = localStorage.getItem("ikn_role");
    if (loggedIn !== "true" || role !== "admin") {
      window.location.href = "/login";
      return;
    }
    setUserEmail(localStorage.getItem("ikn_user_email") || "admin@ikn.com");
  }, []);

  const displayName = userEmail
    ? userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Admin";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("ikn_logged_in");
    localStorage.removeItem("ikn_user_email");
    localStorage.removeItem("ikn_role");
    window.location.href = "/";
  };

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <SkeletonLoader type="grid" />
      </div>
    );
  }

  // Pre-auth guard logic check
  const loggedIn = localStorage.getItem("ikn_logged_in");
  const role = localStorage.getItem("ikn_role");
  if (loggedIn !== "true" || role !== "admin") {
    return null; // prevent rendering during redirect
  }

  return (
    <div
      className="relative h-screen w-full font-sans flex bg-background text-foreground overflow-hidden"
    >
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "w-[72px]" : "w-56 lg:w-[240px]"}`}
      >
        <AdminSidebar
          displayName={displayName}
          avatarInitial={avatarInitial}
          onLogout={handleLogout}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${collapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"} transition-all duration-300 h-screen overflow-hidden`}>
        {/* Top bar */}
        <header
          className="sticky top-0 z-50 h-14 flex items-center justify-between px-4 sm:px-6 border-b shrink-0 border-border/40"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-muted hover:text-foreground transition"
            >
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <p className="text-[10px] font-mono text-red-500/70 dark:text-red-400/70 uppercase tracking-widest leading-none">Admin Panel</p>
              <h1 className="text-sm font-bold text-foreground leading-tight">{PAGE_TITLES[pathname] || "Admin Panel"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-2 px-2 py-1 rounded border border-border/40">
              <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 dark:text-red-400 text-[10px] font-bold shrink-0">
                {avatarInitial}
              </span>
              <span className="text-xs font-medium text-foreground/80 hidden sm:block max-w-[100px] truncate">{displayName}</span>
              <span className="text-[9px] text-red-500 dark:text-red-400 font-mono hidden sm:inline">ADMIN</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
