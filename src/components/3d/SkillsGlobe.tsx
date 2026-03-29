"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial
          color="#CE1126"
          wireframe
          transparent
          opacity={0.08}
          emissive="#CE1126"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial
          color="#F05060"
          wireframe
          transparent
          opacity={0.05}
          emissive="#F05060"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / (3 + i), i * 0.8, 0]}>
          <torusGeometry args={[1.6 + i * 0.15, 0.008, 16, 100]} />
          <meshStandardMaterial
            color={i === 1 ? "#009639" : "#CE1126"}
            transparent
            opacity={0.2}
            emissive={i === 1 ? "#009639" : "#CE1126"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    const result: { position: THREE.Vector3; color: string }[] = [];
    const colors = ["#CE1126", "#F05060", "#009639", "#E8384F", "#00B344"];
    for (let i = 0; i < 30; i++) {
      const phi = Math.acos(-1 + (2 * i) / 30);
      const theta = Math.sqrt(30 * Math.PI) * phi;
      const r = 1.5;
      result.push({
        position: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ),
        color: colors[i % colors.length],
      });
    }
    return result;
  }, []);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#CE1126" />
      <pointLight position={[-5, -5, -5]} intensity={0.2} color="#009639" />
      <WireframeGlobe />
      <DataNodes />
    </>
  );
}

export function SkillsGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
