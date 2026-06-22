"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface UserAccount {
  email: string;
  name: string;
  password?: string;
  status: string;
  createdAt: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

const MOCK_CUSTOMERS = [
  { id: "C-001", name: "PT Maju Bersama", email: "buyer@maju.co.id", orders: 3, total: 67500000 },
  { id: "C-002", name: "CV Karya Mandiri", email: "cv.karya@gmail.com", orders: 1, total: 16500000 },
  { id: "C-003", name: "PT Karet Makmur", email: "karet.makmur@corp.id", orders: 5, total: 175000000 },
];

export default function CustomersPanel() {
  const [users, setUsers] = useState<UserAccount[]>([]);

  const loadUsersFromStorage = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ikn_users");
      if (stored) {
        try {
          setUsers(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse users", e);
        }
      }
    }
  };

  useEffect(() => {
    loadUsersFromStorage();
  }, []);

  const handleApproveUser = (email: string) => {
    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, status: "approved" };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem("ikn_users", JSON.stringify(updatedUsers));
  };

  const handleRejectUser = (email: string) => {
    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, status: "rejected" };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem("ikn_users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="space-y-6 text-white">
      {/* Bagian 1: Persetujuan Pendaftaran Akun */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Persetujuan Pendaftaran Akun</span>
          <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
            {users.filter((u) => u.status === "pending").length}
          </span>
        </h2>
        
        {users.filter((u) => u.status === "pending").length === 0 ? (
          <div className="rounded-xl border p-6 text-center border-dashed border-white/10" style={{ background: "rgba(255,255,255,0.01)" }}>
            <p className="text-white/40 text-xs font-mono">Tidak ada pengajuan akun baru yang sedang menunggu.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {users.filter((u) => u.status === "pending").map((u) => (
              <motion.div
                key={u.email}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-sm font-bold">
                    {u.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{u.name}</p>
                    <p className="text-[10px] text-white/40 font-mono">{u.email}</p>
                    <p className="text-[9px] text-white/30 font-mono mt-0.5">Mendaftar: {u.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleRejectUser(u.email)}
                    className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold transition"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() => handleApproveUser(u.email)}
                    className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition"
                  >
                    Setujui
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bagian 2: Daftar Pelanggan Terdaftar */}
      <div className="space-y-3 pt-6 border-t border-white/5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Daftar Pelanggan Terdaftar</span>
          <span className="bg-white/10 text-white/60 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
            {users.filter((u) => u.status !== "pending").length + MOCK_CUSTOMERS.length}
          </span>
        </h2>

        <div className="grid gap-3">
          {/* Render users from localStorage */}
          {users.filter((u) => u.status !== "pending").map((u) => (
            <motion.div
              key={u.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-4 flex items-center justify-between"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  u.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {u.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-white leading-none">{u.name}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold border leading-none ${
                      u.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {u.status === "approved" ? "Disetujui" : "Ditolak"}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 font-mono mt-1">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {u.status === "approved" ? (
                  <button
                    onClick={() => handleRejectUser(u.email)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 text-[10px] transition border border-white/5 hover:border-red-500/20 font-semibold"
                  >
                    Tangguhkan
                  </button>
                ) : (
                  <button
                    onClick={() => handleApproveUser(u.email)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-emerald-500/10 text-white/60 hover:text-emerald-400 text-[10px] transition border border-white/5 hover:border-emerald-500/20 font-semibold"
                  >
                    Setujui Akun
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {/* Render static mock B2B customers */}
          {MOCK_CUSTOMERS.map((c) => (
            <div
              key={c.email}
              className="rounded-xl border p-4 flex items-center justify-between opacity-80"
              style={{ background: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/55 text-sm font-bold">
                  {c.name.charAt(0)}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white/70">{c.name}</p>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-white/5 border border-white/10 text-white/50">
                      B2B Terintegrasi
                    </span>
                  </div>
                  <p className="text-[10px] text-white/30 font-mono mt-1">{c.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono text-white/60">{formatPrice(c.total)}</p>
                <p className="text-[10px] text-white/30">{c.orders} pesanan</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
