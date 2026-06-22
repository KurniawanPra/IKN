/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, X, Calendar, Search, ArrowRight, BookOpen, Clock } from "lucide-react";
import { gsap } from "gsap";

interface Author {
  name: string;
  initials: string;
  role: string;
}

interface NewsItem {
  category: "Berita" | "Event";
  title: string;
  desc: string;
  date: string;
  image: string;
  author: Author;
  readTime: string;
}

const newsItems: NewsItem[] = [
  {
    category: "Berita",
    title: "Ekspor Resiprene 35 ke Jerman",
    desc: "PT Industri Karet Nusantara sukses menembus pasar eksklusif Uni Eropa dengan pengapalan perdana kontainer Resiprene 35 menuju Hamburg, Jerman. Produk kami mematuhi standar kepatuhan regulasi lingkungan hidup REACH bebas SVHC.",
    date: "Agt 2024",
    image: "/images/shipping.webp",
    author: { name: "Humas PTPN III", initials: "HP", role: "Corporate Relations" },
    readTime: "4 Min Read",
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store Resmi Dibuka",
    desc: "Peresmian IKN Store sebagai portal penjualan langsung produk hilir karet alam domestik. Memudahkan pelanggan lokal untuk melakukan pembelian skala kecil hingga menengah secara cepat dan transparan.",
    date: "Feb 2026",
    image: "/images/ikn_store.webp",
    author: { name: "Tim E-Commerce", initials: "TE", role: "Digital Sales" },
    readTime: "3 Min Read",
  },
  {
    category: "Event",
    title: "Chemical Indonesia 2024 JIExpo",
    desc: "Keikutsertaan Nusantara Rubber Industry di pameran B2B industri kimia terbesar di JIExpo. Kami memamerkan produk unggulan karet alam tersiklisasi Resiprene 35 untuk cat kapal.",
    date: "Nov 2024",
    image: "/images/exhibition.webp",
    author: { name: "Tim Pemasaran", initials: "TP", role: "Event Marketing" },
    readTime: "5 Min Read",
  },
  {
    category: "Event",
    title: "Holding Perkebunan Nusantara",
    desc: "Sinergi hilirisasi karet terintegrasi bersama Holding PTPN III (Persero) untuk menyelaraskan rantai pasok lateks dari perkebunan nasional ke unit manufaktur hilir karet milik PT IKN.",
    date: "Jan 2025",
    image: "/images/plantation.webp",
    author: { name: "Direksi IKN", initials: "DI", role: "Board Room" },
    readTime: "4 Min Read",
  },
];

export default function MediaNewsSection() {
  const [activeFilter, setActiveFilter] = useState<"Semua" | "Berita" | "Event">("Semua");
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridContainer = gridContainerRef.current;

    gsap.set(gridContainer, { opacity: 0, y: 25 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(gridContainer, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (gridContainer) observer.observe(gridContainer);
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

  return (
    <div ref={containerRef} className="relative w-full flex items-start lg:items-center font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-12 lg:pt-28 lg:pb-16 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        
        {/* Header Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border/40 pb-4 w-full">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-1 flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5" /> Publikasi & Rilis Pers
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
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
                  className={`px-3 py-1 text-xs font-mono rounded-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-accent text-white font-semibold shadow-sm"
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
                className="pl-8 pr-4 py-1.5 text-xs rounded-sm theme-input w-40 sm:w-48 focus:w-56 transition-all duration-300 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
            </div>
          </div>
        </div>

        {/* Compact Grid Layout */}
        <div ref={gridContainerRef} className="w-full">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.title}
                  className="glass-panel p-4 rounded-xl flex flex-col justify-between cursor-pointer border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div>
                    {/* Compact Image */}
                    <div className="relative h-32 sm:h-36 w-full overflow-hidden rounded-lg bg-muted/10 shrink-0 mb-3.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-accent text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-[9px] text-muted-dim font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent" /> {item.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-accent" /> {item.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-1.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-muted leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Footer Author Tag */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/10 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-mono text-[8px] font-bold text-accent">
                        {item.author.initials}
                      </div>
                      <span className="text-[10px] text-muted font-medium leading-none">{item.author.name}</span>
                    </div>
                    <span className="text-[9px] text-accent font-semibold flex items-center gap-0.5 hover:translate-x-0.5 transition-transform duration-300">
                      Info <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-xl text-center text-muted text-xs flex flex-col items-center justify-center min-h-[260px]">
              <BookOpen className="w-9 h-9 text-muted/30 mb-3" />
              Tidak ada rilis pers yang ditemukan untuk kriteria pencarian Anda.
            </div>
          )}
        </div>
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
                className="w-full max-w-2xl backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] lg:max-h-[85vh] relative"
                style={{ background: 'color-mix(in srgb, var(--bg-secondary) 98%, transparent)' }}
              >
                {/* Visual Reading Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent/25 z-30">
                  <div className="h-full bg-accent w-3/4 animate-pulse" />
                </div>

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

                  <span className="absolute bottom-4 left-6 bg-accent text-white text-xs font-mono px-3 py-1 rounded-sm uppercase tracking-wider font-bold">
                    {selectedItem.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-muted font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" /> {selectedItem.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent" /> {selectedItem.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug tracking-tight">
                      {selectedItem.title}
                    </h3>
                  </div>

                  {/* Author Information Header inside Modal */}
                  <div className="flex items-center gap-3 p-3.5 bg-elevated/20 rounded-lg border border-border/40 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-mono text-xs font-bold text-accent">
                      {selectedItem.author.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground leading-none">{selectedItem.author.name}</span>
                      <span className="text-[10px] text-muted-dim leading-none mt-1">{selectedItem.author.role} — PT Industri Karet Nusantara</span>
                    </div>
                  </div>

                  <div className="h-px bg-border/40 w-full" />

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
