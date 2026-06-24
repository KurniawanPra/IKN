"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  displayName: string;
  avatarInitial: string;
  userEmail: string;
  onLogout: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, path: "/ecommerce" },
  { id: "catalog", label: "Katalog Produk", icon: Package, path: "/ecommerce/katalog" },
  { id: "orders", label: "Riwayat Pesanan", icon: ClipboardList, path: "/ecommerce/pesanan" },
  { id: "address", label: "Alamat Pengiriman", icon: MapPin, path: "/ecommerce/alamat" },
  { id: "profile", label: "Profil Saya", icon: User, path: "/ecommerce/profil" },
];

export default function EcommerceSidebar({
  displayName,
  avatarInitial,
  userEmail,
  onLogout,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="h-full w-full flex flex-col border-r border-border/40 font-sans"
      style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/40 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-bold text-foreground text-base tracking-tight whitespace-nowrap">IKN</span>
            <span className="text-muted text-[10px] font-mono whitespace-nowrap">/ Store</span>
          </div>
        )}
        {collapsed && (
          <span className="font-bold text-foreground text-base tracking-tight mx-auto">IKN</span>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded text-muted hover:text-foreground hover:bg-elevated/50 transition shrink-0 hidden lg:block"
            title="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 p-1.5 rounded text-muted hover:text-foreground hover:bg-elevated/50 transition hidden lg:block"
          title="Expand sidebar"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Nav Items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
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
                  ? "bg-accent/15 text-accent border border-accent/20"
                  : "text-muted hover:text-foreground hover:bg-elevated/50"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {/* Active indicator */}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              )}
              {/* Tooltip on collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-elevated border border-border rounded text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-2 border-t border-border/30 mx-1" />

        {/* Back to company profile */}
        <Link
          href="/"
          title={collapsed ? "Company Profile" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-elevated/50 transition group ${
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

      {/* User Profile + Logout at bottom */}
      <div className="border-t border-border/40 p-3 shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold shrink-0">
              {avatarInitial}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{displayName}</p>
              <p className="text-[10px] text-muted truncate font-mono">{userEmail}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-muted hover:text-red-400 transition rounded hover:bg-red-400/10"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold">
              {avatarInitial}
            </span>
            <button
              onClick={onLogout}
              className="p-1.5 text-muted hover:text-red-400 transition rounded hover:bg-red-400/10"
              title="Logout"
            >
              <LogOut size={13} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
