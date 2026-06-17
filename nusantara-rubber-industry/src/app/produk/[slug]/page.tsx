import Link from "next/link";
import { notFound } from "next/navigation";
import { FlaskConical, CheckCircle, ArrowLeft, ChevronRight } from "lucide-react";

const products = [
  {
    slug: "resiprene-35",
    name: "Resiprene 35",
    category: "Resin & Coating",
    badge: "Best Seller",
    description:
      "Resiprene 35 adalah karet alam tersiklisasi (cyclicised natural rubber) dengan kelarutan tinggi dalam pelarut bebas bau (odourless solvents), khususnya dalam aliphatic hydrocarbon. Produk ini sangat cocok untuk pelapis pelindung (protective coatings) dan cat perawatan (maintenance coatings), serta cat kelautan (marine paints) yang dapat diaplikasikan dengan kuas, roller, maupun spray.",
    specs: [
      { label: "Tipe", value: "Cyclicised Natural Rubber Resin" },
      { label: "Kelarutan", value: "Aliphatic Hydrocarbons (Odorless)" },
      {
        label: "Aplikasi",
        value: "Protective Coatings, Marine Paints, Maintenance Coatings",
      },
      { label: "Metode Aplikasi", value: "Kuas, Roller, Spray" },
      {
        label: "Keunggulan Lingkungan",
        value: "Tidak memerlukan aromatic hydrocarbons",
      },
      { label: "Bau Residu", value: "Non-residual drying oil smell" },
      { label: "Pasar Ekspor", value: "Jerman, Eropa Barat, Oceania" },
      { label: "Standar", value: "Kualitas tertinggi dalam produk resin" },
    ],
    features: [
      "Larut dalam pelarut odorless",
      "Ramah lingkungan",
      "Kualitas resin tertinggi",
      "Cocok untuk marine paints",
      "Ekspor ke pasar global",
    ],
  },
  {
    slug: "rubin",
    name: "RUBIN",
    category: "Resin & Coating",
    badge: null,
    description:
      "RUBIN adalah rubber resin premium dari PT. Industri Karet Nusantara untuk aplikasi coating dan adhesive industri. Diproduksi dengan dukungan teknologi pabrik modern yang ramah lingkungan.",
    specs: [
      { label: "Tipe", value: "Natural Rubber Resin" },
      { label: "Aplikasi", value: "Coating, Adhesive, Sealant" },
      { label: "Kualitas", value: "Export Quality - Pasar Eropa" },
      { label: "Proses", value: "Teknologi modern, ramah lingkungan" },
    ],
    features: [
      "Kualitas ekspor",
      "Ramah lingkungan",
      "Aplikasi luas",
      "Teknologi modern",
    ],
  },
  {
    slug: "cyclized-rubber",
    name: "Cyclized Rubber",
    category: "Raw Material",
    badge: null,
    description:
      "Bahan baku resin karet alam tersiklisasi dengan kemurnian tinggi. Digunakan sebagai bahan dasar untuk berbagai produk turunan karet industri.",
    specs: [
      { label: "Tipe", value: "Cyclized Natural Rubber" },
      { label: "Kemurnian", value: "Tinggi" },
      {
        label: "Aplikasi",
        value: "Bahan baku resin, produk turunan karet",
      },
    ],
    features: [
      "Kemurnian tinggi",
      "Bahan baku versatile",
      "Standar industri",
    ],
  },
  {
    slug: "rubber-thread",
    name: "Rubber Thread",
    category: "Rubber Thread",
    badge: null,
    description:
      "Benang karet berkualitas tinggi untuk industri tekstil dan garmen. Memiliki elastisitas superior dan daya tahan yang konsisten.",
    specs: [
      { label: "Tipe", value: "Natural Rubber Thread" },
      { label: "Aplikasi", value: "Tekstil, Garmen, Elastik" },
      {
        label: "Keunggulan",
        value: "Elastisitas superior, daya tahan konsisten",
      },
    ],
    features: [
      "Elastisitas tinggi",
      "Daya tahan konsisten",
      "Kualitas tekstil",
    ],
  },
];

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.slug !== product.slug);

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        <nav className="mb-12 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#c0c0c0] transition-colors hover:text-[#f0f0ec]"
          >
            Home
          </Link>
          <ChevronRight size={14} className="text-[#c0c0c0]/40" />
          <Link
            href="/#produk"
            className="text-[#c0c0c0] transition-colors hover:text-[#f0f0ec]"
          >
            Produk
          </Link>
          <ChevronRight size={14} className="text-[#c0c0c0]/40" />
          <span className="text-[#f0f0ec]">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex h-[400px] items-center justify-center rounded-sm bg-gradient-to-br from-[#8b1a1a]/10 to-[#142040]">
            <FlaskConical size={64} className="text-[#c0c0c0]/30" />
          </div>

          <div>
            {product.badge && (
              <span className="mb-3 inline-block rounded-sm bg-[#8b1a1a]/20 px-3 py-1 text-xs font-medium text-[#8b1a1a]">
                {product.badge}
              </span>
            )}
            <p className="font-mono text-sm text-[#8b1a1a]">
              {product.category}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-[#f0f0ec]">
              {product.name}
            </h1>
            <p className="mt-4 leading-relaxed text-[#c0c0c0]">
              {product.description}
            </p>

            <ul className="mt-8 space-y-3">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-[#f0f0ec]"
                >
                  <CheckCircle size={16} className="shrink-0 text-[#8b1a1a]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/#contact"
                className="rounded-sm bg-[#8b1a1a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#8b1a1a]/90"
              >
                Request Quotation
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-[#c0c0c0] transition-colors hover:text-[#f0f0ec]"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-6 text-2xl font-bold text-[#f0f0ec]">
            Spesifikasi Teknis
          </h2>
          <div className="overflow-hidden rounded-sm">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`grid grid-cols-2 gap-4 px-6 py-4 ${
                  i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"
                }`}
              >
                <span className="text-sm font-medium text-[#c0c0c0]">
                  {spec.label}
                </span>
                <span className="text-sm text-[#f0f0ec]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-6 text-2xl font-bold text-[#f0f0ec]">
            Produk Lainnya
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/produk/${p.slug}`}
                className="group rounded-sm border border-white/5 bg-[#142040] p-6 transition-colors hover:border-[#8b1a1a]/30"
              >
                <p className="font-mono text-xs text-[#8b1a1a]">
                  {p.category}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[#f0f0ec] transition-colors group-hover:text-[#8b1a1a]">
                  {p.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#c0c0c0]">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Link
            href="/#produk"
            className="inline-flex items-center gap-2 text-sm text-[#c0c0c0] transition-colors hover:text-[#f0f0ec]"
          >
            <ArrowLeft size={16} />
            Kembali ke Katalog Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
