'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

function KingBed({ position = [0, 0, 0] as [number, number, number], color = '#1A1A1A', pillowColor = '#F5F0EB', blanketColor = '#D4AF37' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.2, 0.15, 2.4]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.1, 0.25, 2.3]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.55, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.05, 0.2, 2.25]} />
        <meshStandardMaterial color="#FFF" roughness={0.9} />
      </mesh>
      <mesh position={[-0.55, 0.7, 0.75]} castShadow>
        <boxGeometry args={[0.55, 0.15, 0.4]} />
        <meshStandardMaterial color={pillowColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.55, 0.7, 0.75]} castShadow>
        <boxGeometry args={[0.55, 0.15, 0.4]} />
        <meshStandardMaterial color={pillowColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.55, -0.55]} castShadow>
        <boxGeometry args={[1.8, 0.1, 1.0]} />
        <meshStandardMaterial color={blanketColor} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 1.2]} castShadow>
        <boxGeometry args={[2.3, 0.9, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[1.15, 0.5, 0]}>
        <boxGeometry args={[0.08, 0.8, 2.2]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} transparent opacity={0.3} />
      </mesh>
      <mesh position={[-1.15, 0.5, 0]}>
        <boxGeometry args={[0.08, 0.8, 2.2]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function PremiumSofa({ position = [0, 0, 0] as [number, number, number], color = '#1A1A1A', fabricColor = '#333333' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.6, 0.15, 1.0]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      {[-0.78, 0, 0.78].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0.05]} castShadow>
          <boxGeometry args={[0.7, 0.3, 0.75]} />
          <meshStandardMaterial color={fabricColor} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.65, -0.25]} castShadow>
        <boxGeometry args={[2.4, 0.35, 0.18]} />
        <meshStandardMaterial color={fabricColor} roughness={0.8} />
      </mesh>
      {[[-1.05, 0.3, 0.35], [1.05, 0.3, 0.35]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.2, 0.45, 0.8]} />
          <meshStandardMaterial color={fabricColor} roughness={0.8} />
        </mesh>
      ))}
      {[[-0.95, 0.05, 0.35], [-0.95, 0.05, -0.25], [0.95, 0.05, 0.35], [0.95, 0.05, -0.25]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.025, 0.035, 0.08, 8]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.7, 0.35]} castShadow>
          <boxGeometry args={[0.35, 0.08, 0.35]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function StudyDesk({ position = [0, 0, 0] as [number, number, number], color = '#2A2A2A', hasChair = true }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.4, 0.05, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      {[[-0.55, 0.15, -0.3], [-0.55, 0.15, 0.3], [0.55, 0.15, -0.3], [0.55, 0.15, 0.3]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.025, 0.035, 0.35, 8]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      <mesh position={[0.55, 0.25, 0]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.65]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.27, -0.28]} castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.05, 6]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>
      {hasChair && (
        <group position={[0, 0, -0.8]}>
          <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.5, 0.04, 0.5]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.55, -0.15]} castShadow>
            <boxGeometry args={[0.5, 0.3, 0.05]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.4, 0.2]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.15]} />
            <meshStandardMaterial color="#333333" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.22, 0.08, 12]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
          </mesh>
          {[[-0.2, 0.08, -0.2], [-0.2, 0.08, 0.2], [0.2, 0.08, -0.2], [0.2, 0.08, 0.2]].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.015, 0.02, 0.15, 6]} />
              <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

function ArcLamp({ position = [0, 0, 0] as [number, number, number], color = '#D4AF37', isOn = true }) {
  const glowIntensity = isOn ? 0.6 : 0;
  return (
    <group position={position}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.06, 16]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.0, -0.5]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 2.5, 8]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.5, 1.8, -0.8]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.8, 2.0, -1.0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFF" emissive="#FFD700" emissiveIntensity={glowIntensity} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.8, 2.0, -1.0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFD700" transparent opacity={glowIntensity * 0.3} />
      </mesh>
    </group>
  );
}

function OfficeChair({ position = [0, 0, 0] as [number, number, number], color = '#1A1A1A' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.05, 16]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.28, 0.3, 0.06, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.6, -0.1]} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.35, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, -0.08]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.08, 12]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
      </mesh>
      {[[-0.18, 0.05, 0], [0.18, 0.05, 0], [0, 0.05, -0.18], [0, 0.05, 0.18]].map((p, i) => (
        <mesh key={i} position={[p[0] * 1.2, p[1], p[2] * 1.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.15, 6]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {[[-0.28, 0.6, -0.05], [0.28, 0.6, -0.05]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.04, 0.4, 0.25]} />
          <meshStandardMaterial color="#333333" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export { KingBed, PremiumSofa, StudyDesk, ArcLamp, OfficeChair };
