'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { KingBed, PremiumSofa, StudyDesk, ArcLamp, OfficeChair } from '@/components/3d/FurnitureModels';

function FadeIn({ children, delay = 0, duration = 1.2 }: { children: React.ReactNode; delay?: number; duration?: number }) {
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

function GoldParticles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 12;
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#D4AF37" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

function HeroRoom() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#D4AF37" transparent opacity={0.03} />
      </mesh>
      <FadeIn delay={0.3} duration={1.0}>
        <KingBed position={[-1.8, 0, 0.8]} color="#1A1A1A" pillowColor="#F5F0EB" blanketColor="#D4AF37" />
      </FadeIn>
      <FadeIn delay={1.8} duration={1.0}>
        <PremiumSofa position={[1.8, 0, 0.5]} color="#1A1A1A" fabricColor="#333333" />
      </FadeIn>
      <FadeIn delay={3.3} duration={1.0}>
        <StudyDesk position={[0, 0, -0.5]} color="#2A2A2A" hasChair={true} />
      </FadeIn>
      <FadeIn delay={4.8} duration={1.0}>
        <ArcLamp position={[2.5, 0, -1.5]} color="#D4AF37" isOn={true} />
      </FadeIn>
      <FadeIn delay={5.5} duration={0.8}>
        <OfficeChair position={[0.8, 0, -1.8]} color="#1A1A1A" />
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
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [5, 3.5, 7], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.15} />
          <directionalLight position={[4, 6, 4]} intensity={0.4} color="#D4AF37" />
          <spotLight position={[-2, 5, 3]} intensity={0.2} color="#D4AF37" angle={0.3} penumbra={0.5} />
          <HeroRoom />
          <GoldParticles />
          <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={3} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 container-custom text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="inline-block text-gold font-heading text-lg tracking-widest uppercase mb-6">
            AI-Powered Interior Design Studio
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-light leading-tight mb-8"
        >
          Design Your{' '}
          <span className="gradient-text">Dream Space</span>
          <br />
          With AI
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="text-slate text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
        >
          From idea to interior in seconds. AI-powered design, 3D visualization, and smart budgeting.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button onClick={scrollToDesigner} className="btn-gold text-lg px-10 py-4 animate-glow">
            Start Designing
          </button>
          <button onClick={() => document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass text-lg px-10 py-4">
            View Demo
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="mt-20 flex items-center justify-center gap-8 text-slate text-sm"
        >
          {['AI-Powered', '3D Real-time', 'Smart Budgeting', 'Voice Design'].map((feature) => (
            <span key={feature} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {feature}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
