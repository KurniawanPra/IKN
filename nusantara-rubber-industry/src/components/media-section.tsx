"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Calendar, Newspaper, Image as ImageIcon } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const MediaScene = dynamic(() => import("./media-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-[#0a1628] to-[#142040] rounded-2xl opacity-20" />
  ),
});

const filters = ["Semua", "Berita", "Event", "Galeri"] as const;

const mediaItems = [
  {
    category: "Event",
    title: "Chemical Indonesia 2024",
    desc: "Keikutsertaan Nusantara Rubber Industry di pameran B2B industri kimia terbesar di JIExpo.",
    date: "Nov 2024",
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store",
    desc: "Peresmian IKN Store sebagai portal penjualan langsung produk hilir karet alam domestik.",
    date: "Feb 2026",
  },
  {
    category: "Berita",
    title: "Ekspor Resiprene 35",
    desc: "Nusantara Rubber Industry sukses menembus pasar Uni Eropa dengan ekspor resin ke Jerman.",
    date: "Agt 2024",
  },
  {
    category: "Event",
    title: "Holding Perkebunan Nusantara",
    desc: "Sinergi hilirisasi karet terintegrasi bersama Holding PTPN III (Persero).",
    date: "Jan 2025",
  },
  {
    category: "Galeri",
    title: "Fasilitas R&D Modern",
    desc: "Fasilitas laboratorium formulasi dan pengujian resin karet berstandar mutu internasional.",
    date: "Mei 2024",
  },
  {
    category: "Galeri",
    title: "Proses Siklisasi Reaktor",
    desc: "Dokumentasi reaktor siklisasi karet alam dengan pemanasan dan katalis terkontrol.",
    date: "Jul 2024",
  },
];

const categoryIcons: Record<string, typeof Calendar> = {
  Event: Calendar,
  Berita: Newspaper,
  Galeri: ImageIcon,
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function MediaSection() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const filtered =
    activeFilter === "Semua"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeFilter);

  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Content, Filters, 3D Canvas */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                Media & Publikasi
              </p>
              <h2 className="text-3xl font-bold text-[#f0f0ec] leading-tight">
                Berita & Kegiatan Terbaru
              </h2>
              <p className="text-sm text-[#c0c0c0] mt-2 leading-relaxed">
                Ikuti perkembangan riset, ekspor, pameran B2B, dan ekspansi pasar 
                Nusantara Rubber Industry secara berkala.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-rubber-red text-white"
                      : "bg-white/5 text-[#c0c0c0] hover:text-[#f0f0ec] border border-white/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* 3D Scene (No cut-off boxes or labels) */}
            <div className="hidden lg:block h-[180px] md:h-[220px] w-full relative">
              <MediaScene />
            </div>
          </div>

          {/* Right Panel: Scrollable Grid of News Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto lg:max-h-[460px] overflow-visible lg:overflow-y-auto no-scrollbar">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => {
                  const Icon = categoryIcons[item.category];

                  return (
                    <motion.div
                      key={item.title}
                      variants={cardVariants as unknown as Variants}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      exit={{ opacity: 0, scale: 0.95 }}
                      viewport={{ once: true }}
                      layout
                      className="glass-panel glass-panel-hover p-5 rounded-md flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-rubber-red-light">
                            {item.category}
                          </span>
                          <Icon className="w-4 h-4 text-steel/40" />
                        </div>
                        <h3 className="text-sm font-bold text-[#f0f0ec] mt-2 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#c0c0c0] mt-1.5 leading-relaxed line-clamp-3">
                          {item.desc}
                        </p>
                      </div>
                      <span className="block text-[10px] text-steel/60 font-mono">
                        {item.date}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
