"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  UserPlus,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface UserAccount {
  email: string;
  name: string;
  password?: string;
  phone?: string;
  company?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

type ModalMode = "create" | "edit" | null;
type FilterStatus = "all" | "pending" | "approved" | "rejected";

const STORAGE_KEY = "ikn_users";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const emptyForm = (): Omit<UserAccount, "createdAt"> => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  password: "",
  status: "approved",
});

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Menunggu",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: <Clock className="w-3 h-3" />,
  },
  approved: {
    label: "Disetujui",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  rejected: {
    label: "Ditolak",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: <XCircle className="w-3 h-3" />,
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CustomersPanel() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterOpen, setFilterOpen] = useState(false);

  // Modal state
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<string | null>(null); // email of user being edited
  const [form, setForm] = useState(emptyForm());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  /* ---- Persistence ---- */

  const loadUsers = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }
  }, []);

  const saveUsers = useCallback((updated: UserAccount[]) => {
    setUsers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /* ---- Toast ---- */

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ---- Filtering ---- */

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || u.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  /* ---- Form validation ---- */

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Nama wajib diisi";
    if (!form.email.trim()) errors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Format email tidak valid";

    // Check unique email (except when editing the same user)
    if (modalMode === "create" && users.some((u) => u.email === form.email))
      errors.email = "Email sudah terdaftar";
    if (modalMode === "edit" && editTarget !== form.email && users.some((u) => u.email === form.email))
      errors.email = "Email sudah digunakan pengguna lain";

    if (modalMode === "create" && !form.password?.trim()) errors.password = "Password wajib diisi";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ---- CRUD handlers ---- */

  const handleCreate = () => {
    if (!validateForm()) return;
    const newUser: UserAccount = {
      ...form,
      status: form.status as "pending" | "approved" | "rejected",
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    closeModal();
    showToast(`Pelanggan "${form.name}" berhasil ditambahkan`);
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
    const updated = users.map((u) => {
      if (u.email === editTarget) {
        return {
          ...u,
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          status: form.status as "pending" | "approved" | "rejected",
          ...(form.password?.trim() ? { password: form.password } : {}),
        };
      }
      return u;
    });
    saveUsers(updated);
    closeModal();
    showToast(`Pelanggan "${form.name}" berhasil diperbarui`);
  };

  const handleDelete = (email: string) => {
    const user = users.find((u) => u.email === email);
    const updated = users.filter((u) => u.email !== email);
    saveUsers(updated);
    setDeleteTarget(null);
    showToast(`Pelanggan "${user?.name}" berhasil dihapus`);
  };

  const handleStatusChange = (email: string, newStatus: "approved" | "rejected") => {
    const updated = users.map((u) => {
      if (u.email === email) return { ...u, status: newStatus };
      return u;
    });
    saveUsers(updated);
    showToast(
      newStatus === "approved" ? "Akun berhasil disetujui" : "Akun berhasil ditangguhkan"
    );
  };

  /* ---- Modal helpers ---- */

  const openCreateModal = () => {
    setForm(emptyForm());
    setFormErrors({});
    setEditTarget(null);
    setModalMode("create");
  };

  const openEditModal = (user: UserAccount) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      company: user.company || "",
      password: "",
      status: user.status,
    });
    setFormErrors({});
    setEditTarget(user.email);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditTarget(null);
    setFormErrors({});
  };

  /* ---- Stats ---- */

  const stats = {
    total: users.length,
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    rejected: users.filter((u) => u.status === "rejected").length,
  };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="space-y-5 text-white">
      {/* ---- Toast ---- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]"
          >
            <div
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl border backdrop-blur-xl ${
                toast.type === "success"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/15 border-red-500/30 text-red-300"
              }`}
            >
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Stats cards ---- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Pelanggan", value: stats.total, icon: <Users className="w-4 h-4" />, accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { label: "Menunggu", value: stats.pending, icon: <Clock className="w-4 h-4" />, accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
          { label: "Disetujui", value: stats.approved, icon: <CheckCircle2 className="w-4 h-4" />, accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          { label: "Ditolak", value: stats.rejected, icon: <XCircle className="w-4 h-4" />, accent: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-3.5 ${s.border}`}
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className={`flex items-center justify-center gap-2 ${s.accent} mb-1.5`}>
              {s.icon}
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
                {s.label}
              </span>
            </div>
            <p className="text-xl font-bold text-white font-mono text-center">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ---- Toolbar: Search + Filter + Add ---- */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Cari nama, email, atau perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition font-mono"
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white/70 hover:border-white/20 transition min-w-[140px] justify-between"
          >
            <span className="text-xs font-semibold">
              {filterStatus === "all"
                ? "Semua Status"
                : statusConfig[filterStatus]?.label || filterStatus}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-white/10 bg-[#1a1a2e]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
              >
                {(["all", "pending", "approved", "rejected"] as FilterStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setFilterStatus(s);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition hover:bg-white/5 ${
                      filterStatus === s ? "text-white bg-white/5" : "text-white/50"
                    }`}
                  >
                    {s === "all" ? "Semua Status" : statusConfig[s]?.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add button */}
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pelanggan</span>
        </button>
      </div>

      {/* ---- Customers list ---- */}
      <div className="space-y-2">
        {filteredUsers.length === 0 ? (
          <div
            className="rounded-xl border border-dashed p-10 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}
          >
            <UserPlus className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-white/40 text-xs font-mono">
              {searchQuery || filterStatus !== "all"
                ? "Tidak ada pelanggan yang cocok dengan filter."
                : "Belum ada pelanggan terdaftar."}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <button
                onClick={openCreateModal}
                className="mt-3 text-emerald-400 text-xs font-semibold hover:underline"
              >
                + Tambahkan pelanggan pertama
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-2">
            {filteredUsers.map((u, idx) => {
              const sc = statusConfig[u.status];
              return (
                <motion.div
                  key={u.email}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="group rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Left: avatar + info */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className={`w-10 h-10 rounded-full ${sc.bg} ${sc.color} border ${sc.border} flex items-center justify-center text-sm font-bold shrink-0`}
                    >
                      {u.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">{u.name}</p>
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ${sc.bg} ${sc.color} border ${sc.border}`}
                        >
                          {sc.icon}
                          {sc.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 font-mono truncate mt-0.5">
                        {u.email}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        {u.company && (
                          <p className="text-[9px] text-white/30 font-mono">{u.company}</p>
                        )}
                        {u.phone && (
                          <p className="text-[9px] text-white/30 font-mono">{u.phone}</p>
                        )}
                        <p className="text-[9px] text-white/25 font-mono">
                          {formatDate(u.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {/* Status toggle */}
                    {u.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(u.email, "rejected")}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-semibold transition"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleStatusChange(u.email, "approved")}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold transition"
                        >
                          Setujui
                        </button>
                      </>
                    ) : u.status === "approved" ? (
                      <button
                        onClick={() => handleStatusChange(u.email, "rejected")}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/50 hover:text-red-400 text-[10px] font-semibold transition border border-white/5 hover:border-red-500/20"
                      >
                        Tangguhkan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(u.email, "approved")}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 text-white/50 hover:text-emerald-400 text-[10px] font-semibold transition border border-white/5 hover:border-emerald-500/20"
                      >
                        Setujui
                      </button>
                    )}

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(u)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition border border-transparent hover:border-blue-500/20"
                      title="Edit pelanggan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteTarget(u.email)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 transition border border-transparent hover:border-red-500/20"
                      title="Hapus pelanggan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/*  Create / Edit Modal                                              */}
      {/* ================================================================ */}
      <AnimatePresence>
        {modalMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    {modalMode === "create" ? "Tambah Pelanggan Baru" : "Edit Pelanggan"}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body */}
              <div className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
                    Nama Lengkap <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-white/20 focus:outline-none transition font-mono ${
                      formErrors.name ? "border-red-500/40 focus:border-red-500/60" : "border-white/10 focus:border-white/20"
                    }`}
                    placeholder="Masukkan nama pelanggan"
                  />
                  {formErrors.name && (
                    <p className="text-[10px] text-red-400 mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-white/20 focus:outline-none transition font-mono ${
                      formErrors.email ? "border-red-500/40 focus:border-red-500/60" : "border-white/10 focus:border-white/20"
                    }`}
                    placeholder="email@contoh.com"
                  />
                  {formErrors.email && (
                    <p className="text-[10px] text-red-400 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Phone + Company row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
                      Telepon
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition font-mono"
                      placeholder="08xx"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
                      Perusahaan
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition font-mono"
                      placeholder="PT ..."
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
                    Password {modalMode === "create" ? <span className="text-red-400">*</span> : <span className="text-white/20">(kosongkan jika tidak diubah)</span>}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-white/20 focus:outline-none transition font-mono ${
                      formErrors.password ? "border-red-500/40 focus:border-red-500/60" : "border-white/10 focus:border-white/20"
                    }`}
                    placeholder="••••••••"
                  />
                  {formErrors.password && (
                    <p className="text-[10px] text-red-400 mt-1">{formErrors.password}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
                    Status Akun
                  </label>
                  <div className="flex gap-2">
                    {(["approved", "pending", "rejected"] as const).map((s) => {
                      const sc = statusConfig[s];
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, status: s })}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-[10px] font-bold transition ${
                            form.status === s
                              ? `${sc.bg} ${sc.color} ${sc.border}`
                              : "bg-white/[0.02] border-white/5 text-white/30 hover:border-white/10"
                          }`}
                        >
                          {sc.icon}
                          {sc.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-white/5">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-semibold transition border border-white/5"
                >
                  Batal
                </button>
                <button
                  onClick={modalMode === "create" ? handleCreate : handleUpdate}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold transition shadow-lg shadow-emerald-500/10"
                >
                  {modalMode === "create" ? "Tambah Pelanggan" : "Simpan Perubahan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/*  Delete Confirmation Modal                                        */}
      {/* ================================================================ */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            onClick={() => setDeleteTarget(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl border border-red-500/20 p-6 shadow-2xl text-center"
              style={{ background: "linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)" }}
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Hapus Pelanggan?</h3>
              <p className="text-[11px] text-white/40 mb-5 font-mono">
                Data pelanggan{" "}
                <span className="text-white/70 font-semibold">
                  {users.find((u) => u.email === deleteTarget)?.name}
                </span>{" "}
                akan dihapus permanen dan tidak bisa dikembalikan.
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-semibold transition border border-white/5"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition border border-red-500/20"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
