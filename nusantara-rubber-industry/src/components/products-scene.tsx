"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function ShopScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const beakerRef = useRef<THREE.Mesh>(null!);
  const liquidRef = useRef<THREE.Mesh>(null!);
  const spoolRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Smooth lerp for rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      t * 0.12 + pointer.x * 0.3,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * 0.05) * 0.05 + pointer.y * 0.15,
      0.02
    );

    // Beaker bobbing
    beakerRef.current.position.y = Math.sin(t * 1.0) * 0.06 - 0.2;
    liquidRef.current.position.y = beakerRef.current.position.y;
    liquidRef.current.rotation.y = t * 0.3;

    // Spool rotation and bobbing
    spoolRef.current.position.y = Math.cos(t * 0.8) * 0.06 + 0.3;
    spoolRef.current.rotation.z = -t * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* 3D Chemical Beaker (Resin Jar) */}
      <mesh ref={beakerRef} position={[-0.7, -0.2, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.1, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          transmission={0.9}
          thickness={0.2}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Liquid inside the Beaker (Amber Resin) */}
      <mesh ref={liquidRef} position={[-0.7, -0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.75, 32]} />
        <meshPhysicalMaterial
          color="#d97706" // amber resin color
          roughness={0.1}
          transmission={0.8}
          thickness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Spool / Cylinder (Rubber Thread) */}
      <mesh ref={spoolRef} position={[0.7, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.75, 24]} />
        <meshStandardMaterial
          color="#8b1a1a" // rubber red
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      {/* Spool Cap Top */}
      <mesh position={[0.8, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 24]} />
        <meshStandardMaterial
          color="#c0c0c0" // steel cap
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Spool Cap Bottom */}
      <mesh position={[0.8, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 24]} />
        <meshStandardMaterial
          color="#c0c0c0" // steel cap
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

export default function ProductsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 45 }} // Moved camera back (from 3.5 to 4.6) to prevent clipping
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#d97706" />
      <ShopScene />
      <Environment preset="city" />
    </Canvas>
  );
}
