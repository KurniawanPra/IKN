'use client';

import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "PT. Jaya Raya Industri",
      position: "Manajer Produksi",
      rating: 5,
      comment: "Kualitas karet dari Nusantara Rubber Industry konsistenly excellent. Pengiriman tepat waktu dan layanan pelanggan yang responsif membuat mereka menjadi partner strategis kami.",
    },
    {
      id: 2,
      name: "Global Rubber Corp.",
      position: "Direktur Pembelian",
      rating: 5,
      comment: "Standar kualitas internasional yang mereka terapkan sangat memuaskan. Produk mereka memenuhi spesifikasi paling ketat untuk aplikasi otomotif premium.",
    },
    {
      id: 3,
      name: "CV. Mitra Sejahtera",
      position: "Owner",
      rating: 5,
      comment: "Harga kompetitif combined dengan kualitas premium membuat Nusantara Rubber Industry menjadi pilihan utama kami.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-amber-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="luxury-line" />
          <h2 className="section-title">Testimoni Mitra Kami</h2>
          <p className="section-subtitle">Percaya diri dari mitra global yang telah membuktikan kualitas dan keandalan produk kami</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-luxury relative"
            >
              <div className="absolute top-4 left-4 text-5xl text-amber-200 opacity-30">"</div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-playfair font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 font-montserrat font-light">{testimonial.position}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.svg
                    key={star}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * star }}
                    className={`w-5 h-5 ${star <= testimonial.rating ? 'text-amber-400' : 'text-amber-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              
              <p className="text-gray-700 font-montserrat font-light leading-relaxed mb-4">
                "{testimonial.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 font-montserrat font-light mb-6">Dipercaya oleh lebih dari 500 brand premium di seluruh dunia</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {['ISO 9001', 'ISO 14001', 'SNI', 'FSC'].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-2 border-2 border-amber-600/30 rounded-full text-amber-700 font-semibold text-sm"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}