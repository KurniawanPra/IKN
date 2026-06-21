"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import SceneEffects from "./three/scene-effects";

function MechanicalRings() {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const centerSphereRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    outerRingRef.current.rotation.x = THREE.MathUtils.lerp(
      outerRingRef.current.rotation.x,
      t * 0.2 + pointer.y * 0.4,
      0.02
    );
    outerRingRef.current.rotation.y = THREE.MathUtils.lerp(
      outerRingRef.current.rotation.y,
      t * 0.15 + pointer.x * 0.4,
      0.02
    );

    innerRingRef.current.rotation.x = THREE.MathUtils.lerp(
      innerRingRef.current.rotation.x,
      -t * 0.3 - pointer.y * 0.4,
      0.02
    );
    innerRingRef.current.rotation.z = THREE.MathUtils.lerp(
      innerRingRef.current.rotation.z,
      t * 0.25 + pointer.x * 0.4,
      0.02
    );

    centerSphereRef.current.position.y = Math.sin(t * 1.2) * 0.1;
    centerSphereRef.current.rotation.y = t * 0.3;
  });

  return (
    <group>
      {/* Outer Ring (Polished Steel) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.5, 0.08, 18, 120]} />
        <meshStandardMaterial
          color="#c0c0c0"
          roughness={0.1}
          metalness={0.95}
          emissive="#dff1ff"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Inner Ring (Obsidian Red Rubber) */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.0, 0.06, 18, 100]} />
        <meshStandardMaterial
          color="#8b1a1a"
          roughness={0.2}
          metalness={0.6}
          emissive="#ff2b2b"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Center Sphere (Liquid Glass) */}
      <mesh ref={centerSphereRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshPhysicalMaterial
          color="#8b1a1a"
          roughness={0.05}
          transmission={0.9}
          thickness={1.5}
          transparent
          opacity={0.85}
          emissive="#ff3b3b"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function BusinessScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.0], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#8b1a1a" />
      <MechanicalRings />
      <Sparkles count={34} scale={[6, 5, 5]} size={2} speed={0.25} color="#ffc4c4" opacity={0.5} />
      <Environment preset="city" />
      <SceneEffects intensity={0.65} threshold={0.28} />
    </Canvas>
  );
}
