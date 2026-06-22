"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Package, ShoppingCart, Users, TrendingUp, ShieldCheck, Eye, Pencil, Trash2, BarChart2 } from "lucide-react";
import dynamic from "next/dynamic";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import ThemeToggle from "@/components/theme-toggle";

interface UserAccount {
  email: string;
  name: string;
  password?: string;
  status: string;
  createdAt: string;
}

const AdminSidebar = dynamic(() => import("@/components/admin/AdminSidebar"), { ssr: false });

const PAGE_TITLES: Record<string, string> = {
  overview: "Admin Overview",
  products: "Kelola Produk",
  orders: "Pesanan Masuk",
  customers: "Data Pelanggan",
  analytics: "Analitik",
  settings: "Pengaturan",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

const PRODUCTS = [
  { slug: "resiprene-35", name: "Resiprene 35", category: "Resin & Coating", price: 45000, stock: "In Stock", badge: "Best Seller" },
  { slug: "rubin", name: "RUBIN", category: "Resin & Coating", price: 55000, stock: "In Stock", badge: null },
  { slug: "cyclized-rubber", name: "Cyclized Rubber", category: "Raw Material", price: 60000, stock: "In Stock", badge: null },
  { slug: "rubber-thread", name: "Rubber Thread", category: "Rubber Thread", price: 35000, stock: "In Stock", badge: null },
];

const MOCK_ORDERS = [
  { id: "ORD-001", buyer: "PT Maju Bersama", product: "Resiprene 35", qty: 500, total: 22500000, status: "Pending", date: "2026-06-20" },
  { id: "ORD-002", buyer: "CV Karya Mandiri", product: "RUBIN", qty: 300, total: 16500000, status: "Diproses", date: "2026-06-21" },
  { id: "ORD-003", buyer: "PT Karet Makmur", product: "Rubber Thread", qty: 1000, total: 35000000, status: "Selesai", date: "2026-06-19" },
];

const MOCK_CUSTOMERS = [
  { id: "C-001", name: "PT Maju Bersama", email: "buyer@maju.co.id", orders: 3, total: 67500000 },
  { id: "C-002", name: "CV Karya Mandiri", email: "cv.karya@gmail.com", orders: 1, total: 16500000 },
  { id: "C-003", name: "PT Karet Makmur", email: "karet.makmur@corp.id", orders: 5, total: 175000000 },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    Diproses: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    Selesai: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold border ${colors[status] || ""}`}>
      {status}
    </span>
  );
}

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeView, setActiveView] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserAccount[]>([]);

  const loadUsersFromStorage = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ikn_users");
      if (stored) {
        try {
          setUsers(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse users", e);
        }
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    const loggedIn = localStorage.getItem("ikn_logged_in");
    const role = localStorage.getItem("ikn_role");
    if (loggedIn !== "true" || role !== "admin") {
      window.location.href = "/login";
      return;
    }
    setUserEmail(localStorage.getItem("ikn_user_email") || "admin@ikn.com");
    loadUsersFromStorage();
  }, []);

  const handleApproveUser = (email: string) => {
    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, status: "approved" };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem("ikn_users", JSON.stringify(updatedUsers));
  };

  const handleRejectUser = (email: string) => {
    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, status: "rejected" };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem("ikn_users", JSON.stringify(updatedUsers));
  };

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
      <div className="min-h-screen flex items-center justify-center bg-[#080e1c]">
        <SkeletonLoader type="grid" />
      </div>
    );
  }

  const stats = [
    { label: "Total Produk", value: "4", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { label: "Pesanan Masuk", value: "3", icon: ShoppingCart, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    { label: "Total Pelanggan", value: "3", icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    { label: "Revenue (Simulasi)", value: "Rp 259 Jt", icon: TrendingUp, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  ];

  return (
    <div
      className="relative min-h-screen w-full font-sans flex"
      style={{ background: "linear-gradient(135deg, #080e1c 0%, #0d1526 100%)" }}
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
        className={`fixed top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <AdminSidebar
          displayName={displayName}
          avatarInitial={avatarInitial}
          activeView={activeView}
          onViewChange={(view) => { setActiveView(view); setMobileSidebarOpen(false); }}
          onLogout={handleLogout}
        />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-[240px] transition-all duration-300 min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 border-b shrink-0"
          style={{ background: "rgba(8,14,28,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(220,38,38,0.15)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-white/40 hover:text-white transition"
            >
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <p className="text-[10px] font-mono text-red-400/70 uppercase tracking-widest leading-none">Admin Panel</p>
              <h1 className="text-sm font-bold text-white leading-tight">{PAGE_TITLES[activeView]}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-2 px-2 py-1 rounded border" style={{ borderColor: "rgba(220,38,38,0.25)" }}>
              <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-[10px] font-bold shrink-0">
                {avatarInitial}
              </span>
              <span className="text-xs font-medium text-white/80 hidden sm:block max-w-[100px] truncate">{displayName}</span>
              <span className="text-[9px] text-red-400 font-mono hidden sm:inline">ADMIN</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto no-scrollbar">

          {/* ─── OVERVIEW ─── */}
          {activeView === "overview" && (
            <div className="space-y-6">
              {/* Admin badge */}
              <div className="flex items-center gap-3 p-4 rounded-xl border" style={{ background: "rgba(220,38,38,0.05)", borderColor: "rgba(220,38,38,0.2)" }}>
                <ShieldCheck size={20} className="text-red-400" />
                <div>
                  <p className="text-sm font-bold text-white">Panel Administrator IKN</p>
                  <p className="text-xs text-white/40 font-mono">Login sebagai: {userEmail}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                      className="rounded-xl border p-4 flex flex-col gap-3"
                      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${stat.bg}`}>
                        <Icon size={16} className={stat.color} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 font-mono">{stat.label}</p>
                        <p className={`text-lg font-bold font-mono mt-0.5 ${stat.color}`}>{stat.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <div className="rounded-xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <h3 className="text-sm font-bold text-white">Pesanan Terbaru</h3>
                  <button onClick={() => setActiveView("orders")} className="text-[10px] text-red-400 hover:underline font-mono">Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        {["ID", "Pembeli", "Produk", "Total", "Status"].map(h => (
                          <th key={h} className="px-5 py-3 font-mono uppercase text-white/30 text-[10px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_ORDERS.map(order => (
                        <tr key={order.id} className="border-b hover:bg-white/3 transition" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                          <td className="px-5 py-3 font-mono text-red-400">{order.id}</td>
                          <td className="px-5 py-3 text-white/80">{order.buyer}</td>
                          <td className="px-5 py-3 text-white/60">{order.product}</td>
                          <td className="px-5 py-3 font-mono text-white/80">{formatPrice(order.total)}</td>
                          <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── PRODUCTS ─── */}
          {activeView === "products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Daftar Produk ({PRODUCTS.length})</h2>
                <button className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded text-xs font-semibold transition">+ Tambah Produk</button>
              </div>
              <div className="rounded-xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                      {["Produk", "Kategori", "Harga/Kg", "Status", "Aksi"].map(h => (
                        <th key={h} className="px-5 py-3 font-mono uppercase text-white/30 text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((p, i) => (
                      <motion.tr
                        key={p.slug}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: i * 0.06 } }}
                        className="border-b hover:bg-white/3 transition"
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      >
                        <td className="px-5 py-3">
                          <span className="font-semibold text-white">{p.name}</span>
                          {p.badge && <span className="ml-2 text-[9px] bg-red-500/20 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded-sm font-mono">{p.badge}</span>}
                        </td>
                        <td className="px-5 py-3 text-white/50 font-mono text-[10px]">{p.category}</td>
                        <td className="px-5 py-3 font-mono text-white/80">{formatPrice(p.price)}</td>
                        <td className="px-5 py-3">
                          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm font-mono">{p.stock}</span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="p-1.5 text-white/30 hover:text-blue-400 transition"><Eye size={13} /></button>
                            <button className="p-1.5 text-white/30 hover:text-amber-400 transition"><Pencil size={13} /></button>
                            <button className="p-1.5 text-white/30 hover:text-red-400 transition"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── ORDERS ─── */}
          {activeView === "orders" && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white">Pesanan Masuk ({MOCK_ORDERS.length})</h2>
              <div className="rounded-xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                      {["ID Order", "Pembeli", "Produk", "Qty", "Total", "Status", "Tanggal"].map(h => (
                        <th key={h} className="px-5 py-3 font-mono uppercase text-white/30 text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: i * 0.08 } }}
                        className="border-b hover:bg-white/3 transition"
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      >
                        <td className="px-5 py-3 font-mono text-red-400">{order.id}</td>
                        <td className="px-5 py-3 text-white/80">{order.buyer}</td>
                        <td className="px-5 py-3 text-white/60">{order.product}</td>
                        <td className="px-5 py-3 font-mono text-white/60">{order.qty} kg</td>
                        <td className="px-5 py-3 font-mono text-white/80">{formatPrice(order.total)}</td>
                        <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                        <td className="px-5 py-3 text-white/40 font-mono">{order.date}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── CUSTOMERS ─── */}
          {activeView === "customers" && (
            <div className="space-y-6">
              {/* Bagian 1: Persetujuan Pendaftaran Akun */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Persetujuan Pendaftaran Akun</span>
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                    {users.filter((u) => u.status === "pending").length}
                  </span>
                </h2>
                
                {users.filter((u) => u.status === "pending").length === 0 ? (
                  <div className="rounded-xl border p-6 text-center border-dashed border-white/10" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <p className="text-white/40 text-xs font-mono">Tidak ada pengajuan akun baru yang sedang menunggu.</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {users.filter((u) => u.status === "pending").map((u) => (
                      <motion.div
                        key={u.email}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-sm font-bold">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">{u.name}</p>
                            <p className="text-[10px] text-white/40 font-mono">{u.email}</p>
                            <p className="text-[9px] text-white/30 font-mono mt-0.5">Mendaftar: {u.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleRejectUser(u.email)}
                            className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold transition"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => handleApproveUser(u.email)}
                            className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition"
                          >
                            Setujui
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bagian 2: Daftar Pelanggan Terdaftar */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Daftar Pelanggan Terdaftar</span>
                  <span className="bg-white/10 text-white/60 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
                    {users.filter((u) => u.status !== "pending").length + MOCK_CUSTOMERS.length}
                  </span>
                </h2>

                <div className="grid gap-3">
                  {/* Render users from localStorage */}
                  {users.filter((u) => u.status !== "pending").map((u) => (
                    <motion.div
                      key={u.email}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border p-4 flex items-center justify-between"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                          u.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {u.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-white leading-none">{u.name}</p>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold border leading-none ${
                              u.status === "approved"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}>
                              {u.status === "approved" ? "Disetujui" : "Ditolak"}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/40 font-mono mt-1">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {u.status === "approved" ? (
                          <button
                            onClick={() => handleRejectUser(u.email)}
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 text-[10px] transition border border-white/5 hover:border-red-500/20 font-semibold"
                          >
                            Tangguhkan
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproveUser(u.email)}
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-emerald-500/10 text-white/60 hover:text-emerald-400 text-[10px] transition border border-white/5 hover:border-emerald-500/20 font-semibold"
                          >
                            Setujui Akun
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Render static mock B2B customers */}
                  {MOCK_CUSTOMERS.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-xl border p-4 flex items-center justify-between opacity-80"
                      style={{ background: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.04)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/55 text-sm font-bold">
                          {c.name.charAt(0)}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-white/70">{c.name}</p>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-white/5 border border-white/10 text-white/50">
                              B2B Terintegrasi
                            </span>
                          </div>
                          <p className="text-[10px] text-white/30 font-mono mt-1">{c.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-white/60">{formatPrice(c.total)}</p>
                        <p className="text-[10px] text-white/30">{c.orders} pesanan</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── ANALYTICS ─── */}
          {activeView === "analytics" && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white">Analitik</h2>
              <div className="rounded-xl border p-10 text-center" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <BarChart2 size={40} className="mx-auto mb-3 text-white/20" />
                <p className="text-white/40 text-sm font-mono">Fitur analitik akan segera hadir.</p>
              </div>
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activeView === "settings" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="text-base font-bold text-white">Pengaturan</h2>
              <div className="rounded-xl border p-6" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <p className="text-xs text-white/40 font-mono">Admin: {userEmail}</p>
                <p className="text-xs text-white/40 font-mono mt-1">Role: Administrator</p>
                <button
                  onClick={handleLogout}
                  className="mt-6 w-full py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded text-xs font-semibold transition"
                >
                  Logout Admin
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
