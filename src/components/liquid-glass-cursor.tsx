"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LiquidGlassCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device supports touch/mobile (custom cursor is only for desktop/mouse users)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Set enabled to true so CSS styles and visibility are activated
    setEnabled(true);

    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) return;

    // Position coordinates
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    // Set initial position centered
    gsap.set(outer, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y });
    gsap.set(inner, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y });

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth position updates using GSAP ticker (60+ FPS lerp)
    const tick = () => {
      // Smooth outer glass orb (lerp factor 0.15)
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      
      gsap.set(outer, { x: pos.x, y: pos.y });
      
      // Fast tracking for inner dot
      gsap.set(inner, { x: mouse.x, y: mouse.y });
    };

    gsap.ticker.add(tick);

    // Track mouse hover over interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", onMouseOver);

    // Fade cursor out/in when leaving/entering the window
    const onMouseLeave = () => {
      gsap.to([outer, inner], { opacity: 0, scale: 0, duration: 0.25, ease: "power2.out" });
    };

    const onMouseEnter = () => {
      gsap.to([outer, inner], { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div style={{ display: enabled ? "block" : "none" }}>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-300 ease-out will-change-transform"
        style={{
          width: isHovered ? "56px" : "28px",
          height: isHovered ? "56px" : "28px",
          backgroundColor: "transparent",
          border: isHovered ? "1.5px solid var(--cursor-border-hover)" : "1px solid var(--cursor-border)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: isHovered 
            ? "0 8px 32px 0 rgba(0, 160, 255, 0.25)"
            : "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
        }}
      />
      
      {/* Inner solid tracking dot */}
      <div
        ref={innerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200 ease-out will-change-transform ${
          isHovered ? "w-1.5 h-1.5 opacity-0 scale-0" : "w-1.5 h-1.5 opacity-80 scale-100"
        }`}
        style={{
          backgroundColor: "var(--cursor-inner)",
        }}
      />
      
      {/* Disable default browser cursor for clickable elements */}
      {enabled && (
        <style dangerouslySetInnerHTML={{ __html: `
          @media (pointer: fine) {
            html, body, a, button, [role="button"], input, select, textarea, .btn-primary, .btn-outline {
              cursor: none !important;
            }
          }
        `}} />
      )}
    </div>
  );
}
