"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ScrollIndicator from "@/components/scroll-indicator";

import { Boxes } from "@/components/ui/background-boxes";
import ProductsSection from "@/components/products-section";

const CompanyProfileSection = dynamic(() => import("@/components/company-profile-section"), { ssr: false });
const CompanyVideosSection = dynamic(() => import("@/components/company-videos-section"), { ssr: false });
const LatestNewsSection = dynamic(() => import("@/components/latest-news-section"), { ssr: false });
const MapSection = dynamic(() => import("@/components/map-section"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });

export default function HomePage() {
  return (
    <div className="relative">
      {/* Interactive Boxes Grid Background - behind everything */}
      <div className="fixed inset-0 w-full h-full -z-20 bg-background overflow-hidden transition-colors duration-500">
        <Boxes />
        {/* Radial mask to soften the grid edges */}
        <div className="absolute inset-0 bg-background/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_100%)] pointer-events-none" />
      </div>
      
      <Navbar />
      <ScrollIndicator
        sections={[
          { id: "hero", label: "Home" },
          { id: "company-videos", label: "Video" },
          { id: "latest-news", label: "Latest News" },
          { id: "business-products", label: "Produk" },
          { id: "map", label: "Lokasi" },
        ]}
      />
      <main className="snap-container">
        <section id="hero" className="snap-section">
          <HeroSection />
        </section>
        <section id="company-profile" className="snap-section">
          <CompanyProfileSection />
        </section>
        <section id="company-videos" className="snap-section flex flex-col justify-center">
          <CompanyVideosSection />
        </section>
        <section id="latest-news" className="snap-section flex flex-col justify-center">
          <LatestNewsSection />
        </section>
        <section id="business-products" className="snap-section relative h-[100dvh] flex flex-col justify-center border-t border-border/40 bg-elevated/10 overflow-hidden">
          <ProductsSection previewMode={true} />
        </section>
        <section id="map" className="snap-section flex flex-col justify-center">
          <MapSection />
        </section>
        <section id="footer" className="snap-section flex flex-col justify-center">
          <Footer />
        </section>
      </main>
    </div>
  );
}
