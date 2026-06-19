"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Award,
  FileCheck,
  Leaf,
  Factory,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const tabs = ["Overview", "ISO Certificates", "Compliance", "Standards"] as const;
type Tab = (typeof tabs)[number];

const certificates = [
  {
    icon: Award,
    title: "ISO 9001:2015",
    category: "Quality Management",
    desc: "Sertifikasi Sistem Manajemen Mutu internasional yang menjamin standardisasi proses produksi hilir karet dari hulu ke hilir.",
    scope: [
      "Proses produksi resin tersiklisasi (Resiprene 35)",
      "Pengendalian mutu bahan baku lateks segar",
      "Audit internal & tinjauan manajemen berkala",
      "Kepuasan pelanggan & penanganan keluhan",
    ],
    issuedBy: "Badan Sertifikasi Internasional",
    validUntil: "Sertifikasi aktif, audit tahunan",
  },
  {
    icon: Leaf,
    title: "ISO 14001:2015",
    category: "Environmental Management",
    desc: "Sistem Manajemen Lingkungan yang membuktikan komitmen perusahaan dalam meminimalkan emisi karbon, limbah, dan dampak ekologis.",
    scope: [
      "Pengelolaan limbah B3 dan non-B3",
      "Efisiensi energi & pengurangan emisi VOC",
      "Penggunaan pelarut odorless (green chemistry)",
      "Program daur ulang & circular economy",
    ],
    issuedBy: "Badan Sertifikasi Internasional",
    validUntil: "Sertifikasi aktif, audit tahunan",
  },
  {
    icon: Factory,
    title: "ISO 45001:2018",
    category: "Occupational Health & Safety",
    desc: "Sertifikasi Sistem Manajemen Kesehatan & Keselamatan Kerja (K3) untuk melindungi seluruh operator dan staf pabrik.",
    scope: [
      "Identifikasi bahaya & penilaian risiko kerja",
      "APD standar & prosedur keselamatan operasi",
      "Pelatihan K3 berkala untuk seluruh karyawan",
      "Investigasi insiden & tindakan perbaikan",
    ],
    issuedBy: "Badan Sertifikasi Internasional",
    validUntil: "Sertifikasi aktif, audit tahunan",
  },
];

const complianceData = [
  {
    icon: ShieldCheck,
    title: "REACH Compliant",
    region: "European Union",
    desc: "Pernyataan bebas bahan kimia berbahaya SVHC (Substance of Very High Concern) sesuai regulasi REACH Uni Eropa (EC 1907/2006).",
    details: [
      "Tidak mengandung SVHC di atas batas 0.1% (w/w)",
      "Pre-registrasi zat kimia telah dilakukan",
      "SDS (Safety Data Sheet) tersedia dalam bahasa Inggris",
      "Uji laboratorium independen terakreditasi",
    ],
  },
  {
    icon: FileCheck,
    title: "RoHS Certified",
    region: "International",
    desc: "Kepatuhan terhadap pembatasan zat berbahaya (Restriction of Hazardous Substances) pada seluruh produk akhir.",
    details: [
      "Bebas timbal (Pb), merkuri (Hg), kadmium (Cd)",
      "Bebas kromium heksavalen (Cr VI)",
      "Bebas PBBDE dan PBDE (flame retardants)",
      "Dokumentasi DoC (Declaration of Conformity) tersedia",
    ],
  },
];

