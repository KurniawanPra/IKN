"use client";

import { useEffect, useRef } from "react";
import { Calendar, Newspaper, Image as ImageIcon, ArrowRight } from "lucide-react";
import BackgroundBlobs from "./background-blobs";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const latestNews = [
  {
    category: "Event",
    title: "Chemical Indonesia 2024",
    desc: "Keikutsertaan Nusantara Rubber Industry di pameran B2B industri kimia terbesar di JIExpo Kemayoran.",
    date: "Nov 2024",
    image: "/images/exhibition.png",
  },
  {
    category: "Berita",
    title: "Peresmian IKN Store",
    desc: "Peresmian IKN Store sebagai portal penjualan langsung produk hilir karet alam untuk pasar domestik.",
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
];

const categoryIcons: Record<string, typeof Calendar> = {
  Event: Calendar,
  Berita: Newspaper,
  Galeri: ImageIcon,
};

export default function LatestNewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, ctaRef.current], { opacity: 0, y: 30 });
      if (gridRef.current) {
        gsap.set(gridRef.current.children, { opacity: 0, y: 40 });
      }

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });

      if (gridRef.current) {
        gsap.to(gridRef.current.children, {
          opacity: 1,
          y: 0,
          stagger: 0.13,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        });
      }

      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans"
    >
      <BackgroundBlobs sectionId="media" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto gap-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
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

        {/* News Grid — 3 columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {latestNews.map((item) => {
            const Icon = categoryIcons[item.category] ?? Newspaper;
            return (
              <Link
                key={item.title}
                href="/media"
                className="glass-panel glass-panel-hover rounded-md flex flex-col overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-2 left-2 backdrop-blur-sm text-rubber-red-light text-[9px] font-mono px-2.5 py-1 rounded-sm uppercase border border-border tracking-wider"
                    style={{ background: "var(--overlay-bg)" }}
                  >
                    {item.category}
                  </span>
                  <div
                    className="absolute top-2 right-2 p-1.5 rounded-sm backdrop-blur-sm border border-border"
                    style={{ background: "var(--overlay-bg)" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-muted-dim" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-accent-hover transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 flex-1">
                    {item.desc}
                  </p>
                  <span className="text-[10px] text-muted-dim font-mono mt-1">
                    {item.date}
                  </span>
                </div>
              </Link>
            );
          })}
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
