'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Karet Alam Taraf Tinggi (TSR)",
      description: "Karet alam teknis standar dengan kadar kotoran rendah dan elastisitas tinggi",
      price: "Rp 22.500/kg",
      image: "/images/products/tsr.jpg",
      category: "Teknis",
      badge: "Populer",
      features: ["Kadar kotoran <0.05%", "Elastisitas >600%", "Standar SNI"],
    },
    {
      id: 2,
      name: "Karet Alam Taraf Tinggi (RSS)",
      description: "Ribbed Smoked Sheet dengan kualitas premium untuk aplikasi industri",
      price: "Rp 24.000/kg",
      image: "/images/products/rss.jpg",
      category: "Teknis",
      badge: "Premium",
      features: ["Tekstur berjalur", "Proses asap tradisional", "Kualitas konsisten"],
    },
    {
      id: 3,
      name: "Karet Alam Taraf Tinggi (LATEX)",
      description: "Karet cair untuk produk kesehatan dan perlindungan pribadi",
      price: "Rp 18.000/liter",
      image: "/images/products/latex.jpg",
      category: "Kesehatan",
      badge: "Medikal",
      features: ["Kadar getah 60%", "Bebas protein alergi", "Steril dan aman"],
    },
    {
      id: 4,
      name: "Karet Alam Taraf Tinggi (CREPE)",
      description: "Karet crepe untuk aplikasi yang memerlukan fleksibilitas tinggi",
      price: "Rp 20.000/kg",
      image: "/images/products/crepe.jpg",
      category: "Teknis",
      badge: "Flexibel",
      features: ["Tekstur crepe", "Fleksibilitas luar biasa", "Resistensi abrasi"],
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-amber-50/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="luxury-line" />
          <h2 className="section-title">Koleksi Premium Kami</h2>
          <p className="section-subtitle">Pengalaman berbelanja karet alam berkualitas tinggi dengan standar kemewahan internasional</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3 mb-12"
        >
          <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all">Semua</button>
          <button className="px-6 py-2 bg-white/70 backdrop-blur-md border border-white/40 text-gray-700 text-sm font-semibold rounded-full hover:bg-white/80 transition-all">Teknis</button>
          <button className="px-6 py-2 bg-white/70 backdrop-blur-md border border-white/40 text-gray-700 text-sm font-semibold rounded-full hover:bg-white/80 transition-all">Kesehatan</button>
          <button className="px-6 py-2 bg-white/70 backdrop-blur-md border border-white/40 text-gray-700 text-sm font-semibold rounded-full hover:bg-white/80 transition-all">Otomotif</button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-luxury group overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-widest">
                  {product.badge}
                </div>
                
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
              </div>
              
              <h3 className="text-lg font-playfair font-bold mb-2 text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 font-montserrat font-light mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/30">
                <span className="text-2xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-600">{product.price}</span>
              </div>
              
              <div className="space-y-3 mb-6">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 font-montserrat font-light text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link href={`/product/${product.id}`} className="btn-luxury w-full text-center">
                Lihat Detail
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/products" className="btn-luxury inline-block">
              Lihat Semua Produk
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}