"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry({
  position,
  geometry,
  speed,
  color,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "dodecahedron" | "torus";
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x += 0.002 * speed;
    meshRef.current.rotation.y += 0.003 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[0.6, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.45, 0]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geo}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.25}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  const bufferGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={bufferGeo}>
      <pointsMaterial
        size={0.03}
        color="#CE1126"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function IslamicStar({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 8;
    const outerR = 1;
    const innerR = 0.45;
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh>
        <shapeGeometry args={[starShape]} />
        <meshStandardMaterial
          color="#CE1126"
          transparent
          opacity={0.12}
          emissive="#CE1126"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.ShapeGeometry(starShape)]} />
        <lineBasicMaterial color="#CE1126" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#CE1126" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#009639" />

      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <ParticleField />

      <FloatingGeometry position={[-4, 2, -3]} geometry="icosahedron" speed={1.2} color="#CE1126" />
      <FloatingGeometry position={[4, -1, -4]} geometry="octahedron" speed={0.8} color="#F05060" />
      <FloatingGeometry position={[-3, -2, -5]} geometry="dodecahedron" speed={1} color="#009639" />
      <FloatingGeometry position={[3, 3, -6]} geometry="torus" speed={0.6} color="#CE1126" />
      <FloatingGeometry position={[0, -3, -4]} geometry="icosahedron" speed={0.9} color="#F05060" />
      <FloatingGeometry position={[-5, 0, -7]} geometry="octahedron" speed={0.7} color="#009639" />
      <FloatingGeometry position={[5, 1, -5]} geometry="dodecahedron" speed={1.1} color="#CE1126" />

      <IslamicStar position={[-2, 1, -8]} scale={0.8} />
      <IslamicStar position={[3, -2, -10]} scale={1.2} />
      <IslamicStar position={[0, 3, -12]} scale={0.6} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
