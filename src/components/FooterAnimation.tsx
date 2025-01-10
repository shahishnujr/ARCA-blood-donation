import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function FooterAnimation() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        // Create a wave-like motion
        const x = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.3;
        const y = Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.2;
        particle.position.x = particle.userData.initialX + x;
        particle.position.y = particle.userData.initialY + y;
      });
    }
  });

  return (
    <>
      {/* Blood cells floating effect */}
      <group ref={particlesRef}>
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 10;
          const y = (Math.random() - 0.5) * 2;
          const z = (Math.random() - 0.5) * 3;
          return (
            <Sphere
              key={i}
              args={[0.1, 16, 16]}
              position={[x, y, z]}
              userData={{ initialX: x, initialY: y }}
            >
              <meshStandardMaterial
                color="#dc2626"
                emissive="#ef4444"
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </Sphere>
          );
        })}
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 2, 5]} intensity={0.5} />
    </>
  );
}