"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package, Users, TrendingUp, ShieldCheck } from "lucide-react";

interface OverviewPanelProps {
  userEmail: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

const MOCK_ORDERS = [
  { id: "ORD-001", buyer: "PT Maju Bersama", product: "Resiprene 35", qty: 500, total: 22500000, status: "Pending", date: "2026-06-20" },
  { id: "ORD-002", buyer: "CV Karya Mandiri", product: "RUBIN", qty: 300, total: 16500000, status: "Diproses", date: "2026-06-21" },
  { id: "ORD-003", buyer: "PT Karet Makmur", product: "Rubber Thread", qty: 1000, total: 35000000, status: "Selesai", date: "2026-06-19" },
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

export default function OverviewPanel({ userEmail }: OverviewPanelProps) {
  const stats = [
    { label: "Total Produk", value: "4", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { label: "Pesanan Masuk", value: "3", icon: ShoppingCart, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    { label: "Total Pelanggan", value: "3", icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    { label: "Revenue (Simulasi)", value: "Rp 259 Jt", icon: TrendingUp, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  ];

  return (
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
  );
}
