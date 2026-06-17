import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-white">Nusantara Premium</h3>
            <p className="text-sm font-montserrat font-light text-white/70 mb-6 leading-relaxed">
              Produsen karet alam eksklusif Indonesia dengan komitmen pada kemewahan, keberlanjutan, dan inovasi sejak 1995
            </p>
            <div className="flex space-x-4">
              {[
                { icon: '📘', label: 'Facebook' },
                { icon: '𝕏', label: 'Twitter' },
                { icon: '📷', label: 'Instagram' },
                { icon: '🔗', label: 'LinkedIn' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-lg"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest font-montserrat">Koleksi Premium</h4>
            <ul className="space-y-3 text-sm">
              {['Karet Alam TSR', 'Karet Alam RSS', 'Karet Latex Murni', 'Karet Crepe Premium'].map((item, i) => (
                <li key={i}>
                  <Link href="/products" className="font-montserrat font-light text-white/70 hover:text-amber-400 transition-colors duration-300">
                    → {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest font-montserrat">Informasi</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/about', label: 'Tentang Kami' },
                { href: '/features', label: 'Keunggulan Kami' },
                { href: '/testimonials', label: 'Testimoni' },
                { href: '/contact', label: 'Kontak' }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="font-montserrat font-light text-white/70 hover:text-amber-400 transition-colors duration-300">
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest font-montserrat">Sertifikasi</h4>
            <div className="space-y-3 text-xs">
              {[
                { icon: '✓', cert: 'ISO 9001' },
                { icon: '✓', cert: 'ISO 14001' },
                { icon: '✓', cert: 'SNI Approved' },
                { icon: '✓', cert: 'FSC Certified' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="w-5 h-5 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {item.icon}
                  </span>
                  <span className="font-montserrat font-light text-white/70">{item.cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mb-8" />
        
        {/* Bottom */}
        <div className="pt-8 text-center text-sm text-white/60 font-montserrat font-light">
          <p className="mb-3">&copy; {new Date().getFullYear()} Nusantara Rubber Industry. Semua Hak Dilindungi.</p>
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors duration-300">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors duration-300">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}