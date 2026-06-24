"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  displayName: string;
  avatarInitial: string;
  onLogout: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/admin" },
  { id: "products", label: "Kelola Produk", icon: Package, path: "/admin/produk" },
  { id: "orders", label: "Pesanan Masuk", icon: ShoppingCart, path: "/admin/pesanan" },
  { id: "customers", label: "Pelanggan", icon: Users, path: "/admin/pelanggan" },
  { id: "analytics", label: "Analitik", icon: BarChart2, path: "/admin/analitik" },
  { id: "settings", label: "Pengaturan", icon: Settings, path: "/admin/pengaturan" },
];

export default function AdminSidebar({
  displayName,
  avatarInitial,
  onLogout,
  collapsed,
  setCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="h-full w-full flex flex-col border-r border-border/40 font-sans"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-between px-4 shrink-0 border-b border-border/40"
      >
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldCheck size={16} className="text-red-500 dark:text-red-400 shrink-0" />
            <span className="font-bold text-foreground text-sm tracking-tight whitespace-nowrap">IKN Admin</span>
          </div>
        )}
        {collapsed && <ShieldCheck size={16} className="text-red-500 dark:text-red-400 mx-auto" />}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded text-muted hover:text-foreground hover:bg-elevated/50 transition shrink-0 hidden lg:block"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 p-1.5 rounded text-muted hover:text-foreground hover:bg-elevated/50 transition hidden lg:block"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Nav Items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          // overview matches exactly /, others match by prefix path
          const isActive = item.id === "overview" 
            ? pathname === item.path 
            : pathname.startsWith(item.path);

          return (
            <Link
              key={item.id}
              href={item.path}
              title={collapsed ? item.label : undefined}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 w-full text-left group ${
                isActive
                  ? "bg-red-500/15 text-red-500 dark:text-red-400 border border-red-500/20"
                  : "text-muted hover:text-foreground hover:bg-elevated/50"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span className="truncate flex-1">{item.label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
              )}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-elevated border border-border rounded text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        <div className="my-2 border-t border-border/30 mx-1" />

        {/* Back to company profile */}
        <Link
          href="/"
          title={collapsed ? "Company Profile" : undefined}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-elevated/50 transition group ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Home size={17} className="shrink-0" />
          {!collapsed && <span className="truncate">Company Profile</span>}
          {collapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-elevated border border-border rounded text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
              Company Profile
            </span>
          )}
        </Link>
      </nav>

      {/* User at bottom */}
      <div className="p-3 shrink-0 border-t border-border/40">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 dark:text-red-400 text-xs font-bold shrink-0">
              {avatarInitial}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate leading-none mb-1">{displayName}</p>
              <span className="text-[9px] text-red-505 dark:text-red-400 font-mono tracking-wide uppercase leading-none">ADMIN</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-muted hover:text-red-500 dark:hover:text-red-400 transition rounded hover:bg-red-500/10"
              title="Logout Admin"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 dark:text-red-400 text-xs font-bold">
              {avatarInitial}
            </span>
            <button
              onClick={onLogout}
              className="p-1.5 text-muted hover:text-red-500 dark:hover:text-red-400 transition rounded hover:bg-red-500/10"
              title="Logout Admin"
            >
              <LogOut size={13} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
