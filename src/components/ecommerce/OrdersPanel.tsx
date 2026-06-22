"use client";

import React from "react";
import Link from "next/link";

export default function OrdersPanel() {
  return (
    <div className="glass-panel rounded-xl border border-border p-10 text-center flex flex-col items-center gap-3">
      <p className="text-muted font-mono text-sm">Belum ada riwayat pesanan.</p>
      <Link
        href="/ecommerce/katalog"
        className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded transition hover:bg-accent-hover"
      >
        Mulai Belanja
      </Link>
    </div>
  );
}
