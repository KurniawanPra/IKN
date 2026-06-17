"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Newspaper, Image } from "lucide-react";

const filters = ["Semua", "Berita", "Event", "Galeri"] as const;

const mediaItems = [
  {
    category: "Event",
    title: "Chemical Indonesia 2024",
    desc: "Partisipasi PT IKN di pameran B2B Chemical Indonesia 2024, JIExpo Kemayoran, Jakarta",
    date: "Nov 2024",
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store",
    desc: "Gerai IKN Store diresmikan oleh Plt. Direktur V.T. Moses Situmorang dan SEVP Operation Amalia Nasution",
    date: "Feb 2026",
  },
  {
    category: "Berita",
    title: "Ekspor Resiprene 35 ke Jerman",
    desc: "PT IKN berhasil menembus pasar Eropa dengan ekspor produk Resiprene 35 ke Jerman",
    date: "2024",
  },
  {
    category: "Event",
    title: "Holding Perkebunan Nusantara",
    desc: "Penguatan ekosistem hilirisasi di bawah Holding Perkebunan Nusantara PTPN III (Persero)",
    date: "2025",
  },
  {
    category: "Galeri",
    title: "Fasilitas Produksi Modern",
    desc: "Pabrik dengan teknologi modern dan ramah lingkungan di Medan, Sumatera Utara",
    date: "2024",
  },
  {
    category: "Galeri",
    title: "Laboratorium Quality Control",
    desc: "Pengujian produk sesuai standar internasional di laboratorium internal IKN",
    date: "2024",
  },
];

const categoryIcons: Record<string, typeof Calendar> = {
  Event: Calendar,
  Berita: Newspaper,
  Galeri: Image,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

export default function MediaSection() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const filtered =
    activeFilter === "Semua"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeFilter);

  return (
    <section id="media" className="min-h-screen bg-[#142040] px-6 sm:px-8 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="uppercase tracking-widest text-[#8b1a1a] text-sm font-mono mb-3">
            Media & Publikasi
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0ec]">
            Berita & Kegiatan Terbaru
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-mono rounded-sm transition-colors ${
                activeFilter === filter
                  ? "bg-[#8b1a1a] text-white"
                  : "bg-white/5 text-[#c0c0c0] hover:text-[#f0f0ec]"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const Icon = categoryIcons[item.category];
              const imageHeight =
                item.category === "Event" || item.category === "Galeri"
                  ? "h-48"
                  : "h-32";

              return (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className="break-inside-avoid mb-4 group rounded-sm border border-white/5 bg-[#0a1628]/80 overflow-hidden transition-colors hover:border-[#8b1a1a]/20"
                >
                  <div className="overflow-hidden">
                    <div
                      className={`${imageHeight} bg-gradient-to-br from-[#8b1a1a]/20 to-[#142040] flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="w-12 h-12 text-[#c0c0c0]/30" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-mono uppercase text-[#8b1a1a]">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#f0f0ec] mt-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#c0c0c0] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                    <span className="block text-xs text-[#c0c0c0]/60 mt-3 font-mono">
                      {item.date}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
