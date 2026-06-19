/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideshowProps {
  images: string[];
  interval?: number;
  overlayOpacity?: number;
}

export default function HeaderSlideshow({
  images,
  interval = 5000,
  overlayOpacity = 0.6,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isHovered]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              decoding="async"
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay for text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background"
          style={{ opacity: overlayOpacity }}
        />
        {/* Radial gradient mask for smooth edges */}
        <div className="absolute inset-0 bg-background/30 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_100%)] pointer-events-none" />
      </div>

      {/* Controls layer - elevated to be clickable */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 lg:px-8 pointer-events-none group">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-background/20 backdrop-blur-md text-foreground/70 hover:bg-background/60 hover:text-foreground transition-all border border-border/10 pointer-events-auto opacity-0 md:opacity-50 md:hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-background/20 backdrop-blur-md text-foreground/70 hover:bg-background/60 hover:text-foreground transition-all border border-border/10 pointer-events-auto opacity-0 md:opacity-50 md:hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full pointer-events-auto ${
                idx === currentIndex 
                  ? "w-8 h-2 bg-foreground" 
                  : "w-2 h-2 bg-foreground/40 hover:bg-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
