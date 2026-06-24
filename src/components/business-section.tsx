"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { TreePine, Droplets, FlaskConical, Thermometer, Package, Ship } from "lucide-react";

const steps = [
  {
    icon: TreePine,
    step: "01",
    title: "Perkebunan Karet",
    desc: "Lateks premium dari perkebunan nasional berkelanjutan.",
  },
  {
    icon: Droplets,
    step: "02",
    title: "Penyadapan Lateks",
    desc: "Pengumpulan lateks segar dengan teknik penyadapan presisi.",
  },
  {
    icon: FlaskConical,
    step: "03",
    title: "Proses Siklisasi",
    desc: "Modifikasi kimia getah karet menjadi resin bernilai tinggi.",
  },
  {
    icon: Thermometer,
    step: "04",
    title: "Quality Control",
    desc: "Pengujian laboratorium ketat berstandar ekspor.",
  },
  {
    icon: Package,
    step: "05",
    title: "Pengemasan",
    desc: "Pengemasan kedap udara standar kargo internasional.",
  },
  {
    icon: Ship,
    step: "06",
    title: "Distribusi Global",
    desc: "Pengiriman kontainer ke manufaktur Eropa, Asia, & Oceania.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function BusinessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full flex items-start lg:items-center font-sans">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 lg:pt-28 lg:pb-16 w-full flex flex-col justify-start lg:justify-center min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Content & 3D Scene */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                Lini Bisnis
              </p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Proses Hilirisasi Karet Alam Modern
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Dari getah mentah hingga menjadi resin dan produk turunan industri 
                bernilai tinggi dengan pengawasan mutu terintegrasi.
              </p>
            </div>

            {/* 2D Production Image */}
            <div className="hidden lg:block h-[220px] md:h-[280px] w-full relative rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-xl flex items-center justify-center group">
              <img
                src="/images/produksi-karet.webp"
                alt="Business - Produksi Karet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Panel: Grid of Steps */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    variants={cardVariants as unknown as Variants}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-panel glass-panel-hover p-4 rounded-md flex flex-col gap-2 relative overflow-hidden"
                  >
                    {/* Glowing index badge */}
                    <span className="absolute top-2 right-3 font-mono text-[10px] text-foreground/10 font-bold">
                      {step.step}
                    </span>

                    <Icon className="w-8 h-8 text-rubber-red-light shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-[10px] text-muted leading-relaxed mt-1">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
