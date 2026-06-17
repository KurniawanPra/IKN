import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  
  // Mock product data - in real app, this would come from API/database
  const products = [
    {
      id: 1,
      name: "Karet Alam Taraf Tinggi (TSR)",
      description: "Karet alam teknis standar dengan kadar kotoran rendah dan elastisitas tinggi",
      price: "Rp 22.500/kg",
      image: "/images/products/tsr.jpg",
      category: "Teknis",
      badge: "Populer",
      features: [
        "Kadar kotoran <0.05%",
        "Elastisitas >600%",
        "Standar SNI ISO 2000",
        "Kadar getah 35-45%",
        "Waktu penyetelan optimal"
      ],
      specifications: {
        "Kadar Getah": "35-45%",
        "Kadar Air": "<0.5%",
        "Kadar Kotoran": "<0.05%",
        "Elastisitas": ">600%",
        "Waktu Penyetelan": "2-4 jam",
        "Warna": "Krem kecoklatan"
      }
    },
    {
      id: 2,
      name: "Karet Alam Taraf Tinggi (RSS)",
      description: "Ribbed Smoked Sheet dengan kualitas premium untuk aplikasi industri",
      price: "Rp 24.000/kg",
      image: "/images/products/rss.jpg",
      category: "Teknis",
      badge: "Premium",
      features: [
        "Tekstur berjalur khas",
        "Proses asap tradisional",
        "Kualitas konsisten",
        "Kadar getah tinggi",
        "Resistensi oksidasi baik"
      ],
      specifications: {
        "Kadar Getah": "40-50%",
        "Kadar Air": "<0.6%",
        "Kadar Kotoran": "<0.08%",
        "Elastisitas": ">550%",
        "Waktu Penyetelan": "3-5 jam",
        "Warna": "Kemerah-an"
      }
    }
  ];
  
  const product = products.find(p => p.id === productId) || products[0];

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/products" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Produk
          </Link>
        </div>
        
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-gradient-primary mb-4"
            >
              {product.name}
            </motion.h1>
            
            <div className="flex items-baseline mb-4">
              <span className="text-2xl font-bold text-indigo-600">{product.price}</span>
              <span className="ml-3 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                {product.badge}
              </span>
            </div>
            
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6"
            >
              {product.description}
            </motion.p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Fitur Utama</h3>
              <ul className="space-y-2 text-sm">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-3 h-3 mt-1 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Spesifikasi Teknis</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => alert('Quantity decreased')}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/80 transition-all duration-300"
                >
                  -
                </button>
                <span className="font-medium">1</span>
                <button
                  onClick={() => alert('Quantity increased')}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/80 transition-all duration-300"
                >
                  +
                </button>
              </div>
            </div>
            
            <button className="w-full btn-primary mb-4">
              Tambah ke Keranjang
            </button>
            
            <button className="w-full btn-outline">
              Ajukan Permintaan Penawaran
            </button>
          </div>
          
          <div>
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full h-96 object-cover rounded-xl shadow-2xl animate-float"
              src={product.image}
              alt={product.name}
            />
          </div>
        </motion.div>
        
        <div className="mt-12">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl font-bold text-gradient-primary mb-6 text-center"
          >
            Produk Terkait
          </motion.h2>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products
              .filter(p => p.id !== productId)
              .slice(0, 3)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: relatedProduct.id * 0.1 }}
                  className="glass-card p-6 card-hover"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  
                  <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{relatedProduct.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-indigo-600 font-medium">{relatedProduct.price}</span>
                    <Link href={`/product/${relatedProduct.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                      Detail →
                    </Link>
                  </div>
                  
                  <button className="w-full btn-primary">
                    Tambah ke Keranjang
                  </button>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}