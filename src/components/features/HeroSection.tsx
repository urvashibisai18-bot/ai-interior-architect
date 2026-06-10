'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { KingBed, StudyDesk, FloorLamp, LuxurySofa } from '@/components/3d/FurnitureModels';

function FadeIn({ children, delay = 0, duration = 1 }: { children: React.ReactNode; delay?: number; duration?: number }) {
  const [ready, setReady] = useState(false);
  const scaleRef = useRef(0);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((_, delta) => {
    if (ready && meshRef.current) {
      scaleRef.current = Math.min(1, scaleRef.current + delta / duration);
      meshRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return <group ref={meshRef} scale={[0, 0, 0]}>{children}</group>;
}

function Particles() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 15;
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#D4AF37" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function HeroRoom() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#D4AF37" transparent opacity={0.05} />
      </mesh>
      <FadeIn delay={0.5} duration={1.2}>
        <KingBed position={[-1.5, 0, 0.5]} color="#5C4033" pillowColor="#F5F0EB" blanketColor="#D4AF37" />
      </FadeIn>
      <FadeIn delay={2.0} duration={1.2}>
        <StudyDesk position={[1.5, 0, 0.5]} color="#8B7355" hasChair={true} />
      </FadeIn>
      <FadeIn delay={3.5} duration={1.2}>
        <FloorLamp position={[2, 0, -1.5]} color="#D4AF37" isOn={true} />
      </FadeIn>
      <FadeIn delay={5.0} duration={1.2}>
        <LuxurySofa position={[0, 0, -1.5]} color="#5C4033" fabricColor="#D4AF37" />
      </FadeIn>
    </group>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const scrollToDesigner = () => {
    document.getElementById('designer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
          <color attach="background" args={['#0A192F']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 8, 5]} intensity={0.6} color="#D4AF37" />
          <spotLight position={[0, 5, 0]} intensity={0.3} color="#D4AF37" />
          <HeroRoom />
          <Particles />
          <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={10} blur={2} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-gold font-heading text-lg tracking-widest uppercase mb-6">
            AI-Powered Interior Design Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-light leading-tight mb-8"
        >
          Design Your{' '}
          <span className="gradient-text">Dream Space</span>
          <br />
          With AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-slate text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
        >
          From idea to interior in seconds. AI-powered design, 3D visualization, and smart budgeting — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button onClick={scrollToDesigner} className="btn-gold text-lg px-10 py-4 animate-glow">
            Start Designing
          </button>
          <button
            onClick={() => document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass text-lg px-10 py-4"
          >
            View Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 flex items-center justify-center gap-8 text-slate text-sm"
        >
          {['AI-Powered', '3D Real-time', 'Smart Budgeting', 'AR Preview'].map((feature) => (
            <span key={feature} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {feature}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
