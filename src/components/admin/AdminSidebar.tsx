"use client";

import { useState } from "react";
import Link from "next/link";
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
  userEmail: string;
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Kelola Produk", icon: Package },
  { id: "orders", label: "Pesanan Masuk", icon: ShoppingCart },
  { id: "customers", label: "Pelanggan", icon: Users },
  { id: "analytics", label: "Analitik", icon: BarChart2 },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

export default function AdminSidebar({
  displayName,
  avatarInitial,
  userEmail,
  activeView,
  onViewChange,
  onLogout,
}: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col border-r transition-all duration-300 ease-in-out font-sans ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
      style={{
        background: "linear-gradient(180deg, #0a0f1e 0%, #0d1526 100%)",
        borderColor: "rgba(220,38,38,0.2)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-between px-4 shrink-0 border-b"
        style={{ borderColor: "rgba(220,38,38,0.15)" }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldCheck size={16} className="text-red-400 shrink-0" />
            <span className="font-bold text-white text-sm tracking-tight whitespace-nowrap">IKN Admin</span>
          </div>
        )}
        {collapsed && <ShieldCheck size={16} className="text-red-400 mx-auto" />}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded text-white/30 hover:text-white hover:bg-white/10 transition shrink-0"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 p-1.5 rounded text-white/30 hover:text-white hover:bg-white/10 transition"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Nav Items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              title={collapsed ? item.label : undefined}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 w-full text-left group ${
                isActive
                  ? "bg-red-500/15 text-red-400 border border-red-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/8"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span className="truncate flex-1">{item.label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              )}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-[#1a2540] border border-red-500/20 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

        <div className="my-2 border-t mx-1" style={{ borderColor: "rgba(220,38,38,0.15)" }} />

        {/* Back to company profile */}
        <Link
          href="/"
          title={collapsed ? "Company Profile" : undefined}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/40 hover:text-white hover:bg-white/8 transition group ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Home size={17} className="shrink-0" />
          {!collapsed && <span className="truncate">Company Profile</span>}
          {collapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#1a2540] border border-red-500/20 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
              Company Profile
            </span>
          )}
        </Link>
      </nav>

      {/* User at bottom */}
      <div className="p-3 shrink-0 border-t" style={{ borderColor: "rgba(220,38,38,0.15)" }}>
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">
              {avatarInitial}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{displayName}</p>
              <p className="text-[10px] text-white/40 truncate font-mono">Admin</p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-white/30 hover:text-red-400 transition rounded hover:bg-red-400/10"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-bold">
              {avatarInitial}
            </span>
            <button
              onClick={onLogout}
              className="p-1.5 text-white/30 hover:text-red-400 transition"
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
