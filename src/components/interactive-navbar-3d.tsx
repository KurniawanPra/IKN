"use client";

import React, { Suspense, lazy, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Lazy load the heavy Spline component to prevent blocking SSR / initial bundle ───
const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE_URL = "https://prod.spline.design/Jxi-cskjUfE1d6hM/scene.splinecode";

// ─── R3F FALLBACK COMPONENT (For offline, errors, or slow network connections) ───

function GyroRing({ radius, speed, color, axis }: { radius: number; speed: number; color: string; axis: "x" | "y" | "z" }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const factor = t * speed;
    if (axis === "x") {
      meshRef.current.rotation.x = factor;
      meshRef.current.rotation.y = factor * 0.5;
    } else if (axis === "y") {
      meshRef.current.rotation.y = factor;
      meshRef.current.rotation.z = factor * 0.5;
    } else {
      meshRef.current.rotation.z = factor;
      meshRef.current.rotation.x = factor * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.03, 16, 64]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function RubberMonomer() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smoothly tilt toward mouse pointer
    const targetX = state.pointer.x * 0.6;
    const targetY = state.pointer.y * 0.6;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.15;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.15;

    // Idle rotation
    meshRef.current.rotation.z += 0.005;

    // Dynamic morphing/pulsing scale based on hover
    const baseScale = hovered ? 1.15 : 0.95;
    const pulse = Math.sin(t * 2.5) * 0.04;
    const scale = baseScale + pulse;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        setHovered(true);
        if (typeof window !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof window !== "undefined") document.body.style.cursor = "auto";
      }}
    >
      {/* Dynamic geometry: icosahedron representing molecular structure */}
      <icosahedronGeometry args={[0.75, 2]} />
      <meshPhysicalMaterial
        color={hovered ? "#00f0ff" : "#10b981"} // Cyan on hover, Emerald green normally
        emissive={hovered ? "#004466" : "#042f2e"}
        emissiveIntensity={hovered ? 2.0 : 0.8}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function ReactThreeFiberFallback() {
  return (
    <div className="w-full h-full relative" title="Interactive 3D Rubber Macromolecule Logo">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <pointLight position={[-3, -3, -3]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[0, 3, 0]} intensity={1.0} color="#10b981" />
        
        <Suspense fallback={null}>
          <group scale={0.7}>
            <RubberMonomer />
            {/* Gyroscopic orbiting outer rings */}
            <GyroRing radius={1.1} speed={0.8} color="#10b981" axis="x" />
            <GyroRing radius={1.2} speed={-1.2} color="#00f0ff" axis="y" />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
// ─── ERROR BOUNDARY FOR SPLINE RUNTIME ───

class SplineErrorBoundary extends React.Component<
  { fallback: React.ReactNode; onError?: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Spline rendering error caught by SplineErrorBoundary:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ─── MAIN EXPORTED COMPONENT ───

export default function InteractiveNavbar3D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 1. Immediately failover if browser is offline
    if (typeof window !== "undefined" && !window.navigator.onLine) {
      setHasError(true);
      return;
    }

    // 2. Set safety timeout: if Spline doesn't load within 4.5 seconds, use R3F fallback
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (hasError) {
    return <ReactThreeFiberFallback />;
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Clean Glassmorphic Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
        </div>
      )}

      <Suspense fallback={null}>
        <div className={`w-full h-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <SplineErrorBoundary
            fallback={<ReactThreeFiberFallback />}
            onError={() => setHasError(true)}
          >
            <Spline
              scene={SPLINE_SCENE_URL}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          </SplineErrorBoundary>
        </div>
      </Suspense>
    </div>
  );
}
