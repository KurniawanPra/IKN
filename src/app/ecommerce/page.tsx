"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import ThemeToggle from "@/components/theme-toggle";
import { useCart } from "@/components/providers/cart-provider";
import dynamic from "next/dynamic";

const EcommerceSidebar = dynamic(() => import("@/components/ecommerce/EcommerceSidebar"), { ssr: false });
const CatalogGrid = dynamic(() => import("@/components/ecommerce/CatalogGrid"), { ssr: false });
const DashboardOverview = dynamic(() => import("@/components/ecommerce/DashboardOverview"), { ssr: false });

const PAGE_TITLES: Record<string, string> = {
  overview: "Dashboard",
  catalog: "Katalog Produk",
  orders: "Riwayat Pesanan",
  profile: "Profil Saya",
};

export default function EcommercePage() {
  const [isClient, setIsClient] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeView, setActiveView] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    setIsClient(true);
    const loggedIn = localStorage.getItem("ikn_logged_in");
    if (loggedIn !== "true") {
      window.location.href = "/login?redirect=/ecommerce";
      return;
    }
    setUserEmail(localStorage.getItem("ikn_user_email") || "");
  }, []);

  const displayName = userEmail
    ? userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Pengguna";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("ikn_logged_in");
    localStorage.removeItem("ikn_user_email");
    window.location.href = "/";
  };

  const handleViewChange = (view: string) => {
    if (view === "cart") {
      setIsCartOpen(true);
    } else {
      setActiveView(view);
    }
    setMobileSidebarOpen(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <SkeletonLoader type="grid" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full font-sans bg-background flex">

      {/* Sidebar — desktop fixed, mobile overlay */}
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar (desktop: always visible; mobile: slide-in overlay) */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <EcommerceSidebar
          displayName={displayName}
          avatarInitial={avatarInitial}
          userEmail={userEmail}
          activeView={activeView}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-[240px] transition-all duration-300 min-h-screen">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 border-b border-border/40 shrink-0"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-muted hover:text-foreground transition"
            >
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumb */}
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest leading-none">E-Commerce</p>
              <h1 className="text-sm font-bold text-foreground leading-tight">{PAGE_TITLES[activeView] || "Dashboard"}</h1>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-accent-hover transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white ring-1 ring-background">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Avatar (desktop) */}
            <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded border border-border/60">
              <span className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent text-[10px] font-bold shrink-0">
                {avatarInitial}
              </span>
              <span className="text-xs font-medium text-foreground max-w-[100px] truncate">
                {displayName}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto no-scrollbar">
          {activeView === "overview" && (
            <DashboardOverview
              displayName={displayName}
              userEmail={userEmail}
              avatarInitial={avatarInitial}
              onViewChange={handleViewChange}
            />
          )}

          {activeView === "catalog" && <CatalogGrid />}

          {activeView === "orders" && (
            <div className="glass-panel rounded-xl border border-border p-10 text-center flex flex-col items-center gap-3">
              <p className="text-muted font-mono text-sm">Belum ada riwayat pesanan.</p>
              <button
                onClick={() => handleViewChange("catalog")}
                className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded transition hover:bg-accent-hover"
              >
                Mulai Belanja
              </button>
            </div>
          )}

          {activeView === "profile" && (
            <div className="glass-panel rounded-xl border border-border p-6 w-full max-w-full">
              <h2 className="text-base font-bold text-foreground mb-4">Profil Akun</h2>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-14 h-14 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-accent text-2xl font-bold">
                  {avatarInitial}
                </span>
                <div>
                  <p className="font-bold text-foreground">{displayName}</p>
                  <p className="text-xs text-muted font-mono">{userEmail}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm font-mono uppercase">
                    ✓ B2B Verified
                  </span>
                </div>
              </div>
              <div className="border-t border-border/30 pt-4 space-y-3 text-xs text-muted">
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-mono text-foreground">{userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span>Role</span>
                  <span className="font-mono text-foreground">B2B Buyer</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform</span>
                  <span className="font-mono text-foreground">IKN E-Commerce</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 w-full py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded text-xs font-semibold transition"
              >
                Logout
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
