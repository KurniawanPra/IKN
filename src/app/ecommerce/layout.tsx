"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import ThemeToggle from "@/components/theme-toggle";
import { useCart } from "@/components/providers/cart-provider";

const EcommerceSidebar = dynamic(() => import("@/components/ecommerce/EcommerceSidebar"), { ssr: false });

const PAGE_TITLES: Record<string, string> = {
  "/ecommerce": "Dashboard",
  "/ecommerce/katalog": "Katalog Produk",
  "/ecommerce/pesanan": "Riwayat Pesanan",
  "/ecommerce/alamat": "Alamat Pengiriman",
  "/ecommerce/profil": "Profil Saya",
};

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    setIsClient(true);
    const loggedIn = localStorage.getItem("ikn_logged_in");
    if (loggedIn !== "true") {
      window.location.href = `/login?redirect=${encodeURIComponent(pathname)}`;
      return;
    }
    setUserEmail(localStorage.getItem("ikn_user_email") || "");
  }, [pathname]);

  const displayName = userEmail
    ? userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Pengguna";
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

  // If path doesn't check logged in yet or redirects
  const loggedIn = localStorage.getItem("ikn_logged_in");
  if (loggedIn !== "true") {
    return null; // Prevent flash during redirect
  }

  return (
    <div className="relative h-screen w-full font-sans bg-background flex overflow-hidden">
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "w-[72px]" : "w-56 lg:w-[240px]"}`}
      >
        <EcommerceSidebar
          displayName={displayName}
          avatarInitial={avatarInitial}
          userEmail={userEmail}
          onLogout={handleLogout}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${collapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"} transition-all duration-300 h-screen overflow-hidden`}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-50 h-14 flex items-center justify-between px-4 sm:px-6 border-b border-border/40 shrink-0"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}
        >
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
              <h1 className="text-sm font-bold text-foreground leading-tight">{PAGE_TITLES[pathname] || "Dashboard"}</h1>
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
          {children}
        </main>
      </div>
    </div>
  );
}
