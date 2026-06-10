'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import type { StyleType } from '@/types';

const allProducts = [
  { id: '1', name: 'Modern L-Shaped Sofa', price: 45000, category: 'Sofa', style: 'modern' as StyleType, color: '#4A4A4A', rating: 4.5 },
  { id: '2', name: 'Luxury Velvet Sofa', price: 65000, category: 'Sofa', style: 'luxury' as StyleType, color: '#8B0000', rating: 4.8 },
  { id: '3', name: 'Minimalist Platform Bed', price: 35000, category: 'Bed', style: 'minimalist' as StyleType, color: '#D2B48C', rating: 4.6 },
  { id: '4', name: 'Japanese Tatami Bed', price: 28000, category: 'Bed', style: 'japanese' as StyleType, color: '#C4A882', rating: 4.4 },
  { id: '5', name: 'Walnut Writing Desk', price: 12000, category: 'Desk', style: 'scandinavian' as StyleType, color: '#8B7355', rating: 4.7 },
  { id: '6', name: 'Industrial Metal Desk', price: 15000, category: 'Desk', style: 'industrial' as StyleType, color: '#5C5C5C', rating: 4.3 },
  { id: '7', name: 'Gold Arc Floor Lamp', price: 8500, category: 'Lamp', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.9 },
  { id: '8', name: 'Minimalist Paper Lamp', price: 3500, category: 'Lamp', style: 'japanese' as StyleType, color: '#F5F5DC', rating: 4.2 },
  { id: '9', name: 'Velvet Blackout Curtains', price: 8000, category: 'Curtains', style: 'luxury' as StyleType, color: '#1A1A2E', rating: 4.5 },
  { id: '10', name: 'Linen Sheer Curtains', price: 4500, category: 'Curtains', style: 'scandinavian' as StyleType, color: '#F5F0EB', rating: 4.3 },
  { id: '11', name: 'Abstract Wall Art Set', price: 5200, category: 'Decor', style: 'modern' as StyleType, color: '#D4AF37', rating: 4.6 },
  { id: '12', name: 'Neon LED Sign', price: 3000, category: 'Decor', style: 'futuristic' as StyleType, color: '#FF6B6B', rating: 4.1 },
];

const categories = ['All', 'Sofa', 'Bed', 'Desk', 'Lamp', 'Curtains', 'Decor'];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const filtered = useMemo(
    () =>
      allProducts.filter(
        (p) =>
          (activeCategory === 'All' || p.category === activeCategory) &&
          p.price >= priceRange[0] &&
          p.price <= priceRange[1]
      ),
    [activeCategory, priceRange]
  );

  return (
    <section id="marketplace" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI Furniture <span className="gradient-text">Marketplace</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Curated furniture and decor recommended by AI
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-navy font-semibold'
                  : 'glass text-slate hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <label className="text-sm text-slate mb-2 block text-center">
            Price Range: {formatCurrency(priceRange[0])} — {formatCurrency(priceRange[1])}
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={1000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-card overflow-hidden"
            >
              <div
                className="h-40 flex items-center justify-center"
                style={{ background: `${product.color}20` }}
              >
                <div
                  className="w-16 h-16 rounded-xl opacity-60"
                  style={{ background: product.color }}
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-gold uppercase tracking-wider">{product.category}</span>
                <h3 className="text-light font-semibold mt-1 mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={`text-xs ${j < Math.floor(product.rating) ? 'text-gold' : 'text-slate/30'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-slate text-xs ml-1">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-bold text-lg">{formatCurrency(product.price)}</span>
                  <button className="text-xs border border-gold/30 text-gold px-3 py-1.5 rounded-lg hover:bg-gold/10 transition-all">
                    Add to Design
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
