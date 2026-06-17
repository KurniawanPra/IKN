"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import BusinessSection from "@/components/business-section";
import MediaSection from "@/components/media-section";
import SustainabilitySection from "@/components/sustainability-section";
import ProductsSection from "@/components/products-section";
import ContactSection from "@/components/contact-section";
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
          { id: "about", label: "About Us" },
          { id: "business", label: "Business" },
          { id: "media", label: "Media" },
          { id: "sustainability", label: "Sustainability" },
          { id: "produk", label: "Produk" },
          { id: "contact", label: "Contact" },
        ]}
      />
      <main className="snap-container">
        <section id="hero" className="snap-section">
          <HeroSection />
        </section>
        <section id="about" className="snap-section">
          <AboutSection />
        </section>
        <section id="business" className="snap-section">
          <BusinessSection />
        </section>
        <section id="media" className="snap-section">
          <MediaSection />
        </section>
        <section id="sustainability" className="snap-section">
          <SustainabilitySection />
        </section>
        <section id="produk" className="snap-section">
          <ProductsSection />
        </section>
        <section id="contact" className="snap-section">
          <ContactSection />
        </section>
        <section className="snap-section !h-auto">
          <Footer />
        </section>
      </main>

      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}
