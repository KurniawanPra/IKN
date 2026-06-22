"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingCart, ClipboardList, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";

interface OverviewProps {
  displayName: string;
  userEmail: string;
  avatarInitial: string;
  onViewChange: (view: string) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export default function DashboardOverview({ displayName, userEmail, avatarInitial, onViewChange }: OverviewProps) {
  const { cartTotal, cartCount } = useCart();

  const stats = [
    { label: "Produk Tersedia", value: "4", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { label: "Item di Keranjang", value: String(cartCount), icon: ShoppingCart, color: "text-accent", bg: "bg-accent/10 border-accent/20" },
    { label: "Total Belanja", value: formatPrice(cartTotal), icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    { label: "Pesanan Aktif", value: "0", icon: ClipboardList, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-xl border border-border p-6 flex items-center gap-5"
      >
        <div className="h-14 w-14 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-accent text-xl font-bold shrink-0">
          {avatarInitial}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground">Selamat datang, {displayName} 👋</h2>
          <p className="text-xs text-muted mt-0.5 font-mono">{userEmail}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm w-max font-mono uppercase tracking-wider">
            <ShieldCheck size={10} /> Verified B2B Account
          </div>
        </div>
        <button
          onClick={() => onViewChange("catalog")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider transition shadow-md shrink-0"
          style={{ boxShadow: "0 4px 12px var(--accent-glow)" }}
        >
          Mulai Belanja <ArrowRight size={13} />
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
              className="glass-panel rounded-xl border border-border p-4 flex flex-col gap-3"
            >
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${stat.bg}`}>
                <Icon size={16} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-muted font-mono">{stat.label}</p>
                <p className={`text-lg font-bold font-mono mt-0.5 ${stat.color} break-all`}>{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        className="glass-panel rounded-xl border border-border p-5"
      >
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={15} className="text-accent" />
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onViewChange("catalog")}
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 transition group text-left"
          >
            <Package size={16} className="text-accent shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground group-hover:text-accent transition">Lihat Katalog</p>
              <p className="text-[10px] text-muted">4 produk tersedia</p>
            </div>
          </button>
          <button
            onClick={() => onViewChange("cart")}
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 transition group text-left"
          >
            <ShoppingCart size={16} className="text-accent shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground group-hover:text-accent transition">Buka Keranjang</p>
              <p className="text-[10px] text-muted">{cartCount} item · {formatPrice(cartTotal)}</p>
            </div>
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 transition group text-left"
          >
            <ClipboardList size={16} className="text-accent shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground group-hover:text-accent transition">Checkout / PO</p>
              <p className="text-[10px] text-muted">Ajukan purchase order</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Info B2B */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
        className="glass-panel rounded-xl border border-border p-5 text-xs leading-relaxed"
      >
        <h4 className="font-bold uppercase tracking-wider text-accent font-mono text-[10px] mb-2">
          Informasi B2B Platform
        </h4>
        <p className="text-muted">
          Platform e-commerce ini dirancang untuk transaksi B2B (Business-to-Business). Setiap pesanan
          yang diajukan berupa <strong className="text-foreground">simulasi Purchase Order</strong>. Tim
          sales IKN akan menghubungi Anda dalam 1×24 jam untuk konfirmasi dan proses lebih lanjut.
        </p>
        <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-border/30 font-mono text-[10px] text-muted">
          <span>📞 +62 61 786 7356</span>
          <span>✉️ sales@nusantararubber.com</span>
        </div>
      </motion.div>
    </div>
  );
}
