"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Calendar, Newspaper, Image as ImageIcon, X } from "lucide-react";
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
    image: "/images/exhibition.png",
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store",
    desc: "Peresmian IKN Store sebagai portal penjualan langsung produk hilir karet alam domestik.",
    date: "Feb 2026",
    image: "/images/ikn_store.png",
  },
  {
    category: "Berita",
    title: "Ekspor Resiprene 35",
    desc: "Nusantara Rubber Industry sukses menembus pasar Uni Eropa dengan ekspor resin ke Jerman.",
    date: "Agt 2024",
    image: "/images/shipping.png",
  },
  {
    category: "Event",
    title: "Holding Perkebunan Nusantara",
    desc: "Sinergi hilirisasi karet terintegrasi bersama Holding PTPN III (Persero).",
    date: "Jan 2025",
    image: "/images/plantation.png",
  },
  {
    category: "Galeri",
    title: "Fasilitas R&D Modern",
    desc: "Fasilitas laboratorium formulasi dan pengujian resin karet berstandar mutu internasional.",
    date: "Mei 2024",
    image: "/images/rnd_lab.png",
  },
  {
    category: "Galeri",
    title: "Proses Siklisasi Reaktor",
    desc: "Dokumentasi reaktor siklisasi karet alam dengan pemanasan dan katalis terkontrol.",
    date: "Jul 2024",
    image: "/images/reactor.png",
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
  const [selectedItem, setSelectedItem] = useState<(typeof mediaItems)[0] | null>(null);

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
                      className="glass-panel glass-panel-hover p-0 rounded-md flex flex-col overflow-hidden relative cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      {/* Image Header */}
                      <div className="h-40 w-full overflow-hidden relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 bg-[#060e1a]/85 backdrop-blur-sm text-rubber-red-light text-[9px] font-mono px-2.5 py-1 rounded-sm uppercase border border-white/5 tracking-wider">
                          {item.category}
                        </span>
                        <div className="absolute top-2 right-2 p-1.5 rounded-sm bg-[#060e1a]/85 backdrop-blur-sm border border-white/5">
                          <Icon className="w-3.5 h-3.5 text-steel/70" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
                        <div>
                          <h3 className="text-sm font-bold text-[#f0f0ec] line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#c0c0c0] mt-1.5 leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                        <span className="block text-[10px] text-steel/60 font-mono">
                          {item.date}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 bg-[#060e1a]/80 backdrop-blur-md"
            />

            {/* Modal Content Card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="w-full max-w-2xl bg-[#0a1628]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] lg:max-h-[80vh] font-sans"
              >
                {/* Modal Image Header */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition border border-white/10"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>

                  {/* Category badge */}
                  <span className="absolute bottom-4 left-6 bg-rubber-red text-white text-xs font-mono px-3 py-1 rounded-sm uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                </div>

                {/* Modal Body Info */}
                <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-steel/60 font-mono block">
                      Tanggal Publikasi: {selectedItem.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f0f0ec] leading-snug">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="h-px bg-white/5 w-full" />

                  {/* Rich details text for the company profile */}
                  <p className="text-sm text-[#c0c0c0] leading-relaxed whitespace-pre-line font-sans">
                    {selectedItem.desc}
                    
                    {"\n\n"}
                    {selectedItem.category === "Galeri" ? (
                      "Dokumentasi di atas menggambarkan dedikasi PT. Industri Karet Nusantara dalam memelihara serta mengembangkan infrastruktur manufaktur berstandar tinggi. Melalui integrasi teknologi ramah lingkungan dan proses kontrol kualitas laboratorium yang disiplin, kami terus menjaga kepercayaan mitra industri global di pasar ekspor."
                    ) : selectedItem.category === "Berita" ? (
                      "Langkah strategis ini merupakan bagian dari komitmen berkelanjutan kami dalam mendukung agenda hilirisasi perkebunan nasional. Melalui inovasi produk hilir berkualitas tinggi, PT. Industri Karet Nusantara terus mendorong pertumbuhan ekonomi lokal serta memperluas kontribusi ekspor non-migas Indonesia di kancah internasional."
                    ) : (
                      "Kehadiran dan keikutsertaan aktif kami dalam kegiatan berskala nasional maupun internasional ini menegaskan posisi strategis PT. Industri Karet Nusantara sebagai pemimpin pasar. Kegiatan ini juga menjadi platform kolaborasi penting untuk mempertemukan riset hilir karet dengan kebutuhan industri manufaktur global."
                    )}
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-black/20 border-t border-white/5 flex justify-end shrink-0">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="btn-outline px-6 py-2 rounded text-xs tracking-wider"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
