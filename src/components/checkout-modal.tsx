"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "./providers/cart-provider";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";

interface SavedAddress {
  id: string;
  label: string;
  receiverName: string;
  receiverPhone: string;
  fullAddress: string;
  isDefault: boolean;
}

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

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    if (isCheckoutOpen) {
      // Pre-fill email from logged in session
      const storedEmail = localStorage.getItem("ikn_user_email") || "";
      setEmail(storedEmail);

      const storedAddrs = localStorage.getItem("ikn_addresses");
      if (storedAddrs) {
        try {
          const parsed = JSON.parse(storedAddrs);
          setSavedAddresses(parsed);
          
          // Pre-fill fields with default address
          const defaultAddr = parsed.find((a: SavedAddress) => a.isDefault) || parsed[0];
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
            setName(defaultAddr.receiverName);
            setPhone(defaultAddr.receiverPhone);
            setAddress(defaultAddr.fullAddress);
          }
        } catch (e) {
          console.error("Failed to parse addresses in checkout modal", e);
        }
      }
    }
  }, [isCheckoutOpen]);

  const handleAddressChange = (addrId: string) => {
    setSelectedAddressId(addrId);
    const found = savedAddresses.find((a) => a.id === addrId);
    if (found) {
      setName(found.receiverName);
      setPhone(found.receiverPhone);
      setAddress(found.fullAddress);
    }
  };
  
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
            className="fixed inset-0 z-50 backdrop-blur-md"
            style={{ background: 'var(--overlay-bg)' }}
          />

          {/* Modal Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl backdrop-blur-xl border border-border rounded-lg shadow-2xl p-6 sm:p-8 pointer-events-auto overflow-hidden"
              style={{ background: 'color-mix(in srgb, var(--bg-secondary) 95%, transparent)' }}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] pointer-events-none -z-10" style={{ background: 'var(--accent-glow)' }} />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted hover:text-foreground transition p-1.5"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-accent" />
                    Checkout Pemesanan
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                      {savedAddresses.length > 0 && (
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                            Alamat Pengiriman Tersimpan
                          </label>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {savedAddresses.map((addr) => (
                              <button
                                type="button"
                                key={addr.id}
                                onClick={() => handleAddressChange(addr.id)}
                                className={`px-3 py-2 border rounded-sm text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                  selectedAddressId === addr.id
                                    ? "border-accent text-accent bg-accent/5 font-bold"
                                    : "border-border text-muted hover:text-foreground bg-transparent"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  selectedAddressId === addr.id ? 'bg-accent' : 'bg-transparent border border-muted-dim'
                                }`} />
                                {addr.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                          Nama Penerima
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Budi Santoso"
                          className="w-full rounded-sm px-4 py-2.5 text-sm theme-input"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="budi@perusahaan.com"
                            className="w-full rounded-sm px-4 py-2.5 text-sm theme-input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                            WhatsApp / Telepon
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="08123456789"
                            className="w-full rounded-sm px-4 py-2.5 text-sm theme-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                          Alamat Pengiriman Lengkap
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Nama Jalan, Nomor, Kecamatan, Kota, Kode Pos"
                          className="w-full rounded-sm px-4 py-2.5 text-sm theme-input"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
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
                                  ? "border-accent text-foreground"
                                  : "border-border text-muted hover:text-foreground"
                              }`}
                              style={{
                                background: payment === item.id ? 'var(--accent-glow)' : 'var(--input-bg)',
                              }}
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
                        className="w-full btn-primary py-3 rounded-sm font-medium uppercase tracking-wide text-sm flex items-center justify-center mt-6"
                      >
                        {isSubmitting ? (
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          "Kirim Pemesanan"
                        )}
                      </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-5 bg-elevated border border-border p-4 rounded-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4 pb-2 border-b border-border">
                          Ringkasan Produk
                        </h4>
                        <div className="space-y-3 max-h-[180px] overflow-y-auto scrollbar-thin">
                          {cart.map((item) => (
                            <div key={item.product.slug} className="flex justify-between items-start text-xs">
                              <div className="max-w-[70%]">
                                <p className="font-semibold text-foreground truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-muted">
                                  {item.quantity} {item.product.unit} × {formatPrice(item.product.price)}
                                </p>
                              </div>
                              <span className="font-mono font-medium text-foreground">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border space-y-2">
                        <div className="flex justify-between items-center text-xs text-muted">
                          <span>Subtotal</span>
                          <span className="font-mono">{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted">
                          <span>Pengiriman (Ekspedisi Kargo)</span>
                          <span className="text-emerald-500 dark:text-emerald-400 font-medium">B2B Cargo (Calculated)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-foreground pt-2 border-t border-border">
                          <span>Estimasi Total</span>
                          <span className="font-mono text-accent">{formatPrice(cartTotal)}</span>
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
                  <CheckCircle className="w-16 h-16 text-emerald-500 dark:text-emerald-400 mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Pemesanan Berhasil Terkirim!</h3>
                  <p className="text-sm text-muted mb-1">
                    Nomor Referensi Anda: <span className="font-mono text-foreground font-bold">{orderRef}</span>
                  </p>
                  <p className="text-xs text-muted-dim max-w-sm mt-3">
                    {payment === "WhatsApp Direct"
                      ? "Rincian pesanan telah dikirim ke WhatsApp sales representative kami. Anda akan segera dihubungi untuk konfirmasi pengiriman kargo dan invoice."
                      : "Email konfirmasi instruksi pembayaran telah dikirim ke alamat email Anda. Mohon periksa folder masuk/spam."}
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-6 py-2.5 bg-elevated border border-border text-foreground rounded-sm text-sm font-medium hover:bg-accent/10 hover:border-accent/30 transition flex items-center gap-2"
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
