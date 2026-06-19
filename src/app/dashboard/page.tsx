"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, ShoppingBag, CreditCard, ShieldCheck, User } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import BackgroundBlobs from "@/components/background-blobs";

export default function DashboardPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Protect route client-side
    const loggedIn = localStorage.getItem("ikn_logged_in");
    if (loggedIn !== "true") {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ikn_logged_in");
    window.location.href = "/";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen text-foreground overflow-y-auto no-scrollbar pb-12 transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      <BackgroundBlobs sectionId="dashboard" />

      {/* Navigation header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border/40 py-4 px-6 w-full flex items-center justify-between" style={{ backgroundColor: 'var(--nav-bg)' }}>
        <div className="flex items-center gap-3">
          <Link href="/business#business-products" className="p-2 hover:bg-elevated rounded-full transition text-muted hover:text-foreground">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-lg font-bold tracking-tight">IKN Store Dashboard</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-accent/10 border border-accent/20 hover:bg-accent hover:text-white transition text-xs font-semibold uppercase tracking-wider text-accent"
        >
          <LogOut size={14} /> Logout
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: User details & Cart summary */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-xl flex items-center gap-5 border border-border"
          >
            <div className="h-16 w-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Halo, Mitra Industri IKN</h2>
              <p className="text-xs text-muted mt-1 font-mono">B2B Buyer Account | ID: IKN-892490-ID</p>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm w-max font-mono uppercase tracking-wider">
                <ShieldCheck size={10} /> Verified Company
              </div>
            </div>
          </motion.div>

          {/* Cart Table Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-xl border border-border flex flex-col"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <ShoppingBag className="text-rubber-red-light" size={20} />
              <h3 className="text-base font-bold">Daftar Belanja Aktif (B2B Cart)</h3>
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-muted">Keranjang belanja Anda kosong saat ini.</p>
                <Link href="/business#business-products" className="btn-primary text-xs py-2 px-6">
                  Lihat Katalog Produk
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border/40 text-muted pb-2">
                        <th className="pb-2 font-mono uppercase">Produk</th>
                        <th className="pb-2 font-mono uppercase text-center">Jumlah</th>
                        <th className="pb-2 font-mono uppercase text-right">Harga Satuan</th>
                        <th className="pb-2 font-mono uppercase text-right">Total</th>
                        <th className="pb-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.product.slug} className="border-b border-border/40 hover:bg-elevated/5">
                          <td className="py-3">
                            <span className="font-bold text-foreground block">{item.product.name}</span>
                            <span className="text-[10px] text-muted font-mono">{item.product.category}</span>
                          </td>
                          <td className="py-3 text-center">
                            <div className="inline-flex items-center gap-2 border border-border bg-elevated/20 rounded px-1.5 py-0.5">
                              <button 
                                onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                                className="hover:text-accent font-bold px-1"
                              >
                                -
                              </button>
                              <span className="font-mono w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                                className="hover:text-accent font-bold px-1"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-3 text-right font-mono">{formatPrice(item.product.price)}/{item.product.unit}</td>
                          <td className="py-3 text-right font-mono font-bold text-foreground">
                            {formatPrice(item.product.price * item.quantity)}
                          </td>
                          <td className="py-3 text-center">
                            <button 
                              onClick={() => removeFromCart(item.product.slug)}
                              className="text-red-500 hover:text-red-400 font-semibold underline text-[10px] uppercase font-mono"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center border-t border-border pt-4 mt-2">
                  <span className="text-sm font-semibold">Subtotal B2B Order:</span>
                  <span className="text-lg font-mono font-extrabold text-rubber-red-light">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Order Process Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Order Checkout Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-xl border border-border flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <CreditCard className="text-rubber-red-light" size={20} />
                <h3 className="text-base font-bold">Ringkasan Checkout</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Subtotal:</span>
                  <span className="font-mono">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Pajak (PPN 11%):</span>
                  <span className="font-mono">{formatPrice(cartTotal * 0.11)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Estimasi Pengiriman (B2B Cargo):</span>
                  <span className="text-green-500 font-mono">Dinegosiasikan</span>
                </div>
                <div className="border-t border-border/40 my-3 pt-3 flex justify-between font-bold text-sm">
                  <span>Total Tagihan:</span>
                  <span className="font-mono text-rubber-red-light">{formatPrice(cartTotal * 1.11)}</span>
                </div>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50 mt-6 shadow-lg shadow-accent/25"
            >
              Ajukan Purchase Order (PO)
            </button>
          </motion.div>

          {/* Shipping & Support */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-5 rounded-xl border border-border text-xs leading-relaxed flex flex-col gap-3"
          >
            <h4 className="font-bold uppercase tracking-wider text-rubber-red-light font-mono">Informasi B2B & Support</h4>
            <p className="text-muted">
              Order yang diajukan di dashboard ini berupa pre-invoice atau simulasi Purchase Order. Tim support B2B kami akan menghubungi Anda dalam waktu 1x24 jam untuk verifikasi dokumen ekspor dan metode pengapalan.
            </p>
            <div className="border-t border-border/40 pt-2 flex flex-col gap-1.5 font-mono text-[10px] text-muted-dim">
              <span>Telp: +62 61 786 7356</span>
              <span>Email: sales@nusantararubber.com</span>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
