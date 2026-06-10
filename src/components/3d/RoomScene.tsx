'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useDesignStore } from '@/store/useDesignStore';
import { KingBed, StudyDesk, LuxurySofa, FloorLamp, Wardrobe, TableLamp, Curtains, Rug, Bookshelf } from './FurnitureModels';

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
  const { formData } = useDesignStore();
  const { dimensions, lighting, furniture, style } = formData;

  const furnitureItems = useMemo(() => {
    const items: { type: string; position: [number, number, number]; color?: string; props?: any }[] = [];
    const w = dimensions.width;
    const l = dimensions.length;

    if (furniture.sofa) items.push({ type: 'sofa', position: [0, 0, -l/4 + 0.5], props: { color: style === 'luxury' ? '#5C4033' : '#8B7355', fabricColor: style === 'luxury' ? '#D4AF37' : '#4A4A4A' } });
    if (furniture.bed) items.push({ type: 'bed', position: [w/4, 0, -l/5], props: { color: '#5C4033', pillowColor: '#F5F0EB', blanketColor: style === 'luxury' ? '#D4AF37' : '#8B7355' } });
    if (furniture.desk) items.push({ type: 'desk', position: [-w/4, 0, l/4], props: { color: '#8B7355', hasChair: true } });
    if (furniture.lamp) items.push({ type: 'lamp', position: [w/3, 0, l/4], props: { color: '#D4AF37', isOn: true } });
    if (furniture.studyTable) items.push({ type: 'table', position: [-w/5, 0, -l/5], props: { color: '#8B7355', hasChair: true } });
    if (furniture.wardrobe) items.push({ type: 'wardrobe', position: [w/2 - 0.7, 0, -l/6], props: { color: '#5C4033' } });
    if (furniture.curtains) items.push({ type: 'curtains', position: [0, 0, -l/2 + 0.05], props: { color: style === 'luxury' ? '#1A1A2E' : '#4A4A4A', width: w } });
    if (furniture.shelving) items.push({ type: 'shelving', position: [-w/2 + 0.7, 0, l/5], props: { color: '#5C4033' } });

    return items;
  }, [furniture, dimensions, style]);

  const renderFurniture = (item: { type: string; position: [number, number, number]; props?: any }, index: number) => {
    const key = `${item.type}-${index}`;
    switch (item.type) {
      case 'sofa': return <LuxurySofa key={key} position={item.position} {...item.props} />;
      case 'bed': return <KingBed key={key} position={item.position} {...item.props} />;
      case 'desk': case 'table': return <StudyDesk key={key} position={item.position} {...item.props} />;
      case 'lamp': return <FloorLamp key={key} position={item.position} {...item.props} />;
      case 'wardrobe': return <Wardrobe key={key} position={item.position} {...item.props} />;
      case 'curtains': return <Curtains key={key} position={item.position} {...item.props} />;
      case 'shelving': return <Bookshelf key={key} position={item.position} {...item.props} />;
      default: return null;
    }
  };

  return (
    <Canvas shadows camera={{ position: [6, 4, 8], fov: 50 }} gl={{ antialias: true }}>
      <color attach="background" args={['#0A192F']} />
      <Lighting type={lighting} />
      <Room dimensions={dimensions} />
      <Rug position={[0, 0, 0]} color={style === 'luxury' ? '#D4AF37' : style === 'modern' ? '#8B7355' : '#5C4033'} size={[Math.min(dimensions.width - 1, 4), Math.min(dimensions.length - 1, 3)]} />
      {furnitureItems.map(renderFurniture)}
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
