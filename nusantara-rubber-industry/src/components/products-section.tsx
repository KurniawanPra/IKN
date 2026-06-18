"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, ShoppingCart, Info } from "lucide-react";
import Link from "next/link";
import { useCart, Product } from "./providers/cart-provider";
import BackgroundBlobs from "./background-blobs";

const ProductsScene = dynamic(() => import("./products-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl opacity-20" style={{ background: 'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-primary))' }} />
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

  // Auto-switch product category filter based on hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHash = () => {
        if (window.location.hash === "#produk-resiprene") {
          setFilter("Resin & Coating");
        } else if (window.location.hash === "#produk-rubber") {
          setFilter("Rubber Thread");
        }
      };
      handleHash();
      window.addEventListener("hashchange", handleHash);
      return () => window.removeEventListener("hashchange", handleHash);
    }
  }, []);

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
    <div id="produk" className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans">
      <BackgroundBlobs sectionId="produk" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Panel: Catalog details & 3D Canvas */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div id="produk-resiprene">
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                E-Commerce Catalog
              </p>
              <h2 id="produk-rubber" className="text-3xl font-bold text-foreground leading-tight">
                Produk Unggulan & Pemesanan
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Pesan langsung getah resin karet tersiklisasi dan benang elastis industri 
                melalui platform e-commerce terintegrasi.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dim" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk..."
                className="w-full rounded-sm py-2 pl-9 pr-4 text-xs theme-input"
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
                      ? "bg-accent text-white"
                      : "bg-elevated text-muted border border-border hover:text-foreground"
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
                        <span className="absolute top-2 right-2 bg-accent text-white text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider">
                          {product.badge}
                        </span>
                      )}

                      <p className="text-[10px] font-mono uppercase text-rubber-red-light">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-bold text-foreground mt-1.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-2">
                        {product.desc}
                      </p>

                      {/* Tag labels */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] bg-elevated text-muted px-2 py-0.5 rounded-sm font-mono border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer card: Price & Actions */}
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-border">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-muted-dim">Harga</span>
                        <span className="text-sm font-bold text-foreground font-mono leading-tight">
                          {formatPrice(product.price)}
                          <span className="text-[10px] font-normal text-muted"> / {product.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/produk/${product.slug}`}
                          className="p-2 bg-elevated hover:bg-accent/10 text-muted hover:text-foreground rounded border border-border transition"
                          title="Detail Produk"
                        >
                          <Info size={14} />
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md"
                          style={{ boxShadow: '0 4px 12px var(--accent-glow)' }}
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
