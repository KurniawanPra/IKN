"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function EmeraldLeafKnot() {
  const ref = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Smooth transition inertia
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      t * 0.12 + pointer.y * 0.4,
      0.02
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      t * 0.18 + pointer.x * 0.4,
      0.02
    );
    ref.current.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.9, 0.23, 100, 16, 2, 3]} />
      <meshPhysicalMaterial
        color="#10b981" // emerald green
        roughness={0.1}
        transmission={0.85}
        thickness={1.8}
        transparent
        opacity={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function SustainabilityScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }} // Moved camera back (from 3.2 to 4.2) to prevent clipping
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#059669" />
      <EmeraldLeafKnot />
      <Environment preset="city" />
    </Canvas>
  );
}
