"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

// Responsive breakpoints
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "laptop" | "desktop">("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else if (w < 1440) setBp("laptop");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

// Reduced grid for performance — fewer cells, no icons
const GRID_CONFIG = {
  mobile:  { rows: 20, cols: 14, cellW: "w-10", cellH: "h-5" },
  tablet:  { rows: 28, cols: 20, cellW: "w-12", cellH: "h-6" },
  laptop:  { rows: 35, cols: 24, cellW: "w-14", cellH: "h-7" },
  desktop: { rows: 40, cols: 28, cellW: "w-16", cellH: "h-8" },
};

export const BoxesCore = ({ className, isDark = true }: { className?: string; isDark?: boolean }) => {
  const bp = useBreakpoint();
  const config = GRID_CONFIG[bp];

  const darkColors = useMemo(() => [
    "#7dd3fc", "#f9a8d4", "#86efac",
    "#fde047", "#fca5a5", "#d8b4fe",
    "#93c5fd", "#a5b4fc", "#c4b5fd",
  ], []);

  const lightColors = useMemo(() => [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b",
    "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"
  ], []);

  const colors = isDark ? darkColors : lightColors;
  const borderColor = isDark ? "border-slate-700/50" : "border-black/35";
  const defaultBg = isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.02)";

  const [hoveredCell, setHoveredCell] = useState<{ i: number; j: number; color: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  // Coordinate-based mouse tracking that works seamlessly behind the page layout
  useEffect(() => {
    let raf = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const container = containerRef.current;
        if (!container) return;

        // Dynamic Real-time Parallax Effect based on mouse cursor position
        const mouseX = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
        const mouseY = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5
        
        // Base translation shifted to Y: -50% to lower it slightly, and moved dynamically
        const translateX = -40 + (mouseX * 4);
        const translateY = -50 + (mouseY * 4);
        const rotate = mouseX * 2.5;

        container.style.transform = `translate(${translateX}%, ${translateY}%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(${rotate}deg) translateZ(0)`;

        // Pixel-perfect mapping: raycast through the DOM to find the exact cell
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const box = elements.find(el => el.hasAttribute('data-box-row'));

        if (box) {
          const col = parseInt(box.getAttribute('data-box-col')!);
          const row = parseInt(box.getAttribute('data-box-row')!);
          setHoveredCell((prev) => {
            if (prev && prev.i === col && prev.j === row) return prev;
            return { i: col, j: row, color: getRandomColor() };
          });
        } else {
          setHoveredCell(null);
        }
      });
    };

    const handleMouseLeave = () => setHoveredCell(null);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [config.rows, config.cols, getRandomColor]);

  const rows = Array.from({ length: config.rows });
  const cols = Array.from({ length: config.cols });

  return (
    <div
      data-boxes-bg
      ref={containerRef}
      style={{
        transform: `translate(-40%,-50%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
    >
      {rows.map((_, i) => (
        <div key={`row${i}`} className={cn(`${config.cellW} ${config.cellH} border-l relative`, borderColor)}>
          {cols.map((_, j) => {
            const isHovered = hoveredCell?.i === i && hoveredCell?.j === j;
            return (
              <div
                key={`col${j}`}
                data-box-col={i}
                data-box-row={j}
                className={cn(`${config.cellW} ${config.cellH} border-r border-t relative`, borderColor)}
                style={{
                  backgroundColor: isHovered ? hoveredCell!.color + (isDark ? "22" : "44") : defaultBg,
                  transition: isHovered ? "none" : "background-color 0.6s ease",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(function Boxes({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return <BoxesCore className={className} isDark={isDark} />;
});
