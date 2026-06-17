"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface ScrollIndicatorProps {
  sections: Section[];
}

export default function ScrollIndicator({ sections }: ScrollIndicatorProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-4">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          className="group flex items-center gap-3"
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <span
            className={`whitespace-nowrap text-xs font-[var(--font-geist-sans)] tracking-wide transition-all duration-200 ${
              hoveredId === id
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            } ${activeId === id ? "text-accent" : "text-muted"}`}
          >
            {label}
          </span>
          <button
            onClick={() => handleClick(id)}
            aria-label={label}
            className={`h-3 w-3 shrink-0 rounded-full transition-all duration-300 ${
              activeId === id
                ? "scale-125 bg-accent"
                : "bg-muted/40 hover:bg-muted/70"
            }`}
          />
        </div>
      ))}
    </nav>
  );
}
