'use client';

import { motion } from 'framer-motion';

export function FeaturesSection() {
  const features = [
    {
      title: 'Kualitas Terjamin',
      description: 'Setiap batch produk melalui pengujian laboratorium yang ketat sesuai standar ISO dan SNI',
      icon: '✓'
    },
    {
      title: 'Pengiriman Global',
      description: 'Jaringan logistik yang terintegrasi untuk pengiriman cepat dan aman ke seluruh dunia',
      icon: '🌍'
    },
    {
      title: 'Harga Kompetitif',
      description: 'Harga factory direct tanpa perantara yang menjamin nilai terbaik untuk investasi Anda',
      icon: '💎'
    },
    {
      title: 'Dukungan Teknis',
      description: 'Tim ahli karet siap memberikan konsultasi dan solusi khusus untuk aplikasi spesifik Anda',
      icon: '⚙️'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="luxury-line" />
          <h2 className="section-title">Keunggulan Kami</h2>
          <p className="section-subtitle">Mengapa Nusantara Rubber Industry adalah pilihan terbaik untuk kebutuhan karet alam premium Anda</p>
        </motion.div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-premium p-8 text-center group hover:luxury-glow"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center mb-6 mx-auto text-white text-3xl"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 font-montserrat font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 card-luxury p-12"
        >
          <h3 className="text-2xl font-playfair font-bold mb-8 text-center text-gray-900">Sertifikasi & Akreditasi</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { name: 'ISO 9001', desc: 'Manajemen Kualitas' },
              { name: 'ISO 14001', desc: 'Lingkungan' },
              { name: 'SNI', desc: 'Standar Nasional Indonesia' },
              { name: 'FSC', desc: 'Hutan Berkelanjutan' }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4"
              >
                <p className="font-playfair font-bold text-lg text-amber-600 mb-2">{cert.name}</p>
                <p className="font-montserrat font-light text-gray-600">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}