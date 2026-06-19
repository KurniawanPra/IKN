"use client";

import React from "react";
import { Compass, Target, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionMissionSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 w-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-2 text-rubber-red-light">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">Integrity & Standard</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl tracking-tight">Visi dan Misi Perusahaan</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 rounded-2xl flex flex-col gap-4 border border-border/50 bg-elevated/30 hover:border-border transition-colors duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-rubber-red-light/10 flex items-center justify-center mb-2 border border-rubber-red-light/20">
            <Compass className="w-6 h-6 text-rubber-red-light" />
          </div>
          <h3 className="text-xl font-bold text-foreground uppercase tracking-widest">Visi</h3>
          <p className="text-sm lg:text-base text-muted leading-relaxed font-sans">
            Menjadi perusahaan industri hilir karet terkemuka yang mampu memenuhi kebutuhan pelanggan melalui tata kelola perusahaan yang baik dan memiliki daya saing global.
          </p>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-2xl flex flex-col gap-4 border border-border/50 bg-elevated/30 hover:border-border transition-colors duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-2 border border-emerald-500/20">
            <Target className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-foreground uppercase tracking-widest">Misi</h3>
          <ul className="text-sm lg:text-base text-muted leading-relaxed space-y-3 list-disc pl-4 marker:text-emerald-500/70">
            <li>Menghasilkan produk hilir karet yang berkualitas sesuai standar dan kebutuhan pelanggan.</li>
            <li>Menciptakan lingkungan kerja yang terukur dan berorientasi pada tata kelola perusahaan yang baik.</li>
            <li>Mengembangkan SDM berlandaskan nilai AKHLAK.</li>
            <li>Membangun kemitraan strategis yang saling menguntungkan dengan stakeholders.</li>
            <li>Memanfaatkan dan mengembangkan teknologi dalam proses bisnis.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
