"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function CentralShape() {
  const logoGroupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  const extrudeSettings = useMemo(() => ({
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  }), []);

  const triangleGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Outer triangle
    shape.moveTo(0, 1.4);
    shape.lineTo(1.6, -1.0);
    shape.lineTo(-1.6, -1.0);
    shape.closePath();

    // Inner hole
    const hole = new THREE.Path();
    hole.moveTo(0, 0.5);
    hole.lineTo(-0.75, -0.65);
    hole.lineTo(0.75, -0.65);
    hole.closePath();
    shape.holes.push(hole);

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [extrudeSettings]);

  const rectGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Outer rectangle
    shape.moveTo(-1.6, -1.1);
    shape.lineTo(1.6, -1.1);
    shape.lineTo(1.6, -1.7);
    shape.lineTo(-1.6, -1.7);
    shape.closePath();

    // Inner hole
    const hole = new THREE.Path();
    hole.moveTo(-1.5, -1.18);
    hole.lineTo(1.5, -1.18);
    hole.lineTo(1.5, -1.62);
    hole.lineTo(-1.5, -1.62);
    hole.closePath();
    shape.holes.push(hole);

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [extrudeSettings]);

  const textTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#007ecc"; // Rubin blue
      ctx.font = "900 84px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("RUBIN", canvas.width / 2, canvas.height / 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Slow, elegant floating & swaying for the logo
    logoGroupRef.current.position.y = Math.sin(t * 1.0) * 0.12;
    
    logoGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    logoGroupRef.current.rotation.x = Math.sin(t * 0.35) * 0.08;
    logoGroupRef.current.rotation.z = Math.sin(t * 0.25) * 0.03;

    // Organic pulse/shimmer scale
    const scale = 1 + Math.sin(t * 1.2) * 0.02;
    logoGroupRef.current.scale.set(scale, scale, scale);

    // Opposing rotation for the outer metallic ring
    ringRef.current.rotation.x = -t * 0.2;
    ringRef.current.rotation.y = -t * 0.15;
  });

  return (
    <group>
      {/* 3D Rubin Logo Group */}
      <group ref={logoGroupRef}>
        {/* Triangular Frame */}
        <mesh geometry={triangleGeometry} position={[0, 0, -0.09]}>
          <meshStandardMaterial
            color="#0066cc"
            roughness={0.15}
            metalness={0.8}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Bottom Rectangle Frame */}
        <mesh geometry={rectGeometry} position={[0, 0, -0.09]}>
          <meshStandardMaterial
            color="#0066cc"
            roughness={0.15}
            metalness={0.8}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Text Box Glass Backing Plate */}
        <mesh position={[0, -1.4, 0]}>
          <boxGeometry args={[3.0, 0.44, 0.08]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            transmission={0.85}
            thickness={0.4}
            ior={1.5}
            envMapIntensity={1.5}
            transparent={true}
          />
        </mesh>

        {/* Text Plane */}
        {textTexture && (
          <mesh position={[0, -1.4, 0.045]}>
            <planeGeometry args={[2.9, 0.725]} />
            <meshBasicMaterial
              map={textTexture}
              transparent={true}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>

      {/* Industrial Outer Metallic Spin Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.04, 16, 120]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.9} // Shiny silver/chrome look
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
  type: "glass-blue" | "glass-purple" | "metal-blue" | "metal-purple";
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
      {type === "glass-blue" && (
        <meshPhysicalMaterial
          color="#00f0ff"
          roughness={0.05}
          transmission={0.85}
          thickness={0.5}
          ior={1.5}
          clearcoat={1.0}
        />
      )}
      {type === "glass-purple" && (
        <meshPhysicalMaterial
          color="#bd00ff"
          roughness={0.05}
          transmission={0.85}
          thickness={0.5}
          ior={1.5}
          clearcoat={1.0}
        />
      )}
      {type === "metal-blue" && (
        <meshStandardMaterial
          color="#00a2ff"
          roughness={0.15}
          metalness={0.9}
        />
      )}
      {type === "metal-purple" && (
        <meshStandardMaterial
          color="#d300ff"
          roughness={0.15}
          metalness={0.9}
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
      {/* Central 3D Rubin Logo */}
      <CentralShape />

      {/* Orbiting particles of Glass and Metal with Neon colors - Smaller radii to prevent frame cropping */}
      <OrbitingParticle radius={1.9} speed={0.45} offset={0} yOffset={0.2} size={0.18} type="glass-blue" />
      <OrbitingParticle radius={2.2} speed={-0.3} offset={1.5} yOffset={-0.3} size={0.15} type="glass-purple" />
      <OrbitingParticle radius={2.0} speed={0.5} offset={3.1} yOffset={0.5} size={0.14} type="metal-blue" />
      <OrbitingParticle radius={2.3} speed={-0.45} offset={4.8} yOffset={-0.6} size={0.16} type="metal-purple" />
      <OrbitingParticle radius={1.8} speed={0.6} offset={2.2} yOffset={-0.1} size={0.12} type="glass-blue" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} color="#101525" />
      {/* Soft key light */}
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
      {/* Neon purple soft fill light */}
      <pointLight position={[-6, -4, 4]} intensity={1.5} color="#bd00ff" distance={15} decay={2} />
      {/* Neon cyan soft fill light */}
      <pointLight position={[6, 4, 4]} intensity={1.5} color="#00f0ff" distance={15} decay={2} />
      
      <Scene />
      <Environment preset="city" />
    </Canvas>
  );
}
