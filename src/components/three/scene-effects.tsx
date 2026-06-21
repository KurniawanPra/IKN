"use client";

import { useEffect, useState } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Detects the user's "prefers-reduced-motion" setting so scenes can tone
 * down or pause heavy animation for accessibility / battery savings.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

interface SceneEffectsProps {
  /** Bloom strength. Lower for subtle scenes, higher for the neon hero. */
  intensity?: number;
  /** Brightness above which pixels start to glow (0-1). */
  threshold?: number;
  /** Adds a soft darkened frame around the canvas. */
  vignette?: boolean;
}

/**
 * Shared post-processing stack used by every 3D scene so the whole site
 * shares one cohesive, glowing visual language.
 */
export default function SceneEffects({
  intensity = 0.9,
  threshold = 0.22,
  vignette = true,
}: SceneEffectsProps) {
  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={threshold}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      {vignette ? <Vignette eskil={false} offset={0.25} darkness={0.7} /> : <></>}
    </EffectComposer>
  );
}
