'use client';

import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import type { StyleType } from '@/types';

const U = 'https://images.unsplash.com/photo-';

const styles: { id: StyleType; name: string; description: string; image: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, neutral tones, functional design', image: `${U}1600607687939-ce8a6c25118c?w=600&h=400&fit=crop` },
  { id: 'minimalist', name: 'Minimalist', description: 'Less is more — simplicity at its finest', image: `${U}1616486333462-e3e3e3e3e3e3?w=600&h=400&fit=crop` },
  { id: 'luxury', name: 'Luxury', description: 'Opulent materials, gold accents, grand spaces', image: `${U}1600585154340-be6161a56a0c?w=600&h=400&fit=crop` },
  { id: 'scandinavian', name: 'Scandinavian', description: 'Hygge-inspired, light woods, cozy textiles', image: `${U}1600210492486-724fe5c67fb0?w=600&h=400&fit=crop` },
  { id: 'japanese', name: 'Japanese', description: 'Wabi-sabi, natural materials, zen spaces', image: `${U}1598928504131-3e3e3e3e3e3e?w=600&h=400&fit=crop` },
  { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed elements, urban edge', image: `${U}1497366216548-37526070297c?w=600&h=400&fit=crop` },
  { id: 'futuristic', name: 'Futuristic', description: 'Bold geometry, neon accents, smart features', image: `${U}1558618666-9fa1e4e1478f?w=600&h=400&fit=crop` },
];

export default function StyleGallery() {
  const { selectedStyle, setSelectedStyle, setFormData } = useDesignStore();

  const handleApply = (style: StyleType) => {
    setSelectedStyle(style);
    setFormData({ style });
    document.getElementById('designer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="gallery" className="section-padding bg-black">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI Style <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Browse premium curated styles and apply them instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <motion.div key={style.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.03, y: -5 }}
              className={`glass-card overflow-hidden cursor-pointer group ${selectedStyle === style.id ? 'border-gold ring-1 ring-gold/50' : ''}`}
              onClick={() => handleApply(style.id)}>
              <div className="h-48 overflow-hidden relative">
                <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {selectedStyle === style.id && (
                  <div className="absolute top-3 right-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                    Active
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl text-light mb-2">{style.name}</h3>
                <p className="text-slate text-sm mb-4">{style.description}</p>
                <button onClick={(e) => { e.stopPropagation(); handleApply(style.id); }}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${selectedStyle === style.id ? 'bg-gold text-navy' : 'border border-gold/30 text-gold hover:bg-gold/10'}`}>
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
