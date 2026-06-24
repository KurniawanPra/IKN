/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, Newspaper, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const latestNews = [
  {
    category: "Event",
    title: "Chemical Indonesia 2024",
    desc: "Keikutsertaan Nusantara Rubber Industry di pameran B2B industri kimia terbesar di JIExpo Kemayoran.",
    date: "Nov 2024",
    image: "/images/exhibition.webp",
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store",
    desc: "Peresmian IKN Store sebagai portal penjualan langsung produk hilir karet alam untuk pasar domestik.",
    date: "Feb 2026",
    image: "/images/ikn_store.webp",
  },
  {
    category: "Berita",
    title: "Ekspor Resiprene 35",
    desc: "Nusantara Rubber Industry sukses menembus pasar Uni Eropa dengan ekspor resin ke Jerman.",
    date: "Agt 2024",
    image: "/images/shipping.webp",
  },
  {
    category: "Prestasi",
    title: "Sertifikasi ISO 9001:2015",
    desc: "Nusantara Rubber Industry berhasil mengantongi sertifikasi ISO 9001:2015 untuk standarisasi mutu produksi hilir karet.",
    date: "Des 2025",
    image: "/images/exhibition.webp",
  },
  {
    category: "Inovasi",
    title: "Riset Karet Pratekan",
    desc: "Kolaborasi riset dengan Balai Penelitian Teknologi Karet untuk memproduksi bantalan elastomer jembatan berkualitas tinggi.",
    date: "Jul 2025",
    image: "/images/shipping.webp",
  },
];

const categoryIcons: Record<string, typeof Calendar> = {
  Event: Calendar,
  Berita: Newspaper,
  Prestasi: ShieldCheck,
  Inovasi: Cpu,
};

