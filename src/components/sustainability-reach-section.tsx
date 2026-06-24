"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle, FileSpreadsheet, Send, Mail, ChevronDown } from "lucide-react";

export default function SustainabilityReachSection() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("Resiprene 35 (Resin Karet)");
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const rand = Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(`REACH-IKN-${rand}`);
    }, 1500);
  };

  const handleReset = () => {
    setCompanyName("");
    setContactName("");
    setEmail("");
    setProduct("Resiprene 35 (Resin Karet)");
    setCountry("");
    setMessage("");
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
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">Kepatuhan Regulasi</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                REACH & RoHS Compliance Request
              </h2>
              <p className="text-sm text-muted mt-4 leading-relaxed">
                Sebagai eksportir karet hilir terkemuka, seluruh produk kami mematuhi standar regulasi bahan kimia Uni Eropa: <strong>REACH</strong> dan sertifikasi <strong>RoHS (Restriction of Hazardous Substances)</strong>.
              </p>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Kami memastikan produk kami (termasuk <strong>Resiprene 35</strong> dan <strong>Rubber Articles / Threads</strong>) bebas dari zat kimia berbahaya SVHC (Substance of Very High Concern) demi keamanan pengguna akhir dan lingkungan hidup.
              </p>
            </div>

            <div className="mt-8 p-5 rounded-md border border-border bg-elevated/15">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Permintaan Pernyataan & Sertifikat</h4>
              <p className="text-[11px] text-muted leading-relaxed">
                Gunakan formulir ini untuk mengajukan dokumen pernyataan kepatuhan REACH/RoHS resmi atau data teknis pengujian laboratorium untuk keperluan audit ekspor B2B Anda.
              </p>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-lg border border-border h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="reach-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> Form Pengajuan Dokumen REACH/RoHS
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Nama Perusahaan / Organisasi</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Nama PT / Korporasi Anda"
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Nama Kontak Perwakilan</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Nama lengkap Anda"
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Email Bisnis</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-muted mb-1">Negara Tujuan Ekspor</label>
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="cth: Jerman, Belanda, Jepang"
                          className="w-full px-3 py-2 text-xs rounded-sm theme-input"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-medium text-muted mb-1">Pilih Produk Sasaran</label>
                      <button
                        type="button"
                        onClick={() => setIsProductOpen(!isProductOpen)}
                        className="w-full px-3 py-2.5 text-xs rounded-sm theme-input flex items-center justify-between focus:outline-none"
                      >
                        <span>{product}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isProductOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsProductOpen(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute left-0 right-0 mt-1.5 z-50 rounded-sm border border-border dropdown-glass overflow-hidden py-1 max-h-60 overflow-y-auto"
                            >
                              {[
                                "Resiprene 35 (Resin Karet Alam Tersiklisasi)",
                                "Rubber Threads (Benang Karet Premium)",
                                "Concentrated Latex (Lateks Pekat)",
                                "RSS-1 (Ribbed Smoked Sheet)",
                                "Produk Campuran / Kustom Lainnya"
                              ].map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setProduct(opt);
                                    setIsProductOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-xs hover:bg-accent/10 hover:text-accent-hover transition-colors flex items-center justify-between ${
                                    product === opt ? "text-accent font-semibold bg-accent/5" : "text-foreground"
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
                      <label className="block text-[11px] font-medium text-muted mb-1">Detail Permintaan / Catatan Tambahan</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Sebutkan detail dokumen yang Anda butuhkan (cth: Surat pernyataan SVHC terbaru, hasil uji lab laboratorium pihak ketiga, atau parameter RoHS)..."
                        className="w-full px-3 py-2 text-xs rounded-sm theme-input resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Mengirim Pengajuan...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Kirim Permintaan Kepatuhan
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="reach-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 space-y-5"
                  >
                    <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-full">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Permintaan Berhasil Didaftarkan</h3>
                      <p className="text-xs text-muted mt-2 max-w-md mx-auto leading-relaxed">
                        Permintaan sertifikat / pernyataan REACH dan RoHS Anda sedang diproses oleh Departemen Kepatuhan Regulasi PT IKN. Dokumen resmi akan dikirimkan ke email Anda.
                      </p>
                    </div>

                    <div className="bg-elevated/40 border border-border p-4 rounded max-w-sm mx-auto">
                      <span className="block text-[10px] text-muted font-mono uppercase tracking-wider">Nomor Tiket Permintaan</span>
                      <span className="text-lg font-mono font-bold text-emerald-400 block mt-1 select-all">{ticketNumber}</span>
                      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-muted">
                        <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {email}
                      </div>
                      <span className="block text-[9px] text-muted-dim mt-2 leading-normal">
                        Perwakilan kami akan menghubungi Anda dalam waktu 1-2 hari kerja untuk mengirimkan dokumen yang diperlukan.
                      </span>
                    </div>

                    <button
                      onClick={handleReset}
                      className="btn-outline px-6 py-2 rounded text-xs uppercase font-semibold"
                    >
                      Buat Permintaan Baru
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
