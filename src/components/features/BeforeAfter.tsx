'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const transformations = [
  {
    title: 'Living Room',
    before: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    after: 'linear-gradient(135deg, #0A192F 0%, #1a1a3e 100%)',
    description: 'Modern luxury living room with ambient lighting',
  },
  {
    title: 'Bedroom',
    before: 'linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)',
    after: 'linear-gradient(135deg, #0A192F 0%, #2d1b69 100%)',
    description: 'Minimalist bedroom with warm tones',
  },
  {
    title: 'Office',
    before: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
    after: 'linear-gradient(135deg, #0A192F 0%, #16213e 100%)',
    description: 'Productive workspace with natural lighting',
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
    <section id="before-after" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            Before <span className="gradient-text">&</span> After
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            See the transformation AI brings to any space
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {transformations.map((t, i) => (
            <button
              key={t.title}
              onClick={() => { setActiveIndex(i); setSliderPos(50); }}
              className={`px-6 py-3 rounded-xl transition-all ${
                i === activeIndex
                  ? 'bg-gold text-navy font-semibold'
                  : 'glass text-slate hover:text-gold'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none"
            style={{ height: '400px' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const touch = e.touches[0];
              const x = ((touch.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(0, Math.min(100, x)));
            }}
          >
            {/* Before */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: active.before }}
            >
              <div className="text-center">
                <span className="text-slate/30 font-heading text-6xl">Empty</span>
                <p className="text-slate/20 mt-2">Before</p>
              </div>
            </div>

            {/* After */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: active.after }}
              >
                <div className="text-center">
                  <span className="text-gold/80 font-heading text-6xl">✦</span>
                  <p className="text-gold/60 mt-2 font-heading text-xl">{active.title}</p>
                  <p className="text-slate/60 text-sm mt-1">{active.description}</p>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gold cursor-ew-resize z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/30">
                <span className="text-navy text-sm font-bold">⋮</span>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 text-xs text-slate/50 bg-navy/60 px-3 py-1 rounded-lg">
              Before
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-gold/50 bg-navy/60 px-3 py-1 rounded-lg">
              After
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
