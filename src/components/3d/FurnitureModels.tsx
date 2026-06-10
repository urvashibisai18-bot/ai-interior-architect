'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

function KingBed({ position = [0, 0, 0] as [number, number, number], color = '#5C4033', pillowColor = '#F5F0EB', blanketColor = '#D4AF37' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 0.2, 2.2]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.9, 0.2, 2.1]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.45, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.85, 0.1, 2.05]} />
        <meshStandardMaterial color="#FFF" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, 0.55, 0.75]} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color={pillowColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.55, 0.75]} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color={pillowColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.4, -0.5]} castShadow>
        <boxGeometry args={[1.6, 0.08, 0.9]} />
        <meshStandardMaterial color={blanketColor} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.7, 1.15]} castShadow>
        <boxGeometry args={[2.1, 0.8, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
}

function StudyDesk({ position = [0, 0, 0] as [number, number, number], color = '#8B7355', hasChair = true }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {[[-0.5, 0.15, -0.25], [-0.5, 0.15, 0.25], [0.5, 0.15, -0.25], [0.5, 0.15, 0.25]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#2C1810" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0.45, 0.2, 0]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.22, -0.22]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.04, 6]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.7} />
      </mesh>
      {hasChair && (
        <group position={[0, 0, -0.7]}>
          <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.45, 0.04, 0.45]} />
            <meshStandardMaterial color="#2C1810" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.5, -0.15]} castShadow>
            <boxGeometry args={[0.45, 0.25, 0.04]} />
            <meshStandardMaterial color="#2C1810" roughness={0.6} />
          </mesh>
          {[[-0.18, 0.1, -0.18], [-0.18, 0.1, 0.18], [0.18, 0.1, -0.18], [0.18, 0.1, 0.18]].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.02, 0.025, 0.2, 6]} />
              <meshStandardMaterial color="#2C1810" roughness={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

function LuxurySofa({ position = [0, 0, 0] as [number, number, number], color = '#8B4513', fabricColor = '#4A4A4A' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.4, 0.2, 0.9]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0.05]} castShadow>
          <boxGeometry args={[0.65, 0.2, 0.7]} />
          <meshStandardMaterial color={fabricColor} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.55, -0.25]} castShadow>
        <boxGeometry args={[2.2, 0.25, 0.15]} />
        <meshStandardMaterial color={fabricColor} roughness={0.8} />
      </mesh>
      {[[-0.95, 0.25, 0.3], [0.95, 0.25, 0.3]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.2, 0.35, 0.75]} />
          <meshStandardMaterial color={fabricColor} roughness={0.8} />
        </mesh>
      ))}
      {[[-0.9, 0.05, 0.35], [-0.9, 0.05, -0.25], [0.9, 0.05, 0.35], [0.9, 0.05, -0.25]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 0.1, 8]} />
          <meshStandardMaterial color="#2C1810" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function FloorLamp({ position = [0, 0, 0] as [number, number, number], color = '#D4AF37', isOn = true }) {
  const glowIntensity = isOn ? 0.5 : 0;
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.08, 16]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 2.2, 8]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 2.3, 0]} castShadow>
        <coneGeometry args={[0.25, 0.3, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFF" emissive="#FFD700" emissiveIntensity={glowIntensity} />
      </mesh>
    </group>
  );
}

function Wardrobe({ position = [0, 0, 0] as [number, number, number], color = '#5C4033', handleColor = '#D4AF37' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.2, 1.8, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[-0.28, 0.9, 0.31]} castShadow>
        <boxGeometry args={[0.5, 1.7, 0.02]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.6} />
      </mesh>
      <mesh position={[0.28, 0.9, 0.31]} castShadow>
        <boxGeometry args={[0.5, 1.7, 0.02]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.6} />
      </mesh>
      <mesh position={[-0.28, 0.9, 0.34]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.05, 6]} />
        <meshStandardMaterial color={handleColor} roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.28, 0.9, 0.34]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.05, 6]} />
        <meshStandardMaterial color={handleColor} roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

function TableLamp({ position = [0, 0, 0] as [number, number, number], color = '#D4AF37', isOn = true }) {
  const glowIntensity = isOn ? 0.3 : 0;
  return (
    <group position={position}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.05, 12]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.15, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[0.12, 0.15, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFF" emissive="#FFD700" emissiveIntensity={glowIntensity} />
      </mesh>
    </group>
  );
}

function Curtains({ position = [0, 0, 0] as [number, number, number], color = '#1A1A2E', width = 3 }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, width, 8]} />
        <meshStandardMaterial color="#2C1810" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-width / 4 + 0.1, 0.75, -0.05]} castShadow>
        <boxGeometry args={[width / 2 - 0.2, 1.5, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[width / 4 - 0.1, 0.75, -0.05]} castShadow>
        <boxGeometry args={[width / 2 - 0.2, 1.5, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Rug({ position = [0, 0, 0] as [number, number, number], color = '#8B7355', size = [2, 1.5] as [number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[size[0], 0.03, size[1]]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[size[0] - 0.1, 0.01, size[1] - 0.1]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.7} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Bookshelf({ position = [0, 0, 0] as [number, number, number], color = '#5C4033' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.2, 1.8, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {[0.2, 0.6, 1.0, 1.4, 1.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0.18]}>
          <boxGeometry args={[1.1, 0.03, 0.01]} />
          <meshStandardMaterial color="#F5F0EB" roughness={0.6} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const colors = ['#8B0000', '#D4AF37', '#2C1810', '#4A4A4A', '#1A1A2E', '#F5F0EB', '#8B7355', '#64FFDA'];
        return (
          <mesh key={i} position={[-0.3 + col * 0.5, 0.25 + row * 0.4, 0.18]} castShadow>
            <boxGeometry args={[0.35, 0.3 - row * 0.02, 0.3]} />
            <meshStandardMaterial color={colors[i]} roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

export { KingBed, StudyDesk, LuxurySofa, FloorLamp, Wardrobe, TableLamp, Curtains, Rug, Bookshelf };
