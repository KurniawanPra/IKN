"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";
import BackgroundBlobs from "@/components/background-blobs";
import { motion } from "framer-motion";
import { Clock, Target, Compass, ArrowRight, Shield } from "lucide-react";

import ScrollIndicator from "@/components/scroll-indicator";
import VideoPlayer from "@/components/ui/video-player";
import { gsap } from "gsap";

const AboutScene = dynamic(() => import("@/components/about-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl opacity-20" style={{ background: 'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-primary))' }} />
  ),
});

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
  const visionSectionRef = useRef<HTMLDivElement>(null);
  const visionHeaderRef = useRef<HTMLDivElement>(null);
  const visionCardRef = useRef<HTMLDivElement>(null);
  const missionCardRef = useRef<HTMLDivElement>(null);

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

  // Vision & Mission Section Animation
  useEffect(() => {
    const section = visionSectionRef.current;
    const header = visionHeaderRef.current;
    const visionCard = visionCardRef.current;
    const missionCard = missionCardRef.current;

    if (!section) return;

    // Set initial state
    gsap.set([header, visionCard, missionCard], { opacity: 0, y: 40 });
    const missionItems = missionCard?.querySelectorAll(".mission-item") || [];
    if (missionItems.length > 0) {
      gsap.set(missionItems, { opacity: 0, x: 20 });
    }

    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(header, { opacity: 1, y: 0, duration: 0.6 })
            .to(visionCard, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
            .to(missionCard, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");

          if (missionItems.length > 0) {
            tl.to(
              missionItems,
              {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.3"
            );
          }

          observer.unobserve(section);
        }
      });
    }, observerOptions);

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      
      <ScrollIndicator
        sections={[
          { id: "about-hero", label: "About" },
          { id: "about-history", label: "History" },
          { id: "about-vision-mission", label: "Visi & Misi" },
          { id: "about-video", label: "Video" },
          { id: "about-contact", label: "Contact Us" },
        ]}
      />

      <main className="snap-container">
        {/* Hero Header */}
        <section id="about-hero" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar">
          <BackgroundBlobs sectionId="about" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 lg:py-0 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Panel: Content */}
              <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-1 inline-block"
                >
                  Tentang Kami
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl font-bold text-foreground md:text-5xl leading-[1.15] tracking-tight"
                >
                  Warisan Keunggulan Industri Karet Alam
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm md:text-base leading-relaxed text-muted max-w-xl"
                >
                  PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan Nusantara III (Persero),
                  telah menjadi pelopor hilirisasi karet sejak didirikan. Kami memproses getah karet
                  menjadi resin berkualitas ekspor untuk rantai pasok industri global.
                </motion.p>
              </div>

              {/* Right Panel: 3D Canvas Scene */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:block lg:col-span-5 h-[320px] md:h-[400px] relative"
              >
                <AboutScene />
                {/* Glow behind canvas */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rubber-red/10 to-transparent blur-3xl -z-10 rounded-full" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section 1: History */}
        <section id="about-history" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-0 w-full">
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
        <section id="about-vision-mission" ref={visionSectionRef} className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40 bg-elevated/5">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-0 w-full">
            <div ref={visionHeaderRef} className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2 text-rubber-red-light">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Integrity & Standard</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl tracking-tight">Visi dan Misi Perusahaan</h2>
              <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto mt-2 leading-relaxed">
                Landasan etos kerja dan komitmen jangka panjang kami untuk menghasilkan produk hilir karet alam terbaik di kancah global.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
              {/* Vision Card */}
              <div
                ref={visionCardRef}
                className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-xl flex flex-col gap-5 border border-border relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Accent line */}
                <div className="bg-gradient-to-r from-rubber-red-light to-amber-500 h-1 absolute top-0 left-0 right-0" />
                {/* Accent glow */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-rubber-red/5 group-hover:bg-rubber-red/10 blur-3xl rounded-full transition-colors duration-500 pointer-events-none" />
                {/* Tech Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.06] pointer-events-none" />

                <div className="p-3 bg-rubber-red-light/10 text-rubber-red-light rounded-full w-12 h-12 flex items-center justify-center relative overflow-visible group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <div className="absolute inset-0 rounded-full border border-rubber-red-light/30 animate-ping opacity-60 pointer-events-none" />
                  <Compass className="w-5 h-5 text-rubber-red-light" />
                </div>
                
                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-rubber-red-light transition-colors duration-300">VISION</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
                    To be a leading downstream rubber industry company that fulfills customer needs through excellent corporate governance and demonstrates strong global competitiveness.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div
                ref={missionCardRef}
                className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-xl flex flex-col gap-5 border border-border relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Accent line */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1 absolute top-0 left-0 right-0" />
                {/* Accent glow */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/5 group-hover:bg-emerald-500/10 blur-3xl rounded-full transition-colors duration-500 pointer-events-none" />
                {/* Tech Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.06] pointer-events-none" />

                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full w-12 h-12 flex items-center justify-center relative overflow-visible group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-60 pointer-events-none" />
                  <Target className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="flex flex-col gap-3.5 relative z-10 flex-1 justify-center">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors duration-300">MISSIONS</h3>
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Row 1 */}
                    <div className="glass-panel p-3 rounded-lg flex gap-3.5 items-start group/item hover:bg-elevated hover:border-rubber-red-light/20 transition-all duration-300 shadow-sm relative overflow-hidden mission-item">
                      <span className="text-[10px] font-bold text-rubber-red-light font-mono bg-rubber-red-light/5 px-2 py-0.5 rounded-sm border border-rubber-red-light/10 shrink-0 mt-0.5">01</span>
                      <p className="text-xs text-muted leading-relaxed flex-1">
                        Committed to producing high-quality downstream rubber products that meet established quality standards and are tailored to customer needs and expectations.
                      </p>
                    </div>

                    {/* Row 2 */}
                    <div className="glass-panel p-3 rounded-lg flex gap-3.5 items-start group/item hover:bg-elevated hover:border-emerald-500/20 transition-all duration-300 shadow-sm relative overflow-hidden mission-item">
                      <span className="text-[10px] font-bold text-emerald-500 font-mono bg-emerald-500/5 px-2 py-0.5 rounded-sm border border-emerald-500/10 shrink-0 mt-0.5">02</span>
                      <p className="text-xs text-muted leading-relaxed flex-1">
                        Committed to fostering a measurable and purpose-driven work environment supported by sound corporate governance.
                      </p>
                    </div>

                    {/* Row 3 */}
                    <div className="glass-panel p-3 rounded-lg flex gap-3.5 items-start group/item hover:bg-elevated hover:border-amber-500/20 transition-all duration-300 shadow-sm relative overflow-hidden mission-item">
                      <span className="text-[10px] font-bold text-amber-500 font-mono bg-amber-500/5 px-2 py-0.5 rounded-sm border border-amber-500/10 shrink-0 mt-0.5">03</span>
                      <p className="text-xs text-muted leading-relaxed flex-1">
                        To develop human resources guided by <strong className="text-foreground">AKHLAK</strong> values: Trustworthy, Competent, Harmonious, Loyal, Adaptive, and Collaborative.
                      </p>
                    </div>

                    {/* Row 4 */}
                    <div className="glass-panel p-3 rounded-lg flex gap-3.5 items-start group/item hover:bg-elevated hover:border-blue-500/20 transition-all duration-300 shadow-sm relative overflow-hidden mission-item">
                      <span className="text-[10px] font-bold text-blue-550 dark:text-blue-400 font-mono bg-blue-500/5 px-2 py-0.5 rounded-sm border border-blue-500/10 shrink-0 mt-0.5">04</span>
                      <p className="text-xs text-muted leading-relaxed flex-1">
                        To establish mutually beneficial strategic partnerships with customers and stakeholders.
                      </p>
                    </div>

                    {/* Row 5 */}
                    <div className="glass-panel p-3 rounded-lg flex gap-3.5 items-start group/item hover:bg-elevated hover:border-purple-500/20 transition-all duration-300 shadow-sm relative overflow-hidden mission-item">
                      <span className="text-[10px] font-bold text-purple-500 dark:text-purple-400 font-mono bg-purple-500/5 px-2 py-0.5 rounded-sm border border-purple-500/10 shrink-0 mt-0.5">05</span>
                      <p className="text-xs text-muted leading-relaxed flex-1">
                        To utilize and develop technology in business processes.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Company Profile Video */}
        <section id="about-video" className="snap-section relative flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar border-t border-border/40">
          <BackgroundBlobs transparentBg={true} />
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-0 w-full z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Video Description */}
              <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-1 inline-block"
                >
                  Company Profile Video
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl font-bold text-foreground sm:text-3xl leading-tight"
                >
                  PT Industri Karet Nusantara
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xs sm:text-sm leading-relaxed text-muted flex flex-col gap-3 font-sans max-h-[35vh] overflow-y-auto pr-2"
                >
                  <p>
                    Experienced since 1965, PT. Nusantara Rubber Industry (PT. IKN), was founded as a subsidiary of PT. Perkebunan Nusantara III (Persero) and become a rubber-based downstream company. PT. The Nusantara Rubber Industry fully understands that knowledge and experience in creating products with strong advantages is the key in the competition to become market leader in the rubber industry.
                  </p>
                  <p>
                    We always strive to provide solutions to our customers by producing high quality products made from the best quality natural rubber, ready to use and specially designed according to market needs. We are committed to always maintaining our customer satisfaction by maintaining product excellence, on time delivery, service and ease of doing business.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Video Player */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 w-full flex items-center justify-center"
              >
                <div className="w-full aspect-video glass-panel p-3 rounded-xl border border-border">
                  <VideoPlayer src="https://youtu.be/FGJQW6l2hrk?si=7GnnGxaKmc4BvmyP" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section 3: Contact Us */}
        <section id="about-contact" className="snap-section relative overflow-y-auto no-scrollbar border-t border-border/40">
          <ContactSection />
          <Footer />
        </section>
      </main>
    </div>
  );
}
