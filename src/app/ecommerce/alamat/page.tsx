"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, Edit3, CheckCircle, Phone, User, Map } from "lucide-react";

interface ShippingAddress {
  id: string;
  label: string;
  receiverName: string;
  receiverPhone: string;
  fullAddress: string;
  isDefault: boolean;
}

const DEFAULT_ADDRESS: ShippingAddress = {
  id: "addr-1",
  label: "Kantor Utama (Pusat)",
  receiverName: "Mitra Nusantara Corp",
  receiverPhone: "081265439871",
  fullAddress: "Kawasan Industri Medan (KIM) II, Jl. Pulau Pinang No. 12, Saentis, Kec. Percut Sei Tuan, Kabupaten Deli Serdang, Sumatera Utara 20371",
  isDefault: true,
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);

  // Form states
  const [label, setLabel] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("ikn_addresses");
    if (stored) {
      try {
        setAddresses(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse addresses", err);
        setAddresses([DEFAULT_ADDRESS]);
      }
    } else {
      setAddresses([DEFAULT_ADDRESS]);
      localStorage.setItem("ikn_addresses", JSON.stringify([DEFAULT_ADDRESS]));
    }
  }, []);

  const saveToLocalStorage = (list: ShippingAddress[]) => {
    localStorage.setItem("ikn_addresses", JSON.stringify(list));
    setAddresses(list);
  };

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setLabel("");
    setReceiverName("");
    setReceiverPhone("");
    setFullAddress("");
    setIsDefault(addresses.length === 0); // Default if first address
    setShowFormModal(true);
  };

  const handleOpenEdit = (addr: ShippingAddress) => {
    setEditingAddress(addr);
    setLabel(addr.label);
    setReceiverName(addr.receiverName);
    setReceiverPhone(addr.receiverPhone);
    setFullAddress(addr.fullAddress);
    setIsDefault(addr.isDefault);
    setShowFormModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !receiverName || !receiverPhone || !fullAddress) return;

    let updatedAddresses = [...addresses];

    if (isDefault) {
      // Unmark other default addresses
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }

    if (editingAddress) {
      // Edit mode
      updatedAddresses = updatedAddresses.map((a) =>
        a.id === editingAddress.id
          ? {
              ...a,
              label,
              receiverName,
              receiverPhone,
              fullAddress,
              isDefault: isDefault || addresses.length === 1,
            }
          : a
      );
    } else {
      // Add mode
      const newAddr: ShippingAddress = {
        id: "addr-" + Date.now(),
        label,
        receiverName,
        receiverPhone,
        fullAddress,
        isDefault: isDefault || addresses.length === 0,
      };
      updatedAddresses.push(newAddr);
    }

    // Ensure at least one default address exists
    if (!updatedAddresses.some((a) => a.isDefault) && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    saveToLocalStorage(updatedAddresses);
    setShowFormModal(false);
  };

  const handleDelete = (id: string) => {
    const toDelete = addresses.find((a) => a.id === id);
    const updatedAddresses = addresses.filter((a) => a.id !== id);

    // If we deleted the default address, set another one as default
    if (toDelete?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    saveToLocalStorage(updatedAddresses);
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveToLocalStorage(updatedAddresses);
  };

  if (!isClient) return null;

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-muted font-mono leading-none">KONFIGURASI PENGIRIMAN</p>
          <h2 className="text-xl font-bold text-foreground mt-1">Daftar Alamat Pengapalan B2B</h2>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-md shadow-accent/25 shrink-0"
        >
          <Plus size={14} /> Tambah Alamat Baru
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 gap-4">
        {addresses.length === 0 ? (
          <div className="glass-panel p-8 text-center rounded-xl flex flex-col items-center justify-center border border-border">
            <MapPin className="w-12 h-12 text-muted mb-3 animate-bounce" />
            <p className="text-sm font-semibold text-foreground">Belum Ada Alamat Tersimpan</p>
            <p className="text-xs text-muted mt-1 max-w-sm">
              Silakan tambahkan alamat pengiriman perusahaan Anda untuk mempercepat proses checkout Purchase Order (PO).
            </p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={`glass-panel p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                addr.isDefault
                  ? "border-accent/40 bg-accent/5"
                  : "border-border/60 hover:border-border"
              }`}
            >
              {/* Top Row: Label & Default Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{addr.label}</h3>
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[9px] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        <CheckCircle size={10} /> Alamat Utama
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit / Delete Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="p-1.5 text-muted hover:text-foreground hover:bg-elevated rounded transition"
                    title="Ubah Alamat"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition"
                    title="Hapus Alamat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Body: Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs border-t border-border/30 pt-3">
                <div className="flex items-start gap-2">
                  <User className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{addr.receiverName}</p>
                    <p className="text-[10px] text-muted font-mono uppercase tracking-wider mt-0.5">Penerima</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground font-mono">{addr.receiverPhone}</p>
                    <p className="text-[10px] text-muted font-mono uppercase tracking-wider mt-0.5">Telepon / WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Map className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                  <div>
                    <p className="text-muted leading-relaxed">{addr.fullAddress}</p>
                    <p className="text-[10px] text-muted font-mono uppercase tracking-wider mt-0.5">Alamat Lengkap</p>
                  </div>
                </div>
              </div>

              {/* Action Bottom: Set Default */}
              {!addr.isDefault && (
                <div className="mt-4 pt-3 border-t border-border/10 flex justify-end">
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-[10px] font-semibold uppercase tracking-wider text-muted hover:text-accent transition font-mono"
                  >
                    Jadikan Alamat Utama
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg bg-white/95 dark:bg-[#060e1a]/95 backdrop-blur-md p-6 rounded-xl border border-border shadow-2xl"
            >
              <h3 className="text-base font-bold text-foreground mb-4">
                {editingAddress ? "Ubah Alamat Pengiriman" : "Tambah Alamat Baru"}
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Label Alamat
                  </label>
                  <input
                    type="text"
                    required
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Contoh: Kantor Cabang, Gudang Utama"
                    className="w-full rounded-sm px-3.5 py-2 text-xs theme-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                      Nama Penerima
                    </label>
                    <input
                      type="text"
                      required
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="Nama Penerima / Perusahaan"
                      className="w-full rounded-sm px-3.5 py-2 text-xs theme-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                      Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      placeholder="Contoh: 0812XXXXXXXX"
                      className="w-full rounded-sm px-3.5 py-2 text-xs theme-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Alamat Lengkap
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="Nama Jalan, Nomor, Kecamatan, Kota, Kode Pos"
                    className="w-full rounded-sm px-3.5 py-2 text-xs theme-input resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    disabled={editingAddress?.isDefault && addresses.length > 1}
                    className="h-4 w-4 rounded-sm border-border bg-elevated"
                  />
                  <label htmlFor="isDefault" className="text-xs text-muted cursor-pointer select-none">
                    Jadikan sebagai Alamat Utama (Alamat Default)
                  </label>
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-border/30">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="flex-1 py-2.5 border border-border hover:bg-elevated rounded-sm text-xs font-semibold transition uppercase tracking-wider text-muted"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-sm text-xs font-semibold transition uppercase tracking-wider shadow-md shadow-accent/20"
                  >
                    {editingAddress ? "Simpan Perubahan" : "Tambah Alamat"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
