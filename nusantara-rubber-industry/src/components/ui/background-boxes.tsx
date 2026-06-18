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

// Element tags that should block the background glow
const BLOCKED_TAGS = new Set([
  "CANVAS", "VIDEO", "IMG", "SVG", "IFRAME",
  "A", "BUTTON", "INPUT", "TEXTAREA", "SELECT",
  "H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "LABEL",
  "NAV", "HEADER", "FOOTER", "SECTION",
]);

export const BoxesCore = ({ className, isDark = true }: { className?: string; isDark?: boolean }) => {
  const bp = useBreakpoint();
  const config = GRID_CONFIG[bp];

  const darkColors = useMemo(() => [
    "rgb(125 211 252)", "rgb(249 168 212)", "rgb(134 239 172)",
    "rgb(253 224 71)", "rgb(252 165 165)", "rgb(216 180 254)",
    "rgb(147 197 253)", "rgb(165 180 252)", "rgb(196 181 253)",
  ], []);

  const lightColors = useMemo(() => [
    "rgb(56 189 248)", "rgb(244 114 182)", "rgb(74 222 128)",
    "rgb(250 204 21)", "rgb(248 113 113)", "rgb(192 132 252)",
    "rgb(96 165 250)", "rgb(129 140 248)", "rgb(167 139 250)",
  ], []);

  const colors = isDark ? darkColors : lightColors;
  const borderColor = isDark ? "border-slate-700/50" : "border-slate-300/50";
  const defaultBg = isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)";

  const [hoveredCell, setHoveredCell] = useState<{ i: number; j: number; color: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  // Efficient mouse tracking — skip glow when cursor is over foreground content
  useEffect(() => {
    let raf = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        if (
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom
        ) {
          setHoveredCell(null);
          return;
        }

        // Check what element is under the cursor — skip glow if it's foreground content
        const topEl = document.elementFromPoint(e.clientX, e.clientY);
        if (topEl) {
          // Walk up the DOM tree to check if cursor is over a blocked element
          let el: HTMLElement | null = topEl as HTMLElement;
          let blocked = false;
          while (el && el !== document.body) {
            if (BLOCKED_TAGS.has(el.tagName)) {
              // Allow our own container — it's the background grid
              if (el === container || el.closest("[data-boxes-bg]")) {
                break;
              }
              blocked = true;
              break;
            }
            // Also block if the element has pointer-events enabled (foreground)
            const pe = getComputedStyle(el).pointerEvents;
            if (pe !== "none" && el !== container && !el.closest("[data-boxes-bg]")) {
              blocked = true;
              break;
            }
            el = el.parentElement;
          }
          if (blocked) {
            setHoveredCell(null);
            return;
          }
        }

        // Map mouse position to grid coordinates
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;

        const col = Math.floor(relX * config.cols);
        const row = Math.floor(relY * config.rows);

        if (row >= 0 && row < config.rows && col >= 0 && col < config.cols) {
          setHoveredCell((prev) => {
            if (prev && prev.i === row && prev.j === col) return prev;
            return { i: row, j: col, color: getRandomColor() };
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

  // Hide grid on mobile for performance
  if (bp === "mobile") {
    return (
      <div className={cn("absolute inset-0 z-0 pointer-events-none", className)}>
        <div className={cn("w-full h-full", isDark ? "bg-slate-900/30" : "bg-slate-100/30")} />
      </div>
    );
  }

  const rows = Array.from({ length: config.rows });
  const cols = Array.from({ length: config.cols });

  return (
    <div
      data-boxes-bg
      ref={containerRef}
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none",
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
                className={cn(`${config.cellW} ${config.cellH} border-r border-t relative`, borderColor)}
                style={{
                  backgroundColor: isHovered ? hoveredCell!.color + "22" : defaultBg,
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
