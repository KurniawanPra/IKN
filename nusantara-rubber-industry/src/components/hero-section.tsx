"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-[#0a1628] to-[#142040] rounded-2xl opacity-20" />
  ),
});

const headlineWords1 = ["PT.", "Industri", "Karet", "Nusantara"];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const stats = [
  { value: "60+", label: "Tahun Pengalaman" },
  { value: "20+", label: "Negara Ekspor" },
  { value: "11.2%", label: "Revenue Growth" },
];

export default function HeroSection() {
  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar">
      <BackgroundBlobs sectionId="hero" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 px-6 pt-24 pb-12 min-h-full h-auto justify-start lg:justify-center lg:pt-20">
        {/* Text Area */}
        <div className="flex flex-col gap-6 lg:w-1/2 justify-center">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block w-fit rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c0c0c0]"
          >
            Since 1965 — Market Leader
          </motion.span>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold leading-[1.15] tracking-tight text-[#f0f0ec] md:text-5xl lg:text-6xl"
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
          </motion.h1>

          <motion.p
            variants={fadeUp as unknown as Variants}
            custom={0.6}
            initial="hidden"
            animate="visible"
            className="text-xs md:text-sm font-semibold tracking-wider text-rubber-red-light font-mono uppercase -mt-2"
          >
            Well-Established Rubber-Based Downstream Company
          </motion.p>

          <motion.p
            variants={fadeUp as unknown as Variants}
            custom={0.8}
            initial="hidden"
            animate="visible"
            className="max-w-xl text-base md:text-lg leading-relaxed text-[#c0c0c0] font-sans"
          >
            Salah satu market leader dalam hilirisasi karet alam di Indonesia. 
            Menghasilkan produk resin karet dan benang karet berkualitas premium 
            yang dipercaya di pasar domestik maupun mancanegara.
          </motion.p>

          <motion.div
            variants={fadeUp as unknown as Variants}
            custom={1.0}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a
              href="#produk"
              className="btn-primary"
            >
              Katalog Produk
            </a>
            <a
              href="#about"
              className="btn-outline"
            >
              Tentang Kami
            </a>
          </motion.div>

          {/* Stats glass card */}
          <motion.div
            variants={fadeUp as unknown as Variants}
            custom={1.2}
            initial="hidden"
            animate="visible"
            className="flex gap-8 border-t border-white/10 pt-6 mt-2"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-[#f0f0ec] font-mono">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs text-[#c0c0c0]/70 uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Scene Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="hidden lg:block w-full h-[250px] sm:h-[350px] lg:h-[450px] lg:w-1/2 relative"
        >
          <div className="h-full w-full relative z-10">
            <HeroScene />
          </div>
          {/* Subtle glow behind canvas */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rubber-red/10 to-transparent blur-3xl -z-10 rounded-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 hidden md:block"
      >
        <a href="#about" className="flex flex-col items-center gap-1">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#c0c0c0]/50 font-mono">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-[#c0c0c0]/50" />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
}
