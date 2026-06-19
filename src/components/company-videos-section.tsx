"use client";

import { useEffect, useRef } from "react";
import VideoPlayer from "@/components/ui/video-player";
import { gsap } from "gsap";
import { Play } from "lucide-react";

export default function CompanyVideosSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;

    gsap.set([header, content], { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (header) observer.observe(header);
    if (content) observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans"
    >

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 -mb-6 lg:py-30 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto gap-8 sm:gap-10">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono">
            Galeri Video
          </p>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Dokumentasi &amp; Profil Operasional
          </h2>
          <p className="text-sm text-muted max-w-2xl mt-1 leading-relaxed">
            Saksikan proses produksi hilir karet berkualitas tinggi dan profil korporat PT. Industri Karet Nusantara untuk memahami komitmen mutu kami secara visual.
          </p>
        </div>

        {/* Video Grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
          {/* Video 1 */}
          <div className="flex flex-col gap-3.5 glass-panel p-4 rounded-xl border border-border">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-border/40 shadow-inner bg-black/40">
              <VideoPlayer src="https://youtu.be/-CSAwkNrNzY" />
            </div>
            <div className="px-1 text-left">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rubber-red-light shrink-0" />
                Company Profile — PT. Industri Karet Nusantara
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Gambaran umum fasilitas produksi, sejarah berdiri, visi, misi, dan kontribusi PT. IKN dalam rantai pasok hilirisasi karet domestik dan global.
              </p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="flex flex-col gap-3.5 glass-panel p-4 rounded-xl border border-border">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-border/40 shadow-inner bg-black/40">
              <VideoPlayer src="https://youtu.be/dC0AVuie4s0?si=QvG_OHV_8fXrtJ0f" />
            </div>
            <div className="px-1 text-left">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Proses Pengolahan &amp; Mutu Produk Hilir
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Liputan mendalam tentang pengolahan raw material karet alam menjadi produk resin karet berkualitas tinggi dan barang karet khusus lainnya.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
