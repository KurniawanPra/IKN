"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Wrench, Clock } from "lucide-react";
import BackgroundBlobs from "./background-blobs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackedGallery from "./stacked-gallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const statsObj = { value: 0 };
    const tween = gsap.to(statsObj, {
      value: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setCount(statsObj.value);
      },
    });

    return () => {
      tween.kill();
    };
  }, [target]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup elements initial states
      gsap.set([titleRef.current, visionRef.current, rightRef.current, statsContainerRef.current], {
        opacity: 0,
        y: 40,
      });

      if (gridRef.current) {
        gsap.set(gridRef.current.children, { opacity: 0, y: 30 });
      }

      // Title & description entrance
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      });

      // Vision & mission entrance
      gsap.to(visionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 85%",
        },
      });

      // Value props grid entrance (staggered)
      if (gridRef.current) {
        gsap.to(gridRef.current.children, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        });
      }

      // Right panel (3D Scene and timeline) entrance
      gsap.to(rightRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 85%",
        },
      });

      // ScrollTrigger timeline line height drawing
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: "top 75%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      }

      // Stats entrance
      gsap.to(statsContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: statsContainerRef.current,
          start: "top 90%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="about" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              ref={titleRef}
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
            </div>

            {/* Visi & Misi card */}
            <div
              id="about-vision-mission"
              ref={visionRef}
              className="glass-panel p-4 rounded-md border-l-2 border-l-rubber-red-light"
            >
              <h3 className="text-xs font-bold text-foreground mb-1.5 uppercase tracking-wide font-mono text-rubber-red-light">
                Visi & Misi
              </h3>
              <div className="space-y-1.5 text-xs text-muted leading-relaxed">
                <p><strong>Visi:</strong> Menjadi produsen hilir karet alam terkemuka dengan reputasi global yang mengutamakan keberlanjutan and kepuasan pelanggan.</p>
                <p><strong>Misi:</strong> Mengembangkan produk karet bersertifikasi, menerapkan teknologi kimia hijau (green chemistry), serta berkontribusi positif bagi komunitas perkebunan nasional.</p>
              </div>
            </div>

            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
            >
              {valueProps.map((item) => (
                <div
                  key={item.title}
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
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div ref={rightRef} className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {/* Stacked Gallery Slideshow */}
            <div className="hidden lg:block h-[220px] md:h-[260px] w-full relative">
              <StackedGallery />
            </div>

            {/* Milestones timeline card */}
            <div
              id="about-history"
              className="glass-panel p-5 rounded-md relative max-h-[200px] overflow-y-auto no-scrollbar"
            >
              <div
                ref={timelineLineRef}
                className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-rubber-red/20"
              />
              <div className="flex flex-col gap-6">
                {milestones.map((item) => (
                  <div
                    key={item.year}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          id="about-section3"
          ref={statsContainerRef}
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
        </div>
      </div>
    </div>
  );
}
