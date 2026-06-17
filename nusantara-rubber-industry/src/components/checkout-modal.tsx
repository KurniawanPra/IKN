"use client";

import React, { useState } from "react";
import { useCart } from "./providers/cart-provider";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartTotal,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("WhatsApp Direct");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) return;

    setIsSubmitting(true);

    // Simulate order placement api request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const ref = "IKN-" + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(ref);
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    // Reset states after animation duration
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPayment("WhatsApp Direct");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#060e1a]/85 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#0a1628]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-6 sm:p-8 pointer-events-auto overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-rubber-red/10 blur-[60px] pointer-events-none -z-10" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-steel hover:text-white transition p-1.5"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <>
                  <h3 className="text-xl font-bold text-[#f0f0ec] mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-rubber-red" />
                    Checkout Pemesanan
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-steel mb-1.5">
                          Nama Penerima
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Budi Santoso"
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-[#f0f0ec] placeholder:text-steel/30 focus:border-rubber-red/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-steel mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="budi@perusahaan.com"
                            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-[#f0f0ec] placeholder:text-steel/30 focus:border-rubber-red/50 focus:outline-none transition text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-steel mb-1.5">
                            WhatsApp / Telepon
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="08123456789"
                            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-[#f0f0ec] placeholder:text-steel/30 focus:border-rubber-red/50 focus:outline-none transition text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-steel mb-1.5">
                          Alamat Pengiriman Lengkap
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Nama Jalan, Nomor, Kecamatan, Kota, Kode Pos"
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-[#f0f0ec] placeholder:text-steel/30 focus:border-rubber-red/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-steel mb-1.5">
                          Metode Pembayaran
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            { id: "WhatsApp Direct", label: "WhatsApp Sales" },
                            { id: "Bank Transfer", label: "Transfer Bank" },
                            { id: "COD", label: "Invoice (B2B Term)" },
                          ].map((item) => (
                            <label
                              key={item.id}
                              className={`flex items-center justify-center p-2.5 border rounded-sm cursor-pointer transition text-xs font-medium ${
                                payment === item.id
                                  ? "bg-rubber-red/10 border-rubber-red text-[#f0f0ec]"
                                  : "bg-white/5 border-white/10 text-steel hover:bg-white/10"
                              }`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={item.id}
                                checked={payment === item.id}
                                onChange={() => setPayment(item.id)}
                                className="sr-only"
                              />
                              {item.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary bg-rubber-red text-white py-3 rounded-sm font-medium uppercase tracking-wide hover:bg-rubber-red-light transition text-sm flex items-center justify-center mt-6"
                      >
                        {isSubmitting ? (
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          "Kirim Pemesanan"
                        )}
                      </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-5 bg-white/5 border border-white/5 p-4 rounded-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f0f0ec] mb-4 pb-2 border-b border-white/5">
                          Ringkasan Produk
                        </h4>
                        <div className="space-y-3 max-h-[180px] overflow-y-auto scrollbar-thin">
                          {cart.map((item) => (
                            <div key={item.product.slug} className="flex justify-between items-start text-xs">
                              <div className="max-w-[70%]">
                                <p className="font-semibold text-[#f0f0ec] truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-steel">
                                  {item.quantity} {item.product.unit} × {formatPrice(item.product.price)}
                                </p>
                              </div>
                              <span className="font-mono font-medium text-[#f0f0ec]">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                        <div className="flex justify-between items-center text-xs text-steel">
                          <span>Subtotal</span>
                          <span className="font-mono">{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-steel">
                          <span>Pengiriman (Ekspedisi Kargo)</span>
                          <span className="text-emerald-400 font-medium">B2B Cargo (Calculated)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-[#f0f0ec] pt-2 border-t border-white/5">
                          <span>Estimasi Total</span>
                          <span className="font-mono text-rubber-red-light">{formatPrice(cartTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-[#f0f0ec] mb-2">Pemesanan Berhasil Terkirim!</h3>
                  <p className="text-sm text-steel mb-1">
                    Nomor Referensi Anda: <span className="font-mono text-[#f0f0ec] font-bold">{orderRef}</span>
                  </p>
                  <p className="text-xs text-steel/70 max-w-sm mt-3">
                    {payment === "WhatsApp Direct"
                      ? "Rincian pesanan telah dikirim ke WhatsApp sales representative kami. Anda akan segera dihubungi untuk konfirmasi pengiriman kargo dan invoice."
                      : "Email konfirmasi instruksi pembayaran telah dikirim ke alamat email Anda. Mohon periksa folder masuk/spam."}
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-6 py-2.5 bg-white/5 border border-white/10 text-[#f0f0ec] rounded-sm text-sm font-medium hover:bg-white/10 hover:border-white/20 transition flex items-center gap-2"
                  >
                    Kembali ke Halaman Utama <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
