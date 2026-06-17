'use client';

import { motion } from 'framer-motion';

export function NewsletterSection() {
  return (
    <section className="section-padding bg-gradient-to-r from-gray-900 via-amber-900/20 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22><path fill=%22%23FBBF24%22 fill-opacity=%220.05%22 d=%22M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,122.7C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320L1344,320L1296,320L1248,320L1200,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z%22/%3E</svg>')]"
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-bold tracking-widest uppercase rounded-full mb-6">
            Tetap Terhubung
          </span>
          
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6 text-white">
            Dapatkan Akses Eksklusif
          </h2>
          
          <p className="text-lg text-white/80 font-montserrat font-light mb-10 leading-relaxed">
            Bergabung dengan komunitas elite kami untuk menerima informasi tentang produk limited edition, promo khusus member, dan update industri premium terbaru
          </p>
          
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg mx-auto space-y-4"
          >
            <div className="relative group">
              <input
                type="email"
                placeholder="Alamat email eksklusif Anda..."
                className="w-full px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white placeholder:text-white/50 font-montserrat font-light"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-6 rounded-lg hover:shadow-lg transition-all duration-300 font-bold uppercase text-sm tracking-widest"
              >
                Bergabung
              </motion.button>
            </div>
            <p className="text-sm text-white/60 font-montserrat font-light">
              Kami menghargai privasi Anda. Tidak akan pernah membagikan informasi Anda kepada pihak ketiga.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}