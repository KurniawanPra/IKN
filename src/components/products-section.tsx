"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, ShoppingCart, Info, X, CheckCircle2, Store } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCart, Product } from "./providers/cart-provider";
import BackgroundBlobs from "./background-blobs";

const ProductsScene = dynamic(() => import("./products-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-xs text-muted font-mono">
      Loading 3D Model...
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

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function ProductsSection({ previewMode = false }: { previewMode?: boolean }) {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>(productsList[0]);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [buySuccessProduct, setBuySuccessProduct] = useState<Product | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);

  // Render/unrender the heavy 3D Canvas dynamically based on viewport visibility
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScene(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, []);

  // Redirect ke halaman e-commerce (preview mode)
  const handleGoToStore = () => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("ikn_logged_in");
      if (loggedIn === "true") {
        window.location.href = "/ecommerce";
      } else {
        window.location.href = "/login?redirect=/ecommerce";
      }
    }
  };

  // Tambah produk ke keranjang (ecommerce mode)
  const handleAddToCart = (product: Product) => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("ikn_logged_in");
      if (loggedIn === "true") {
        addToCart(product);
        setBuySuccessProduct(product);
        setDetailProduct(null);
      } else {
        window.location.href = "/login?redirect=/ecommerce";
      }
    }
  };

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

  // Reset selected product when filter or search results change
  const firstFiltered = filtered[0];
  useEffect(() => {
    if (firstFiltered) {
      setSelectedProduct(firstFiltered);
    }
  }, [firstFiltered]);

  return (
    <div ref={containerRef} id="produk" className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-y-auto no-scrollbar font-sans">
      <BackgroundBlobs sectionId="produk" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:py-12 w-full flex flex-col justify-center min-h-full">
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

            {/* Selected Product Detail Panel */}
            <div className="hidden lg:block h-[200px] w-full relative rounded-lg border border-border/40 overflow-hidden bg-elevated/10 backdrop-blur-md mt-2">
              {showScene ? (
                <ProductsScene activeProductSlug={selectedProduct.slug} />
              ) : (
                <div className="h-full w-full bg-transparent" />
              )}
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
                    onMouseEnter={() => setSelectedProduct(product)}
                    className="glass-panel glass-panel-hover p-5 rounded-md flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div>
                      {/* Product Preview Image */}
                      <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden mb-4 bg-muted/10 border border-border/40">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-w-7xl) 33vw, 100vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted">No Image</div>
                        )}
                        {product.badge && (
                          <span className="absolute top-2 right-2 bg-accent text-white text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider z-10">
                            {product.badge}
                          </span>
                        )}
                      </div>

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
                        <button
                          onClick={() => setDetailProduct(product)}
                          className="p-2 bg-elevated hover:bg-accent/10 text-muted hover:text-foreground rounded border border-border transition"
                          title="Detail Produk"
                        >
                          <Info size={14} />
                        </button>
                        {previewMode ? (
                          // Preview mode: redirect ke e-commerce store
                          <button
                            onClick={handleGoToStore}
                            className="px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md"
                            style={{ boxShadow: '0 4px 12px var(--accent-glow)' }}
                          >
                            <Store size={12} />
                            Beli di Toko
                          </button>
                        ) : (
                          // E-commerce mode: tambah ke keranjang
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md"
                            style={{ boxShadow: '0 4px 12px var(--accent-glow)' }}
                          >
                            <ShoppingCart size={12} />
                            + Keranjang
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailProduct(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-white/95 dark:bg-[#060e1a]/95 backdrop-blur-md p-6 sm:p-8 rounded-lg overflow-hidden border border-border/40 shadow-2xl flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailProduct(null)}
                className="absolute top-4 right-4 p-2 bg-elevated hover:bg-accent/10 text-muted hover:text-foreground rounded transition z-20"
              >
                <X size={16} />
              </button>

              {/* Left Side: 3D Scene */}
              <div className="w-full md:w-1/2 h-[200px] md:h-[260px] relative rounded-md overflow-hidden bg-muted/10 border border-border/20 shrink-0">
                <ProductsScene activeProductSlug={detailProduct.slug} />
              </div>

              {/* Right Side: Product Details */}
              <div className="flex flex-col justify-between flex-grow gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rubber-red-light bg-rubber-red-light/10 border border-rubber-red-light/20 px-2 py-0.5 rounded-sm">
                    {detailProduct.category}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-2">{detailProduct.name}</h3>
                  <p className="text-xs text-muted leading-relaxed mt-2">{detailProduct.desc}</p>

                  {/* Specifications List */}
                  <div className="mt-4 border-t border-border/30 pt-3">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-foreground mb-2">Spesifikasi</h4>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      {detailProduct.slug === "resiprene-35" && (
                        <>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Softening Point</span><span className="font-bold">125-145 °C</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Viscosity</span><span className="font-bold">18-24s</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Acid Value</span><span className="font-bold">Max 5</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Solubility</span><span className="font-bold">Aliphatic</span></div>
                        </>
                      )}
                      {detailProduct.slug === "rubin" && (
                        <>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Grade</span><span className="font-bold">Premium Export</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Appearance</span><span className="font-bold">Ruby Clear</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Markets</span><span className="font-bold">Europe, Asia</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Solubility</span><span className="font-bold">High Soluble</span></div>
                        </>
                      )}
                      {detailProduct.slug === "cyclized-rubber" && (
                        <>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Purity</span><span className="font-bold">High Purity</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Form</span><span className="font-bold">Solid Resin</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Type</span><span className="font-bold">Raw Material</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Use case</span><span className="font-bold">Paint & Adhesive</span></div>
                        </>
                      )}
                      {detailProduct.slug === "rubber-thread" && (
                        <>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Elasticity</span><span className="font-bold">Superior</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Application</span><span className="font-bold">Textiles</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1 pr-2"><span className="text-muted">Quality</span><span className="font-bold">Export Standard</span></div>
                          <div className="flex justify-between border-b border-border/10 pb-1"><span className="text-muted">Form</span><span className="font-bold">Thread Spool</span></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/30 pt-4 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-muted-dim">Harga</span>
                    <span className="text-sm font-bold text-foreground font-mono leading-tight">
                      {formatPrice(detailProduct.price)}
                      <span className="text-[10px] font-normal text-muted"> / {detailProduct.unit}</span>
                    </span>
                  </div>
                  {previewMode ? (
                    <button
                      onClick={handleGoToStore}
                      className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md"
                      style={{ boxShadow: '0 4px 12px var(--accent-glow)' }}
                    >
                      <Store size={12} />
                      Buka Toko
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(detailProduct)}
                      className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition shadow-md"
                      style={{ boxShadow: '0 4px 12px var(--accent-glow)' }}
                    >
                      <ShoppingCart size={12} />
                      Tambah Keranjang
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Buy Success Modal */}
      <AnimatePresence>
        {buySuccessProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBuySuccessProduct(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-sm bg-white/95 dark:bg-[#060e1a]/95 backdrop-blur-md p-6 rounded-lg text-center border border-border/40 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-350"
            >
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Berhasil Ditambahkan</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  <span className="text-foreground font-semibold">{buySuccessProduct.name}</span> telah berhasil ditambahkan ke keranjang belanja Anda.
                </p>
              </div>

              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={() => setBuySuccessProduct(null)}
                  className="flex-1 py-2 bg-elevated hover:bg-accent/10 border border-border text-muted hover:text-foreground rounded text-xs font-medium transition"
                >
                  Lanjut Belanja
                </button>
                <button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                  className="flex-1 py-2 bg-accent hover:bg-accent-hover text-white rounded text-xs font-semibold transition shadow-md"
                  style={{ boxShadow: '0 4px 12px var(--accent-glow)' }}
                >
                  Buka Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
