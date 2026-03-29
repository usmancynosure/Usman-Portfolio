"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Orb({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x += 0.005 * speed;
    meshRef.current.rotation.z += 0.003 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.4;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function GlowRing({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x =
      Math.PI / 3 + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
    meshRef.current.rotation.y += 0.01 * speed;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, 0.02, 16, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#CE1126" />

      <Orb position={[-2, 1, -2]} color="#CE1126" size={0.4} speed={1} />
      <Orb position={[2, -1, -3]} color="#F05060" size={0.3} speed={1.3} />
      <Orb position={[0, 2, -4]} color="#009639" size={0.35} speed={0.8} />

      <GlowRing position={[-1.5, 0, -3]} color="#CE1126" size={0.8} speed={0.7} />
      <GlowRing position={[1.5, 1, -4]} color="#009639" size={0.6} speed={0.9} />
    </>
  );
}

export function FloatingOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
