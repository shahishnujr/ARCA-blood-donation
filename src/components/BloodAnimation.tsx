import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function BloodAnimation() {
  const bloodRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bloodRef.current) {
      bloodRef.current.rotation.y += 0.005;
      bloodRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const y = Math.sin(state.clock.elapsedTime + i) * 0.2;
        particle.position.y = y;
      });
    }
  });

  return (
    <>
      {/* Main blood drop */}
      <group ref={bloodRef}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.2}
            metalness={0.8}
            emissive="#dc2626"
            emissiveIntensity={0.2}
          />
        </Sphere>
        <Sphere args={[0.95, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ef4444"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </group>

      {/* Floating particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.05, 16, 16]}
            position={[
              Math.sin(i) * 2,
              Math.cos(i) * 2,
              Math.sin(i * 0.5) * 2,
            ]}
          >
            <meshStandardMaterial
              color="#ef4444"
              emissive="#dc2626"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </Sphere>
        ))}
      </group>

      {/* Lights */}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <ambientLight intensity={0.4} />
    </>
  );
}