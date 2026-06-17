"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Shield } from "lucide-react";

const commitments = [
  {
    icon: Leaf,
    title: "Produksi Ramah Lingkungan",
    desc: "Resiprene 35 larut dalam pelarut odorless (aliphatic hydrocarbons), menghilangkan kebutuhan aromatic hydrocarbons yang berbahaya bagi atmosfer. Mematuhi regulasi emisi hidrokarbon yang semakin ketat.",
  },
  {
    icon: Recycle,
    title: "Sumber Daya Terbarukan",
    desc: "Berbasis karet alam — sumber daya terbarukan dari perkebunan berkelanjutan PTPN III di Sumatera Utara",
  },
  {
    icon: Shield,
    title: "Standar Kesehatan & Keselamatan",
    desc: "Proses produksi di bawah pengawasan ahli bereputasi tinggi dengan standar K3 internasional. Non-hazardous coating yang aman bagi pekerja dan pengguna akhir.",
  },
];

const particles = [
  { size: 3, top: "15%", left: "20%", delay: 0, duration: 6 },
  { size: 5, top: "40%", left: "60%", delay: 1.5, duration: 8 },
  { size: 2, top: "70%", left: "35%", delay: 3, duration: 5 },
  { size: 8, top: "55%", left: "80%", delay: 0.5, duration: 7 },
  { size: 4, top: "80%", left: "50%", delay: 2, duration: 9 },
  { size: 6, top: "30%", left: "75%", delay: 4, duration: 6.5 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="relative min-h-screen bg-[#0a1628] px-6 sm:px-8 lg:px-12 py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/10"
        style={{
          backgroundSize: "200% 200%",
          animation: "gradientShift 8s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="uppercase tracking-widest text-emerald-400 text-sm font-mono mb-3">
            Keberlanjutan
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0ec] mb-4">
            Komitmen Terhadap Lingkungan
          </h2>
          <p className="text-[#c0c0c0]">
            Produksi yang ramah lingkungan dan berkelanjutan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            {commitments.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white/5 border border-emerald-500/10 rounded-sm p-6"
                >
                  <Icon className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-[#f0f0ec] font-medium mt-3">{item.title}</h3>
                  <p className="text-[#c0c0c0] text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-gradient-to-br from-emerald-900/30 to-teal-900/20 rounded-sm h-full min-h-[400px] flex flex-col items-center justify-center overflow-hidden"
          >
            <Leaf className="w-24 h-24 text-emerald-400/20" />
            <span className="text-[#c0c0c0]/50 text-sm mt-4">
              Foto perkebunan karet berkelanjutan
            </span>
            {particles.map((p, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-emerald-400/40"
                style={{
                  width: p.size,
                  height: p.size,
                  top: p.top,
                  left: p.left,
                  animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
