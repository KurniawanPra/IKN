/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, ZoomIn, Calendar } from "lucide-react";

import StackedGallery from "./stacked-gallery";
import { gsap } from "gsap";

const galleryItems = [
  {
    category: "Fasilitas",
    title: "Fasilitas R&D Modern",
    desc: "Fasilitas laboratorium formulasi dan pengujian resin karet berstandar mutu internasional. Tim peneliti kami terus mengembangkan formulasi kimia hijau untuk meningkatkan daya rekat dan ketahanan panas resin tersiklisasi kami.",
    date: "Mei 2024",
    image: "/images/rnd_lab.webp",
    gridClass: "col-span-1 md:col-span-2 h-[220px]",
  },
  {
    category: "Produksi",
    title: "Proses Siklisasi Reaktor",
    desc: "Dokumentasi reaktor siklisasi karet alam dengan pemanasan dan katalis terkontrol. Reaktor modern ini dirancang untuk memastikan reaksi siklisasi terjadi secara homogen, menghasilkan mutu resin Resiprene 35 yang konsisten.",
    date: "Jul 2024",
    image: "/images/reactor.webp",
    gridClass: "col-span-1 h-[220px]",
  },
  {
    category: "Produksi",
    title: "Lini Produksi Benang Karet",
    desc: "Mesin ekstrusi presisi tinggi untuk menghasilkan benang karet (rubber thread) dengan variasi ukuran sesuai standar global. Menggunakan bahan baku lateks alam pilihan untuk elastisitas maksimal.",
    date: "Des 2024",
    image: "/images/plantation.webp",
    gridClass: "col-span-1 h-[220px]",
  },
  {
    category: "Distribusi",
    title: "Gudang Distribusi Ekspor",
    desc: "Fasilitas penyimpanan logistik dengan standar kontrol kelembapan untuk memastikan mutu benang karet ekspor tetap optimal sebelum dikapalkan ke berbagai negara tujuan.",
    date: "Okt 2024",
    image: "/images/shipping.webp",
    gridClass: "col-span-1 md:col-span-2 h-[220px]",
  },
];

export default function MediaGallerySection() {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftPanel = leftPanelRef.current;
    const gridContainer = gridContainerRef.current;

    gsap.set([leftPanel, gridContainer], { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === leftPanel) {
              gsap.to(leftPanel, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
              observer.unobserve(leftPanel);
            } else if (entry.target === gridContainer) {
              gsap.to(gridContainer, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
              observer.unobserve(gridContainer);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftPanel) observer.observe(leftPanel);
    if (gridContainer) observer.observe(gridContainer);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full flex items-start lg:items-center font-sans">

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-20 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Panel: Content & StackedGallery */}
          <div ref={leftPanelRef} className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2 flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" /> Galeri Dokumentasi
              </p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Galeri Visual
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Dokumentasi eksklusif fasilitas riset, proses manufaktur reaktor modern, lini produksi benang karet, dan rantai distribusi ekspor kami.
              </p>
            </div>

            {/* Desktop Stacked Gallery Card */}
            <div className="hidden lg:block w-full relative">
              <StackedGallery />
            </div>
          </div>

          {/* Right Panel: Clean Photo-Only Grid with Hover Overlays */}
          <div className="lg:col-span-8">
            <div
              ref={gridContainerRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto lg:max-h-[460px] overflow-visible lg:overflow-y-auto no-scrollbar pr-1"
            >
              {galleryItems.map((item) => (
                <div
                  key={item.title}
                  className={`media-card relative rounded-xl border border-white/5 shadow-lg overflow-hidden cursor-pointer group origin-center ${item.gridClass}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Clean photo glass overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between p-5 text-white">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 bg-white/10 border border-white/20 rounded-full text-[9px] font-mono uppercase tracking-widest text-white">
                        {item.category}
                      </span>
                      <ZoomIn className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide drop-shadow">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-white/70 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                className="w-full max-w-2xl backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] lg:max-h-[80vh]"
                style={{ background: 'color-mix(in srgb, var(--bg-secondary) 95%, transparent)' }}
              >
                <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
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
                    <span className="text-xs text-muted-dim font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" /> Dokumentasi: {selectedItem.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug mt-1.5">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="h-px bg-border w-full" />

                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                    {selectedItem.desc}
                    {"\n\n"}
                    Dokumentasi di atas menggambarkan dedikasi PT. Industri Karet Nusantara dalam memelihara serta mengembangkan infrastruktur manufaktur berstandar tinggi. Melalui integrasi teknologi ramah lingkungan dan proses kontrol kualitas laboratorium yang disiplin, kami terus menjaga kepercayaan mitra industri global di pasar ekspor.
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
