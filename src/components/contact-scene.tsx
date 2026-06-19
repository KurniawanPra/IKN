"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function GeodesicSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Slow rotational drift + smooth pointer reaction (0.02)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      t * 0.08 + pointer.x * 0.4,
      0.02
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      Math.sin(t * 0.05) * 0.1 + pointer.y * 0.3,
      0.02
    );

    wireframeRef.current.rotation.y = meshRef.current.rotation.y;
    wireframeRef.current.rotation.x = meshRef.current.rotation.x;

    // Glowing animation
    const scale = 1 + Math.sin(t * 1.2) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
    wireframeRef.current.scale.set(scale * 1.01, scale * 1.01, scale * 1.01);
  });

  return (
    <group>
      {/* Semi-transparent Glass Inner Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshPhysicalMaterial
          color="#8b1a1a"
          roughness={0.15}
          transmission={0.8}
          thickness={1.0}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Wireframe Outer Sphere */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshBasicMaterial
          color="#f0f0ec"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }} // Moved camera back (from 2.8 to 3.8) to prevent clipping
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b1a1a" />
      <GeodesicSphere />
      <Environment preset="city" />
    </Canvas>
  );
}
