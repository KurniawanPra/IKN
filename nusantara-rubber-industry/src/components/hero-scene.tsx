"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function CentralShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Slow, elegant rotation
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = t * 0.05;

    // Organic scale morphing (simulating liquid rubber elasticity)
    const scale = 1 + Math.sin(t * 1.2) * 0.06;
    meshRef.current.scale.set(scale, scale, scale);

    // Opposing rotation for the outer metallic ring
    ringRef.current.rotation.x = -t * 0.25;
    ringRef.current.rotation.y = -t * 0.1;
  });

  return (
    <group>
      {/* Central Translucent Liquid Rubber Torus Knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.42, 180, 24]} />
        <meshPhysicalMaterial
          color="#c43030"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.75} // Glassmorphism transmission
          thickness={1.8}
          ior={1.6} // High index of refraction for premium liquid glass feel
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Industrial Outer Metallic Spin Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.04, 16, 120]} />
        <meshStandardMaterial
          color="#c0c0c0"
          roughness={0.1}
          metalness={1.0} // High-polished chrome steel look
          envMapIntensity={2.0}
        />
      </mesh>
    </group>
  );
}

interface OrbitingParticleProps {
  radius: number;
  speed: number;
  offset: number;
  yOffset: number;
  size: number;
  type: "glass" | "rubber";
}

function OrbitingParticle({
  radius,
  speed,
  offset,
  yOffset,
  size,
  type,
}: OrbitingParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed + offset;
    
    // Orbit in a circular path
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = yOffset + Math.sin(t * 0.8 + offset) * 0.25;

    // Self-spin
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      {type === "glass" ? (
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
        />
      ) : (
        <meshStandardMaterial
          color="#121212"
          roughness={0.4}
          metalness={0.85} // Matte-metallic industrial vulcanized rubber look
        />
      )}
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    // Ultra-smooth cursor tracking rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.45,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * -0.35,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      {/* Central Morphing Liquid-Glass Structure */}
      <CentralShape />

      {/* Orbiting particles of Glass and Rubber */}
      <OrbitingParticle radius={2.8} speed={0.55} offset={0} yOffset={0.2} size={0.25} type="rubber" />
      <OrbitingParticle radius={3.2} speed={-0.4} offset={1.5} yOffset={-0.3} size={0.2} type="glass" />
      <OrbitingParticle radius={2.9} speed={0.7} offset={3.1} yOffset={0.6} size={0.16} type="rubber" />
      <OrbitingParticle radius={3.5} speed={-0.6} offset={4.8} yOffset={-0.7} size={0.22} type="glass" />
      <OrbitingParticle radius={2.6} speed={0.8} offset={2.2} yOffset={-0.1} size={0.14} type="rubber" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-5, 5, 2]} intensity={0.8} />
      <Scene />
      <Environment preset="city" />
    </Canvas>
  );
}
