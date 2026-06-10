'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import { formatCurrency } from '@/lib/utils';
import type { StyleType } from '@/types';

const U = 'https://images.unsplash.com/photo-';

const allProducts = [
  { id: '1', name: 'Luxury Velvet Sofa', price: 65000, category: 'Sofa', style: 'luxury' as StyleType, color: '#8B0000', rating: 4.8, image: `${U}1760072513367-55182245e76c?w=500&h=350&fit=crop` },
  { id: '2', name: 'Modern L-Shaped Sofa', price: 45000, category: 'Sofa', style: 'modern' as StyleType, color: '#4A4A4A', rating: 4.5, image: `${U}1632829882891-5047ccc421bc?w=500&h=350&fit=crop` },
  { id: '3', name: 'Gold Accent Platform Bed', price: 55000, category: 'Bed', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.9, image: `${U}1505693416388-ac5ce068fe85?w=500&h=350&fit=crop` },
  { id: '4', name: 'Minimalist Platform Bed', price: 35000, category: 'Bed', style: 'minimalist' as StyleType, color: '#D2B48C', rating: 4.6, image: `${U}1522771739844-6a9f6d5f14af?w=500&h=350&fit=crop` },
  { id: '5', name: 'Executive Walnut Desk', price: 22000, category: 'Desk', style: 'luxury' as StyleType, color: '#5C4033', rating: 4.7, image: `${U}1705326701287-346fc37a2c86?w=500&h=350&fit=crop` },
  { id: '6', name: 'Industrial Metal Desk', price: 15000, category: 'Desk', style: 'industrial' as StyleType, color: '#5C5C5C', rating: 4.3, image: `${U}1672860044506-e3ec09653e82?w=500&h=350&fit=crop` },
  { id: '7', name: 'Gold Arc Floor Lamp', price: 12000, category: 'Lamp', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.9, image: `${U}1631510390389-c1e4fb20ff31?w=500&h=350&fit=crop` },
  { id: '8', name: 'Crystal Table Lamp', price: 6500, category: 'Lamp', style: 'modern' as StyleType, color: '#F5F5DC', rating: 4.4, image: `${U}1606744888344-493238951221?w=500&h=350&fit=crop` },
  { id: '9', name: 'Velvet Blackout Curtains', price: 12000, category: 'Curtains', style: 'luxury' as StyleType, color: '#1A1A2E', rating: 4.7, image: `${U}1618221195710-dd6b41faaea6?w=500&h=350&fit=crop` },
  { id: '10', name: 'Linen Sheer Curtains', price: 6500, category: 'Curtains', style: 'scandinavian' as StyleType, color: '#F5F0EB', rating: 4.3, image: `${U}1618221381711-42ca8ab6e908?w=500&h=350&fit=crop` },
  { id: '11', name: 'Gold Leaf Wall Art Set', price: 8500, category: 'Decor', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.8, image: `${U}1611048267451-e6ed903d4a38?w=500&h=350&fit=crop` },
  { id: '12', name: 'Neon LED Sign', price: 4500, category: 'Decor', style: 'futuristic' as StyleType, color: '#FF6B6B', rating: 4.2, image: `${U}1666037805138-f227944ed8d7?w=500&h=350&fit=crop` },
  { id: '13', name: 'Premium Sliding Wardrobe', price: 38000, category: 'Wardrobe', style: 'modern' as StyleType, color: '#2A2A2A', rating: 4.7, image: `${U}1564078516393-cf04bd966897?w=500&h=350&fit=crop` },
  { id: '14', name: 'Classic Wooden Wardrobe', price: 32000, category: 'Wardrobe', style: 'luxury' as StyleType, color: '#5C4033', rating: 4.5, image: `${U}1633505899118-4ca6bd143043?w=500&h=350&fit=crop` },
  { id: '15', name: 'Gold Trim Armchair', price: 28000, category: 'Chair', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.6, image: `${U}1679862342541-e408d4f3ab80?w=500&h=350&fit=crop` },
  { id: '16', name: 'Ergonomic Office Chair', price: 15000, category: 'Chair', style: 'modern' as StyleType, color: '#1A1A1A', rating: 4.4, image: `${U}1562438668-bcf0ca6578f0?w=500&h=350&fit=crop` },
  { id: '17', name: 'Marble Coffee Table', price: 18000, category: 'Decor', style: 'luxury' as StyleType, color: '#F5F0EB', rating: 4.5, image: `${U}1578683010236-d716f9a3f461?w=500&h=350&fit=crop` },
  { id: '18', name: 'Gold Pendant Light', price: 9500, category: 'Lamp', style: 'luxury' as StyleType, color: '#D4AF37', rating: 4.8, image: `${U}1617098900591-3f90928e8c54?w=500&h=350&fit=crop` },
];

const categories = ['All', 'Sofa', 'Bed', 'Desk', 'Lamp', 'Curtains', 'Decor', 'Wardrobe', 'Chair'];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const { addToDesign } = useDesignStore();

  const filtered = useMemo(() =>
    allProducts.filter((p) =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]),
    [activeCategory, priceRange]
  );

  return (
    <section id="marketplace" className="section-padding bg-black">
      <AnimatedBackground>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI Furniture <span className="gradient-text">Marketplace</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Premium curated furniture and decor with AI-powered recommendations
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm transition-all ${activeCategory === cat ? 'bg-gold text-navy font-semibold' : 'glass text-slate hover:text-gold'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <label className="text-sm text-slate mb-2 block text-center">
            Price Range: {formatCurrency(priceRange[0])} — {formatCurrency(priceRange[1])}
          </label>
          <input type="range" min={0} max={100000} step={1000} value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-gold" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }} className="glass-card overflow-hidden">
              <div className="h-44 overflow-hidden bg-black/50 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-2 right-2 bg-gold/90 text-navy text-xs font-bold px-2 py-0.5 rounded-full">★ {product.rating}</span>
                <span className="absolute top-2 left-2 text-xs text-gold uppercase tracking-wider bg-black/70 px-2 py-0.5 rounded-full">{product.style}</span>
              </div>
              <div className="p-4">
                <span className="text-xs text-slate uppercase tracking-wider">{product.category}</span>
                <h3 className="text-light font-semibold mt-1 mb-2 text-sm">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gold/70">In Stock</span>
                  <span className="text-slate/30">|</span>
                  <span className="text-xs text-slate">Free Delivery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-bold text-base">{formatCurrency(product.price)}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => addToDesign({ type: product.category.toLowerCase(), name: product.name, image: product.image })}
                      className="text-xs border border-gold/30 text-gold px-2.5 py-1.5 rounded-lg hover:bg-gold/10 transition-all">
                      Add to Design
                    </button>
                    <button className="text-xs bg-gold text-navy font-semibold px-2.5 py-1.5 rounded-lg hover:bg-gold-light transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </AnimatedBackground>
    </section>
  );
}
