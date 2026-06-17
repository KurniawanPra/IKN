"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Wrench, Clock } from "lucide-react";

const valueProps = [
  {
    icon: Shield,
    title: "Product Knowledge & Reputation",
    desc: "Pemahaman mendalam terhadap produk dan reputasi sebagai market leader menjadi penentu pilihan klien",
  },
  {
    icon: Wrench,
    title: "Complete Solution & Custom Design",
    desc: "Solusi lengkap dari karet alam berkualitas, siap pakai atau custom-design sesuai kebutuhan",
  },
  {
    icon: Clock,
    title: "Customer Satisfaction & Prompt Delivery",
    desc: "Mengutamakan kepuasan pelanggan dengan ketepatan waktu pengiriman",
  },
];

const milestones = [
  { year: "1965", desc: "Awal berdiri sebagai bagian dari ekosistem perkebunan nasional" },
  { year: "1996", desc: "Mulai produksi Resiprene 35, resin karet alam tersiklisasi pertama di Indonesia" },
  { year: "2006", desc: "Resmi berdiri sebagai PT. Industri Karet Nusantara di bawah PTPN III" },
  { year: "2024", desc: "Partisipasi di pameran B2B Chemical Indonesia, JIExpo Kemayoran. Revenue growth 11.2%" },
  { year: "2026", desc: "Peresmian IKN Store oleh Plt. Direktur V.T. Moses Situmorang & SEVP Amalia Nasution" },
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
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#142040]"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="flex flex-col gap-8 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <span className="text-sm font-medium uppercase tracking-widest text-[#8b1a1a]">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-bold text-[#f0f0ec] md:text-4xl">
                Warisan 60 Tahun Keunggulan Industri Karet
              </h2>
              <p className="leading-relaxed text-[#c0c0c0]">
                PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan
                Nusantara III (Persero), telah menjadi perusahaan hilirisasi karet
                terkemuka sejak didirikan. Dengan dukungan teknologi modern dan
                pengawasan ahli bereputasi tinggi, IKN menghasilkan produk resin
                karet berkualitas tertinggi yang diekspor ke pasar global.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {valueProps.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-sm border border-white/5 bg-[#0a1628]/50 p-5 transition-colors duration-300 hover:border-[#8b1a1a]/30"
                >
                  <div className="flex items-start gap-4">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#8b1a1a]" />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-[#f0f0ec]">
                        {item.title}
                      </span>
                      <span className="text-sm text-[#c0c0c0]">{item.desc}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-8"
            >
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[#8b1a1a]/30" />
              <div className="flex flex-col gap-10">
                {milestones.map((item, i) => (
                  <motion.div
                    key={item.year}
                    variants={timelineItemVariants}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-1 flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-[#8b1a1a]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono font-bold text-[#8b1a1a]">
                        {item.year}
                      </span>
                      <span className="text-sm text-[#c0c0c0]">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 grid gap-8 border-t border-white/5 pt-12 md:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-[#f0f0ec]">
                <CountUp
                  target={stat.target}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                />
              </div>
              <span className="text-sm text-[#c0c0c0]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