export default function LatestNewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState(2); // Default to middle card (index 2 for 5 items)
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for dragging physics
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);
  const currentPositionRef = useRef(2);
  const wasDraggedRef = useRef(false);

  // Setup refs array size
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, latestNews.length);
  }, []);

  // Check responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP observer scroll entry
  useEffect(() => {
    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;

    // Set initial entrance states
    gsap.set([header, cta], { opacity: 0, y: 30 });
    gsap.set(grid, { opacity: 0, scale: 0.95 });

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === header) {
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
            });
            observer.unobserve(header);
          } else if (entry.target === grid) {
            gsap.to(grid, {
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: "power2.out",
            });
            observer.unobserve(grid);
          } else if (entry.target === cta) {
            gsap.to(cta, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
            observer.unobserve(cta);
          }
        }
      });
    }, observerOptions);

    if (header) observer.observe(header);
    if (grid) observer.observe(grid);
    if (cta) observer.observe(cta);

    return () => {
      observer.disconnect();
    };
  }, []);

  const updateCardPositions = (pos: number, duration = 0.55, ease = "power2.out") => {
    const N = latestNews.length;
    const xSpacing = isMobile ? 85 : 220;

    latestNews.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      let offset = i - pos;
      const halfN = N / 2;
      while (offset < -halfN) offset += N;
      while (offset > halfN) offset -= N;

      const absOffset = Math.abs(offset);
      const scale = Math.max(0.55, 1 - absOffset * 0.16);
      const z = -absOffset * 185;
      const x = offset * xSpacing;
      const rotateY = -offset * 20;
      const opacity = Math.max(0.12, 1 - absOffset * 0.42);
      const zIndex = Math.round(100 - absOffset * 10);
      const blurVal = Math.min(5, absOffset * 2.2);

      gsap.to(card, {
        x: x,
        z: z,
        scale: scale,
        rotationY: rotateY,
        opacity: opacity,
        zIndex: zIndex,
        filter: blurVal > 0.1 ? `blur(${blurVal}px)` : "none",
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    });
  };

  // Synchronize layout when activeCardIndex or isMobile changes
  useEffect(() => {
    currentPositionRef.current = activeCardIndex;
    updateCardPositions(activeCardIndex, 0.65, "power2.out");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardIndex, isMobile]);

  // Drag / Swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startPositionRef.current = currentPositionRef.current;
    wasDraggedRef.current = false;
    if (gridRef.current) {
      gridRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    
    e.preventDefault();

    if (Math.abs(deltaX) > 6) {
      wasDraggedRef.current = true;
    }

    const divisor = isMobile ? 120 : 260;
    const movement = deltaX / divisor;
    const targetPos = startPositionRef.current - movement;
    currentPositionRef.current = targetPos;
    updateCardPositions(targetPos, 0.1, "none");
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (gridRef.current) {
      gridRef.current.style.cursor = "grab";
    }

    const N = latestNews.length;
    let targetIndex = Math.round(currentPositionRef.current);
    targetIndex = ((targetIndex % N) + N) % N;
    
    setActiveCardIndex(targetIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startPositionRef.current = currentPositionRef.current;
    wasDraggedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.touches[0].clientX - startXRef.current;

    if (Math.abs(deltaX) > 6) {
      wasDraggedRef.current = true;
    }

    const divisor = isMobile ? 100 : 220;
    const movement = deltaX / divisor;
    const targetPos = startPositionRef.current - movement;
    currentPositionRef.current = targetPos;
    updateCardPositions(targetPos, 0.1, "none");
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const N = latestNews.length;
    let targetIndex = Math.round(currentPositionRef.current);
    targetIndex = ((targetIndex % N) + N) % N;

    setActiveCardIndex(targetIndex);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-full lg:h-full w-full flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans"
    >

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-20 w-full flex flex-col justify-center min-h-full h-auto gap-6 sm:gap-8 lg:gap-10\">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold mt-10 uppercase tracking-widest text-rubber-red-light font-mono mb-2">
              Berita Terbaru
            </p>
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              Kegiatan &amp; Publikasi
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed max-w-md">
              Ikuti perkembangan riset, ekspansi pasar, dan pameran B2B terbaru dari Nusantara Rubber Industry.
            </p>
          </div>
          <Link
            href="/media"
            className="btn-outline py-2 px-5 text-xs flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3D Overlapping Carousel wrapper */}
        <div className="flex flex-col items-center select-none">
          <div
            ref={gridRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-md h-[380px] flex items-center justify-center overflow-visible cursor-grab"
            style={{ perspective: "1200px" }}
          >
            {latestNews.map((item, i) => {
              const Icon = categoryIcons[item.category] ?? Newspaper;
              const isActive = i === activeCardIndex;

              return (
                <div
                  key={`${item.title}-${i}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => {
                    if (wasDraggedRef.current) return;
                    if (i !== activeCardIndex) {
                      setActiveCardIndex(i);
                    } else {
                      window.location.href = "/media";
                    }
                  }}
                  className={`absolute w-[245px] sm:w-[280px] h-[350px] glass-panel rounded-2xl flex flex-col overflow-hidden group border transition-all duration-300 ${
                    isActive
                      ? "shadow-2xl shadow-rubber-red-light/10 border-rubber-red-light/35 bg-background/35"
                      : "border-border/60 shadow-lg hover:border-border-highlight"
                  }`}
                  style={{ transformStyle: "preserve-3d", touchAction: "pan-y" }}
                >
                  {/* App Header Bar (Recent Apps style) */}
                  <div className="h-10 px-3 flex items-center justify-between border-b border-border/40 backdrop-blur-md bg-background/25 shrink-0 select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-rubber-red-light/10 border border-rubber-red-light/30">
                        <Icon className="w-3 h-3 text-rubber-red-light" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-foreground">
                        Nusantara News
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-muted-dim">
                        {item.date}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-rubber-red-light/85 animate-pulse' : 'bg-muted-dim/60'}`} />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="h-[130px] w-full overflow-hidden relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={280}
                      height={130}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                      loading="lazy"
                      sizes="280px"
                    />
                    <span
                      className="absolute top-2 left-2 backdrop-blur-md text-rubber-red-light text-[8px] font-mono px-2 py-0.5 rounded border border-rubber-red-light/30 uppercase tracking-widest font-bold bg-background/40"
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 flex flex-col gap-1.5 flex-1 justify-between text-left">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug group-hover:text-rubber-red-light transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted leading-relaxed line-clamp-3 mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/30 pt-2 shrink-0">
                      <span className="text-[9px] text-muted-dim font-mono">
                        Nusantara Rubber
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-semibold text-rubber-red-light uppercase tracking-wider flex items-center gap-1 font-mono group-hover:translate-x-1 transition-transform duration-300">
                          Open App <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6 z-20 relative">
            {latestNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeCardIndex
                    ? "bg-rubber-red-light w-6"
                    : "bg-border hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div ref={ctaRef} className="flex justify-center sm:hidden">
          <Link href="/media" className="btn-outline py-2.5 px-6 text-xs flex items-center gap-2">
            Lihat Semua Berita <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
