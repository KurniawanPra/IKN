"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-[#0a1628] to-[#1a2a4a] rounded-2xl" />
  ),
});

const headlineWords1 = ["PT.", "Industri", "Karet", "Nusantara"];
const headlineWords2 = ["—", "Well-Established", "Rubber-Based", "Downstream", "Company"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const stats = [
  { value: "60+", label: "Tahun" },
  { value: "20+", label: "Negara Ekspor" },
  { value: "11.2%", label: "Revenue Growth" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #060f1f 0%, #0a1628 50%, #0e1d38 100%)",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-8 px-6 py-20 lg:flex-row lg:gap-12 lg:py-0">
        <div className="flex flex-col gap-8 lg:w-1/2">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block w-fit rounded-full border border-[#c0c0c0]/20 bg-[#c0c0c0]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c0c0c0]"
          >
            Since 1965 — Rubber-Based Downstream Company
          </motion.span>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold leading-[1.1] tracking-tight text-[#f0f0ec] md:text-5xl lg:text-6xl"
          >
            <span className="block">
              {headlineWords1.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="mt-2 block text-3xl font-bold tracking-tight text-[#c0c0c0] md:text-4xl lg:text-5xl">
              {headlineWords2.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1.0}
            initial="hidden"
            animate="visible"
            className="max-w-xl text-lg leading-relaxed text-[#c0c0c0]"
          >
            Salah satu market leader di industri karet Indonesia. Produk
            berkualitas tinggi dengan reputasi global, siap melayani kebutuhan
            industri Anda.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={1.3}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a
              href="#produk"
              className="inline-flex items-center justify-center rounded-lg bg-[#8b1a1a] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a52020] hover:shadow-lg hover:shadow-[#8b1a1a]/25"
            >
              Lihat Produk Kami
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-lg border border-[#c0c0c0]/30 px-6 py-3 text-sm font-semibold text-[#c0c0c0] transition-all duration-300 hover:border-[#c0c0c0]/60 hover:bg-[#c0c0c0]/5"
            >
              Tentang Perusahaan
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1.6}
            initial="hidden"
            animate="visible"
            className="flex gap-8 border-t border-[#c0c0c0]/10 pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold text-[#f0f0ec]">
                  {stat.value}
                </span>
                <span className="text-xs text-[#c0c0c0]/70">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="aspect-square w-full max-w-lg lg:w-1/2 lg:max-w-none"
        >
          <div className="h-full w-full">
            <HeroScene />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#c0c0c0]/50">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-[#c0c0c0]/50" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
