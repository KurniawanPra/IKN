"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle, FileText, Send, User, UserX, ChevronDown } from "lucide-react";

export default function SustainabilityWhistleblowingSection() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [category, setCategory] = useState("Penyuapan & Korupsi");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [reportedName, setReportedName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Reporter info (if not anonymous)
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate a random ticket code
      const rand = Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(`WBS-IKN-${rand}`);
    }, 1500);
  };

  const handleReset = () => {
    setCategory("Penyuapan & Korupsi");
    setReportedName("");
    setDate("");
    setLocation("");
    setDescription("");
    setReporterName("");
    setReporterEmail("");
    setReporterPhone("");
    setIsSuccess(false);
    setTicketNumber("");
  };

  return (
    <div className="relative min-h-full w-full flex items-start lg:items-center justify-center font-sans">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 lg:pt-28 lg:pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 mb-3 text-red-500">
                <ShieldAlert className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">Tata Kelola Perusahaan</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Whistle Blowing System (WBS)
              </h2>
              <p className="text-sm text-muted mt-4 leading-relaxed">
                PT Industri Karet Nusantara berkomitmen menerapkan prinsip transparansi dan pencegahan kecurangan sesuai standar <strong>ISO 37001:2016 (Sistem Manajemen Anti Penyuapan)</strong>.
              </p>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Kami menyediakan wadah ini untuk melaporkan indikasi kecurangan, pelanggaran hukum, gratifikasi, benturan kepentingan, maupun pelanggaran K3 (HSE) secara rahasia dan aman.
              </p>
            </div>

            <div className="mt-8 p-5 rounded-md border border-border bg-elevated/15">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Jaminan Perlindungan</h4>
              <p className="text-[11px] text-muted leading-relaxed">
                Kami menjamin kerahasiaan identitas Pelapor dan perlindungan terhadap tindakan pembalasan. Laporan Anda akan diperiksa langsung oleh Tim Audit Internal independen.
              </p>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-lg border border-border h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="wbs-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-red-500" /> Form Laporan Pelanggaran
                    </h3>

                    {/* Anonymous selector */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">Metode Pelaporan</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAnonymous(true)}
                          className={`py-2 px-3 text-xs font-medium rounded-sm flex items-center justify-center gap-2 border transition-all duration-300 ${
                            isAnonymous
                              ? "bg-red-500/10 border-red-500 text-red-500"
                              : "bg-elevated border-border text-muted hover:text-foreground"
                          }`}
                        >
                          <UserX className="w-3.5 h-3.5" /> Anonim
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAnonymous(false)}
                          className={`py-2 px-3 text-xs font-medium rounded-sm flex items-center justify-center gap-2 border transition-all duration-300 ${
                            !isAnonymous
                              ? "bg-accent/10 border-accent text-accent-hover"
                              : "bg-elevated border-border text-muted hover:text-foreground"
                          }`}
                        >
                          <User className="w-3.5 h-3.5" /> Dengan Identitas
                        </button>
                      </div>
                    </div>

                    {/* Identity Details */}
                    <AnimatePresence>
                      {!isAnonymous && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
                        >
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-muted mb-1">Nama Lengkap</label>
                            <input
                              type="text"
                              required
                              value={reporterName}
                              onChange={(e) => setReporterName(e.target.value)}
                              placeholder="Masukkan nama lengkap Anda"
                              className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-muted mb-1">Email</label>
                            <input
                              type="email"
                              required
                              value={reporterEmail}
                              onChange={(e) => setReporterEmail(e.target.value)}
                              placeholder="email@domain.com"
                              className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-muted mb-1">Nomor Telepon</label>
                            <input
                              type="tel"
                              required
                              value={reporterPhone}
                              onChange={(e) => setReporterPhone(e.target.value)}
                              placeholder="0812xxxxxx"
                              className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Incident details fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/40">
                      <div className="relative">
                        <label className="block text-[11px] font-medium text-muted mb-1">Kategori Pelanggaran</label>
                        <button
                          type="button"
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                          className="w-full px-3 py-2.5 text-xs rounded-sm theme-input flex items-center justify-between focus:outline-none"
                        >
                          <span>{category}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isCategoryOpen && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setIsCategoryOpen(false)} />
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute left-0 right-0 mt-1.5 z-50 rounded-sm border border-border dropdown-glass overflow-hidden py-1 max-h-60 overflow-y-auto"
                              >
                                {[
                                  "Penyuapan & Korupsi",
                                  "Gratifikasi & Suap",
                                  "Kecurangan / Fraud / Pencurian",
                                  "Pelanggaran K3 (HSE)",
                                  "Pelanggaran Kode Etik Bisnis",
                                  "Lainnya"
                                ].map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => {
                                      setCategory(opt);
                                      setIsCategoryOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-accent/10 hover:text-accent-hover transition-colors flex items-center justify-between ${
                                      category === opt ? "text-accent font-semibold bg-accent/5" : "text-foreground"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Nama Terlapor & Jabatan (Opsional)</label>
                        <input
                          type="text"
                          value={reportedName}
                          onChange={(e) => setReportedName(e.target.value)}
                          placeholder="cth: Budi - Staf Logistik"
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Tanggal Kejadian (Perkiraan)</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Lokasi Kejadian</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="cth: Pabrik Rubber Thread, Pabrik Resiprene"
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-muted mb-1">Deskripsi Detail Pelanggaran</label>
                      <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Deskripsikan secara detail: apa kejadiannya, bagaimana kronologinya, dan siapa saja yang terlibat..."
                        className="w-full px-3 py-2 text-xs rounded-sm theme-input resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Memproses Laporan...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Kirim Laporan Rahasia
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="wbs-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 space-y-5"
                  >
                    <div className="inline-flex p-3 bg-green-500/10 text-green-500 rounded-full">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Laporan Terkirim Aman</h3>
                      <p className="text-xs text-muted mt-2 max-w-md mx-auto leading-relaxed">
                        Laporan Anda telah berhasil masuk ke basis data audit internal PT IKN secara rahasia dan aman. Kami menghargai keberanian Anda menjaga integritas perusahaan.
                      </p>
                    </div>

                    <div className="bg-elevated/40 border border-border p-4 rounded max-w-sm mx-auto">
                      <span className="block text-[10px] text-muted font-mono uppercase tracking-wider">Nomor Tiket Anda</span>
                      <span className="text-lg font-mono font-bold text-emerald-400 block mt-1 select-all">{ticketNumber}</span>
                      <span className="block text-[9px] text-muted-dim mt-2 leading-normal">
                        Catat nomor tiket ini untuk melacak status penanganan laporan. Jangan bagikan nomor ini kepada siapapun demi keselamatan Anda.
                      </span>
                    </div>

                    <button
                      onClick={handleReset}
                      className="btn-outline px-6 py-2 rounded text-xs uppercase font-semibold"
                    >
                      Kirim Laporan Lain
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
