"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SustainabilitySection from "@/components/sustainability-section";
import SustainabilityCertificateSection from "@/components/sustainability-certificate-section";
import SustainabilityCustomersSection from "@/components/sustainability-customers-section";
import BackgroundBlobs from "@/components/background-blobs";
import ScrollIndicator from "@/components/scroll-indicator";
import { motion } from "framer-motion";
import { ShieldCheck, Award, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const certificates = [
  { title: "ISO 9001:2015", desc: "Sertifikasi Sistem Manajemen Mutu internasional untuk jaminan standardisasi produksi hilir karet." },
  { title: "ISO 14001:2015", desc: "Sistem Manajemen Lingkungan yang membuktikan komitmen kami meminimalkan emisi karbon & limbah." },
  { title: "ISO 45001:2018", desc: "Sertifikasi Sistem Manajemen Kesehatan & Keselamatan Kerja (K3) untuk melindungi operator pabrik." },
  { title: "REACH Compliant", desc: "Pernyataan bebas bahan kimia berbahaya SVHC (Substance of Very High Concern) sesuai standar Uni Eropa." },
  { title: "RoHS Certified", desc: "Kepatuhan pembatasan zat berbahaya logam berat pada seluruh produk akhir benang karet elastis." },
];

const customerSectors = [
  { name: "Marine Coating & Paint Manufacturers", desc: "Formulator cat kapal dan cat pelindung korosi luar ruangan berskala internasional." },
  { name: "PTPN III Perkebunan Nusantara", desc: "Sinergi rantai pasok lateks segar nasional yang berkelanjutan." },
  { name: "Textile & Garment Industries", desc: "Produsen pakaian olahraga dan elastis global yang mengimpor benang karet premium kami." },
  { name: "Automotive Adhesive Formulators", desc: "Manufaktur perekat industri bersuhu tinggi untuk komponen otomotif." },
];

export default function SustainabilityPage() {
  return (
    <div className="relative">
      <Navbar />
      
      <ScrollIndicator
        position="bottom-right"
        sections={[
          { id: "sustainability-hero", label: "Sustainability" },
          { id: "sustainability-main", label: "Commitments" },
          { id: "sustainability-certificate", label: "Certificates" },
          { id: "sustainability-cert-detail", label: "Cert Details" },
          { id: "sustainability-customers", label: "Customers" },
          { id: "sustainability-cust-detail", label: "Customer Details" },
          { id: "sustainability-cta", label: "Governance" },
        ]}
      />

      <main className="snap-container">
        {/* Hero Header */}
        <section id="sustainability-hero" className="snap-section relative flex flex-col items-center justify-center overflow-y-auto lg:overflow-hidden no-scrollbar">
          <BackgroundBlobs sectionId="sustainability" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-emerald-400 font-mono mb-3 inline-block"
            >
              Keberlanjutan & Kepatuhan
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-foreground md:text-5xl leading-tight mb-4"
            >
              Manufaktur Hijau Demi Masa Depan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed text-muted"
            >
              Kami menerapkan metode kimia hijau (green chemistry) pada formulasi resin tersiklisasi
              untuk menekan emisi gas pelarut berbahaya demi keseimbangan ekosistem dan keselamatan kerja.
            </motion.p>
          </div>
        </section>

        {/* Section 1: Main Commitments */}
        <section id="sustainability-main" className="snap-section relative overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <SustainabilitySection />
        </section>

        {/* Section 2: Certificates */}
        <section id="sustainability-certificate" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40 bg-elevated/10">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-20 w-full">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400">
                <Award className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Sertifikasi Internasional</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Standar Mutu & Regulasi Global</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-md hover:border-emerald-500/30 transition-all duration-300"
                >
                  <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-sm font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Certificate Details (Tabbed) */}
        <section id="sustainability-cert-detail" className="snap-section relative overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <SustainabilityCertificateSection />
        </section>

        {/* Section 4: Our Customers */}
        <section id="sustainability-customers" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-20 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Jejaring Mitra</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Segmen Industri Pelanggan Kami</h2>
              <p className="text-xs text-muted max-w-sm leading-relaxed mt-2">
                Mendukung berbagai sektor manufaktur B2B di Asia, Eropa, dan Australia melalui pengapalan kargo terpercaya.
              </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerSectors.map((sector, idx) => (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel p-5 rounded-md flex gap-4 items-start"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{sector.name}</h4>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed">{sector.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Customer Details (Tabbed) */}
        <section id="sustainability-cust-detail" className="snap-section relative overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40 bg-elevated/10">
          <SustainabilityCustomersSection />
        </section>

        {/* CTA Governance Links */}
        <section id="sustainability-cta" className="snap-section relative overflow-y-auto no-scrollbar border-t border-border/40 bg-elevated/25">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-24 flex flex-col justify-center min-h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Whistle blowing CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide font-mono text-rubber-red-light">
                    Whistle Blowing System
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    Laporkan pelanggaran integritas, korupsi, gratifikasi, atau pelanggaran HSE secara anonim dan aman melalui portal pengaduan rahasia kami.
                  </p>
                </div>
                <Link
                  href="/sustainability/whistle-blowing"
                  className="btn-outline py-2.5 px-4 rounded text-xs flex items-center justify-center gap-2 max-w-fit uppercase tracking-wider font-semibold"
                >
                  Laporkan Kejadian <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              {/* Reach Compliance CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="glass-panel p-6 rounded-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide font-mono text-emerald-400">
                    REACH & RoHS Request
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    Ajukan surat pernyataan kepatuhan kandungan bahan berbahaya atau permohonan sertifikat RoHS untuk komoditas industri ekspor Anda.
                  </p>
                </div>
                <Link
                  href="/sustainability/reach-compliance"
                  className="btn-outline py-2.5 px-4 rounded text-xs flex items-center justify-center gap-2 max-w-fit uppercase tracking-wider font-semibold"
                >
                  Minta Sertifikasi <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
