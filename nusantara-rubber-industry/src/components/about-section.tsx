'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  const features = [
    {
      title: 'Warisan dan Keahlian',
      description: 'Berdiri sejak 1995 dengan komitmen untuk menghasilkan karet alam terbaik dari plantasi sendiri yang dikelola secara berkelanjutan',
      icon: '✓'
    },
    {
      title: 'Standar Kualitas Internasional',
      description: 'Sertifikasi ISO 9001, ISO 14001, dan standar SNI yang memastikan setiap batch produk memenuhi spesifikasi global',
      icon: '⭐'
    },
    {
      title: 'Komitmen Berkelanjutan',
      description: 'Praktik pertanian berkelanjutan yang menjaga keanekaragaman hayati dan meningkatkan kesejahteraan komunitas petani lokal',
      icon: '🌱'
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
          <h2 className="section-title">Tentang Nusantara Rubber Industry</h2>
          <p className="section-subtitle">
            Dengan lebih dari 25 tahun pengalaman dalam industri karet alam, kami berkomitmen untuk menyediakan produk karet berkualitas tinggi yang memenuhi standar internasional sambil menjaga keberlanjutan lingkungan
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-premium p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center mb-6 mx-auto text-white text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 font-montserrat font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* About Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="card-luxury">
            <img 
              src="/images/about/factory.jpg"
              alt="Fasilitas Produksi Premium"
              className="w-full h-96 object-cover rounded-3xl"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-playfair font-bold mb-6 text-gray-900">Fasilitas Kelas Dunia</h3>
            <p className="text-gray-600 font-montserrat font-light mb-6 leading-relaxed">
              Fasilitas produksi kami dilengkapi dengan teknologi terkini dan sistem kontrol kualitas tercanggih untuk memastikan konsistensi premium dalam setiap produk yang dihasilkan.
            </p>
            <ul className="space-y-4">
              {['Teknologi Processing Terdepan', 'Sistem Quality Control 24/7', 'Standar Keamanan Internasional', 'Sertifikasi Lingkungan'].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-montserrat font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}