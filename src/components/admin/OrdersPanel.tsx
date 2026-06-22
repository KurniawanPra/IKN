"use client";

import React from "react";
import { motion } from "framer-motion";

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

export default function OrdersPanel() {
  return (
    <div className="space-y-4 text-white">
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
  );
}
