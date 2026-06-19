"use client";

import React from "react";
import { Compass, Target, Shield } from "lucide-react";
import { motion } from "framer-motion";

const missionItems = [
  "Menghasilkan produk hilir karet yang berkualitas sesuai standar dan kebutuhan pelanggan.",
  "Menciptakan lingkungan kerja yang terukur dan berorientasi pada tata kelola perusahaan yang baik.",
  "Mengembangkan SDM berlandaskan nilai AKHLAK.",
  "Membangun kemitraan strategis yang saling menguntungkan dengan stakeholders.",
  "Memanfaatkan dan mengembangkan teknologi dalam proses bisnis."
];

export default function VisionMissionSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24 w-full flex flex-col justify-center font-sans">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-3 text-rubber-red-light dark:text-rubber-red-light/90">
          <Shield className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-extrabold">Integrity &amp; Standards</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight leading-none">
          Visi dan Misi Perusahaan
        </h2>
        <div className="w-12 h-1 bg-rubber-red-light mx-auto mt-4 rounded-full opacity-60" />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Side: Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="lg:col-span-5 relative group p-8 sm:p-10 rounded-[2rem] border border-border/40 backdrop-blur-xl bg-background/25 hover:bg-background/40 hover:border-rubber-red-light/35 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-rubber-red-light/5 hover:-translate-y-1.5 isolate"
        >
          {/* Subtle inner card radial glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rubber-red-light/10 to-transparent blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-750 -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-rubber-red-light/5 blur-xl rounded-full pointer-events-none -z-10" />
          
          <div className="flex flex-col gap-6">
            {/* Pulsing Icon Wrapper */}
            <div className="relative w-14 h-14 rounded-2xl bg-rubber-red-light/10 flex items-center justify-center border border-rubber-red-light/20 shadow-lg shadow-rubber-red-light/5 group-hover:border-rubber-red-light/40 transition-colors duration-300">
              <Compass className="w-7 h-7 text-rubber-red-light transition-transform duration-[1200ms] ease-out group-hover:rotate-[360deg]" />
              <span className="absolute -inset-0.5 rounded-2xl bg-rubber-red-light/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-foreground uppercase tracking-widest font-mono">
              Visi
            </h3>
            
            {/* Vision statement blockquote styling */}
            <div className="relative mt-2">
              <span className="absolute -left-4 -top-8 text-7xl font-serif text-rubber-red-light/10 select-none pointer-events-none">“</span>
              <p className="text-base sm:text-lg md:text-xl text-muted leading-relaxed font-sans font-medium italic pl-2 group-hover:text-foreground transition-colors duration-300">
                Menjadi perusahaan industri hilir karet terkemuka yang mampu memenuhi kebutuhan pelanggan melalui tata kelola perusahaan yang baik dan memiliki daya saing global.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/20 text-left">
            <span className="text-[10px] font-mono text-muted-dim uppercase tracking-wider">
              PT. Industri Karet Nusantara
            </span>
          </div>
        </motion.div>

        {/* Right Side: Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="lg:col-span-7 relative group p-8 sm:p-10 rounded-[2rem] border border-border/40 backdrop-blur-xl bg-background/25 hover:bg-background/40 hover:border-emerald-500/35 transition-all duration-500 flex flex-col gap-6 overflow-hidden shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1.5 isolate"
        >
          {/* Subtle inner card radial glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-750 -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-xl rounded-full pointer-events-none -z-10" />

          {/* Pulsing Icon Wrapper */}
          <div className="relative w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/5 group-hover:border-emerald-500/40 transition-colors duration-300">
            <Target className="w-7 h-7 text-emerald-500 transition-transform duration-500 group-hover:scale-110" />
            <span className="absolute -inset-0.5 rounded-2xl bg-emerald-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>

          <h3 className="text-2xl font-extrabold text-foreground uppercase tracking-widest font-mono">
            Misi
          </h3>

          {/* Numbered Mission Items */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5 mt-2"
          >
            {missionItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="flex items-start gap-4 group/item"
              >
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-emerald-500 group-hover/item:text-white group-hover/item:border-emerald-500 group-hover/item:shadow-lg group-hover/item:shadow-emerald-500/25 transition-all duration-300">
                  0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-muted leading-relaxed group-hover/item:text-foreground transition-colors duration-200">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
