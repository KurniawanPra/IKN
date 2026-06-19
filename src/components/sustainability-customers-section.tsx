"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  BookOpen,
  Globe,
  Anchor,
  Factory,
  Shirt,
  Car,
  TreePine,
  Building2,
  MapPin,
  ExternalLink,
} from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const tabs = ["Overview", "Industry Segments", "Export Regions", "Partnership"] as const;
type Tab = (typeof tabs)[number];

const customerSectors = [
  {
    icon: Anchor,
    title: "Marine Coating & Paint Manufacturers",
    desc: "Formulator cat kapal dan cat pelindung korosi luar ruangan berskala internasional.",
    products: ["Resiprene 35", "Cyclized Rubber"],
    regions: ["Europe", "Southeast Asia"],
  },
  {
    icon: TreePine,
    title: "PTPN III Perkebunan Nusantara",
    desc: "Sinergi rantai pasok lateks segar nasional yang berkelanjutan dari perkebunan Sumatera Utara.",
    products: ["Raw Latex Supply"],
    regions: ["Indonesia"],
  },
  {
    icon: Shirt,
    title: "Textile & Garment Industries",
    desc: "Produsen pakaian olahraga dan elastis global yang mengimpor benang karet premium kami.",
    products: ["Rubber Thread", "Rubber Articles"],
    regions: ["Asia Pacific", "Europe"],
  },
  {
    icon: Car,
    title: "Automotive Adhesive Formulators",
    desc: "Manufaktur perekat industri bersuhu tinggi untuk komponen otomotif dan sealant.",
    products: ["Resiprene 35", "RUBIN"],
    regions: ["Japan", "Germany"],
  },
  {
    icon: Building2,
    title: "Construction & Infrastructure",
    desc: "Kontraktor dan developer yang menggunakan coating beton dan waterproofing berbasis resin karet.",
    products: ["Resiprene 35", "Concrete Coating"],
    regions: ["Middle East", "Southeast Asia"],
  },
  {
    icon: Factory,
    title: "General Industrial Applications",
    desc: "Berbagai industri manufaktur yang membutuhkan bahan baku karet alam berkualitas tinggi.",
    products: ["Cyclized Rubber", "Rubber Articles"],
    regions: ["Global"],
  },
];

const exportRegions = [
  { region: "Europe", countries: ["Germany", "Netherlands", "UK", "France"], share: "35%", color: "bg-blue-400" },
  { region: "Asia Pacific", countries: ["Japan", "South Korea", "Australia", "India"], share: "30%", color: "bg-emerald-400" },
  { region: "Southeast Asia", countries: ["Malaysia", "Thailand", "Vietnam", "Singapore"], share: "20%", color: "bg-amber-400" },
  { region: "Middle East & Oceania", countries: ["UAE", "Saudi Arabia", "New Zealand"], share: "15%", color: "bg-purple-400" },
];

