'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import type { StyleType } from '@/types';

const UNSPLASH = 'https://images.unsplash.com/photo-';

const allProducts = [
  { id: '1', name: 'Modern L-Shaped Sofa', price: 45000, category: 'Sofa', style: 'modern' as StyleType, color: '#4A4A4A', rating: 4.5, image: `${UNSPLASH}1555041467-a600c8d0e220?w=400&h=300&fit=crop` },
  { id: '2', name: 'Luxury Velvet Sofa', price: 65000, category: 'Sofa', style: 'luxury' as StyleType, color: '#8B0000', rating: 4.8, image: `${UNSPLASH}1493663284031-7b8663fd0767?w=400&h=300&fit=crop` },
  { id: '3', name: 'Minimalist Platform Bed', price: 35000, category: 'Bed', style: 'minimalist' as StyleType, color: '#D2B48C', rating: 4.6, image: `${UNSPLASH}1505693416388-f3c6f5a5e9b8?w=400&h=300&fit=crop` },
  { id: '4', name: 'Japanese Tatami Bed', price: 28000, category: 'Bed', style: 'japanese' as StyleType, color: '#C4A882', rating: 4.4, image: `${UNSPLASH}1515693632043-2568c44bca4e?w=400&h=300&fit=crop` },
  { id: '5', name: 'Walnut Writing Desk', price: 12000, category: 'Desk', style: 'scandinavian' as StyleType, color: '#8B7355', rating: 4.7, image: `${UNSPLASH}1518455029719-f0d6e6f1236a?w=400&h=300&fit=crop` },
  { id: '6', name: 'Industrial Metal Desk', price: 15000, category: 'Desk', style: 'industrial' as StyleType, color: '#5C5C5C', rating: 4.3, image: `${UNSPLASH}1595514535413-5cbce93d7ef2?w=400&h=300&fit=crop` },
  { id: '7', name: 'Gold Arc Floor Lamp', price: 8500, category: 'Lamp', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.9, image: `${UNSPLASH}1513504637923-04bf7dad0e5a?w=400&h=300&fit=crop` },
  { id: '8', name: 'Minimalist Paper Lamp', price: 3500, category: 'Lamp', style: 'japanese' as StyleType, color: '#F5F5DC', rating: 4.2, image: `${UNSPLASH}1507003212552-39f9b3f6e9a7?w=400&h=300&fit=crop` },
  { id: '9', name: 'Velvet Blackout Curtains', price: 8000, category: 'Curtains', style: 'luxury' as StyleType, color: '#1A1A2E', rating: 4.5, image: `${UNSPLASH}1513694023494-5b9a2a2b6ef5?w=400&h=300&fit=crop` },
  { id: '10', name: 'Linen Sheer Curtains', price: 4500, category: 'Curtains', style: 'scandinavian' as StyleType, color: '#F5F0EB', rating: 4.3, image: `${UNSPLASH}1525518392676-77b6c0c40d5f?w=400&h=300&fit=crop` },
  { id: '11', name: 'Abstract Wall Art Set', price: 5200, category: 'Decor', style: 'modern' as StyleType, color: '#D4AF37', rating: 4.6, image: `${UNSPLASH}1567098324869-f96d4ce5d7b0?w=400&h=300&fit=crop` },
  { id: '12', name: 'Neon LED Sign', price: 3000, category: 'Decor', style: 'futuristic' as StyleType, color: '#FF6B6B', rating: 4.1, image: `${UNSPLASH}1558618666-9fa1e4e1478f?w=400&h=300&fit=crop` },
  { id: '13', name: 'Premium Wardrobe Sliding', price: 28000, category: 'Wardrobe', style: 'modern' as StyleType, color: '#5C4033', rating: 4.7, image: `${UNSPLASH}1597008808545-1efadd7c2068?w=400&h=300&fit=crop` },
  { id: '14', name: 'Classic Wooden Wardrobe', price: 22000, category: 'Wardrobe', style: 'luxury' as StyleType, color: '#8B7355', rating: 4.5, image: `${UNSPLASH}1505692952049-f3a0d8e7b96?w=400&h=300&fit=crop` },
  { id: '15', name: 'Luxury King Bed Frame', price: 42000, category: 'Bed', style: 'luxury' as StyleType, color: '#2C1810', rating: 4.9, image: `${UNSPLASH}1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop` },
  { id: '16', name: 'Modern Office Chair', price: 9500, category: 'Chair', style: 'modern' as StyleType, color: '#1A1A2E', rating: 4.4, image: `${UNSPLASH}1592078615290-4f4b5c6c3ea8?w=400&h=300&fit=crop` },
];

const categories = ['All', 'Sofa', 'Bed', 'Desk', 'Lamp', 'Curtains', 'Decor', 'Wardrobe', 'Chair'];

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
              <div className="h-40 overflow-hidden bg-navy/50 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="absolute top-2 right-2 bg-gold/90 text-navy text-xs font-bold px-2 py-0.5 rounded-full">
                  ★ {product.rating}
                </span>
                <span className="absolute top-2 left-2 text-xs text-gold uppercase tracking-wider bg-navy/70 px-2 py-0.5 rounded-full">
                  {product.style}
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs text-slate uppercase tracking-wider">{product.category}</span>
                <h3 className="text-light font-semibold mt-1 mb-3 text-sm">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-accent">In Stock</span>
                  <span className="text-slate/30">|</span>
                  <span className="text-xs text-slate">Free Delivery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-bold text-lg">{formatCurrency(product.price)}</span>
                  <div className="flex gap-2">
                    <button className="text-xs border border-gold/30 text-gold px-3 py-1.5 rounded-lg hover:bg-gold/10 transition-all">
                      Add to Design
                    </button>
                    <button className="text-xs bg-gold text-navy font-semibold px-3 py-1.5 rounded-lg hover:bg-gold-light transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
