"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  radius?: number;
  type?: "sphere" | "torus";
  speed?: number;
  offset?: number;
}

function FloatingShape({
  position,
  radius = 0.5,
  type = "sphere",
  speed = 1,
  offset = 0,
}: FloatingShapeProps) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y =
      position[1] + Math.sin(t * speed + offset) * 0.15;
    ref.current.rotation.x += 0.002 * speed;
    ref.current.rotation.z += 0.001 * speed;
  });

  return (
    <mesh ref={ref} position={position}>
      {type === "sphere" ? (
        <sphereGeometry args={[radius, 64, 64]} />
      ) : (
        <torusGeometry args={[radius, radius * 0.35, 32, 64]} />
      )}
      <meshStandardMaterial
        color="#3a0a0a"
        roughness={0.15}
        metalness={0.8}
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
      pointer.x * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.1,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <FloatingShape position={[-1.8, 0.6, -1]} radius={0.45} speed={0.8} offset={0} />
      <FloatingShape position={[1.5, -0.4, 0.5]} radius={1.0} speed={0.6} offset={1.2} />
      <FloatingShape position={[-0.5, -1.2, -0.5]} radius={0.7} speed={1.1} offset={2.5} />
      <FloatingShape position={[0.8, 1.3, -1.5]} radius={0.35} speed={0.9} offset={3.8} />
      <FloatingShape position={[-1.2, -0.2, 1.2]} radius={0.55} speed={0.7} offset={5.0} />
      <FloatingShape position={[2.0, 0.8, 0.2]} radius={1.2} speed={0.5} offset={0.7} />
      <FloatingShape position={[0.2, 0.1, 0.8]} radius={0.3} speed={1.3} offset={4.2} />

      <FloatingShape position={[-0.3, 1.0, 0.3]} radius={0.6} type="torus" speed={0.6} offset={1.8} />
      <FloatingShape position={[1.2, -1.0, -0.8]} radius={0.45} type="torus" speed={0.8} offset={3.2} />
      <FloatingShape position={[-1.5, -0.8, 0.6]} radius={0.35} type="torus" speed={1.0} offset={5.5} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Scene />
      <Environment preset="city" />
    </Canvas>
  );
}
