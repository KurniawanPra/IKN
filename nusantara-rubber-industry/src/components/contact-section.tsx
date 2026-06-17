"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Send, CheckCircle } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

const ContactScene = dynamic(() => import("./contact-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-[#0a1628] to-[#142040] rounded-2xl opacity-20" />
  ),
});

const contactInfo = [
  {
    icon: MapPin,
    title: "Kantor & Pabrik",
    text: "Jl. Medan - Tanjung Morawa Km 9,5, Medan 20148, Sumatera Utara, Indonesia",
  },
  {
    icon: Phone,
    title: "Hubungi Kami",
    text: "+62 61 786 7356 / +62 811 648 0083",
  },
  {
    icon: Mail,
    title: "Email",
    text: "sales@nusantararubber.com",
  },
  {
    icon: Globe,
    title: "Website Resmi",
    text: "nusantararubber.com",
  },
];

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-[#f0f0ec] placeholder:text-steel/30 focus:border-rubber-red/50 focus:outline-none transition";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Contact Details & 3D Globe */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                Hubungi Kami
              </p>
              <h2 className="text-3xl font-bold text-[#f0f0ec] leading-tight">
                Hubungi Sales Representative Kami
              </h2>
              <p className="text-sm text-[#c0c0c0] mt-2 leading-relaxed">
                Butuh sampel resin atau penawaran harga khusus untuk volume kargo besar? 
                Hubungi kami melalui form atau detail kontak di bawah ini.
              </p>
            </div>

            {/* 3D Scene */}
            <div className="hidden lg:block h-[150px] md:h-[180px] w-full relative">
              <ContactScene />
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((item) => (
                <div key={item.text} className="flex gap-3 items-start bg-white/[0.02] border border-white/5 p-3 rounded-sm">
                  <item.icon className="text-rubber-red-light w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-steel/50 tracking-wider">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-steel mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Glassmorphic Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-lg relative overflow-hidden">
              <h3 className="text-lg font-bold text-[#f0f0ec] mb-4">Kirim Pesan Langsung</h3>
              
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-steel mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-steel mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@perusahaan.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-steel mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Kerjasama / Pembelian Sampel"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-steel mb-1">
                    Isi Pesan
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis pesan Anda di sini..."
                    className={inputClasses}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto py-2.5 px-6 flex items-center justify-center gap-2 text-xs"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <>
                        Kirim Pesan <Send className="w-3 h-3" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold"
                      >
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        Pesan Anda berhasil dikirim!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
