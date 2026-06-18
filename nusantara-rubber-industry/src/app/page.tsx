"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LatestNewsSection from "@/components/latest-news-section";
import MapSection from "@/components/map-section";
import Footer from "@/components/footer";
import ScrollIndicator from "@/components/scroll-indicator";
import CartDrawer from "@/components/cart-drawer";
import CheckoutModal from "@/components/checkout-modal";

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <ScrollIndicator
        sections={[
          { id: "hero", label: "Home" },
          { id: "latest-news", label: "Latest News" },
          { id: "map", label: "Lokasi" },
        ]}
      />
      <main className="snap-container">
        <section id="hero" className="snap-section">
          <HeroSection />
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
