"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";
import SceneEffects, { usePrefersReducedMotion } from "./three/scene-effects";
import { useTheme } from "@/components/providers/theme-provider";

/* -------------------------------------------------------------------------- */
/*  Brand-accurate 3D RUBIN logo with a glowing, energetic treatment          */
/* -------------------------------------------------------------------------- */

function CentralShape({ reduced }: { reduced: boolean }) {
  const logoGroupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const logoMatRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  const [hovered, setHovered] = useState(false);
  const hoverProgress = useRef(0);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    }),
    []
  );

  const triangleGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.4);
    shape.lineTo(1.6, -1.0);
    shape.lineTo(-1.6, -1.0);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(0, 0.5);
    hole.lineTo(-0.75, -0.65);
    hole.lineTo(0.75, -0.65);
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
      // Soft glow behind the word mark
      ctx.shadowColor = "rgba(0, 160, 255, 0.9)";
      ctx.shadowBlur = 24;
      ctx.fillStyle = "#15a6ff";
      ctx.font = "900 84px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("RUBIN", canvas.width / 2, canvas.height / 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const motion = reduced ? 0.25 : 1;

    // Smooth hover progress interpolation
    const targetHover = hovered ? 1 : 0;
    hoverProgress.current = THREE.MathUtils.lerp(hoverProgress.current, targetHover, 0.08);

    // Floating animation
    logoGroupRef.current.position.y = Math.sin(t * 1.0) * 0.12 * motion;
    
    // Animate rotation: faster/wider swing when hovered
    const swingSpeed = 0.5 + hoverProgress.current * 0.8;
    const swingAmount = 0.15 + hoverProgress.current * 0.3;
    logoGroupRef.current.rotation.y = Math.sin(t * swingSpeed) * swingAmount * motion;
    logoGroupRef.current.rotation.x = (Math.sin(t * 0.35) * 0.08 + hoverProgress.current * 0.1) * motion;
    logoGroupRef.current.rotation.z = (Math.sin(t * 0.25) * 0.03 + hoverProgress.current * 0.05) * motion;

    // Scale animation: scale up on hover
    const baseScale = 1.0 + hoverProgress.current * 0.18;
    const scale = baseScale + Math.sin(t * 1.2) * 0.025 * motion;
    logoGroupRef.current.scale.set(scale, scale, scale);

    // Pulsing emissive energy in the metal so bloom catches it + intensify on hover
    if (logoMatRef.current) {
      const baseEmissive = 0.35 + hoverProgress.current * 1.15;
      logoMatRef.current.emissiveIntensity = baseEmissive + Math.sin(t * 1.6) * 0.2;
      logoMatRef.current.emissive.lerpColors(
        new THREE.Color("#0a4fff"),
        new THREE.Color("#00f0ff"),
        hoverProgress.current
      );
    }

    // Gyroscopic counter-rotating rings (spin faster on hover!)
    const ringSpeedMultiplier = 1.0 + hoverProgress.current * 1.5;
    ringRef.current.rotation.x = -t * 0.22 * motion * ringSpeedMultiplier;
    ringRef.current.rotation.y = -t * 0.16 * motion * ringSpeedMultiplier;
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.18 * motion * ringSpeedMultiplier;
      ring2Ref.current.rotation.z = t * 0.24 * motion * ringSpeedMultiplier;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.12 * motion * ringSpeedMultiplier;
      ring3Ref.current.rotation.z = -t * 0.2 * motion * ringSpeedMultiplier;
    }
  });

  return (
    <group>
      {/* Invisible broad hover sensor area (covers the logo with a 2.8 radius sphere) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (typeof window !== "undefined") document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          if (typeof window !== "undefined") document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[2.8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 3D Rubin Logo Group */}
      <group ref={logoGroupRef}>
        <mesh geometry={triangleGeometry} position={[0, 0, -0.09]}>
          <meshPhysicalMaterial
            ref={logoMatRef}
            color="#0a66cc"
            roughness={0.12}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.8}
            emissive="#0a4fff"
            emissiveIntensity={0.35}
          />
        </mesh>

        {textTexture && (
          <mesh position={[0, -1.4, 0.05]}>
            <planeGeometry args={[2.9, 0.725]} />
            <meshBasicMaterial map={textTexture} transparent depthWrite={false} />
          </mesh>
        )}
      </group>

      {/* Torus Ring 1: Silver Chrome */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.04, 18, 140]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.95}
          envMapIntensity={2.2}
          emissive="#bfe9ff"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Torus Ring 2: Rubber Red Gyroscope */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.45, 0.03, 18, 140]} />
        <meshStandardMaterial
          color="#a63030"
          roughness={0.15}
          metalness={0.95}
          envMapIntensity={2.2}
          emissive="#ff3b3b"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Torus Ring 3: Neon cyan accent ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.62, 0.015, 16, 160]} />
        <meshStandardMaterial
          color="#00f0ff"
          roughness={0.2}
          metalness={0.6}
          emissive="#00f0ff"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Glowing energy core sitting behind the logo                               */
/* -------------------------------------------------------------------------- */

