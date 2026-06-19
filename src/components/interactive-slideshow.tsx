"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InteractiveSlideshowProps {
  items: { type: "image" | "video"; src: string; alt?: string }[];
  interval?: number;
}

export default function InteractiveSlideshow({ items, interval = 5000 }: InteractiveSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-border group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {currentItem.type === "image" ? (
            <img
              src={currentItem.src}
              alt={currentItem.alt || "Slide"}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={currentItem.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4">
        <button 
          onClick={handlePrev}
          className="p-2 rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-background/80 transition-colors border border-border/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext}
          className="p-2 rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-background/80 transition-colors border border-border/50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex 
                ? "w-6 h-2 bg-foreground" 
                : "w-2 h-2 bg-foreground/40 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
