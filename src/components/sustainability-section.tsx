"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Leaf, Recycle, Shield } from "lucide-react";

import { gsap } from "gsap";

const SustainabilityScene = dynamic(() => import("./sustainability-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-emerald-950/20 to-teal-900/10 rounded-2xl opacity-20" />
  ),
});

const commitments = [
  {
    icon: Leaf,
    title: "Kimia Hijau (Green Chemistry)",
    desc: "Produk utama kami, Resiprene 35, diformulasikan agar larut sempurna dalam pelarut non-aromatik (odorless aliphatic hydrocarbon). Menekan emisi VOC berbahaya bagi atmosfer bumi.",
  },
  {
    icon: Recycle,
    title: "Material Terbarukan & Terlacak",
    desc: "100% menggunakan getah karet alam sebagai sumber daya hayati terbarukan. Dipasok langsung dari perkebunan nasional berkelanjutan PTPN III di Sumatera Utara.",
  },
  {
    icon: Shield,
    title: "Standar Keselamatan Kerja & HSE",
    desc: "Proses hilir karet mematuhi sertifikasi K3 internasional. Bebas bahan toksik beracun (non-hazardous coating), aman bagi operator pabrik dan pengguna akhir produk kami.",
  },
];

export default function SustainabilitySection() {
  const [showScene, setShowScene] = useState(false);

  // Render/unrender the heavy 3D Canvas dynamically based on viewport visibility
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScene(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftPanelRef.current;
    const commitmentsList = commitmentsRef.current;
    const right = rightPanelRef.current;

    // Setup elements initial states
    gsap.set([left, right], { opacity: 0, y: 30 });
    if (commitmentsList) {
      gsap.set(commitmentsList.children, { opacity: 0, x: -25 });
    }

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === left) {
            gsap.to(left, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
            observer.unobserve(left);
          } else if (entry.target === commitmentsList) {
            gsap.to(commitmentsList.children, {
              opacity: 1,
              x: 0,
              stagger: 0.12,
              duration: 0.55,
              ease: "power2.out",
            });
            observer.unobserve(commitmentsList);
          } else if (entry.target === right) {
            gsap.to(right, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            observer.unobserve(right);
          }
        }
      });
    }, observerOptions);

    if (left) observer.observe(left);
    if (commitmentsList) observer.observe(commitmentsList);
    if (right) observer.observe(right);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex items-start lg:items-center font-sans">

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-20 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Commitments List */}
          <div ref={leftPanelRef} className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 dark:text-emerald-400 font-mono mb-2">
                Keberlanjutan (Sustainability)
              </p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Komitmen Terhadap Bumi & Manusia
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Nusantara Rubber Industry menerapkan standar manufaktur ramah lingkungan 
                melalui optimalisasi bahan baku alam dan proses produksi rendah karbon.
              </p>
            </div>

            <div ref={commitmentsRef} className="flex flex-col gap-3">
              {commitments.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="glass-panel p-4 rounded-md flex gap-4 items-start"
                  >
                    <div className="p-2 bg-emerald-500/10 rounded-sm shrink-0">
                      <Icon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-muted leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: 3D Emerald Leaf Scene */}
          <div ref={rightPanelRef} className="hidden lg:block lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-[280px] sm:h-[350px] lg:h-[400px] relative">
              {showScene ? (
                <SustainabilityScene />
              ) : (
                <div className="h-full w-full bg-transparent" />
              )}
              {/* Green Glow behind the scene */}
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full -z-10" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
