"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";
import BackgroundBlobs from "@/components/background-blobs";
import { motion } from "framer-motion";
import { Clock, Target, Compass, ArrowRight, Shield } from "lucide-react";

const milestones = [
  { year: "1965", desc: "Awal berdiri sebagai bagian dari ekosistem perkebunan nasional." },
  { year: "1996", desc: "Produksi Resiprene 35, resin karet tersiklisasi pertama di Indonesia." },
  { year: "2006", desc: "Resmi berdiri sebagai PT. Industri Karet Nusantara di bawah PTPN III." },
  { year: "2024", desc: "Perluasan ekspor resin karet ke pasar Eropa Barat dan Oceania." },
  { year: "2026", desc: "Peresmian platform e-commerce IKN Store untuk pasar domestik." },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 flex flex-col items-center justify-center text-center px-6">
        <BackgroundBlobs sectionId="about" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-3 inline-block"
          >
            Tentang Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-foreground md:text-5xl leading-tight mb-4"
          >
            Warisan Keunggulan Industri Karet Alam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base leading-relaxed text-muted"
          >
            PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan Nusantara III (Persero),
            telah menjadi pelopor hilirisasi karet sejak didirikan. Kami memproses getah karet
            menjadi resin berkualitas ekspor untuk rantai pasok industri global.
          </motion.p>
        </div>
      </section>

      {/* Section 1: History */}
      <section id="about-history" className="relative py-20 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-rubber-red-light">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Milestones</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Sejarah Perjalanan Kami</h2>
            <p className="text-xs text-muted max-w-sm leading-relaxed mt-5">
              Lebih dari setengah abad dedikasi dan pertumbuhan berkelanjutan dalam industri manufaktur karet nasional.
            </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 border-l border-rubber-red/25 space-y-10 max-w-3xl mx-auto">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-6"
              >
                <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rubber-red ring-4 ring-rubber-red/15" />
                <span className="font-mono font-bold text-sm text-rubber-red-light">{milestone.year}</span>
                <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">{milestone.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Vision & Mission */}
      <section id="about-vision-mission" className="relative py-20 border-t border-border/40 bg-elevated/25">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-2 text-rubber-red-light">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Integrity & Standard</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Visi dan Misi Perusahaan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-lg flex flex-col gap-4 border-t-4 border-t-rubber-red-light"
            >
              <div className="p-3 bg-rubber-red-light/10 rounded-sm w-fit">
                <Compass className="w-6 h-6 text-rubber-red-light" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Visi Kami</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Menjadi produsen produk hilir karet alam terkemuka dengan reputasi global yang mengutamakan keberlanjutan dan kepuasan pelanggan melalui kustomisasi solusi industri.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-panel p-8 rounded-lg flex flex-col gap-4 border-t-4 border-t-rubber-red-light"
            >
              <div className="p-3 bg-rubber-red-light/10 rounded-sm w-fit">
                <Target className="w-6 h-6 text-rubber-red-light" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Misi Kami</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
                <li className="flex gap-2 items-start">
                  <ArrowRight className="w-3.5 h-3.5 text-rubber-red-light shrink-0 mt-1" />
                  <span>Memproduksi resin karet tersiklisasi (Resiprene) dan benang karet berkualitas tinggi standar internasional.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <ArrowRight className="w-3.5 h-3.5 text-rubber-red-light shrink-0 mt-1" />
                  <span>Menerapkan teknik manufaktur modern dan kimia hijau (green chemistry) yang ramah lingkungan.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <ArrowRight className="w-3.5 h-3.5 text-rubber-red-light shrink-0 mt-1" />
                  <span>Meningkatkan nilai tambah komoditas perkebunan karet nasional demi kemakmuran petani lokal.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Contact Us */}
      <section id="about-contact" className="relative py-20 border-t border-border/40">
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
}
