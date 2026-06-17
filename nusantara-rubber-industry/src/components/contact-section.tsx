'use client';

import { motion } from 'framer-motion';

export function ContactSection() {
  const contactInfo = [
    {
      icon: '✉️',
      title: 'Alamat Kantor Pusat',
      details: 'Jl. Raya Industri No. 123, Kabupaten Serang, Banten 42182, Indonesia'
    },
    {
      icon: '📞',
      title: 'Telepon & WhatsApp',
      details: '+62 254 1234567 (Telp) | +62 812 3456789 (WhatsApp)'
    },
    {
      icon: '📧',
      title: 'Email',
      details: 'info@nusantararubber.co.id | sales@nusantararubber.co.id'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="luxury-line" />
          <h2 className="section-title">Hubungi Tim Premium Kami</h2>
          <p className="section-subtitle">Siap membantu Anda dengan kebutuhan karet alam eksklusif. Hubungi tim konsierge kami untuk konsultasi personal dan penawaran khusus.</p>
        </motion.div>
        
        <div className="grid gap-12 md:grid-cols-2 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex items-start gap-6 card-premium p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl">
                  {info.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-playfair font-bold mb-2 text-gray-900">{info.title}</h3>
                  <p className="text-gray-600 font-montserrat font-light leading-relaxed">
                    {info.details}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Office Hours */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="card-premium p-6"
            >
              <h3 className="text-lg font-playfair font-bold mb-4 text-gray-900">Jam Operasional</h3>
              <div className="space-y-2 font-montserrat font-light text-gray-600">
                <div className="flex justify-between">
                  <span>Senin - Jumat:</span>
                  <span className="font-semibold">08:00 - 17:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu:</span>
                  <span className="font-semibold">09:00 - 13:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu & Libur:</span>
                  <span className="font-semibold">Tutup</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-luxury"
          >
            <h3 className="text-2xl font-playfair font-bold mb-6 text-gray-900">Kirim Pesan</h3>
            
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-montserrat font-light"
                />
                <input
                  type="email"
                  placeholder="Alamat Email"
                  className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-montserrat font-light"
                />
              </div>
              
              <input
                type="tel"
                placeholder="Nomor Telepon"
                className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-montserrat font-light"
              />

              <select className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-montserrat font-light text-gray-600">
                <option value="">Pilih Topik Pertanyaan</option>
                <option value="product">Informasi Produk</option>
                <option value="pricing">Harga & Diskon</option>
                <option value="delivery">Pengiriman</option>
                <option value="partnership">Kemitraan Bisnis</option>
                <option value="other">Lainnya</option>
              </select>
              
              <textarea
                placeholder="Pesan Anda..."
                rows="4"
                className="w-full px-5 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none font-montserrat font-light"
              />
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-luxury"
              >
                Kirim Pesan
              </motion.button>

              <p className="text-xs text-gray-600 font-montserrat font-light text-center">
                Kami akan merespons dalam 24 jam kerja
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}