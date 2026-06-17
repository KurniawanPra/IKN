"use client";

import LenisProvider from "@/components/providers/lenis-provider";
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

export default function HomePage() {
  return (
    <LenisProvider>
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
      <main>
        <HeroSection />
        <AboutSection />
        <BusinessSection />
        <MediaSection />
        <SustainabilitySection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </LenisProvider>
  );
}
