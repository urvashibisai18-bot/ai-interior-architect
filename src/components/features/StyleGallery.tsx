'use client';

import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import type { StyleType } from '@/types';

const styles: { id: StyleType; name: string; description: string; gradient: string; icon: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, neutral tones, functional design', gradient: 'from-gray-800 to-gray-600', icon: '◇' },
  { id: 'minimalist', name: 'Minimalist', description: 'Less is more — simplicity at its finest', gradient: 'from-stone-800 to-stone-600', icon: '○' },
  { id: 'luxury', name: 'Luxury', description: 'Opulent materials, gold accents, grand spaces', gradient: 'from-amber-900 to-amber-700', icon: '✦' },
  { id: 'scandinavian', name: 'Scandinavian', description: 'Hygge-inspired, light woods, cozy textiles', gradient: 'from-blue-900 to-blue-700', icon: '❄' },
  { id: 'japanese', name: 'Japanese', description: 'Wabi-sabi, natural materials, zen spaces', gradient: 'from-red-950 to-red-800', icon: '◈' },
  { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed elements, urban edge', gradient: 'from-zinc-900 to-zinc-700', icon: '▣' },
  { id: 'futuristic', name: 'Futuristic', description: 'Bold geometry, neon accents, smart features', gradient: 'from-violet-900 to-violet-700', icon: '⬡' },
];

export default function StyleGallery() {
  const { selectedStyle, setSelectedStyle, setFormData } = useDesignStore();

  const handleApply = (style: StyleType) => {
    setSelectedStyle(style);
    setFormData({ style });
    document.getElementById('designer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="gallery" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI Style <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Browse curated styles and apply them to your room instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`glass-card overflow-hidden cursor-pointer group ${
                selectedStyle === style.id ? 'border-gold ring-1 ring-gold/50' : ''
              }`}
              onClick={() => handleApply(style.id)}
            >
              <div
                className={`h-48 bg-gradient-to-br ${style.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <span className="text-6xl text-white/20 group-hover:scale-110 transition-transform duration-500">
                  {style.icon}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />

                {selectedStyle === style.id && (
                  <div className="absolute top-3 right-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                    Active
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-heading text-xl text-light mb-2">{style.name}</h3>
                <p className="text-slate text-sm mb-4">{style.description}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleApply(style.id); }}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedStyle === style.id
                      ? 'bg-gold text-navy'
                      : 'border border-gold/30 text-gold hover:bg-gold/10'
                  }`}
                >
                  Apply This Style
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
