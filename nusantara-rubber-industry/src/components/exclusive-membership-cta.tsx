'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ExclusiveMembershipCTA() {
  const benefits = [
    'Akses eksklusif ke produk limited edition',
    'Diskon khusus hingga 30% untuk anggota VIP',
    'Layanan konsierge pribadi 24/7',
    'Undangan ke acara peluncuran produk eksklusif',
    'Pengiriman premium gratis ke seluruh dunia',
    'Perlindungan garansi seumur hidup'
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-amber-900/10 to-gray-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22><path fill=%22%23FCD34D%22 fill-opacity=%220.03%22 d=%22M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,122.7C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320L1344,320L1288,320L1200,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z%22/%3E</svg>') bg-cover]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-bold tracking-widest uppercase rounded-full">
              Eksklusif untuk Anda
            </span>
          </div>
          <h2 className="text-5xl font-playfair font-bold mb-6 text-gray-900">
            Bergabung dengan Nusantara Elite
          </h2>
          <p className="text-xl text-gray-700 font-montserrat font-light max-w-2xl mx-auto">
            Rasakan pengalaman berbelanja yang dirancang khusus untuk pelanggan istimewa yang menghargai keunggulan dan eksklusivitas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-montserrat font-light">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-luxury"
          >
            <div className="text-center">
              <h3 className="text-3xl font-playfair font-bold mb-2 text-gray-900">Nusantara Elite</h3>
              <p className="text-amber-600 font-montserrat font-semibold mb-6 text-sm uppercase tracking-widest">Keanggotaan Seumur Hidup</p>
              
              <div className="mb-8 py-6 border-y border-white/30">
                <p className="text-5xl font-playfair font-bold text-gray-900 mb-2">∞</p>
                <p className="text-gray-600 font-montserrat font-light">Manfaat Tak Terbatas</p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="btn-luxury w-full mb-4">
                  Bergabung Sekarang
                </button>
              </motion.div>

              <p className="text-gray-600 font-montserrat font-light text-sm">
                Terbatas hanya untuk 500 anggota pertama
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 font-montserrat font-light mb-6">
            Hubungi tim konsierge kami untuk informasi lebih lanjut
          </p>
          <Link href="/contact" className="inline-block btn-luxury">
            Hubungi Tim Premium Kami
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
