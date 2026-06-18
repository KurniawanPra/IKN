"use client";

import { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { gsap } from "gsap";

const contactInfo = [
  {
    icon: MapPin,
    title: "Kantor & Pabrik",
    text: "Jl. Medan - Tanjung Morawa Km 9,5, Medan 20148, Sumatera Utara",
  },
  {
    icon: Phone,
    title: "Telepon",
    text: "+62 61 786 7356 / +62 811 648 0083",
  },
  {
    icon: Mail,
    title: "Email",
    text: "sales@nusantararubber.com",
  },
  {
    icon: Globe,
    title: "Website Resmi",
    text: "nusantararubber.com",
  },
];

export default function MapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const cards = cardsRef.current;
    const map = mapRef.current;

    // Set initial state
    gsap.set([left, map], { opacity: 0, y: 30 });
    if (cards) {
      gsap.set(cards.children, { opacity: 0, x: -20 });
    }

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === left) {
            gsap.to(left, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
            });
            observer.unobserve(left);
          } else if (entry.target === cards) {
            gsap.to(cards.children, {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: "power2.out",
            });
            observer.unobserve(cards);
          } else if (entry.target === map) {
            gsap.to(map, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            observer.unobserve(map);
          }
        }
      });
    }, observerOptions);

    if (left) observer.observe(left);
    if (cards) observer.observe(cards);
    if (map) observer.observe(map);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-full lg:h-full w-full flex items-start lg:items-center overflow-y-auto lg:overflow-hidden no-scrollbar font-sans"
    >

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full flex flex-col justify-start lg:justify-center min-h-full h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Info */}
          <div ref={leftRef} className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rubber-red-light font-mono mb-2">
                Lokasi Kami
              </p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Temukan Kami di Medan
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Fasilitas produksi dan kantor pusat PT. Industri Karet Nusantara berlokasi di kawasan industri Tanjung Morawa, Sumatera Utara.
              </p>
            </div>

            {/* Contact info cards */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 items-start glass-panel p-3.5 rounded-md"
                >
                  <item.icon className="text-rubber-red-light w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-muted-dim tracking-wider">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-muted mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA to Contact page */}
            <a
              href="/about#about-contact"
              className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 w-fit"
            >
              Kirim Pesan <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right: Google Maps embed */}
          <div ref={mapRef} className="lg:col-span-7">
            <div
              className="w-full rounded-lg overflow-hidden border border-border shadow-xl relative"
              style={{ height: "420px", background: "var(--bg-elevated)" }}
            >
              <iframe
                title="Peta Lokasi PT. Industri Karet Nusantara"
                src="https://maps.google.com/maps?q=PT%20Industri%20Karet%20Nusantara,%20Tanjung%20Morawa&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 dark:grayscale dark:invert dark:opacity-70 dark:contrast-125 dark:brightness-90 transition-opacity duration-300"
                allowFullScreen={false}
                loading="lazy"
              />
              {/* Overlay label */}
              <div
                className="absolute bottom-3 left-3 glass-panel px-3 py-1.5 rounded-sm flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-rubber-red-light shrink-0" />
                <span className="text-[10px] font-mono text-foreground">
                  PT. Industri Karet Nusantara
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
