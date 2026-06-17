"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, ShoppingCart, Info } from "lucide-react";
import Link from "next/link";
import { useCart, Product } from "./providers/cart-provider";
import BackgroundBlobs from "./background-blobs";

const ProductsScene = dynamic(() => import("./products-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-[#0a1628] to-[#142040] rounded-2xl opacity-20" />
  ),
});

const categories = ["Semua", "Resin & Coating", "Rubber Thread", "Raw Material"];

const productsList: Product[] = [
  {
    slug: "resiprene-35",
    name: "Resiprene 35",
    category: "Resin & Coating",
    price: 45000,
    unit: "Kg",
    badge: "Best Seller",
    desc: "Cyclicised natural rubber resin dengan kelarutan tinggi dalam pelarut odorless. Ideal untuk protective coatings dan marine paints.",
    tags: ["Odorless Solvent", "Marine Paint", "Protective Coating"],
  },
  {
    slug: "rubin",
    name: "RUBIN",
    category: "Resin & Coating",
    price: 55000,
    unit: "Kg",
    badge: null,
    desc: "Natural rubber resin premium untuk aplikasi coating dan adhesive industri. Kualitas ekspor ke pasar Eropa.",
    tags: ["Rubber Resin", "Industrial", "Export Quality"],
  },
  {
    slug: "cyclized-rubber",
    name: "Cyclized Rubber",
    category: "Raw Material",
    price: 60000,
    unit: "Kg",
    badge: null,
    desc: "Bahan baku resin karet alam tersiklisasi dengan kemurnian tinggi untuk berbagai aplikasi industri.",
    tags: ["Raw Material", "High Purity", "Industrial"],
  },
  {
    slug: "rubber-thread",
    name: "Rubber Thread",
    category: "Rubber Thread",
    price: 35000,
    unit: "Kg",
    badge: null,
    desc: "Benang karet berkualitas tinggi untuk industri tekstil dan garmen dengan elastisitas superior.",
    tags: ["Textile", "Elastic", "Garment"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function ProductsSection() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filtered = productsList.filter((product) => {
    const matchesCategory = filter === "Semua" || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="produk" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Catalog details & 3D Canvas */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                E-Commerce Catalog
              </p>
              <h2 className="text-3xl font-bold text-[#f0f0ec] leading-tight">
                Produk Unggulan & Pemesanan
              </h2>
              <p className="text-sm text-[#c0c0c0] mt-2 leading-relaxed">
                Pesan langsung getah resin karet tersiklisasi dan benang elastis industri 
                melalui platform e-commerce terintegrasi.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk..."
                className="w-full bg-white/5 border border-white/10 rounded-sm py-2 pl-9 pr-4 text-xs text-[#f0f0ec] placeholder:text-steel/30 focus:border-rubber-red/50 focus:outline-none transition"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-mono transition ${
                    filter === cat
                      ? "bg-rubber-red text-white"
                      : "bg-white/5 text-steel border border-white/5 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 3D Scene */}
            <div className="hidden lg:block h-[180px] md:h-[220px] w-full relative">
              <ProductsScene />
            </div>
          </div>

          {/* Right Panel: Products Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto lg:max-h-[460px] overflow-visible lg:overflow-y-auto no-scrollbar">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    variants={cardVariants as unknown as Variants}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true }}
                    layout
                    className="glass-panel glass-panel-hover p-5 rounded-md flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      {/* Badge if exists */}
                      {product.badge && (
                        <span className="absolute top-2 right-2 bg-rubber-red text-white text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider">
                          {product.badge}
                        </span>
                      )}

                      <p className="text-[10px] font-mono uppercase text-rubber-red-light">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-bold text-[#f0f0ec] mt-1.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#c0c0c0] mt-2 leading-relaxed line-clamp-2">
                        {product.desc}
                      </p>

                      {/* Tag labels */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] bg-white/5 text-steel px-2 py-0.5 rounded-sm font-mono border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer card: Price & Actions */}
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-steel/50">Harga</span>
                        <span className="text-sm font-bold text-off-white font-mono leading-tight">
                          {formatPrice(product.price)}
                          <span className="text-[10px] font-normal text-steel"> / {product.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/produk/${product.slug}`}
                          className="p-2 bg-white/5 hover:bg-white/10 text-steel hover:text-white rounded border border-white/10 transition"
                          title="Detail Produk"
                        >
                          <Info size={14} />
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-2 bg-rubber-red hover:bg-rubber-red-light text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md shadow-rubber-red/25"
                        >
                          <ShoppingCart size={12} />
                          Beli
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
