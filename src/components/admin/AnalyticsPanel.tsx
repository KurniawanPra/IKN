"use client";

import React from "react";
import { BarChart2 } from "lucide-react";

export default function AnalyticsPanel() {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-base font-bold text-white">Analitik</h2>
      <div className="rounded-xl border p-10 text-center" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
        <BarChart2 size={40} className="mx-auto mb-3 text-white/20" />
        <p className="text-white/40 text-sm font-mono">Fitur analitik akan segera hadir.</p>
      </div>
    </div>
  );
}
