/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

const images = [
  "/images/exhibition.webp",
  "/images/ikn_store.webp",
  "/images/shipping.webp",
  "/images/plantation.webp",
  "/images/rnd_lab.webp",
  "/images/reactor.webp",
];

const titles = [
  "Chemical Indonesia 2024",
  "IKN Store Peresmian",
  "Ekspor Resiprene 35",
  "Sinergi PTPN III",
  "Fasilitas R&D Modern",
  "Proses Siklisasi Reaktor",
];

export default function StackedGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, images.length);
  }, []);

  const handleNext = () => {
    const N = images.length;
    const topCard = cardRefs.current[currentIndex];

    if (topCard) {
      gsap.to(topCard, {
        x: 140,
        y: -40,
        rotation: 15,
        opacity: 0,
        scale: 0.85,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % N);
        },
      });
    } else {
      setCurrentIndex((prev) => (prev + 1) % N);
    }
  };

  const handlePrev = () => {
    const N = images.length;
    const prevIndex = (currentIndex - 1 + N) % N;
    const prevCard = cardRefs.current[prevIndex];

    if (prevCard) {
      gsap.set(prevCard, {
        x: -140,
        y: 40,
        rotation: -15,
        opacity: 0,
        scale: 0.85,
        zIndex: 40,
      });

      gsap.to(prevCard, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          setCurrentIndex(prevIndex);
        },
      });
    } else {
      setCurrentIndex(prevIndex);
    }
  };

  useEffect(() => {
    const N = images.length;
    images.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      const offset = (i - currentIndex + N) % N;

      if (offset === 0 && gsap.isTweening(card)) {
        return;
      }

      if (offset === 0) {
        gsap.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          zIndex: 30,
          duration: 0.4,
          ease: "power2.out",
        });
      } else if (offset === 1) {
        gsap.to(card, {
          x: 16,
          y: -12,
          scale: 0.93,
          rotation: 4,
          opacity: 0.85,
          zIndex: 20,
          duration: 0.4,
          ease: "power2.out",
        });
      } else if (offset === 2) {
        gsap.to(card, {
          x: 32,
          y: -24,
          scale: 0.86,
          rotation: -4,
          opacity: 0.55,
          zIndex: 10,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(card, {
          x: 48,
          y: -36,
          scale: 0.79,
          rotation: 0,
          opacity: 0,
          zIndex: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[260px] md:h-[290px] flex items-center justify-start pl-2 font-sans select-none">
      <div className="relative w-[90%] h-[92%] flex items-center">
        {images.map((img, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden glass-panel origin-center cursor-pointer group"
            onClick={handleNext}
          >
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={titles[index]}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              
              {/* Glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              
              {/* Vignette & text gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
              
              {/* Content text */}
              <div className="absolute bottom-5 left-5 right-5 text-left pointer-events-none">
                <span className="inline-block px-2.5 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] text-white font-mono uppercase font-bold tracking-widest mb-2">
                  Highlight
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight drop-shadow-md">
                  {titles[index]}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern floating pill controls at the top-right of the card stack */}
      <div className="absolute top-3 right-[15%] flex items-center gap-3 bg-black/45 backdrop-blur-xl border border-white/10 rounded-full px-3.5 py-1.5 z-40 text-white shadow-xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="p-1 bg-white/5 hover:bg-white/20 active:scale-95 border border-white/10 rounded-full transition duration-300 text-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        
        <span className="text-[10px] font-mono select-none px-1">
          {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="p-1 bg-white/5 hover:bg-white/20 active:scale-95 border border-white/10 rounded-full transition duration-300 text-white"
          aria-label="Next image"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
