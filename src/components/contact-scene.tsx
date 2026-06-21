"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import SceneEffects from "./three/scene-effects";

function GeodesicSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

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
          opacity={0.45}
          emissive="#ff3b3b"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wireframe Outer Sphere */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshBasicMaterial color="#f0f0ec" wireframe transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b1a1a" />
      <GeodesicSphere />
      <Sparkles count={30} scale={[5, 5, 5]} size={1.8} speed={0.2} color="#ffd0d0" opacity={0.5} />
      <Environment preset="city" />
      <SceneEffects intensity={0.6} threshold={0.3} />
    </Canvas>
  );
}
