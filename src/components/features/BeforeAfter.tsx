'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/layout/AnimatedBackground';

const U = 'https://images.unsplash.com/photo-';

const transformations = [
  {
    title: 'Living Room',
    before: `${U}1600210492486-724fe5c67fb0?w=1000&h=600&fit=crop`,
    after: `${U}1600607687939-ce8a6c25118c?w=1000&h=600&fit=crop`,
    description: 'From a normal living space to a bespoke AI-designed luxury lounge with gold accents',
  },
  {
    title: 'Bedroom',
    before: `${U}1522771739844-6a9f6d5f14af?w=1000&h=600&fit=crop`,
    after: `${U}1505693416388-ac5ce068fe85?w=1000&h=600&fit=crop`,
    description: 'A standard bedroom transformed into a premium sanctuary with smart ambient lighting',
  },
  {
    title: 'Office',
    before: `${U}1720247520862-7e4b14176fa8?w=1000&h=600&fit=crop`,
    after: `${U}1497366216548-37526070297c?w=1000&h=600&fit=crop`,
    description: 'Everyday workspace redesigned as a sophisticated executive suite with AI-optimized layout',
  },
];

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const active = transformations[activeIndex];

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <section id="before-after" className="section-padding bg-black">
      <AnimatedBackground>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            Before <span className="gradient-text">&</span> After
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            See the transformation AI brings to any space
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {transformations.map((t, i) => (
            <button key={t.title} onClick={() => { setActiveIndex(i); setSliderPos(50); }}
              className={`px-6 py-3 rounded-xl transition-all ${i === activeIndex ? 'bg-gold text-navy font-semibold' : 'glass text-slate hover:text-gold'}`}>
              {t.title}
            </button>
          ))}
        </div>

        <motion.div key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none" style={{ height: '450px' }}
            onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)}
            onTouchMove={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const touch = e.touches[0];
              const x = ((touch.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(0, Math.min(100, x)));
            }}>
            {/* Before */}
            <div className="absolute inset-0">
              <img src={active.before} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* After */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src={active.after} alt="After" className="w-full h-full object-cover" style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            </div>

            {/* Slider Handle */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-gold cursor-ew-resize z-10" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/40">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l-4 4m0 0l4 4m-4-4h16" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 text-xs font-medium bg-black/60 text-slate px-3 py-1.5 rounded-lg backdrop-blur-sm">
              Before
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-medium bg-black/60 text-gold px-3 py-1.5 rounded-lg backdrop-blur-sm">
              After
            </div>
          </div>

          <p className="text-center text-slate text-sm mt-4 italic">
            &ldquo;{active.description}&rdquo;
          </p>
        </motion.div>
      </div>
      </AnimatedBackground>
    </section>
  );
}