const standards = [
  { label: "Green Chemistry Principles", status: "Implemented" },
  { label: "VOC Emission Reduction", status: "Active" },
  { label: "Non-Hazardous Coating Formulation", status: "Certified" },
  { label: "Sustainable Natural Rubber Sourcing", status: "100% PTPN III" },
  { label: "Waste Management (B3 & Non-B3)", status: "Compliant" },
  { label: "Energy Efficiency Program", status: "Ongoing" },
  { label: "Worker Safety Training", status: "Annual" },
  { label: "Export Documentation (EU/Asia/Oceania)", status: "Available" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

export default function SustainabilityCertificateSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="relative min-h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="sustainability-cert" />

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
            <Award className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Sertifikasi Internasional
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Standar Mutu & Regulasi Global
          </h2>
          <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">
            Kami mematuhi standar sertifikasi internasional dan regulasi lingkungan untuk menjamin
            kualitas produk serta keselamatan operator dan pengguna akhir.
          </p>

          {/* Quick badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["ISO 9001", "ISO 14001", "ISO 45001", "REACH", "RoHS"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-sm font-mono border border-emerald-500/20"
              >
                <CheckCircle2 className="w-3 h-3" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border/40 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors relative ${
                activeTab === tab ? "text-foreground" : "text-muted hover:text-foreground/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="cert-tab-indicator"
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
            {/* Certificates overview */}
            <div className="glass-panel p-6 rounded-md">
              <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
                ISO Certifications
              </h3>
              <div className="space-y-3">
                {certificates.map((cert, i) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={cert.title}
                      variants={fadeUp as unknown as Variants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      className="flex gap-3 items-start p-3 rounded border border-border/30 hover:border-emerald-500/20 transition-colors"
                    >
                      <div className="p-1.5 bg-emerald-500/10 rounded shrink-0">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{cert.title}</p>
                        <p className="text-[10px] text-emerald-400/80 font-mono">{cert.category}</p>
                        <p className="text-[10px] text-muted mt-1 leading-relaxed line-clamp-2">
                          {cert.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Compliance overview */}
            <div className="glass-panel p-6 rounded-md">
              <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider mb-4">
                Regulatory Compliance
              </h3>
              <div className="space-y-4">
                {complianceData.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp as unknown as Variants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      className="p-3 rounded border border-border/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="text-xs font-bold text-foreground">{item.title}</p>
                          <p className="text-[9px] text-muted font-mono">{item.region}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-emerald-500/5 rounded border border-emerald-500/10">
                <p className="text-[10px] text-muted leading-relaxed">
                  <span className="text-emerald-400 font-semibold">Green Chemistry:</span> Resiprene 35
                  diformulasikan agar larut dalam pelarut non-aromatik (odorless), menekan emisi VOC
                  berbahaya sesuai prinsip kimia hijau.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "ISO Certificates" && (
          <motion.div
            key="iso"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {certificates.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.title}
                  variants={fadeUp as unknown as Variants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="glass-panel p-5 rounded-md"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-emerald-500/10 rounded shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground">{cert.title}</h3>
                      <p className="text-[10px] text-emerald-400 font-mono">{cert.category}</p>
                      <p className="text-xs text-muted mt-2 leading-relaxed">{cert.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-elevated/30 rounded border border-border/20">
                      <p className="text-[9px] font-mono text-muted-dim uppercase mb-2">Scope</p>
                      <ul className="space-y-1.5">
                        {cert.scope.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-[10px] text-muted">
                            <ChevronRight className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-elevated/30 rounded border border-border/20 space-y-3">
                      <div>
                        <p className="text-[9px] font-mono text-muted-dim uppercase">Issued By</p>
                        <p className="text-[10px] text-foreground mt-0.5">{cert.issuedBy}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-muted-dim uppercase">Status</p>
                        <p className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {cert.validUntil}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "Compliance" && (
          <motion.div
            key="compliance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {complianceData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp as unknown as Variants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="glass-panel p-5 rounded-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                      <p className="text-[9px] text-muted font-mono">{item.region}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.details.map((d) => (
                      <li key={d} className="flex items-start gap-1.5 text-[10px] text-muted">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "Standards" && (
          <motion.div
            key="standards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-panel rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-elevated/30">
                    <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                      Standard / Program
                    </th>
                    <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {standards.map((s, i) => (
                    <motion.tr
                      key={s.label}
                      variants={fadeUp as unknown as Variants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      className="border-b border-border/20 last:border-0 hover:bg-elevated/20 transition-colors"
                    >
                      <td className="px-5 py-3 text-foreground">{s.label}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          {s.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
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
