'use client';

import { motion } from 'framer-motion';

export function StorytellingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="luxury-line" />
          <h2 className="section-title">Warisan Kemewahan Alami</h2>
          <p className="section-subtitle">Perjalanan kami dimulai dari komitmen untuk menghadirkan kualitas premium yang telah dipercaya selama lebih dari 25 tahun</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Story 1 */}
          <motion.div variants={itemVariants} className="card-luxury">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-playfair text-2xl font-bold">1</div>
            </div>
            <h3 className="text-2xl font-playfair font-bold mb-4 text-gray-900">Awal Perjalanan</h3>
            <p className="text-gray-600 font-montserrat font-light leading-relaxed">
              Didirikan oleh visioner yang memahami keindahan alam, kami memulai dengan misi sederhana: menghadirkan karet alam terbaik ke dunia dengan standar kualitas tertinggi.
            </p>
          </motion.div>

          {/* Story 2 */}
          <motion.div variants={itemVariants} className="card-luxury">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-playfair text-2xl font-bold">2</div>
            </div>
            <h3 className="text-2xl font-playfair font-bold mb-4 text-gray-900">Pengembangan Expertise</h3>
            <p className="text-gray-600 font-montserrat font-light leading-relaxed">
              Melalui riset intensif dan kolaborasi global, kami mengembangkan metodologi unik dalam mengolah karet alam, menciptakan produk yang superior dan berkelanjutan.
            </p>
          </motion.div>

          {/* Story 3 */}
          <motion.div variants={itemVariants} className="card-luxury">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-playfair text-2xl font-bold">3</div>
            </div>
            <h3 className="text-2xl font-playfair font-bold mb-4 text-gray-900">Pemimpin Industri</h3>
            <p className="text-gray-600 font-montserrat font-light leading-relaxed">
              Hari ini, kami diakui sebagai pemimpin industri karet premium yang dipercaya oleh brand-brand mewah terkemuka di seluruh dunia untuk keunggulan dan konsistensi.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
