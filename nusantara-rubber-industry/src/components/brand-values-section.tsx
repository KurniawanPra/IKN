'use client';

import { motion } from 'framer-motion';

export function BrandValuesSection() {
  const values = [
    {
      title: 'Integritas Premium',
      description: 'Setiap produk melalui kontrol kualitas terketat untuk memastikan kesempurnaan dalam setiap detail.',
      icon: '✓'
    },
    {
      title: 'Inovasi Berkelanjutan',
      description: 'Kami berinvestasi dalam teknologi terdepan untuk terus meningkatkan standar industri karet alam.',
      icon: '⚡'
    },
    {
      title: 'Warisan Budaya',
      description: 'Kami bangga mempromosikan warisan budaya Nusantara melalui produk karet premium berkualitas dunia.',
      icon: '🌿'
    },
    {
      title: 'Komitmen Global',
      description: 'Kemitraan strategis dengan brand-brand mewah dunia menjamin kepercayaan dan kepuasan pelanggan.',
      icon: '🌍'
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
          <h2 className="section-title">Nilai-Nilai Kemewahan Kami</h2>
          <p className="section-subtitle">Fondasi kepercayaan yang dibangun atas prinsip keunggulan dan dedikasi</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="card-premium p-8 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-playfair font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 font-montserrat font-light leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Luxury Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 w-48 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-16"
        />
      </div>
    </section>
  );
}
