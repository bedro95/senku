"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Helix({ count = 80, radius = 2, speed = 1, color = "#00ffcc" }) {
  const points = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = (i / count - 0.5) * 10;
      temp.push({ x, y, z, x2: -x, z2: -z });
    }
    return temp;
  }, [count, radius]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <group ref={points}>
      {particles.map((p, i) => (
        <group key={i}>
          <mesh position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position={[p.x2, p.y, p.z2]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#00e0ff" />
          </mesh>
          {i % 4 === 0 && (
             <mesh position={[0, p.y, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.01, 0.01, radius * 2]} />
               <meshBasicMaterial color="white" transparent opacity={0.2} />
             </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

export default function DNAHelixBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Helix />
      </Canvas>
    </div>
  );
}
