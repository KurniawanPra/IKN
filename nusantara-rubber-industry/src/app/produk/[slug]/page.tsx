import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartDrawer from "@/components/cart-drawer";
import CheckoutModal from "@/components/checkout-modal";
import ProductDetailContent from "@/components/product-detail-content";

const products = [
  {
    slug: "resiprene-35",
    name: "Resiprene 35",
    category: "Resin & Coating",
    price: 45000,
    unit: "Kg",
    badge: "Best Seller",
    desc: "Cyclicised natural rubber resin dengan kelarutan tinggi dalam pelarut odorless. Ideal untuk protective coatings dan marine paints.",
    tags: ["Odorless Solvent", "Marine Paint", "Protective Coating"],
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
      "Larut sempurna dalam pelarut odorless",
      "Ramah lingkungan bebas aromatik hidrokarbon",
      "Ketahanan korosi marine-grade premium",
      "Dipercaya oleh industri coating global",
      "Ekspor reguler ke pasar Eropa",
    ],
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
    description:
      "RUBIN adalah rubber resin premium dari Nusantara Rubber Industry untuk aplikasi coating dan adhesive industri. Diproduksi dengan dukungan teknologi pabrik modern yang hemat energi dan ramah lingkungan.",
    specs: [
      { label: "Tipe", value: "Natural Rubber Resin" },
      { label: "Aplikasi", value: "Coating, Adhesive, Sealant" },
      { label: "Kualitas", value: "Export Quality - Pasar Eropa" },
      { label: "Proses", value: "Teknologi modern perkebunan terintegrasi" },
    ],
    features: [
      "Viskositas stabil untuk perekat industri",
      "Kompatibilitas luas dengan berbagai pelarut",
      "Daya rekat superior pada permukaan logam & kayu",
      "Bahan alami dari lateks berkelanjutan",
    ],
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
    description:
      "Bahan baku resin karet alam tersiklisasi dengan tingkat kemurnian tinggi. Digunakan sebagai bahan aditif khusus untuk mempercepat pengeringan cat dan meningkatkan kekerasan lapisan film cat karet.",
    specs: [
      { label: "Tipe", value: "Cyclized Natural Rubber" },
      { label: "Kemurnian", value: "High Chemical Purity > 98%" },
      {
        label: "Aplikasi",
        value: "Bahan baku resin, produk karet modifikasi",
      },
    ],
    features: [
      "Tingkat kemurnian tinggi tanpa campuran residu kimia",
      "Bahan aditif serbaguna untuk cat karet",
      "Meningkatkan resistensi air dan cuaca ekstrem",
      "Diuji secara berkala di laboratorium QC",
    ],
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
    description:
      "Benang karet elastis berkualitas tinggi untuk industri tekstil, garmen, dan pita elastis. Memiliki elastisitas superior (elongation rate tinggi) dan ketahanan yang sangat konsisten terhadap panas proses pencucian.",
    specs: [
      { label: "Tipe", value: "Natural Rubber Thread" },
      { label: "Aplikasi", value: "Tekstil, Garmen, Pita Elastis" },
      {
        label: "Keunggulan",
        value: "Elastisitas tinggi, tahan detergen & panas pencucian",
      },
    ],
    features: [
      "Elastisitas superior tinggi hingga 600% elongasi",
      "Daya tahan tinggi terhadap gesekan mesin garmen",
      "Tersedia berbagai ukuran gauge benang industri",
      "Bahan lateks murni rendah protein alergen",
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

  // Related products mapping
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      unit: p.unit,
      badge: p.badge,
      desc: p.desc,
      tags: p.tags,
    }));

  return (
    <div className="relative">
      <Navbar />
      
      <main>
        <ProductDetailContent
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}
