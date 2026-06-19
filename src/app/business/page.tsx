"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BusinessSection from "@/components/business-section";
import ProductsSection from "@/components/products-section";
import ResipreneSection from "@/components/resiprene-section";
import RubberArticlesSection from "@/components/rubber-articles-section";
import BackgroundBlobs from "@/components/background-blobs";
import { motion } from "framer-motion";
import ScrollIndicator from "@/components/scroll-indicator";
import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="relative">
      <Navbar />

      <ScrollIndicator
        position="bottom-right"
        sections={[
          { id: "business-hero", label: "Business" },
          { id: "business-process", label: "Process" },
          { id: "business-resiprene", label: "Resiprene" },
          { id: "business-rubber-articles", label: "Rubber Articles" },
          { id: "business-products", label: "Products" },
          { id: "business-cta", label: "Quotation" },
        ]}
      />

      <main className="snap-container">
        {/* Hero Header */}
        <section id="business-hero" className="snap-section relative h-[100dvh] flex flex-col items-center justify-center overflow-y-auto lg:overflow-hidden no-scrollbar">
          <BackgroundBlobs sectionId="business" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-3 inline-block"
            >
              Lini Bisnis & Produk
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-foreground md:text-5xl leading-tight mb-4"
            >
              Teknologi & Hilirisasi Karet Modern
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed text-muted"
            >
              Kami memadukan kekuatan perkebunan karet alam nasional dengan proses teknologi industri modern
              untuk menghasilkan resin dan benang karet bersertifikasi mutu ekspor.
            </motion.p>
          </div>
        </section>

        {/* Section 1: Business Process */}
        <section id="business-process" className="snap-section relative h-[100dvh] flex flex-col justify-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <BusinessSection />
        </section>

        {/* Section 2: Resiprene 35 Detail */}
        <section id="business-resiprene" className="snap-section relative h-[100dvh] flex flex-col justify-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <ResipreneSection />
        </section>

        {/* Section 3: Rubber Articles Detail */}
        <section id="business-rubber-articles" className="snap-section relative h-[100dvh] flex flex-col justify-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40 bg-elevated/10">
          <RubberArticlesSection />
        </section>

        {/* Section 4: Products Catalog */}
        <section id="business-products" className="snap-section relative h-[100dvh] flex flex-col justify-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40 bg-elevated/10">
          <ProductsSection />
        </section>

        {/* CTA Section */}
        <section id="business-cta" className="snap-section relative h-[100dvh] overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <div className="max-w-4xl mx-auto px-6 w-full py-8 lg:py-12 flex flex-col justify-center min-h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 sm:p-12 rounded-lg text-center flex flex-col items-center gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rubber-red-light/5 blur-2xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rubber-red-light/5 blur-2xl rounded-full" />

              <div className="p-3 bg-rubber-red-light/10 rounded-full">
                <Cpu className="w-8 h-8 text-rubber-red-light" />
              </div>

              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Butuh Formulir Pemesanan Kustom?</h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                Hubungi tim teknis kami untuk kustomisasi tingkat kelarutan resin karet tersiklisasi (Resiprene)
                atau ajukan simulasi e-procurement instan menggunakan B2B Quotation Form.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-2">
                <Link
                  href="/business#business-rubber-articles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-3 text-xs flex items-center justify-center gap-2"
                >
                  Resiprene Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/business#business-rubber-articles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-8 py-3 text-xs flex items-center justify-center gap-2"
                >
                  Rubber Article Products
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Footer */}
        <section id="footer" className="snap-section relative h-[100dvh] flex flex-col justify-center border-t border-border/40">
          <Footer />
        </section>
      </main>
    </div>
  );
}
