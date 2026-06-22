"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";
import BackgroundBlobs from "@/components/background-blobs";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import ScrollIndicator from "@/components/scroll-indicator";
import { gsap } from "gsap";
import HeaderSlideshow from "@/components/header-slideshow";
import VisionMissionSection from "@/components/vision-mission-section";


const milestones = [
  {
    year: "1965",
    title: "TAVIP Bicycle Tire Factory (DATAK Sumatera Utara)",
    desc: "Sejak awal berdiri (1965-1968), dikelola oleh DATAK Sumatera Utara dengan nama Pabrik Ban Sepeda TAVIP. Produk: Ban luar dan dalam sepeda.",
  },
  {
    year: "1968",
    title: "TAFIKA Rubber Industry (PTP-II)",
    desc: "1968-1971, berdasarkan SK Menteri Pertanian No. 175/KPTS/OP/8/1968, pengelolaan dialihkan ke PT. Perkebunan II dengan nama Industri Karet Tafika. Produk: Ban sepeda dan gelang karet.",
  },
  {
    year: "1971",
    title: "KPB/PNP/PTP I–IX Sumatera Utara Aceh",
    desc: "1971-1978, melalui SK Perwakilan B.C.U/PTP Wilayah I No. 24/49/1971, pengelolaan dialihkan ke PT. Perkebunan III. Selanjutnya berdasarkan SK Dirjen Perkebunan No. 76/BCU.KPB/KPTS/1971, dialihkan ke KPB/PNP/PTP I-IX Sumut Aceh. Produk: Barang karet, gelang karet, dan ban sepeda.",
  },
  {
    year: "1978",
    title: "Unit Kerja PT Perkebunan III",
    desc: "1978-1982, sesuai SK Menteri Pertanian No. 12/KPTS/UM/I/1978, pengelolaan dialihkan ke PT. Perkebunan III. Produk: Barang karet, gelang karet, dan compound.",
  },
  {
    year: "1982",
    title: "Proyek Industri Karet PT Perkebunan III",
    desc: "1982-1989, berganti nama menjadi Proyek Industri Karet PT. Perkebunan III. Produk: Barang karet, gelang karet, compound, serta conveyor belt, dock fender, dan sarung tangan.",
  },
  {
    year: "1996",
    title: "Unit Kerja PT Perkebunan Nusantara III",
    desc: "1996-2002, berdasarkan PP No. 8/1996 (14 Februari 1996), terjadi merger PTP III, IV, V menjadi PT. Perkebunan Nusantara III, dan Pabrik Industri Karet menjadi salah satu Unit Kerja PTPN III. Produk: Barang karet, conveyor belt, dock fender, sarung tangan, benang karet, dan gelang karet. 2003-2004: berdasarkan SKPTS Direksi No. III.10/SKPTS/R/07.A/2003, unit usaha Pabrik Sarung Tangan dan Pabrik Gelang Karet tidak dioperasikan. 2005-2006: berdasarkan SKPTS Direksi No. 3.08/SKPTS/01/2005 (10 Januari 2005), nama Pabrik Industri Karet PTPN III diubah menjadi Pabrik Benang Karet dan Barang Karet (PRTRA).",
  },
  {
    year: "2006–Sekarang",
    title: "PT Industri Karet Nusantara, anak perusahaan PTPN III (Persero)",
    desc: "Sejak 4 April 2006, berdasarkan Akta Pendirian No. 4 Tahun 2006 oleh Notaris Syafnil Gani, SH, M.Hum, resmi menjadi PT. Industri Karet Nusantara sebagai anak perusahaan PT. Perkebunan Nusantara III (Persero). Berdasarkan keputusan RUPS RKAP 2017, Pabrik Benang Karet berhenti beroperasi. Produk: Rubber Articles dan Resiprene.",
  },
];
export default function AboutPage() {
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Timeline Scroll Animation
  useEffect(() => {
    const container = timelineContainerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".timeline-item");

    // Set initial state
    gsap.set(items, { opacity: 0, x: -20 });

    const observerOptions = {
      root: container,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className="relative">
      <Navbar />

      <ScrollIndicator
        position="bottom-right"
        sections={[
          { id: "about-hero", label: "About" },
          { id: "about-history", label: "History" },
          { id: "about-vision-mission", label: "Visi & Misi" },
          { id: "about-contact", label: "Contact Us" },
        ]}
      />

      <main className="snap-container">
        {/* Hero Header */}
        <section id="about-hero" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar">
          <HeaderSlideshow images={[
            "/images/produksi-karet.webp",
            "/images/pabrik_ikn.webp",
            "/images/kantor_ikn.webp",
            "/images/getah.webp"
          ]} overlayOpacity={0.8} />
          <BackgroundBlobs sectionId="about" transparentBg={true} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-25 w-full">
            <div className="flex flex-col gap-4 text-center items-center justify-center p-8 sm:p-12 md:p-16 rounded-[2rem] backdrop-blur-md md:backdrop-blur-2xl bg-transparent border border-white/10 border-t-white/30 border-l-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.6)] relative overflow-hidden ring-1 ring-white/10 isolate transform-gpu">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-[0.2em] text-rubber-red-light font-mono mb-2 inline-block drop-shadow-md"
              >
                Tentang Kami
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative z-10 text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-[1.15] tracking-tight"
              >
                Warisan Keunggulan Industri Karet Alam
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 text-sm md:text-base lg:text-lg leading-relaxed text-white/90 max-w-2xl mt-2"
              >
                PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan Nusantara III (Persero),
                telah menjadi pelopor hilirisasi karet sejak didirikan. Kami memproses getah karet
                menjadi resin berkualitas ekspor untuk rantai pasok industri global.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Section 1: History */}
        <section id="about-history" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-20 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2 text-rubber-red-light">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Milestones</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Sejarah Perjalanan Kami</h2>
                <p className="text-xs text-muted max-w-md leading-relaxed mt-3">
                  Sejak 1965, PT. Industri Karet Nusantara telah mengalami berbagai transformasi nama dan
                  kepemilikan, mencerminkan lebih dari lima dekade dedikasi dalam industri manufaktur karet nasional.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div ref={timelineContainerRef} className="relative pl-0 pr-6 space-y-6 max-w-3xl mx-auto max-h-[45vh] overflow-y-auto no-scrollbar">
              {/* Timeline vertical line */}
              <div className="absolute left-[16px] top-4 bottom-4 w-0.5 bg-rubber-red/25" />

              {milestones.map((milestone) => (
                <div
                  key={milestone.year}
                  className="timeline-item relative pl-10"
                >
                  <div className="absolute left-[10px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rubber-red ring-4 ring-rubber-red/15" />
                  <span className="font-mono font-bold text-sm text-rubber-red-light">{milestone.year}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-1">{milestone.title}</h3>
                  <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Vision & Mission */}
        <section id="about-vision-mission" className="snap-section relative min-h-[100dvh] h-auto flex flex-col justify-center border-t border-border/40 bg-elevated/5 overflow-visible">
          <VisionMissionSection />
        </section>

        {/* Section 3: Contact Us */}
        <section id="about-contact" className="snap-section relative min-h-[100dvh] h-auto flex flex-col justify-center border-t border-border/40 overflow-visible">
          <BackgroundBlobs />
          <ContactSection />
        </section>

        {/* Section 4: Footer */}
        <section id="footer" className="snap-section relative min-h-[100dvh] h-auto flex flex-col justify-center border-t border-border/40 overflow-visible">
          <Footer />
        </section>
      </main>
    </div>
  );
}
