"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import {
  TreePine,
  Droplets,
  FlaskConical,
  Thermometer,
  Package,
  Ship,
} from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const BusinessScene = dynamic(() => import("./business-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-emerald-950/20 to-teal-900/10 rounded-2xl opacity-20" />
  ),
});

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
  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="business" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
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

            {/* 3D Scene Canvas (No cut-off boxes or labels) */}
            <div className="hidden lg:block h-[220px] md:h-[280px] w-full relative">
              <BusinessScene />
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
