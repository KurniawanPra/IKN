"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { Leaf, Recycle, Shield } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

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

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function SustainabilitySection() {
  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="sustainability" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Commitments List */}
          <div className="lg:col-span-7 flex flex-col gap-5">
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

            <div className="flex flex-col gap-3">
              {commitments.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={cardVariants as unknown as Variants}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
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
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: 3D Emerald Leaf Scene (No cut-off boxes or labels) */}
          <div className="hidden lg:block lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-[280px] sm:h-[350px] lg:h-[400px] relative">
              <SustainabilityScene />
              {/* Green Glow behind the scene */}
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full -z-10" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
