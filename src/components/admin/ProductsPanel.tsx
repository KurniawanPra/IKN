"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

const PRODUCTS = [
  { slug: "resiprene-35", name: "Resiprene 35", category: "Resin & Coating", price: 45000, stock: "In Stock", badge: "Best Seller" },
  { slug: "rubin", name: "RUBIN", category: "Resin & Coating", price: 55000, stock: "In Stock", badge: null },
  { slug: "cyclized-rubber", name: "Cyclized Rubber", category: "Raw Material", price: 60000, stock: "In Stock", badge: null },
  { slug: "rubber-thread", name: "Rubber Thread", category: "Rubber Thread", price: 35000, stock: "In Stock", badge: null },
];

export default function ProductsPanel() {
  return (
    <div className="space-y-4 text-foreground">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Daftar Produk ({PRODUCTS.length})</h2>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-semibold transition">+ Tambah Produk</button>
      </div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="overflow-auto max-h-[400px] relative">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border">
                {["Produk", "Kategori", "Harga/Kg", "Status", "Aksi"].map(h => (
                  <th key={h} className="px-5 py-3 font-mono uppercase text-muted text-[10px] sticky top-0 bg-surface z-10">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <motion.tr
                  key={p.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: i * 0.06 } }}
                  className="border-b border-border/40 hover:bg-elevated/40 transition"
                >
                  <td className="px-5 py-3">
                    <span className="font-semibold text-foreground">{p.name}</span>
                    {p.badge && <span className="ml-2 text-[9px] bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded-sm font-mono">{p.badge}</span>}
                  </td>
                  <td className="px-5 py-3 text-muted font-mono text-[10px]">{p.category}</td>
                  <td className="px-5 py-3 font-mono text-foreground/80">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm font-mono">{p.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 text-muted hover:text-blue-500 dark:hover:text-blue-400 transition" title="Lihat"><Eye size={13} /></button>
                      <button className="p-1.5 text-muted hover:text-amber-500 dark:hover:text-amber-400 transition" title="Edit"><Pencil size={13} /></button>
                      <button className="p-1.5 text-muted hover:text-red-500 dark:hover:text-red-400 transition" title="Hapus"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
