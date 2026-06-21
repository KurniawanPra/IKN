"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SceneEffects from "./three/scene-effects";

// Wrapper to handle scale-in entrance transitions
interface ModelWrapperProps {
  children: React.ReactNode;
}

function ModelWrapper({ children }: ModelWrapperProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.08);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1, 0.08);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1, 0.08);
    }
  });

  return (
    <group ref={groupRef} scale={[0.01, 0.01, 0.01]}>
      {children}
    </group>
  );
}

// 1. Resiprene 35: Translucent Beaker with Amber Resin Liquid
function ResipreneModel() {
  const beakerRef = useRef<THREE.Mesh>(null!);
  const liquidRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle bobbing and liquid rotation
    beakerRef.current.position.y = Math.sin(t * 1.5) * 0.04 - 0.1;
    liquidRef.current.position.y = beakerRef.current.position.y - 0.02;
    liquidRef.current.rotation.y = t * 0.2;
  });

  return (
    <group>
      {/* Glass Beaker */}
      <mesh ref={beakerRef} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          transmission={0.95}
          thickness={0.25}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Amber Liquid */}
      <mesh ref={liquidRef} position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.51, 0.51, 0.95, 32]} />
        <meshPhysicalMaterial
          color="#d97706" // Amber resin
          roughness={0.1}
          transmission={0.8}
          thickness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// 2. RUBIN: Elegant Conical Flask with Ruby Liquid
function RubinModel() {
  const flaskRef = useRef<THREE.Group>(null!);
  const liquidRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle bobbing
    flaskRef.current.position.y = Math.cos(t * 1.3) * 0.04 - 0.1;
    liquidRef.current.rotation.y = -t * 0.25;
  });

  return (
    <group ref={flaskRef} position={[0, 0, 0]}>
      {/* Flask Glass Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.75, 1.1, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.03}
          transmission={0.95}
          thickness={0.2}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Flask Glass Neck */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.03}
          transmission={0.95}
          thickness={0.2}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flask Glass Lip */}
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.23, 0.03, 8, 24]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          transmission={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>
      
      {/* Ruby Liquid */}
      <mesh ref={liquidRef} position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.42, 0.68, 0.75, 32]} />
        <meshPhysicalMaterial
          color="#b91c1c" // Ruby red
          roughness={0.08}
          transmission={0.85}
          thickness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// 3. Cyclized Rubber: High-tech Polymer Molecular Grid
function CyclizedRubberModel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.3;
    groupRef.current.rotation.y = t * 0.45;
    
    // Smooth pulsating scale
    const s = 1 + Math.sin(t * 1.8) * 0.06;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Atom */}
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshPhysicalMaterial
          color="#ef4444" // Deep bright red
          roughness={0.15}
          metalness={0.2}
          clearcoat={1.0}
          transmission={0.4}
        />
      </mesh>

      {/* Satellite Atoms and Connection Cylinders */}
      {/* Atom 1 (Top Right Front) */}
      <group position={[0.6, 0.6, 0.6]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      <mesh position={[0.3, 0.3, 0.3]} rotation={[0, -Math.PI / 4, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Atom 2 (Bottom Left Front) */}
      <group position={[-0.6, -0.6, 0.6]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      <mesh position={[-0.3, -0.3, 0.3]} rotation={[0, Math.PI / 4, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Atom 3 (Top Left Back) */}
      <group position={[-0.6, 0.6, -0.6]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      <mesh position={[-0.3, 0.3, -0.3]} rotation={[0, -Math.PI / 4, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Atom 4 (Bottom Right Back) */}
      <group position={[0.6, -0.6, -0.6]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      <mesh position={[0.3, -0.3, -0.3]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1.0, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

// 4. Rubber Thread: Spool of Industrial Elastic Thread
function RubberThreadModel() {
  const spoolRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    spoolRef.current.rotation.y = t * 0.7;
    spoolRef.current.position.y = Math.cos(t * 1.6) * 0.03 - 0.05;
  });

  return (
    <group ref={spoolRef}>
      {/* Spooled Thread Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.95, 32]} />
        <meshStandardMaterial
          color="#b91c1c" // Crimson rubber thread
          roughness={0.8}
          metalness={0.15}
        />
      </mesh>

      {/* Spool Cap Top */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.05, 32]} />
        <meshStandardMaterial
          color="#94a3b8" // Steel plate
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Spool Cap Bottom */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.05, 32]} />
        <meshStandardMaterial
          color="#94a3b8" // Steel plate
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Central Spindle Pin */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.15, 16]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function ModelSelector({ slug }: { slug: string }) {
  switch (slug) {
    case "resiprene-35":
      return <ResipreneModel />;
    case "rubin":
      return <RubinModel />;
    case "cyclized-rubber":
      return <CyclizedRubberModel />;
    case "rubber-thread":
      return <RubberThreadModel />;
    default:
      return <ResipreneModel />;
  }
}

interface ProductsSceneProps {
  activeProductSlug: string;
}

export default function ProductsScene({ activeProductSlug }: ProductsSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#f59e0b" />
      <directionalLight position={[0, -8, 0]} intensity={0.3} />
      
      <ModelWrapper key={activeProductSlug}>
        <ModelSelector slug={activeProductSlug} />
      </ModelWrapper>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={1.0}
        maxPolarAngle={Math.PI / 2 + 0.3}
        minPolarAngle={Math.PI / 2 - 0.3}
      />
      <Environment preset="city" />
      <SceneEffects intensity={0.4} threshold={0.4} vignette={false} />
    </Canvas>
  );
}
