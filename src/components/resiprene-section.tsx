"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Droplets, Shield, Zap, Palette, ChevronRight, ExternalLink } from "lucide-react";

const tabs = ["Overview", "Specifications", "Solubility", "Applications"] as const;
type Tab = (typeof tabs)[number];

const specs = [
  { label: "Softening Point", value: "125 – 145", unit: "°C", method: "—" },
  { label: "Viscosity", value: "18 – 24", unit: "Seconds", method: "DIN 53211" },
  { label: "Color", value: "11 – 13", unit: "Lovibond", method: "—" },
  { label: "Acid Value", value: "Max. 5", unit: "mg KOH/g", method: "—" },
  { label: "Density", value: "0.88 – 0.98", unit: "g/ml", method: "—" },
  { label: "Appearance", value: "Clear", unit: "—", method: "—" },
];

const solubility = [
  { solvent: "White Spirit", level: "Perfect" },
  { solvent: "Petroleum Solvent 100–140°C", level: "Perfect" },
  { solvent: "Aromatic Oil", level: "Perfect" },
  { solvent: "Xylene", level: "Perfect" },
  { solvent: "Toluene", level: "Perfect" },
  { solvent: "Mineral Oil", level: "Good" },
  { solvent: "Aliphatic Solvent", level: "Good" },
  { solvent: "Vegetable Oil", level: "Good" },
  { solvent: "n-Butyl Acetate", level: "Limited" },
  { solvent: "Methyl Ethyl Ketone (MEK)", level: "Insoluble" },
  { solvent: "n-Butane", level: "Insoluble" },
];

const applications = [
  { icon: Shield, title: "Protective Coatings", desc: "High-performance anti-corrosion coatings for industrial structures, pipelines, and heavy equipment." },
  { icon: Droplets, title: "Ship / Anti-Fouling Paint", desc: "Marine-grade coatings that prevent biofouling on ship hulls with excellent water resistance." },
  { icon: Zap, title: "Concrete Coating", desc: "Durable protective coating for new and weathered concrete surfaces in industrial environments." },
  { icon: Palette, title: "Odor-Free Finishing", desc: "Environmentally compliant finishing coatings using odorless aliphatic solvents." },
];

const characteristics = [
  { icon: Zap, label: "Quick Drying" },
  { icon: Droplets, label: "Highly Water-Resistant" },
  { icon: Shield, label: "Chemical Resistance (Alkali & Acid)" },
  { icon: FlaskConical, label: "Excellent Adhesion to Various Substrates" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

function levelColor(level: string) {
  if (level === "Perfect") return "text-emerald-400";
  if (level === "Good") return "text-amber-400";
  if (level === "Limited") return "text-orange-400";
  return "text-red-400";
}

function levelDot(level: string) {
  if (level === "Perfect") return "bg-emerald-400";
  if (level === "Good") return "bg-amber-400";
  if (level === "Limited") return "bg-orange-400";
  return "bg-red-400";
}

export default function ResipreneSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="relative w-full flex items-start lg:items-center font-sans">

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-12 lg:pt-28 lg:pb-16 w-full min-h-full flex flex-col justify-start lg:justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
            Resiprene Products
          </p>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            RESIPRENE 35
          </h2>
          <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">
            Cyclicised natural rubber resin produced by PT. Industri Karet Nusantara with modern,
            environmentally friendly manufacturing. Soluble in odorless aliphatic solvents — no aromatic
            hydrocarbons required.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {characteristics.map((c) => {
              const Icon = c.icon;
              return (
                <span key={c.label} className="inline-flex items-center gap-1.5 text-[10px] bg-rubber-red-light/10 text-rubber-red-light px-2.5 py-1 rounded-sm font-mono border border-rubber-red-light/20">
                  <Icon className="w-3 h-3" />
                  {c.label}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border/40 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors relative ${
                activeTab === tab
                  ? "text-foreground"
                  : "text-muted hover:text-foreground/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="resiprene-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-rubber-red-light"
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
            {/* Key Advantages */}
            <div className="glass-panel p-6 rounded-md">
              <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
                Key Advantages
              </h3>
              <ul className="space-y-3">
                {[
                  "Soluble in odorless aliphatic hydrocarbon solvents",
                  "No aromatic hydrocarbon required in formulation",
                  "Meets strict VOC emission regulations",
                  "Quick drying with excellent water resistance",
                  "Chemical resistance to alkali and acid",
                  "Excellent adhesion to various substrates",
                  "Easily compatible with other raw materials",
                  "No limitations in pigment and filler selection",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="flex items-start gap-2 text-xs text-muted leading-relaxed"
                  >
                    <ChevronRight className="w-3 h-3 text-rubber-red-light mt-0.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Quick Specs Preview */}
            <div className="glass-panel p-6 rounded-md">
              <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
                Product Specifications
              </h3>
              <div className="space-y-2.5">
                {specs.map((s, i) => (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0"
                  >
                    <span className="text-[10px] text-muted font-mono">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground font-mono">{s.value}</span>
                      <span className="text-[9px] text-muted-dim">{s.unit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-elevated/50 rounded border border-border/30">
                <p className="text-[10px] text-muted leading-relaxed">
                  <span className="text-rubber-red-light font-semibold">Compatibility:</span> Easily compatible
                  with other raw materials. Good pigment binding properties with no limitations in pigment
                  and filler selection.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Specifications" && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-panel rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-elevated/30">
                    <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Property</th>
                    <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Range</th>
                    <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Units</th>
                    <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted hidden sm:table-cell">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((s, i) => (
                    <motion.tr
                      key={s.label}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      className="border-b border-border/20 last:border-0 hover:bg-elevated/20 transition-colors"
                    >
                      <td className="px-5 py-3 text-foreground font-medium">{s.label}</td>
                      <td className="px-5 py-3 font-mono font-bold text-foreground">{s.value}</td>
                      <td className="px-5 py-3 text-muted-dim">{s.unit}</td>
                      <td className="px-5 py-3 text-muted-dim hidden sm:table-cell">{s.method}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "Solubility" && (
          <motion.div
            key="solubility"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {solubility.map((s, i) => (
              <motion.div
                key={s.solvent}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className="glass-panel p-3.5 rounded-md flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${levelDot(s.level)}`} />
                  <span className="text-xs text-foreground">{s.solvent}</span>
                </div>
                <span className={`text-[10px] font-mono font-semibold ${levelColor(s.level)}`}>
                  {s.level}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "Applications" && (
          <motion.div
            key="applications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="glass-panel glass-panel-hover p-5 rounded-md"
                >
                  <Icon className="w-8 h-8 text-rubber-red-light mb-3" />
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{app.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{app.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-end"
        >
          <a
            href="https://ikn.co.id/resiprine-products/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-rubber-red-light hover:text-rubber-red-light/80 transition-colors"
          >
            View on ikn.co.id <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