const partnerships = [
  { title: "Long-Term Supply Agreements", desc: "Kontrak pasokan jangka panjang dengan harga kompetitif dan jaminan ketersediaan bahan baku." },
  { title: "Custom Formulation Support", desc: "Dukungan formulasi kustom sesuai kebutuhan spesifik industri pelanggan (solvent, viscosity, drying time)." },
  { title: "Technical Documentation", desc: "Penyediaan SDS, TDS, Certificate of Analysis, dan dokumen ekspor lengkap untuk setiap pengiriman." },
  { title: "Quality Assurance Program", desc: "Program jaminan mutu dengan batch testing, sample retention, dan traceability system." },
  { title: "Responsive Logistics", desc: "Pengiriman tepat waktu melalui pelabuhan Belawan dengan packaging standar kargo internasional." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

export default function SustainabilityCustomersSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="relative min-h-full w-full flex items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="sustainability-cust" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-20 w-full min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Jejaring Mitra
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Segmen Industri Pelanggan Kami
          </h2>
          <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">
            Mendukung berbagai sektor manufaktur B2B di Asia, Eropa, dan Australia melalui
            pengapalan kargo terpercaya sejak 1965.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { label: "60+ Years", desc: "Industry Experience" },
              { label: "4 Continents", desc: "Export Destinations" },
              { label: "6 Sectors", desc: "Industry Segments" },
            ].map((stat) => (
              <div key={stat.label} className="bg-elevated/50 border border-border/40 px-4 py-2 rounded-sm">
                <p className="text-sm font-bold text-foreground font-mono">{stat.label}</p>
                <p className="text-[9px] text-muted font-mono">{stat.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border/40 pb-px overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                activeTab === tab ? "text-foreground" : "text-muted hover:text-foreground/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="cust-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Top sectors */}
            <div className="glass-panel p-6 rounded-md">
              <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
                Top Industry Segments
              </h3>
              <div className="space-y-2.5">
                {customerSectors.slice(0, 4).map((sector, i) => {
                  const Icon = sector.icon;
                  return (
                    <motion.div
                      key={sector.title}
                      variants={fadeUp as unknown as Variants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      className="flex gap-3 items-start p-2.5 rounded border border-border/30 hover:border-emerald-500/20 transition-colors"
                    >
                      <div className="p-1.5 bg-emerald-500/10 rounded shrink-0">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{sector.title}</p>
                        <p className="text-[10px] text-muted mt-0.5 leading-relaxed line-clamp-1">
                          {sector.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Export summary */}
            <div className="glass-panel p-6 rounded-md">
              <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
                Export Destinations
              </h3>
              <div className="space-y-3">
                {exportRegions.map((region, i) => (
                  <motion.div
                    key={region.region}
                    variants={fadeUp as unknown as Variants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${region.color}`} />
                      <span className="text-xs text-foreground">{region.region}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] text-muted-dim font-mono">
                        {region.countries.slice(0, 2).join(", ")}
                        {region.countries.length > 2 && ` +${region.countries.length - 2}`}
                      </span>
                      <span className="text-xs font-bold text-foreground font-mono w-10 text-right">
                        {region.share}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-emerald-500/5 rounded border border-emerald-500/10">
                <p className="text-[10px] text-muted leading-relaxed">
                  <span className="text-emerald-400 font-semibold">Export Hub:</span> Pelabuhan Belawan,
                  Medan — dengan packaging standar kargo internasional dan dokumentasi ekspor lengkap.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Industry Segments" && (
          <motion.div
            key="segments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {customerSectors.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={sector.title}
                  variants={fadeUp as unknown as Variants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="glass-panel glass-panel-hover p-5 rounded-md"
                >
                  <Icon className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="text-xs font-bold text-foreground mb-1.5">{sector.title}</h3>
                  <p className="text-[10px] text-muted leading-relaxed mb-3">{sector.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {sector.products.map((p) => (
                      <span
                        key={p}
                        className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-sm font-mono border border-emerald-500/20"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "Export Regions" && (
          <motion.div
            key="export"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {exportRegions.map((region, i) => (
              <motion.div
                key={region.region}
                variants={fadeUp as unknown as Variants}
                initial="hidden"
                animate="visible"
                custom={i}
                className="glass-panel p-5 rounded-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-foreground">{region.region}</h3>
                  </div>
                  <span className="text-lg font-bold text-foreground font-mono">{region.share}</span>
                </div>

                <div className="space-y-2">
                  {region.countries.map((country) => (
                    <div key={country} className="flex items-center gap-2 text-xs text-muted">
                      <MapPin className="w-3 h-3 text-emerald-400/60" />
                      {country}
                    </div>
                  ))}
                </div>

                {/* Visual bar */}
                <div className="mt-4 h-1.5 bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${region.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: region.share }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "Partnership" && (
          <motion.div
            key="partnership"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {partnerships.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp as unknown as Variants}
                initial="hidden"
                animate="visible"
                custom={i}
                className="glass-panel p-4 rounded-md flex gap-3 items-start"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-[10px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-end"
        >
          <a
            href="https://ikn.co.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 hover:text-emerald-400/80 transition-colors"
          >
            View on ikn.co.id <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
