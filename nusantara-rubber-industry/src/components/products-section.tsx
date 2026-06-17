"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import Link from "next/link";

const categories = ["Semua", "Resin & Coating", "Rubber Thread", "Raw Material"];

const products = [
  {
    slug: "resiprene-35",
    name: "Resiprene 35",
    category: "Resin & Coating",
    badge: "Best Seller",
    desc: "Cyclicised natural rubber resin dengan kelarutan tinggi dalam pelarut odorless. Ideal untuk protective coatings dan marine paints.",
    tags: ["Odorless Solvent", "Marine Paint", "Protective Coating"],
  },
  {
    slug: "rubin",
    name: "RUBIN",
    category: "Resin & Coating",
    badge: null,
    desc: "Natural rubber resin premium untuk aplikasi coating dan adhesive industri. Kualitas ekspor ke pasar Eropa.",
    tags: ["Rubber Resin", "Industrial", "Export Quality"],
  },
  {
    slug: "cyclized-rubber",
    name: "Cyclized Rubber",
    category: "Raw Material",
    badge: null,
    desc: "Bahan baku resin karet alam tersiklisasi dengan kemurnian tinggi untuk berbagai aplikasi industri.",
    tags: ["Raw Material", "High Purity", "Industrial"],
  },
  {
    slug: "rubber-thread",
    name: "Rubber Thread",
    category: "Rubber Thread",
    badge: null,
    desc: "Benang karet berkualitas tinggi untuk industri tekstil dan garmen dengan elastisitas superior.",
    tags: ["Textile", "Elastic", "Garment"],
  },
];

export default function ProductsSection() {
  const [filter, setFilter] = useState("Semua");

  const filtered =
    filter === "Semua"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <section id="produk" className="min-h-screen bg-navy-light py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-rubber-red font-mono uppercase tracking-widest text-sm">
            Produk Unggulan
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-off-white mt-3">
            Katalog Produk
          </h2>
          <p className="text-steel mt-4 max-w-2xl mx-auto">
            Solusi lengkap produk karet berkualitas untuk kebutuhan industri Anda
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-sm px-4 py-2 text-sm transition ${
                filter === cat
                  ? "bg-rubber-red text-white"
                  : "bg-white/5 text-steel"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-navy/80 border border-white/5 rounded-sm overflow-hidden group hover:border-rubber-red/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-rubber-red/10 to-navy-light flex items-center justify-center">
                <FlaskConical className="w-16 h-16 text-steel/20 group-hover:scale-105 transition-transform duration-300" />
              </div>

              <div className="p-5 relative">
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-rubber-red text-white text-xs font-mono px-3 py-1 rounded-sm uppercase">
                    {product.badge}
                  </span>
                )}
                <p className="text-xs font-mono uppercase text-rubber-red">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-off-white mt-1">
                  {product.name}
                </h3>
                <p className="text-sm text-steel mt-2 leading-relaxed line-clamp-3">
                  {product.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 text-steel px-2 py-1 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href={`/produk/${product.slug}`}
                    className="text-sm text-rubber-red hover:text-rubber-red-light font-medium transition"
                  >
                    Lihat Detail
                  </Link>
                  <button className="text-sm text-steel hover:text-off-white font-medium transition">
                    Request Quotation
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
