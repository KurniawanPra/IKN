"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

export function BackgroundBoxesDemo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "h-96 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg",
      isDark ? "bg-slate-900" : "bg-slate-100"
    )}>
      <div className={cn(
        "absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none",
        isDark ? "bg-slate-900" : "bg-slate-100"
      )} />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl relative z-20", isDark ? "text-white" : "text-slate-900")}>
        Nusantara Rubber Industry
      </h1>
      <p className={cn("text-center mt-2 relative z-20", isDark ? "text-neutral-300" : "text-neutral-600")}>
        Interactive background grid with hover effects
      </p>
    </div>
  );
}
