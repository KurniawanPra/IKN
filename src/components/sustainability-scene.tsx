"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import SceneEffects from "./three/scene-effects";

function EmeraldLeafKnot() {
  const ref = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
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
      <torusKnotGeometry args={[0.9, 0.23, 140, 20, 2, 3]} />
      <meshPhysicalMaterial
        color="#10b981"
        roughness={0.1}
        transmission={0.85}
        thickness={1.8}
        transparent
        opacity={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        emissive="#10ffb0"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export default function SustainabilityScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#059669" />
      <EmeraldLeafKnot />
      <Sparkles count={36} scale={[5, 5, 5]} size={2} speed={0.25} color="#7dffd0" opacity={0.6} />
      <Environment preset="city" />
      <SceneEffects intensity={0.7} threshold={0.28} />
    </Canvas>
  );
}