function EnergyCore({ reduced }: { reduced: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.55 + Math.sin(t * 2.0) * (reduced ? 0.05 : 0.18);
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);
    if (lightRef.current) lightRef.current.intensity = 2.2 + Math.sin(t * 2.0) * 1.2;
  });

  return (
    <group position={[0, -0.3, -1.2]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#1f8bff" toneMapped={false} />
      </mesh>
      <pointLight ref={lightRef} color="#2aa0ff" intensity={2.6} distance={12} decay={2} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Distorted wireframe "energy shell" enveloping the logo                    */
/* -------------------------------------------------------------------------- */

function EnergyShell({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <mesh ref={ref} scale={2.95}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial
        color="#1d7fff"
        wireframe
        transparent
        opacity={0.12}
        toneMapped={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Orbiting particles — glass / metal spheres, some leaving comet trails     */
/* -------------------------------------------------------------------------- */

interface OrbitingParticleProps {
  radius: number;
  speed: number;
  offset: number;
  yOffset: number;
  size: number;
  type: "glass-blue" | "glass-purple" | "metal-blue" | "metal-purple";
  trail?: boolean;
  reduced: boolean;
}

function ParticleBody({ size, type }: Pick<OrbitingParticleProps, "size" | "type">) {
  return (
    <mesh>
      <sphereGeometry args={[size, 32, 32]} />
      {type === "glass-blue" && (
        <meshPhysicalMaterial
          color="#00f0ff"
          roughness={0.05}
          transmission={0.85}
          thickness={0.5}
          ior={1.5}
          clearcoat={1}
          emissive="#00d0ff"
          emissiveIntensity={0.6}
        />
      )}
      {type === "glass-purple" && (
        <meshPhysicalMaterial
          color="#bd00ff"
          roughness={0.05}
          transmission={0.85}
          thickness={0.5}
          ior={1.5}
          clearcoat={1}
          emissive="#bd00ff"
          emissiveIntensity={0.6}
        />
      )}
      {type === "metal-blue" && (
        <meshStandardMaterial
          color="#00a2ff"
          roughness={0.15}
          metalness={0.9}
          emissive="#0066ff"
          emissiveIntensity={0.5}
        />
      )}
      {type === "metal-purple" && (
        <meshStandardMaterial
          color="#d300ff"
          roughness={0.15}
          metalness={0.9}
          emissive="#a000ff"
          emissiveIntensity={0.5}
        />
      )}
    </mesh>
  );
}

function OrbitingParticle({
  radius,
  speed,
  offset,
  yOffset,
  size,
  type,
  trail,
  reduced,
}: OrbitingParticleProps) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed * (reduced ? 0.3 : 1) + offset;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = yOffset + Math.sin(t * 0.8 + offset) * 0.25;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  const trailColor = type.includes("purple") ? "#bd00ff" : "#00f0ff";

  if (trail && !reduced) {
    return (
      <Trail width={1.1} length={5} color={trailColor} attenuation={(w) => w * w} decay={1}>
        <group ref={meshRef}>
          <ParticleBody size={size} type={type} />
        </group>
      </Trail>
    );
  }

  return (
    <group ref={meshRef}>
      <ParticleBody size={size} type={type} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene assembly with smooth cursor parallax                                */
/* -------------------------------------------------------------------------- */

function Scene({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    const targetY = reduced ? 0 : pointer.x * 0.55;
    const targetX = reduced ? 0 : pointer.y * -0.45;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
  });

  return (
    <group ref={groupRef} scale={1.12}>
      <EnergyCore reduced={reduced} />
      <EnergyShell reduced={reduced} />

      <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        <CentralShape reduced={reduced} />
      </Float>

      <OrbitingParticle radius={1.9} speed={0.45} offset={0} yOffset={0.2} size={0.18} type="glass-blue" trail reduced={reduced} />
      <OrbitingParticle radius={2.2} speed={-0.3} offset={1.5} yOffset={-0.3} size={0.15} type="glass-purple" reduced={reduced} />
      <OrbitingParticle radius={2.0} speed={0.5} offset={3.1} yOffset={0.5} size={0.14} type="metal-blue" reduced={reduced} />
      <OrbitingParticle radius={2.3} speed={-0.45} offset={4.8} yOffset={-0.6} size={0.16} type="metal-purple" trail reduced={reduced} />
      <OrbitingParticle radius={1.8} speed={0.6} offset={2.2} yOffset={-0.1} size={0.12} type="glass-blue" reduced={reduced} />

      {/* Ambient floating dust that catches the bloom */}
      <Sparkles count={50} scale={[7, 5, 7]} size={2.4} speed={reduced ? 0 : 0.3} color="#9fdcff" opacity={0.7} />
    </group>
  );
}

function CanvasSettings() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0, 9.6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", premultipliedAlpha: false }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <CanvasSettings />
      <ambientLight intensity={isDark ? 0.5 : 0.8} color={isDark ? "#101525" : "#ffffff"} />
      <directionalLight position={[5, 8, 5]} intensity={isDark ? 0.85 : 1.4} color="#ffffff" />
      <pointLight position={[-6, -4, 4]} intensity={isDark ? 1.6 : 2.8} color="#bd00ff" distance={15} decay={2} />
      <pointLight position={[6, 4, 4]} intensity={isDark ? 1.6 : 2.8} color="#00f0ff" distance={15} decay={2} />

      <Scene reduced={reduced} />

      <Environment preset="city" />
      <SceneEffects intensity={1.15} threshold={0.2} vignette={false} />
    </Canvas>
  );
}
