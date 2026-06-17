"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface GlassTileProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  speed?: number;
}

function GlassTile({ position, rotation, scale, speed = 1 }: GlassTileProps) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      rotation[0] + Math.sin(t * 0.15 * speed) * 0.1,
      0.02
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      rotation[1] + t * 0.03 * speed,
      0.02
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      position[1] + Math.sin(t * 0.4 * speed) * 0.08,
      0.02
    );
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 0.05]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.1}
        transmission={0.8}
        thickness={0.5}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.4,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.3,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      <GlassTile
        position={[-1.2, 0.4, 0]}
        rotation={[0.2, 0.4, 0.1]}
        scale={[1.1, 0.7, 1]}
        speed={0.8}
      />
      <GlassTile
        position={[1.0, -0.5, 0.5]}
        rotation={[-0.3, -0.2, 0.2]}
        scale={[1.3, 0.9, 1]}
        speed={0.6}
      />
      <GlassTile
        position={[-0.3, -0.8, -0.5]}
        rotation={[0.1, -0.5, -0.3]}
        scale={[0.8, 0.8, 1]}
        speed={1.1}
      />
      <GlassTile
        position={[0.8, 0.8, -0.8]}
        rotation={[0.4, 0.3, -0.1]}
        scale={[0.9, 0.6, 1]}
        speed={0.9}
      />
    </group>
  );
}

export default function MediaScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 45 }} // Moved camera back (from 3.5 to 4.8) to prevent clipping
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b1a1a" />
      <Scene />
      <Environment preset="city" />
    </Canvas>
  );
}
