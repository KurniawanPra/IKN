'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
      className="bg-white/70 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-lg">𝓝</span>
              </div>
              <span className="text-xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-600 group-hover:from-amber-600 group-hover:to-yellow-500 transition-all">
                Nusantara
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 font-montserrat font-light hover:text-amber-600 transition-colors duration-300 relative group">
              Beranda
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/about" className="text-gray-700 font-montserrat font-light hover:text-amber-600 transition-colors duration-300 relative group">
              Tentang Kami
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/products" className="text-gray-700 font-montserrat font-light hover:text-amber-600 transition-colors duration-300 relative group">
              Produk
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/features" className="text-gray-700 font-montserrat font-light hover:text-amber-600 transition-colors duration-300 relative group">
              Keunggulan
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/testimonials" className="text-gray-700 font-montserrat font-light hover:text-amber-600 transition-colors duration-300 relative group">
              Testimoni
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/contact" className="text-gray-700 font-montserrat font-light hover:text-amber-600 transition-colors duration-300 relative group">
              Kontak
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-amber-600 font-montserrat font-semibold border border-amber-600/50 rounded-lg hover:bg-amber-50 transition-colors duration-300">
              ID
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-montserrat font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
              EN
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}