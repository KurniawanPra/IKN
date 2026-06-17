import Link from "next/link";

const produkLinks = [
  { label: "Resiprene 35", href: "/produk/resiprene-35" },
  { label: "RUBIN", href: "/produk/rubin" },
  { label: "Cyclized Rubber", href: "/produk/cyclized-rubber" },
  { label: "Rubber Thread", href: "/produk/rubber-thread" },
];

const perusahaanLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Lini Bisnis", href: "#bisnis" },
  { label: "Media", href: "#media" },
  { label: "Keberlanjutan", href: "#keberlanjutan" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060e1a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-2xl font-bold text-off-white">IKN</p>
            <p className="text-sm text-steel mt-2">
              PT. Industri Karet Nusantara
            </p>
            <p className="text-xs text-steel-dark mt-1">
              Anak usaha PT Perkebunan Nusantara III (Persero)
            </p>
            <p className="text-xs text-steel-dark">
              Holding Perkebunan Nusantara
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-off-white mb-4">Produk</p>
            <ul className="space-y-2">
              {produkLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-off-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-off-white mb-4">
              Perusahaan
            </p>
            <ul className="space-y-2">
              {perusahaanLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-off-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-off-white mb-4">Kontak</p>
            <div className="space-y-2">
              <p className="text-sm text-steel">
                Jl. Medan - Tanjung Morawa Km 9,5, Medan 20148
              </p>
              <p className="text-sm text-steel">+62 61 786 7356</p>
              <p className="text-sm text-steel">ikn@ptikn.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center">
          <p className="text-xs text-steel-dark">
            © 2026 PT. Industri Karet Nusantara. All rights reserved.
          </p>
          <p className="text-xs text-steel-dark mt-1">
            Subsidiary of PT Perkebunan Nusantara III (Persero)
          </p>
        </div>
      </div>
    </footer>
  );
}
