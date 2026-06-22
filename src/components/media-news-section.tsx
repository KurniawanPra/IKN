/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, X, Calendar, Search, ArrowRight, BookOpen } from "lucide-react";
import BackgroundBlobs from "./background-blobs";
import { gsap } from "gsap";

const newsItems = [
  {
    category: "Berita",
    title: "Ekspor Resiprene 35 ke Jerman",
    desc: "Nusantara Rubber Industry sukses menembus pasar eksklusif Uni Eropa dengan pengapalan perdana kontainer Resiprene 35 menuju Hamburg, Jerman. Produk kami mematuhi standar kepatuhan regulasi lingkungan hidup REACH bebas SVHC.",
    date: "Agt 2024",
    image: "/images/shipping.webp",
    featured: true,
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store Resmi Dibuka",
    desc: "Peresmian IKN Store sebagai portal penjualan langsung produk hilir karet alam domestik. Memudahkan pelanggan lokal untuk melakukan pembelian skala kecil hingga menengah secara cepat dan transparan.",
    date: "Feb 2026",
    image: "/images/ikn_store.webp",
    featured: false,
  },
  {
    category: "Event",
    title: "Chemical Indonesia 2024 JIExpo",
    desc: "Keikutsertaan Nusantara Rubber Industry di pameran B2B industri kimia terbesar di JIExpo. Kami memamerkan produk unggulan karet alam tersiklisasi Resiprene 35 untuk cat kapal.",
    date: "Nov 2024",
    image: "/images/exhibition.webp",
    featured: false,
  },
  {
    category: "Event",
    title: "Holding Perkebunan Nusantara",
    desc: "Sinergi hilirisasi karet terintegrasi bersama Holding PTPN III (Persero) untuk menyelaraskan rantai pasok lateks dari perkebunan nasional ke unit manufaktur hilir karet milik PT IKN.",
    date: "Jan 2025",
    image: "/images/plantation.webp",
    featured: false,
  },
];

export default function MediaNewsSection() {
  const [activeFilter, setActiveFilter] = useState<"Semua" | "Berita" | "Event">("Semua");
  const [selectedItem, setSelectedItem] = useState<(typeof newsItems)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    gsap.set([leftPanel, rightPanel], { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === leftPanel) {
              gsap.to(leftPanel, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
              observer.unobserve(leftPanel);
            } else if (entry.target === rightPanel) {
              gsap.to(rightPanel, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
              observer.unobserve(rightPanel);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftPanel) observer.observe(leftPanel);
    if (rightPanel) observer.observe(rightPanel);

    return () => observer.disconnect();
  }, []);

  // Filter items
  const filteredItems = newsItems.filter((item) => {
    const matchesFilter = activeFilter === "Semua" || item.category === activeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Featured Item & Secondary list based on filters
  const featuredItem = filteredItems.find(item => item.featured) || filteredItems[0];
  const listItems = filteredItems.filter(item => item !== featuredItem);

  return (
    <div ref={containerRef} className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-y-auto no-scrollbar font-sans bg-elevated/5">
      <BackgroundBlobs sectionId="media" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-20 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        
        {/* Header Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-border/40 pb-5 w-full">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-1.5 flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5" /> Publikasi & Rilis Pers
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              Berita & Kegiatan Terbaru
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Buttons */}
            <div className="flex bg-elevated/20 p-1 rounded-md border border-border">
              {(["Semua", "Berita", "Event"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-accent text-white font-semibold shadow"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berita..."
                className="pl-8 pr-4 py-1.5 text-xs rounded-sm theme-input w-48 focus:w-60 transition-all duration-300 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
            </div>
          </div>
        </div>

        {/* Custom Layout: Featured News + Secondary list */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Featured Post (Left, span 7) */}
            <div ref={leftPanelRef} className="lg:col-span-7">
              {featuredItem && (
                <div
                  className="glass-panel rounded-xl overflow-hidden shadow-xl border border-white/5 cursor-pointer group flex flex-col justify-between"
                  onClick={() => setSelectedItem(featuredItem)}
                >
                  <div className="relative h-64 sm:h-[320px] w-full overflow-hidden">
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 bg-accent text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                      {featuredItem.category}
                    </span>
                    
                    <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-mono px-2.5 py-1 rounded-sm uppercase tracking-wider">
                      Featured Post
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted font-mono">
                        <Calendar className="w-3.5 h-3.5 text-accent" /> {featuredItem.date}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent-hover transition-colors leading-snug">
                        {featuredItem.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed line-clamp-3">
                        {featuredItem.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-accent font-semibold group-hover:translate-x-1.5 transition-transform duration-300">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Secondary News List (Right, span 5) */}
            <div ref={rightPanelRef} className="lg:col-span-5 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
              {listItems.length > 0 ? (
                listItems.map((item) => (
                  <div
                    key={item.title}
                    className="glass-panel glass-panel-hover p-4 rounded-xl flex gap-4 cursor-pointer items-stretch border border-white/5"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="w-24 sm:w-28 h-24 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 gap-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-bold">
                            {item.category}
                          </span>
                          <span className="text-[9px] text-muted-dim font-mono">
                            {item.date}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-1 leading-snug mt-1.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-muted leading-relaxed line-clamp-2 mt-1">
                          {item.desc}
                        </p>
                      </div>

                      <span className="text-[10px] text-accent font-semibold flex items-center gap-1 hover:translate-x-1 transition-transform">
                        Selengkapnya <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-panel p-8 rounded-xl text-center text-muted text-xs flex flex-col items-center justify-center h-full min-h-[300px]">
                  <BookOpen className="w-8 h-8 text-muted/30 mb-3" />
                  Belum ada berita tambahan dalam kategori ini.
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="glass-panel p-12 rounded-xl text-center text-muted text-xs flex flex-col items-center justify-center min-h-[300px]">
            <BookOpen className="w-10 h-10 text-muted/30 mb-4" />
            Tidak ada rilis pers yang ditemukan untuk kriteria pencarian Anda.
          </div>
        )}
      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 backdrop-blur-md"
              style={{ background: 'var(--overlay-bg)' }}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="w-full max-w-2xl backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] lg:max-h-[80vh]"
                style={{ background: 'color-mix(in srgb, var(--bg-secondary) 95%, transparent)' }}
              >
                <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition border border-white/10"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>

                  <span className="absolute bottom-4 left-6 bg-accent text-white text-xs font-mono px-3 py-1 rounded-sm uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-4">
                  <div>
                    <span className="text-xs text-muted-dim font-mono block">
                      Tanggal Rilis: {selectedItem.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="h-px bg-border w-full" />

                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                    {selectedItem.desc}
                    {"\n\n"}
                    Langkah strategis ini merupakan bagian dari komitmen berkelanjutan kami dalam mendukung agenda hilirisasi perkebunan nasional. Melalui inovasi produk hilir berkualitas tinggi, PT. Industri Karet Nusantara terus mendorong pertumbuhan ekonomi lokal serta memperluas kontribusi ekspor non-migas Indonesia di kancah internasional.
                    {"\n\n"}
                    Kehadiran dan keikutsertaan aktif kami dalam kegiatan berskala nasional maupun internasional ini menegaskan posisi strategis PT. Industri Karet Nusantara sebagai pemimpin pasar. Kegiatan ini juga menjadi platform kolaborasi penting untuk mempertemukan riset hilir karet dengan kebutuhan industri manufaktur global.
                  </p>
                </div>

                <div className="p-4 border-t border-border flex justify-end shrink-0" style={{ background: 'var(--bg-elevated)' }}>
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
