"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  contentClassName?: string;
  glowColor?: string;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      className,
      size = "default",
      contentClassName,
      glowColor = "rgba(16, 185, 129, 0.2)", // Emerald/Teal tint matching IKN Nusantara theme
      type = "button",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const sizeClasses = {
      default: "px-6 py-3 text-base rounded-full",
      sm: "px-4 py-2 text-sm rounded-full",
      lg: "px-8 py-4 text-lg rounded-full",
      icon: "p-3 rounded-full flex items-center justify-center aspect-square",
    };

    // Beautiful macOS Tahoe Liquid Glass effect:
    // - backdrop-blur-md for translucency
    // - Double border effect: thin bright outer border, darker inner shadow
    // - A moving liquid highlight that follows the cursor using useMotionTemplate
    const backgroundTemplate = useMotionTemplate`
      radial-gradient(
        120px circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.15),
        transparent 80%
      ),
      radial-gradient(
        200px circle at ${mouseX}px ${mouseY}px,
        ${glowColor},
        transparent 60%
      ),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.02) 100%
      )
    `;

    return (
      <motion.button
        ref={ref}
        type={type}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={cn(
          "relative overflow-hidden group select-none transition-all duration-300",
          "border border-white/20 hover:border-white/40",
          "bg-white/5 backdrop-blur-xl shadow-lg",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-100 before:transition-opacity before:duration-500 hover:before:opacity-0",
          sizeClasses[size],
          className
        )}
        style={{
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          ...props.style,
        }}
        {...props}
      >
        {/* Dynamic liquid light highlight background */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: backgroundTemplate,
          }}
        />

        {/* Liquid border glow outline for realistic Apple Glass effect */}
        <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none group-hover:border-white/20 transition-all duration-300" />
        <div className="absolute inset-[1px] rounded-full border border-t-white/15 border-b-black/20 pointer-events-none" />

        {/* Refracted glow effect on hover */}
        <div className="absolute -inset-2 bg-white/5 opacity-0 group-hover:opacity-100 blur-md pointer-events-none transition-all duration-500 rounded-full" />

        {/* Button Content */}
        <span
          className={cn(
            "relative z-10 font-medium tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center gap-2",
            contentClassName
          )}
        >
          {children}
        </span>
      </motion.button>
    );
  }
);

GlassButton.displayName = "GlassButton";
