import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { CartProvider } from '@/components/providers/cart-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'PT. Industri Karet Nusantara — Well-Established Rubber-Based Downstream Company',
  description: 'PT. Industri Karet Nusantara (IKN), anak usaha PT Perkebunan Nusantara III (Persero). Produsen Resiprene 35, cyclicised natural rubber resin berkualitas tinggi untuk coating industri global.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
