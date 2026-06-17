"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function PolymerChain() {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  const carbons = [
    new THREE.Vector3(-2.0, -0.5, 0.0),
    new THREE.Vector3(-1.0, 0.5, 0.2),
    new THREE.Vector3(0.0, -0.5, -0.2),
    new THREE.Vector3(1.0, 0.5, 0.1),
    new THREE.Vector3(2.0, -0.5, 0.0),
  ];

  const hydrogens = [
    new THREE.Vector3(-2.0, -1.2, 0.3),
    new THREE.Vector3(-2.5, -0.2, -0.5),
    new THREE.Vector3(-1.0, 1.2, 0.8),
    new THREE.Vector3(0.0, -1.2, -0.8),
    new THREE.Vector3(1.0, 1.2, 0.7),
    new THREE.Vector3(2.0, -1.2, -0.3),
    new THREE.Vector3(2.5, -0.2, 0.5),
  ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Extra smooth inertia lag (lerp value 0.02)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      t * 0.12 + pointer.x * 0.3,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * 0.05) * 0.1 + pointer.y * 0.2,
      0.02
    );
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Carbon Atoms (Glossy Red Rubber) */}
      {carbons.map((pos, idx) => (
        <mesh key={`c-${idx}`} position={pos}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#8b1a1a"
            roughness={0.15}
            metalness={0.75}
          />
        </mesh>
      ))}

      {/* Hydrogen Atoms (Frosted Translucent Glass) */}
      {hydrogens.map((pos, idx) => (
        <mesh key={`h-${idx}`} position={pos}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            transmission={0.9}
            thickness={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Bonds */}
      {carbons.slice(0, -1).map((start, idx) => {
        const end = carbons[idx + 1];
        const distance = start.distanceTo(end);
        const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const orientation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction
        );

        return (
          <mesh key={`bond-${idx}`} position={position} quaternion={orientation}>
            <cylinderGeometry args={[0.08, 0.08, distance, 16]} />
            <meshStandardMaterial
              color="#c0c0c0"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function AboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }} // Moved camera further back (from 4.5 to 5.5) to prevent cutoffs
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#8b1a1a" />
      <PolymerChain />
      <Environment preset="city" />
    </Canvas>
  );
}
