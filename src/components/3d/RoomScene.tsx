'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useDesignStore } from '@/store/useDesignStore';
import { KingBed, PremiumSofa, StudyDesk, ArcLamp, OfficeChair } from './FurnitureModels';

function Room({ dimensions }: { dimensions: { width: number; length: number; height: number } }) {
  const { style, colors } = useDesignStore((s) => s.formData);
  const { width, length, height } = dimensions;

  const wallColor = useMemo(() => new THREE.Color(colors.primary), [colors.primary]);
  const floorColor = useMemo(() => {
    const colors_map: Record<string, string> = {
      modern: '#2A2A2A',
      minimalist: '#1F1F1F',
      luxury: '#0A0A0A',
      scandinavian: '#333333',
      japanese: '#2A2A2A',
      industrial: '#1A1A1A',
      futuristic: '#111111',
    };
    return new THREE.Color(colors_map[style] || '#2A2A2A');
  }, [style]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={floorColor} roughness={0.7} metalness={0.1} />
      </mesh>
      {[
        { pos: [0, height / 2, -length / 2], rot: [0, 0, 0] },
        { pos: [0, height / 2, length / 2], rot: [0, Math.PI, 0] },
        { pos: [-width / 2, height / 2, 0], rot: [0, -Math.PI / 2, 0] },
        { pos: [width / 2, height / 2, 0], rot: [0, Math.PI / 2, 0] },
      ].map((wall, i) => (
        <mesh key={i} position={wall.pos as any} rotation={wall.rot as any}>
          <planeGeometry args={[i < 2 ? width : length, height]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Lighting({ type }: { type: string }) {
  const intensities: Record<string, [number, number, number]> = {
    warm: [1.0, 0.8, 0.5],
    natural: [1.0, 1.0, 0.9],
    cool: [0.6, 0.7, 1.0],
    ambient: [0.7, 0.8, 1.0],
  };
  const color = intensities[type] || intensities.natural;

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color={new THREE.Color(...color)} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[0, 3, 0]} intensity={0.2} color={new THREE.Color(...color)} />
    </>
  );
}

function Particles({ count = 30 }) {
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) temp[i] = (Math.random() - 0.5) * 20;
    return temp;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D4AF37" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

export default function RoomScene() {
  const { formData, pendingAdditions } = useDesignStore();
  const { dimensions, lighting, furniture, style } = formData;

  const furnitureItems = useMemo(() => {
    const items: { type: string; position: [number, number, number]; props?: any }[] = [];
    const w = dimensions.width;
    const l = dimensions.length;

    if (furniture.sofa) items.push({ type: 'sofa', position: [0, 0, -l/4 + 0.5], props: { fabricColor: '#333333' } });
    if (furniture.bed) items.push({ type: 'bed', position: [w/4, 0, -l/5], props: { blanketColor: style === 'luxury' ? '#D4AF37' : '#333333' } });
    if (furniture.desk) items.push({ type: 'desk', position: [-w/4, 0, l/4], props: { hasChair: true } });
    if (furniture.lamp) items.push({ type: 'lamp', position: [w/3, 0, l/4], props: { isOn: true } });

    if (furniture.studyTable) items.push({ type: 'desk', position: [-w/5, 0, -l/5], props: { hasChair: true } });
    if (furniture.wardrobe) items.push({ type: 'wardrobe', position: [w/2 - 0.7, 0, -l/6], props: {} });
    if (furniture.curtains) items.push({ type: 'curtains', position: [0, 0, -l/2 + 0.05], props: { width: w } });
    if (furniture.shelving) items.push({ type: 'shelving', position: [-w/2 + 0.7, 0, l/5], props: {} });

    // Add pending additions from recommendations/marketplace
    pendingAdditions.forEach((item, idx) => {
      const offset = idx * 0.8;
      const t = item.type?.toLowerCase() || '';
      let mappedType = t;
      if (t === 'flooring') return;
      if (t === 'lighting') mappedType = 'lamp';
      else if (t === 'furniture' || t === 'decor') {
        if (item.name?.toLowerCase().includes('bed')) mappedType = 'bed';
        else if (item.name?.toLowerCase().includes('sofa') || item.name?.toLowerCase().includes('seating')) mappedType = 'sofa';
        else if (item.name?.toLowerCase().includes('desk') || item.name?.toLowerCase().includes('table') || item.name?.toLowerCase().includes('storage') || item.name?.toLowerCase().includes('wardrobe')) mappedType = 'desk';
        else if (item.name?.toLowerCase().includes('lamp') || item.name?.toLowerCase().includes('light')) mappedType = 'lamp';
        else if (item.name?.toLowerCase().includes('chair')) mappedType = 'chair';
        else mappedType = 'lamp';
      }
      items.push({ type: mappedType, position: [w/4 + offset, 0, l/4 + 0.5], props: {} });
    });

    return items;
  }, [furniture, dimensions, style, pendingAdditions]);

  const renderFurniture = (item: { type: string; position: [number, number, number]; props?: any }, index: number) => {
    const key = `${item.type}-${index}`;
    switch (item.type) {
      case 'sofa': return <PremiumSofa key={key} position={item.position} {...item.props} />;
      case 'bed': return <KingBed key={key} position={item.position} {...item.props} />;
      case 'desk': case 'table': return <StudyDesk key={key} position={item.position} {...item.props} />;
      case 'lamp': return <ArcLamp key={key} position={item.position} {...item.props} />;
      case 'chair': return <OfficeChair key={key} position={item.position} {...item.props} />;
      default: return null;
    }
  };

  return (
    <Canvas shadows camera={{ position: [6, 4, 8], fov: 50 }} gl={{ antialias: true }}>
      <color attach="background" args={['#0A0A0A']} />
      <Lighting type={lighting} />
      <Room dimensions={dimensions} />
      {furnitureItems.map(renderFurniture)}
      <Particles />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={10} blur={2.5} />
      <Environment preset="studio" />
      <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2.2} minDistance={3} maxDistance={15} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
