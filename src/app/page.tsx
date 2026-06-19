"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LatestNewsSection from "@/components/latest-news-section";
import MapSection from "@/components/map-section";
import Footer from "@/components/footer";
import ScrollIndicator from "@/components/scroll-indicator";

import { Boxes } from "@/components/ui/background-boxes";
import CompanyVideosSection from "@/components/company-videos-section";
import CompanyProfileSection from "@/components/company-profile-section";

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
    </div>
  );
}
