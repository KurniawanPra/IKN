import './globals.css'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { CartProvider } from '@/components/providers/cart-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import CartDrawer from '@/components/cart-drawer'
import CheckoutModal from '@/components/checkout-modal'
import LiquidGlassCursor from '@/components/liquid-glass-cursor'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PT. Industri Karet Nusantara',
  description: 'PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan Nusantara III (Persero). Produsen Resiprene 35, cyclicised natural rubber resin berkualitas tinggi untuk coating industri global.',
  openGraph: {
    title: 'PT. Industri Karet Nusantara',
    description: 'Produsen Resiprene 35 dan industri hilir karet alam berkualitas tinggi.',
    siteName: 'PT. Industri Karet Nusantara',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT. Industri Karet Nusantara',
    description: 'Produsen Resiprene 35 dan industri hilir karet alam berkualitas tinggi.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent theme flash (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ikn_theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                  document.documentElement.style.colorScheme = theme || 'dark';
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CheckoutModal />
            <LiquidGlassCursor />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
