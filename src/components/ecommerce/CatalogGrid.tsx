"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Info, X, CheckCircle2, Package, Tag } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCart, Product } from "@/components/providers/cart-provider";

const ProductsScene = dynamic(() => import("@/components/products-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-xs text-muted font-mono">
      Loading 3D...
    </div>
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
    image: "/images/products/resiprene-35.png",
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
    image: "/images/products/rubin.png",
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
    image: "/images/products/cyclized-rubber.png",
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
    image: "/images/products/rubber-thread.png",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

export default function CatalogGrid() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [successProduct, setSuccessProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filtered = productsList.filter((p) => {
    const matchCat = filter === "Semua" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setSuccessProduct(product);
    setDetailProduct(null);
    setTimeout(() => setSuccessProduct(null), 2500);
  };

  return (
    <div className="w-full font-sans">
      {/* Header bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent">Katalog Produk</p>
          <h2 className="text-xl font-bold text-foreground mt-0.5">Produk Unggulan IKN</h2>
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-md py-2 pl-9 pr-4 text-xs theme-input"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-medium font-mono transition-all duration-200 ${filter === cat
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "bg-elevated text-muted border border-border hover:text-foreground hover:border-border/80"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List — Horizontal Cards */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center text-muted text-sm"
            >
              <Package size={40} className="mx-auto mb-3 opacity-20" />
              Tidak ada produk yang cocok.
            </motion.div>
          ) : (
            filtered.map((product, i) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.06 } }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="group glass-panel glass-panel-hover rounded-lg border border-border/50 overflow-hidden flex flex-row items-stretch h-[116px] relative"
              >
                {/* Image */}
                <div className="relative w-[120px] shrink-0 bg-muted/5 border-r border-border/30 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="120px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">
                      <Package size={28} className="opacity-20" />
                    </div>
                  )}
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-accent text-white text-[8px] font-mono px-1.5 py-0.5 rounded-sm uppercase tracking-wide z-10 shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[9px] font-mono uppercase text-accent tracking-wider truncate">
                          {product.category}
                        </p>
                        <h3 className="text-sm font-bold text-foreground mt-0.5 leading-tight truncate">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] bg-elevated text-muted-dim px-1.5 py-0.5 rounded-sm font-mono border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price + Actions (right side) */}
                <div className="shrink-0 flex flex-col items-end justify-between px-4 py-3 border-l border-border/30 w-[160px]">
                  <div className="text-right">
                    <p className="text-[9px] text-muted uppercase tracking-wider">Harga / Kg</p>
                    <p className="text-base font-bold text-foreground font-mono leading-tight">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-[9px] text-muted font-mono">per {product.unit}</p>
                  </div>

                  <div className="flex items-center gap-1.5 w-full justify-end">
                    <button
                      onClick={() => setDetailProduct(product)}
                      className="p-1.5 bg-elevated hover:bg-accent/10 active:scale-95 text-muted hover:text-foreground rounded border border-border transition-all shrink-0"
                      title="Detail Produk"
                      aria-label="Lihat detail produk"
                    >
                      <Info size={13} />
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="px-2.5 py-1.5 bg-accent hover:bg-accent-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent text-white rounded text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 whitespace-nowrap transition-all shadow-sm"
                      style={{ boxShadow: "0 3px 10px var(--accent-glow)" }}
                      aria-label={`Tambah ${product.name ?? "produk"} ke keranjang`}
                    >
                      <ShoppingCart size={11} className="shrink-0" />
                      {product.stock === 0 ? "Stok Habis" : "+ Keranjang"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Toast Success */}
      <AnimatePresence>
        {successProduct && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium"
          >
            <CheckCircle2 size={16} />
            <span>
              <span className="font-bold">{successProduct.name}</span> ditambahkan ke keranjang
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailProduct(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg bg-white/95 dark:bg-[#060e1a]/95 backdrop-blur-md p-6 rounded-xl border border-border/40 shadow-2xl"
            >
              <button
                onClick={() => setDetailProduct(null)}
                className="absolute top-4 right-4 p-1.5 bg-elevated hover:bg-accent/10 text-muted hover:text-foreground rounded transition"
              >
                <X size={15} />
              </button>

              <div className="flex gap-4">
                <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-muted/10 border border-border/20 shrink-0">
                  <ProductsScene activeProductSlug={detailProduct.slug} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-sm">
                    {detailProduct.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1.5">{detailProduct.name}</h3>
                  <p className="text-xs text-muted leading-relaxed mt-1">{detailProduct.desc}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-border/30 pt-4 grid grid-cols-2 gap-2 text-[10px]">
                {detailProduct.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-muted">
                    <Tag size={9} className="text-accent shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-muted uppercase tracking-wider">Harga</p>
                  <p className="text-lg font-bold text-foreground font-mono">
                    {formatPrice(detailProduct.price)}
                    <span className="text-xs font-normal text-muted"> / {detailProduct.unit}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(detailProduct)}
                  className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md"
                  style={{ boxShadow: "0 4px 12px var(--accent-glow)" }}
                >
                  <ShoppingCart size={12} />
                  Tambah Keranjang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
