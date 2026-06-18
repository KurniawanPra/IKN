"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LatestNewsSection from "@/components/latest-news-section";
import MapSection from "@/components/map-section";
import Footer from "@/components/footer";
import ScrollIndicator from "@/components/scroll-indicator";
import CartDrawer from "@/components/cart-drawer";
import CheckoutModal from "@/components/checkout-modal";

import { Entropy } from "@/components/ui/entropy";
import CompanyVideosSection from "@/components/company-videos-section";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Home Background Entropy Particle System */}
      <div className="fixed inset-0 w-full h-full -z-20 bg-background overflow-hidden pointer-events-none flex items-center justify-center transition-colors duration-500">
        <Entropy className="opacity-35 scale-[1.5] md:scale-[2.2]" size={800} />
      </div>
      <Navbar />
      <ScrollIndicator
        sections={[
          { id: "hero", label: "Home" },
          { id: "company-videos", label: "Video" },
          { id: "latest-news", label: "Latest News" },
          { id: "map", label: "Lokasi" },
        ]}
      />
      <main className="snap-container">
        <section id="hero" className="snap-section">
          <HeroSection />
        </section>
        <section id="company-videos" className="snap-section">
          <CompanyVideosSection />
        </section>
        <section id="latest-news" className="snap-section">
          <LatestNewsSection />
        </section>
        <section id="map" className="snap-section overflow-y-auto no-scrollbar">
          <MapSection />
          <Footer />
        </section>
      </main>

      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}
