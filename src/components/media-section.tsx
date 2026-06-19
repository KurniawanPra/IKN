"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Newspaper, Image as ImageIcon, X } from "lucide-react";
import BackgroundBlobs from "./background-blobs";
import { gsap } from "gsap";

import StackedGallery from "./stacked-gallery";

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

export default function MediaSection() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [selectedItem, setSelectedItem] = useState<(typeof mediaItems)[0] | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const filterButtonsRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Auto-switch filters based on hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHash = () => {
        if (window.location.hash === "#media-gallery") {
          setActiveFilter("Galeri");
        } else if (window.location.hash === "#media-news") {
          setActiveFilter("Berita");
        }
      };
      handleHash();
      window.addEventListener("hashchange", handleHash);
      return () => window.removeEventListener("hashchange", handleHash);
    }
  }, []);

  const filtered =
    activeFilter === "Semua"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeFilter);

  // GSAP scroll anim on load/view using IntersectionObserver
  useEffect(() => {
    const leftPanel = leftPanelRef.current;
    const filterButtons = filterButtonsRef.current;
    const gridContainer = gridContainerRef.current;

    // Setup elements initial states
    gsap.set([leftPanel, filterButtons, gridContainer], {
      opacity: 0,
      y: 30,
    });

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === leftPanel) {
            gsap.to(leftPanel, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
            observer.unobserve(leftPanel);
          } else if (entry.target === filterButtons) {
            gsap.to(filterButtons, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
            observer.unobserve(filterButtons);
          } else if (entry.target === gridContainer) {
            gsap.to(gridContainer, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            });
            observer.unobserve(gridContainer);
          }
        }
      });
    }, observerOptions);

    if (leftPanel) observer.observe(leftPanel);
    if (filterButtons) observer.observe(filterButtons);
    if (gridContainer) observer.observe(gridContainer);

    return () => {
      observer.disconnect();
    };
  }, []);

  // GSAP stagger anim on filter change
  useEffect(() => {
    if (gridContainerRef.current) {
      const cards = gridContainerRef.current.querySelectorAll(".media-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.95, y: 15 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.45, ease: "power2.out" }
        );
      }
    }
  }, [activeFilter]);

  return (
    <div ref={containerRef} id="media" className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-y-auto no-scrollbar font-sans">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-20 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Content, Filters, 3D Canvas */}
          <div ref={leftPanelRef} className="lg:col-span-4 flex flex-col gap-6">
            <div id="media-news">
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                Media & Publikasi
              </p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Berita & Kegiatan Terbaru
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Ikuti perkembangan riset, ekspor, pameran B2B, dan ekspansi pasar 
                Nusantara Rubber Industry secara berkala.
              </p>
            </div>

            <div ref={filterButtonsRef} className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-accent text-white"
                      : "bg-elevated text-muted hover:text-foreground border border-border"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Gallery Stacked Cards */}
            <div className="hidden lg:block w-full relative">
              <StackedGallery />
            </div>
          </div>

          {/* Right Panel: Scrollable Grid of News Cards */}
          <div className="lg:col-span-8">
            <div
              ref={gridContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto lg:max-h-[460px] overflow-visible lg:overflow-y-auto no-scrollbar"
            >
              {filtered.map((item) => {
                const Icon = categoryIcons[item.category];

                return (
                  <div
                    key={item.title}
                    className="media-card glass-panel glass-panel-hover p-0 rounded-md flex flex-col overflow-hidden relative cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Image Header */}
                    <div className="h-40 w-full overflow-hidden relative">
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 backdrop-blur-sm text-rubber-red-light text-[9px] font-mono px-2.5 py-1 rounded-sm uppercase border border-border tracking-wider"
                        style={{ background: 'var(--overlay-bg)' }}
                      >
                        {item.category}
                      </span>
                      <div className="absolute top-2 right-2 p-1.5 rounded-sm backdrop-blur-sm border border-border"
                        style={{ background: 'var(--overlay-bg)' }}
                      >
                        <Icon className="w-3.5 h-3.5 text-muted-dim" />
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
                      <div>
                        <h3 className="text-sm font-bold text-foreground line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted mt-1.5 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                      <span className="block text-[10px] text-muted-dim font-mono">
                        {item.date}
                      </span>
                    </div>
                  </div>
                );
              })}
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
              className="fixed inset-0 z-50 backdrop-blur-md"
              style={{ background: 'var(--overlay-bg)' }}
            />

            {/* Modal Content Card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="w-full max-w-2xl backdrop-blur-xl border border-border rounded-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] lg:max-h-[80vh] font-sans"
                style={{ background: 'color-mix(in srgb, var(--bg-secondary) 95%, transparent)' }}
              >
                {/* Modal Image Header */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition border border-white/10"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>

                  {/* Category badge */}
                  <span className="absolute bottom-4 left-6 bg-accent text-white text-xs font-mono px-3 py-1 rounded-sm uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                </div>

                {/* Modal Body Info */}
                <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-dim font-mono block">
                      Tanggal Publikasi: {selectedItem.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="h-px bg-border w-full" />

                  {/* Rich details text for the company profile */}
                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line font-sans">
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
