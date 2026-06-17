'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-yellow-50"></div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-yellow-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/30 rounded-full blur-3xl"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-bold tracking-widest uppercase rounded-full mb-4">
                Kemewahan Alami Sejati
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl lg:text-7xl font-playfair font-bold mb-6 text-gray-900 leading-tight"
            >
              Karet Alam <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-500">Premium</span> dari Nusantara
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl text-gray-600 mb-10 max-w-xl font-montserrat font-light leading-relaxed"
            >
              Kemewahan yang terlahir dari alam. Produk karet alam eksklusif dengan standar kualitas internasional tertinggi, dipercaya oleh brand-brand mewah global sejak 1995
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/products" className="btn-luxury inline-block">
                  Koleksi Premium Kami
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/about" className="btn-outline inline-block">
                  Pelajari Cerita Kami
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-12 flex gap-12 justify-center lg:justify-start text-center lg:text-left"
            >
              <div>
                <p className="text-3xl font-playfair font-bold text-amber-600">25+</p>
                <p className="text-gray-600 font-montserrat font-light">Tahun Keunggulan</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-bold text-amber-600">500+</p>
                <p className="text-gray-600 font-montserrat font-light">Brand Global</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-bold text-amber-600">∞</p>
                <p className="text-gray-600 font-montserrat font-light">Kepuasan Pelanggan</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:w-1/2"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative"
            >
              <div className="card-luxury p-0 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-auto object-cover rounded-3xl"
                  src="/images/hero/premium-rubber.jpg"
                  alt="Karet alam premium dari Nusantara"
                />
              </div>
              
              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-8 -left-8 card-luxury p-6 max-w-xs"
              >
                <p className="font-playfair text-sm font-bold text-gray-900 mb-2">Sertifikasi Premium</p>
                <p className="font-montserrat text-xs text-gray-600 font-light">Memenuhi standar internasional tertinggi untuk kemewahan dan kualitas</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}