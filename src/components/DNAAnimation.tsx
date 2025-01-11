import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function DNAAnimation() {
  const dnaRef = useRef<THREE.Group>(null);

  // Animation logic to move the DNA diagonally across the page
  useFrame((state) => {
    if (dnaRef.current) {
      const time = state.clock.elapsedTime;
      dnaRef.current.position.x = Math.sin(time) * 5; // Move along the X-axis
      dnaRef.current.position.y = Math.cos(time) * 3; // Move along the Y-axis (diagonal)
      dnaRef.current.rotation.y += 0.01; // Rotate the DNA around the Y-axis
    }
  });

  const strandCount = 40; // Total number of base pairs
  const twistRate = 0.4; // Adjusts the degree of the helix twist
  const helixHeight = 0.3; // Distance between base pairs

  return (
    <group ref={dnaRef}>
      {/* Generate the double helix structure */}
      {Array.from({ length: strandCount }).map((_, i) => (
        <React.Fragment key={i}>
          {/* First strand sphere (green) */}
          <Sphere
            args={[0.1, 16, 16]}
            position={[
              Math.sin(i * twistRate) * 1.5, // X position
              i * helixHeight - strandCount * helixHeight * 0.5, // Y position
              Math.cos(i * twistRate) * 1.5, // Z position
            ]}
          >
            <meshStandardMaterial color="#ef4444" /> {/* Green color */}
          </Sphere>

          {/* Second strand sphere (pink) */}
          <Sphere
            args={[0.1, 16, 16]}
            position={[
              Math.sin(i * twistRate + Math.PI) * 1.5, // Opposite X position
              i * helixHeight - strandCount * helixHeight * 0.5, // Y position
              Math.cos(i * twistRate + Math.PI) * 1.5, // Opposite Z position
            ]}
          >
            <meshStandardMaterial color="#ef4444" /> {/* Pink color */}
          </Sphere>
        </React.Fragment>
      ))}

      {/* Lighting for better visualization */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
    </group>
  );
}