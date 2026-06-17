"use client";

import { motion } from "framer-motion";
import {
  TreePine,
  Droplets,
  FlaskConical,
  Thermometer,
  Package,
  Ship,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: TreePine,
    step: "01",
    title: "Perkebunan Karet",
    desc: "Karet alam berkualitas dari perkebunan PTPN III di Sumatera Utara",
  },
  {
    icon: Droplets,
    step: "02",
    title: "Penyadapan Lateks",
    desc: "Pengumpulan lateks segar dengan teknik penyadapan presisi",
  },
  {
    icon: FlaskConical,
    step: "03",
    title: "Proses Siklisasi",
    desc: "Transformasi karet alam menjadi resin melalui proses cyclization dengan teknologi modern",
  },
  {
    icon: Thermometer,
    step: "04",
    title: "Quality Control",
    desc: "Pengujian ketat di laboratorium untuk memastikan standar internasional",
  },
  {
    icon: Package,
    step: "05",
    title: "Pengemasan",
    desc: "Pengemasan produk dengan standar ekspor untuk menjaga kualitas",
  },
  {
    icon: Ship,
    step: "06",
    title: "Distribusi Global",
    desc: "Pengiriman ke pasar Oceania, Eropa Barat, dan Eropa Timur",
  },
];

export default function BusinessSection() {
  return (
    <section
      id="business"
      className="min-h-screen bg-[#0a1628] px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="uppercase tracking-widest text-[#8b1a1a] text-sm font-mono mb-3">
            Lini Bisnis
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0ec] mb-4">
            Proses Hilirisasi Karet Alam
          </h2>
          <p className="text-[#c0c0c0]">
            Dari bahan mentah hingga produk industri berkualitas tinggi
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div className="flex gap-0 snap-x snap-mandatory items-stretch">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex items-center flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4, borderColor: "rgba(139, 26, 26, 0.2)" }}
                    className="min-w-[280px] md:min-w-[320px] snap-center bg-[#142040] border border-white/5 rounded-sm p-6 transition-colors"
                  >
                    <span className="font-mono text-[#8b1a1a] text-sm">
                      {step.step}
                    </span>
                    <Icon className="w-10 h-10 text-[#8b1a1a] mb-4 mt-3" />
                    <h3 className="text-lg font-semibold text-[#f0f0ec] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#c0c0c0] leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      className="flex-shrink-0 px-3"
                    >
                      <ArrowRight className="w-5 h-5 text-[#c0c0c0]" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
