'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useDesignStore } from '@/store/useDesignStore';

function Room({ dimensions }: { dimensions: { width: number; length: number; height: number } }) {
  const { style, colors } = useDesignStore((s) => s.formData);
  const { width, length, height } = dimensions;

  const wallColor = useMemo(() => new THREE.Color(colors.primary), [colors.primary]);
  const floorColor = useMemo(() => {
    const colors_map: Record<string, string> = {
      modern: '#C4A882',
      minimalist: '#E8E0D8',
      luxury: '#1A1A2E',
      scandinavian: '#F5F0EB',
      japanese: '#D4C5A9',
      industrial: '#5C5C5C',
      futuristic: '#1A1A3E',
    };
    return new THREE.Color(colors_map[style] || '#C4A882');
  }, [style]);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={floorColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Walls */}
      {[
        { pos: [0, height / 2, -length / 2], rot: [0, 0, 0] },
        { pos: [0, height / 2, length / 2], rot: [0, Math.PI, 0] },
        { pos: [-width / 2, height / 2, 0], rot: [0, -Math.PI / 2, 0] },
        { pos: [width / 2, height / 2, 0], rot: [0, Math.PI / 2, 0] },
      ].map((wall, i) => (
        <mesh key={i} position={wall.pos as any} rotation={wall.rot as any}>
          <planeGeometry args={[i < 2 ? width : length, height]} />
          <meshStandardMaterial color={wallColor} roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Furniture({ type, position, color }: { type: string; position: [number, number, number]; color?: string }) {
  const geo = useMemo(() => {
    switch (type) {
      case 'sofa':
        return new THREE.BoxGeometry(2, 0.8, 1);
      case 'bed':
        return new THREE.BoxGeometry(1.8, 0.5, 2);
      case 'desk':
        return new THREE.BoxGeometry(1.2, 0.7, 0.6);
      case 'lamp':
        return new THREE.CylinderGeometry(0.1, 0.15, 0.6, 8);
      case 'table':
        return new THREE.BoxGeometry(1, 0.6, 0.8);
      default:
        return new THREE.BoxGeometry(0.8, 0.8, 0.8);
    }
  }, [type]);

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.05}>
      <mesh position={position} geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial color={color || '#8B7355'} roughness={0.4} metalness={0.3} />
      </mesh>
    </Float>
  );
}

function Lighting({ type }: { type: string }) {
  const intensities: Record<string, [number, number, number]> = {
    warm: [1.0, 0.85, 0.6],
    natural: [1.0, 1.0, 0.9],
    cool: [0.7, 0.8, 1.0],
    ambient: [0.8, 0.9, 1.0],
  };
  const color = intensities[type] || intensities.natural;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.6}
        color={new THREE.Color(...color)}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} color={new THREE.Color(...color)} />
    </>
  );
}

function Particles({ count = 50 }) {
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      temp[i] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#D4AF37" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function RoomScene() {
  const { formData, suggestions } = useDesignStore();
  const { dimensions, lighting, furniture, style } = formData;

  const furnitureItems = useMemo(() => {
    const items: { type: string; position: [number, number, number]; color?: string }[] = [];
    const w = dimensions.width;
    const l = dimensions.length;

    if (furniture.sofa) items.push({ type: 'sofa', position: [0, 0.4, -l / 4], color: style === 'luxury' ? '#D4AF37' : '#8B7355' });
    if (furniture.bed) items.push({ type: 'bed', position: [w / 4, 0.25, -l / 5] });
    if (furniture.desk) items.push({ type: 'desk', position: [-w / 4, 0.35, l / 4] });
    if (furniture.lamp) items.push({ type: 'lamp', position: [w / 3, 0.3, l / 4] });
    if (furniture.studyTable) items.push({ type: 'table', position: [-w / 5, 0.3, -l / 5] });

    return items;
  }, [furniture, dimensions, style]);

  return (
    <Canvas shadows camera={{ position: [6, 4, 8], fov: 50 }}>
      <color attach="background" args={['#0A192F']} />
      <Lighting type={lighting} />
      <Room dimensions={dimensions} />
      {furnitureItems.map((item, i) => (
        <Furniture key={i} type={item.type} position={item.position} color={item.color} />
      ))}
      <Particles />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={10} blur={2.5} />
      <Environment preset="studio" />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={3}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
