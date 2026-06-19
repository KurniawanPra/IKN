"use client";
import React, { useState, useEffect, useRef } from "react";
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
  mobile:  { rows: 10, cols: 8, cellW: "w-10", cellH: "h-5" },
  tablet:  { rows: 14, cols: 10, cellW: "w-12", cellH: "h-6" },
  laptop:  { rows: 18, cols: 14, cellW: "w-14", cellH: "h-7" },
  desktop: { rows: 20, cols: 14, cellW: "w-16", cellH: "h-8" },
};

export const BoxesCore = ({ className, isDark = true }: { className?: string; isDark?: boolean }) => {
  const bp = useBreakpoint();
  const config = GRID_CONFIG[bp];

  const borderColor = isDark ? "border-slate-700/50" : "border-black/35";
  const defaultBg = isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.02)";

  const containerRef = useRef<HTMLDivElement>(null);

  // Simplified mouse tracking — no DOM raycast, just parallax transform
  useEffect(() => {
    let raf = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const container = containerRef.current;
        if (!container) return;

        // Dynamic Real-time Parallax Effect based on mouse cursor position
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        const translateX = -40 + (mouseX * 4);
        const translateY = -50 + (mouseY * 4);
        const rotate = mouseX * 2.5;

        container.style.transform = `translate(${translateX}%, ${translateY}%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(${rotate}deg) translateZ(0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
          {cols.map((_, j) => (
              <div
                key={`col${j}`}
                className={cn(`${config.cellW} ${config.cellH} border-r border-t relative`, borderColor)}
                style={{ backgroundColor: defaultBg }}
              />
          ))}
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
