"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    text: "Jl. Medan - Tanjung Morawa Km 9,5, Medan 20148, Sumatera Utara, Indonesia",
  },
  {
    icon: Phone,
    text: "+62 61 786 7356 / +62 811 648 0083",
  },
  {
    icon: Mail,
    text: "ikn@ptikn.com",
  },
  {
    icon: Globe,
    text: "ikn.co.id",
  },
];

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-off-white placeholder:text-steel/50 focus:border-rubber-red/50 focus:outline-none transition";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-rubber-red font-mono uppercase tracking-widest text-sm">
              Hubungi Kami
            </p>
            <h2 className="text-3xl font-bold text-off-white mt-3">
              Mari Berdiskusi
            </h2>

            <div className="mt-8 space-y-5">
              {contactInfo.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <item.icon className="text-rubber-red w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-steel text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className={inputClasses}
              />
              <input
                type="email"
                placeholder="Email"
                className={inputClasses}
              />
              <input
                type="text"
                placeholder="Subject"
                className={inputClasses}
              />
              <textarea
                rows={4}
                placeholder="Pesan"
                className={inputClasses}
              />
              <button
                type="submit"
                className="bg-rubber-red text-white w-full py-3 rounded-sm font-medium hover:bg-rubber-red-light transition"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
