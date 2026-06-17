"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { Shield, Wrench, Clock } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const AboutScene = dynamic(() => import("./about-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-emerald-950/20 to-teal-900/10 rounded-2xl opacity-20" />
  ),
});

const valueProps = [
  {
    icon: Shield,
    title: "Kualitas & Reputasi Global",
    desc: "Pemahaman mendalam terhadap standar produk dan reputasi market leader hilirisasi karet.",
  },
  {
    icon: Wrench,
    title: "Solusi Kustomisasi Industri",
    desc: "Menyediakan resin karet alam dan benang karet siap pakai maupun custom-design.",
  },
  {
    icon: Clock,
    title: "Pengiriman Tepat Waktu",
    desc: "Mengutamakan kepuasan klien B2B global dengan ketepatan dan efisiensi logistik.",
  },
];

const milestones = [
  { year: "1965", desc: "Awal berdiri sebagai bagian dari ekosistem perkebunan nasional." },
  { year: "1996", desc: "Produksi Resiprene 35, resin karet tersiklisasi pertama di Indonesia." },
  { year: "2006", desc: "Resmi berdiri sebagai PT. Industri Karet Nusantara di bawah PTPN III." },
  { year: "2024", desc: "Perluasan ekspor resin karet ke pasar Eropa Barat dan Oceania." },
  { year: "2026", desc: "Peresmian platform e-commerce IKN Store untuk pasar domestik." },
];

const stats = [
  { target: 60, suffix: "+", label: "Tahun Pengalaman" },
  { target: 20, suffix: "+", label: "Negara Tujuan Ekspor" },
  { target: 11.2, suffix: "%", label: "Revenue Growth 2024", isDecimal: true },
];

function CountUp({
  target,
  suffix,
  isDecimal = false,
}: {
  target: number;
  suffix: string;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const duration = 2000;
    const startTime = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, target]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function AboutSection() {
  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="about" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl leading-tight">
                Warisan Keunggulan Industri Karet Alam
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-muted">
                PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan
                Nusantara III (Persero), telah menjadi pelopor hilirisasi karet
                sejak didirikan. Melalui teknologi modern dan pengawasan kualitas
                ketat, kami memproses getah karet alam menjadi resin berkualitas 
                ekspor untuk mendukung rantai pasok industri global.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {valueProps.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardVariants as unknown as Variants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="glass-panel glass-panel-hover p-5 rounded-md flex flex-col items-start gap-3"
                >
                  <item.icon className="h-6 w-6 text-rubber-red-light shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {/* 3D Scene of Polymer Chain (No outline or boxes, floats freely) */}
            <div className="hidden lg:block h-[220px] md:h-[260px] w-full relative">
              <AboutScene />
            </div>

            {/* Milestones timeline card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-5 rounded-md relative max-h-[200px] overflow-y-auto no-scrollbar"
            >
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-rubber-red/20" />
              <div className="flex flex-col gap-6">
                {milestones.map((item, i) => (
                  <motion.div
                    key={item.year}
                    variants={timelineItemVariants as unknown as Variants}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative pl-8 flex gap-4 items-start"
                  >
                    <div className="absolute left-[3px] top-1.5 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-rubber-red ring-4 ring-rubber-red/20" />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-xs text-rubber-red-light">
                        {item.year}
                      </span>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 md:mt-16 grid gap-6 border-t border-border pt-8 grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">
                <CountUp
                  target={stat.target}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                />
              </div>
              <span className="text-[10px] md:text-xs text-muted-dim uppercase tracking-wider mt-1 block">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
