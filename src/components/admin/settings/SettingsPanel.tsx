"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building, Sliders, Lock, Save, Check, LogOut, Phone, Mail, Clock, MapPin } from "lucide-react";

interface SettingsPanelProps {
  userEmail: string;
  onLogout: () => void;
}

export interface SystemSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  moq: number;
  taxRate: number;
  autoApprove: boolean;
}

const DEFAULT_SETTINGS: SystemSettings = {
  companyName: "PT. Industri Karet Nusantara",
  address: "Jl. Letjen S. Parman No. 1, Medan, Sumatera Utara, 20112",
  phone: "+62 61 4567890",
  email: "info@industrikaretnusantara.co.id",
  workingHours: "Senin - Jumat, 08.00 - 17.00 WIB",
  moq: 100,
  taxRate: 11,
  autoApprove: false,
};

export default function SettingsPanel({ userEmail, onLogout }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<"general" | "store" | "security">("general");
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Security states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [securityMessage, setSecurityMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ikn_system_settings");
      if (stored) {
        try {
          setSettings(JSON.parse(stored));
        } catch {
          // fallback to defaults
        }
      } else {
        localStorage.setItem("ikn_system_settings", JSON.stringify(DEFAULT_SETTINGS));
      }
    }
  }, []);

  const handleChange = (key: keyof SystemSettings, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("ikn_system_settings", JSON.stringify(settings));
        // Emit custom event for components to know settings updated
        window.dispatchEvent(new Event("ikn_settings_updated"));
      }
      setIsSaving(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2500);
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage({ text: "", type: "" });

    if (currentPassword !== "admin123") {
      setSecurityMessage({ text: "Password saat ini salah!", type: "error" });
      return;
    }

    if (newPassword.length < 6) {
      setSecurityMessage({ text: "Password baru minimal 6 karakter!", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: "Konfirmasi password baru tidak cocok!", type: "error" });
      return;
    }

    setSecurityMessage({ text: "Memproses perubahan...", type: "info" });

    setTimeout(() => {
      // Perbarui password admin di localStorage (demo simulation)
      // Karena admin hardcoded di login/page.tsx, di sini kita mensimulasikan update dengan menyimpan password baru
      localStorage.setItem("ikn_admin_password_custom", newPassword);
      setSecurityMessage({ text: "Password admin berhasil diperbarui!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl text-white">
      {showSaveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg flex items-center gap-2"
        >
          <Check size={16} />
          Pengaturan berhasil disimpan!
        </motion.div>
      )}

      <div>
        <h2 className="text-xl font-bold text-white leading-tight">Pengaturan Sistem</h2>
        <p className="text-xs text-white/40 font-mono mt-1">Konfigurasi profile, aturan toko, dan keamanan IKN</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold border-b-2 transition ${
            activeTab === "general"
              ? "border-red-500 text-red-400"
              : "border-transparent text-white/40 hover:text-white/60"
          }`}
        >
          <Building size={14} />
          Profil Perusahaan
        </button>
        <button
          onClick={() => setActiveTab("store")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold border-b-2 transition ${
            activeTab === "store"
              ? "border-red-500 text-red-400"
              : "border-transparent text-white/40 hover:text-white/60"
          }`}
        >
          <Sliders size={14} />
          Aturan Toko & B2B
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold border-b-2 transition ${
            activeTab === "security"
              ? "border-red-500 text-red-400"
              : "border-transparent text-white/40 hover:text-white/60"
          }`}
        >
          <Lock size={14} />
          Keamanan & Akun
        </button>
      </div>

      {/* Content */}
      <div className="rounded-xl border p-6" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
        {activeTab === "general" && (
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-white/5 pb-2">Informasi Umum Perusahaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Nama Perusahaan</label>
                <input
                  type="text"
                  required
                  value={settings.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Email Kontak</label>
                <div className="relative">
                  <Mail size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="email"
                    required
                    value={settings.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Nomor Telepon</label>
                <div className="relative">
                  <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="text"
                    required
                    value={settings.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Jam Kerja Default</label>
                <div className="relative">
                  <Clock size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="text"
                    required
                    value={settings.workingHours}
                    onChange={(e) => handleChange("workingHours", e.target.value)}
                    className="w-full rounded bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-mono text-white/40 uppercase">Alamat Kantor Pusat</label>
                <div className="relative">
                  <MapPin size={12} className="absolute left-3 top-2.5 text-white/20" />
                  <textarea
                    required
                    rows={2}
                    value={settings.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full rounded bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/5">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-xs font-semibold text-white transition disabled:opacity-55"
              >
                {isSaving ? (
                  <span className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" />
                ) : (
                  <Save size={12} />
                )}
                Simpan Profil
              </button>
            </div>
          </form>
        )}

        {activeTab === "store" && (
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-white/5 pb-2">Aturan E-Commerce & B2B</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Minimum Order Quantity (MOQ) - Kg</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={settings.moq}
                  onChange={(e) => handleChange("moq", parseInt(e.target.value) || 0)}
                  className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Pajak Pertambahan Nilai (PPN) - %</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={settings.taxRate}
                  onChange={(e) => handleChange("taxRate", parseInt(e.target.value) || 0)}
                  className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                />
              </div>

              <div className="md:col-span-2 border-t border-white/5 pt-4 pb-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div>
                    <p className="text-xs font-semibold text-white">Persetujuan Otomatis Pendaftaran Pembeli</p>
                    <p className="text-[10px] text-white/40 mt-1">
                      Bila diaktifkan, pembeli baru yang mendaftar akan langsung berstatus <strong className="text-emerald-400">approved</strong> dan dapat login tanpa perlu disetujui admin secara manual.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={settings.autoApprove}
                      onChange={(e) => handleChange("autoApprove", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white/80 after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/5">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-xs font-semibold text-white transition disabled:opacity-55"
              >
                {isSaving ? (
                  <span className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" />
                ) : (
                  <Save size={12} />
                )}
                Simpan Aturan Toko
              </button>
            </div>
          </form>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Ubah Password Form */}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-white/5 pb-2">Ubah Password Administrator</h3>
              
              {securityMessage.text && (
                <div className={`p-2.5 rounded text-xs font-medium border ${
                  securityMessage.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : securityMessage.type === "error"
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                }`}>
                  {securityMessage.text}
                </div>
              )}

              <div className="space-y-3 max-w-md">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Password Saat Ini</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini (admin123)"
                    className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Password Baru</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 karakter"
                    className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Konfirmasi Password Baru</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    className="w-full rounded bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="showPass"
                    checked={showPasswords}
                    onChange={(e) => setShowPasswords(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-sm border-white/10 bg-white/5"
                  />
                  <label htmlFor="showPass" className="text-xs text-white/40 cursor-pointer select-none">
                    Tampilkan Password
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <p className="text-[10px] text-white/30 font-mono">Status: Terautentikasi sebagai {userEmail}</p>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-xs font-semibold text-white transition"
                >
                  Ubah Password
                </button>
              </div>
            </form>

            {/* Logout Panel */}
            <div className="border-t border-white/5 pt-6 space-y-3">
              <h3 className="text-sm font-semibold text-white">Sesi Admin</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Anda saat ini masuk sebagai Administrator sistem. Untuk mengakhiri sesi dan keluar ke halaman beranda utama, silakan klik tombol di bawah.
              </p>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 border border-red-500/30 hover:bg-red-500/10 text-red-400 px-4 py-2 rounded text-xs font-semibold transition"
              >
                <LogOut size={12} />
                Logout Administrator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
