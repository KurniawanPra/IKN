"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import BackgroundBlobs from "./background-blobs";
import { gsap } from "gsap";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl opacity-20" style={{ background: 'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-primary))' }} />
  ),
});

const headlineWords = ["PT.", "Industri", "Karet", "Nusantara"];

const stats = [
  { value: "60+", label: "Tahun Pengalaman" },
  { value: "20+", label: "Negara Ekspor" },
  { value: "11.2%", label: "Revenue Growth" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state hides elements to prevent Flash of Unanimated Content (FOUC)
      gsap.set([tagRef.current, headlineRef.current?.children, subRef.current, descRef.current, ctaRef.current, statsRef.current?.children, sceneRef.current, scrollRef.current], {
        opacity: 0,
        y: 30,
      });

      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
        .to(
          headlineRef.current?.children ?? [],
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(
          statsRef.current?.children ?? [],
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.3"
        )
        .to(sceneRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // Scroll Down bounce animation
      const bounceArrow = scrollRef.current?.querySelector(".bounce-arrow");
      if (bounceArrow) {
        gsap.to(bounceArrow, {
          y: 4,
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar">
      <BackgroundBlobs sectionId="hero" transparentBg={true} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 px-6 pt-24 pb-12 min-h-full h-auto justify-start lg:justify-center lg:pt-20">
        {/* Text Area */}
        <div className="flex flex-col gap-6 lg:w-1/2 justify-center">
          <span
            ref={tagRef}
            className="inline-block w-fit rounded-full border border-border bg-elevated backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Since 1965 — Market Leader
          </span>

          <h1
            ref={headlineRef}
            className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            <span className="block">
              {headlineWords.map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p
            ref={subRef}
            className="text-xs md:text-sm font-semibold tracking-wider text-rubber-red-light font-mono uppercase -mt-2"
          >
            Well-Established Rubber-Based Downstream Company
          </p>

          <p
            ref={descRef}
            className="max-w-xl text-base md:text-lg leading-relaxed text-muted font-sans"
          >
            Salah satu market leader dalam hilirisasi karet alam di Indonesia. 
            Menghasilkan produk resin karet dan benang karet berkualitas premium 
            yang dipercaya di pasar domestik maupun mancanegara.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/business#business-products"
              className="btn-primary"
            >
              Katalog Produk
            </a>
            <a
              href="/about"
              className="btn-outline"
            >
              Tentang Kami
            </a>
          </div>

          {/* Stats glass card */}
          <div
            ref={statsRef}
            className="flex gap-8 border-t border-border pt-6 mt-2"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-foreground font-mono">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs text-muted-dim uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Scene Area */}
        <div
          ref={sceneRef}
          className="hidden lg:block w-full h-[250px] sm:h-[350px] lg:h-[450px] lg:w-1/2 relative"
          style={{ transform: "scale(0.95)" }}
        >
          <div className="h-full w-full relative z-10">
            <HeroScene />
          </div>
          {/* Subtle glow behind canvas */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rubber-red/10 to-transparent blur-3xl -z-10 rounded-full" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 hidden md:block animate-fade-in"
      >
        <a href="#latest-news" className="flex flex-col items-center gap-1">
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-dim font-mono">
            Scroll Down
          </span>
          <div className="bounce-arrow">
            <ChevronDown className="h-4 w-4 text-muted-dim" />
          </div>
        </a>
      </div>
    </div>
  );
}
