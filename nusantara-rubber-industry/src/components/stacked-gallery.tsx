"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

const images = [
  "/images/exhibition.png",
  "/images/ikn_store.png",
  "/images/shipping.png",
  "/images/plantation.png",
  "/images/rnd_lab.png",
  "/images/reactor.png",
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

  // Setup refs array size
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, images.length);
  }, []);

  const handleNext = () => {
    const N = images.length;
    const topCard = cardRefs.current[currentIndex];

    if (topCard) {
      // Fly away animation to the right/top and fade out
      gsap.to(topCard, {
        x: 120,
        y: -30,
        rotation: 12,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          // Move to the next index
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
      // Set previous card offscreen left first, then fly in to front
      gsap.set(prevCard, {
        x: -120,
        y: 30,
        rotation: -12,
        opacity: 0,
        scale: 0.9,
        zIndex: 40,
      });

      // Fly in to front
      gsap.to(prevCard, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setCurrentIndex(prevIndex);
        },
      });
    } else {
      setCurrentIndex(prevIndex);
    }
  };

  // Adjust stacked cards positions based on currentIndex
  useEffect(() => {
    const N = images.length;
    images.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      const offset = (i - currentIndex + N) % N;

      // Only animate active transitions, skip the card that is currently flying away (which has custom anim)
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
          duration: 0.35,
          ease: "power2.out",
        });
      } else if (offset === 1) {
        gsap.to(card, {
          x: 12,
          y: -10,
          scale: 0.94,
          rotation: 3,
          opacity: 0.85,
          zIndex: 20,
          duration: 0.35,
          ease: "power2.out",
        });
      } else if (offset === 2) {
        gsap.to(card, {
          x: 24,
          y: -20,
          scale: 0.88,
          rotation: -3,
          opacity: 0.6,
          zIndex: 10,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        // Hidden cards
        gsap.to(card, {
          x: 36,
          y: -30,
          scale: 0.82,
          rotation: 0,
          opacity: 0,
          zIndex: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    });
  }, [currentIndex]);

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[220px] md:h-[250px] flex items-center justify-start pl-4 font-sans select-none">
      <div className="relative w-[85%] h-[90%] flex items-center">
        {images.map((img, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full rounded-xl border border-border shadow-xl overflow-hidden glass-panel origin-center cursor-pointer"
            onClick={handleNext}
          >
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={titles[index]}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-left pointer-events-none">
                <span className="text-[9px] font-mono text-rubber-red-light uppercase font-bold tracking-widest block mb-0.5">Gallery / Media</span>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">
                  {titles[index]}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual buttons */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="p-1.5 bg-elevated hover:bg-accent border border-border rounded-full hover:text-white transition duration-300 text-foreground"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="p-1.5 bg-elevated hover:bg-accent border border-border rounded-full hover:text-white transition duration-300 text-foreground"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
