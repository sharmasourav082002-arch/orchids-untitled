"use client";

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus, TorusKnot, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, color, scale = 1, speed = 1, type = 'sphere' }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number; 
  speed?: number;
  type?: 'sphere' | 'box' | 'torus' | 'torusKnot';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch(type) {
      case 'box': return <boxGeometry args={[1, 1, 1]} />;
      case 'torus': return <torusGeometry args={[1, 0.3, 16, 32]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />;
      default: return <sphereGeometry args={[1, 32, 32]} />;
    }
  }, [type]);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0}
        metalness={0.1}
        transmission={0.95}
        thickness={1.5}
        ior={2.4}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}

function Particles({ count = 500 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function AnimatedRing({ position, scale = 1, color = "#ffffff" }: { position: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1.5, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={1} roughness={0} />
    </mesh>
  );
}

function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (pointer.x * viewport.width) / 2,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (pointer.y * viewport.height) / 2,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} transparent opacity={0.3} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#06b6d4" />
        
        <Suspense fallback={null}>
          <FloatingGeometry position={[-4, 2, -2]} color="#f8fafc" scale={0.8} speed={1.2} type="sphere" />
          <FloatingGeometry position={[4, -1, -3]} color="#e2e8f0" scale={0.6} speed={0.8} type="box" />
          <FloatingGeometry position={[-3, -2, -1]} color="#cbd5e1" scale={0.5} speed={1.5} type="torus" />
          <FloatingGeometry position={[3, 2, -2]} color="#94a3b8" scale={0.7} speed={1} type="torusKnot" />
          <FloatingGeometry position={[0, -3, -4]} color="#64748b" scale={0.9} speed={0.6} type="sphere" />
          
          <GlassSphere position={[-2, 0, 0]} scale={0.8} />
          <GlassSphere position={[2.5, 1, -1]} scale={0.5} />
          
          <AnimatedRing position={[0, 0, -3]} scale={1.5} color="#ffffff" />
          <AnimatedRing position={[-3, 1, -5]} scale={1} color="#94a3b8" />
          <AnimatedRing position={[3, -1, -4]} scale={0.8} color="#64748b" />
          
          <Particles count={300} />
          <MouseFollower />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function ProductScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#8b5cf6" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh position={[-6, 2, -3]} scale={0.4}>
              <dodecahedronGeometry args={[1, 0]} />
              <MeshWobbleMaterial color="#f1f5f9" factor={0.3} speed={2} metalness={0.8} roughness={0.2} />
            </mesh>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh position={[6, -1, -4]} scale={0.5}>
              <icosahedronGeometry args={[1, 0]} />
              <MeshWobbleMaterial color="#e2e8f0" factor={0.2} speed={3} metalness={0.9} roughness={0.1} />
            </mesh>
          </Float>
          
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.4}>
            <mesh position={[-5, -2, -2]} scale={0.3}>
              <octahedronGeometry args={[1, 0]} />
              <MeshDistortMaterial color="#cbd5e1" distort={0.3} speed={4} metalness={0.7} roughness={0.3} />
            </mesh>
          </Float>
          
          <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh position={[5, 3, -5]} scale={0.35}>
              <tetrahedronGeometry args={[1, 0]} />
              <MeshDistortMaterial color="#94a3b8" distort={0.2} speed={2} metalness={0.85} roughness={0.15} />
            </mesh>
          </Float>
          
          <Particles count={150} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <ambientLight intensity={0.2} />
        
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
          
          <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <mesh position={[-8, 5, -10]} scale={2}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
            </mesh>
          </Float>
          
          <Float speed={0.3} rotationIntensity={0.15} floatIntensity={0.15}>
            <mesh position={[10, -3, -12]} scale={2.5}>
              <torusGeometry args={[1, 0.3, 8, 24]} />
              <meshBasicMaterial color="#334155" wireframe transparent opacity={0.2} />
            </mesh>
          </Float>
          
          <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.1}>
            <mesh position={[0, -8, -15]} scale={3}>
              <icosahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color="#475569" wireframe transparent opacity={0.15} />
            </mesh>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
