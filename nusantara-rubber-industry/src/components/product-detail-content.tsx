"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, Product } from "./providers/cart-provider";
import { FlaskConical, CheckCircle, ArrowLeft, ChevronRight, Plus, Minus, ShoppingCart } from "lucide-react";
import BackgroundBlobs from "./background-blobs";

interface ProductDetailContentProps {
  product: Product & {
    description: string;
    specs: { label: string; value: string }[];
    features: string[];
  };
  relatedProducts: Product[];
}

export default function ProductDetailContent({
  product,
  relatedProducts,
}: ProductDetailContentProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCheckoutOpen } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="relative min-h-screen text-foreground font-sans pt-24 overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <BackgroundBlobs sectionId="produk" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="text-muted transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight size={12} className="text-muted-dim" />
          <Link
            href="/#produk"
            className="text-muted transition-colors hover:text-foreground"
          >
            Produk
          </Link>
          <ChevronRight size={12} className="text-muted-dim" />
          <span className="text-foreground font-semibold">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left: Product Image Placeholder with dynamic glow */}
          <div className="relative flex h-[350px] sm:h-[450px] items-center justify-center rounded-lg border border-border shadow-2xl overflow-hidden group" style={{ background: 'var(--bg-elevated)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-rubber-red/20 to-transparent opacity-40 group-hover:scale-105 transition-transform duration-500" />
            <FlaskConical size={80} className="text-rubber-red-light/40 drop-shadow-[0_0_15px_rgba(139,26,26,0.3)] animate-pulse" />
            
            <div className="absolute bottom-4 left-4 border border-border backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-muted font-mono" style={{ background: 'var(--overlay-bg)' }}>
              Produk Terverifikasi Mutu SNI & ISO
            </div>
          </div>

          {/* Right: Product Details & Cart Actions */}
          <div className="flex flex-col gap-6">
            <div>
              {product.badge && (
                <span className="mb-3 inline-block rounded-sm px-2.5 py-0.5 text-[10px] font-mono font-semibold text-white uppercase tracking-wider" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--text-primary)' }}>
                  {product.badge}
                </span>
              )}
              <p className="font-mono text-xs text-rubber-red-light uppercase tracking-wider">
                {product.category}
              </p>
              <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* Price section */}
            <div className="glass-panel p-4 rounded flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-dim block">Harga Satuan</span>
                <span className="text-2xl font-bold font-mono text-foreground">
                  {formatPrice(product.price)}
                  <span className="text-sm font-normal text-muted"> / {product.unit}</span>
                </span>
              </div>
              
              {/* Ready status */}
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-muted-dim block">Status Stok</span>
                <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400">Ready Stock (Kargo Siap Kirim)</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted font-sans">
              {product.description}
            </p>

            {/* Product Features List */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Fitur Unggulan</h4>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-xs text-muted"
                  >
                    <CheckCircle size={14} className="shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* E-Commerce Quantity & Actions */}
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Jumlah</span>
                <div className="flex items-center border border-border rounded bg-elevated">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-muted hover:text-foreground transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-mono text-sm text-foreground font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-muted hover:text-foreground transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-muted font-mono">({product.unit})</span>
              </div>

              {/* Action Buttons */}
              <div className="flex-1 flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-4 py-3 border border-border hover:border-accent/30 bg-elevated hover:bg-accent/10 text-foreground font-medium rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={14} />
                  Keranjang
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn-primary text-xs tracking-wider"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-20">
          <h2 className="mb-6 text-xl font-bold text-foreground uppercase tracking-wider">
            Spesifikasi Teknis
          </h2>
          <div className="glass-panel rounded overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`grid grid-cols-3 gap-4 px-6 py-3.5 text-xs ${
                  i % 2 === 0 ? "bg-elevated" : "bg-transparent"
                }`}
              >
                <span className="font-semibold text-muted col-span-1">
                  {spec.label}
                </span>
                <span className="text-foreground col-span-2">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="mb-6 text-xl font-bold text-foreground uppercase tracking-wider">
            Produk Lainnya
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/produk/${p.slug}`}
                className="glass-panel glass-panel-hover p-5 rounded-md flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-[10px] text-rubber-red-light uppercase tracking-wider">
                    {p.category}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-foreground transition-colors group-hover:text-rubber-red-light">
                    {p.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs text-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-mono text-muted font-medium">{formatPrice(p.price)} / {p.unit}</span>
                  <span className="text-accent hover:underline font-semibold">Lihat Detail →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-16">
          <Link
            href="/#produk"
            className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground font-medium"
          >
            <ArrowLeft size={14} />
            Kembali ke Katalog Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
