"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MediaSection from "@/components/media-section";
import BackgroundBlobs from "@/components/background-blobs";
import { motion } from "framer-motion";
import { Download, FileText, Share2 } from "lucide-react";

const brochures = [
  {
    name: "Brochure Resiprene 35",
    desc: "Dokumen spesifikasi teknis, data kelarutan solvent, dan panduan formulasi cat menggunakan resin karet alam tersiklisasi Resiprene 35.",
    href: "https://drive.google.com/file/d/13KhOBIzmm9RsNHRR1NXmnbt1AM3taoyF/view?usp=drive_link",
  },
  {
    name: "Brochure Rubber Articles",
    desc: "Katalog lengkap dimensi, tingkat elastisitas, dan panduan B2B untuk benang karet industri (rubber thread) Nusantara Rubber Industry.",
    href: "https://drive.google.com/file/d/1NG1A0FH48M21G1UjcyI9HpBjLfj8PFdz/view?usp=drive_link",
  },
];

export default function MediaPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 flex flex-col items-center justify-center text-center px-6">
        <BackgroundBlobs sectionId="media" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-3 inline-block"
          >
            Media & Publikasi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-foreground md:text-5xl leading-tight mb-4"
          >
            Pusat Informasi & Rilis Pers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base leading-relaxed text-muted"
          >
            Ikuti laporan perkembangan ekspansi pasar, publikasi riset getah karet alam,
            serta partisipasi pameran B2B kimia nasional dan global secara lengkap di sini.
          </motion.p>
        </div>
      </section>

      {/* Section 1: Interactive Media & Gallery */}
      <section id="media-main" className="relative py-8 border-t border-border/40">
        <MediaSection />
      </section>

      {/* Section 2: Brochure Downloads */}
      <section id="media-downloads" className="relative py-20 border-t border-border/40 bg-elevated/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2 text-rubber-red-light">
              <Download className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Download Center</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Unduh Dokumen Brosur Produk</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {brochures.map((brochure, idx) => (
              <motion.div
                key={brochure.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="glass-panel p-6 sm:p-8 rounded-lg flex flex-col justify-between border-t-2 border-t-rubber-red-light"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-rubber-red-light/10 rounded-sm">
                      <FileText className="w-5 h-5 text-rubber-red-light" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{brochure.name}</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {brochure.desc}
                  </p>
                </div>

                <div className="flex gap-3 mt-2">
                  <a
                    href={brochure.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-2 px-5 rounded text-xs flex items-center justify-center gap-2 uppercase font-semibold"
                  >
                    Buka File <Share2 className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
