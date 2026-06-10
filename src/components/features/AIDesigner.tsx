'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import RoomScene from '@/components/3d/RoomScene';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import { generateDesign } from '@/lib/openai';
import { formatCurrency } from '@/lib/utils';
import type { RoomType, StyleType, LightingType } from '@/types';

const U = 'https://images.unsplash.com/photo-';

const roomTypes: { value: RoomType; label: string; image: string }[] = [
  { value: 'bedroom', label: 'Bedroom', image: `${U}1616594037284-b1b7e4e3b9c0?w=600&h=400&fit=crop` },
  { value: 'living-room', label: 'Living Room', image: `${U}1586023492125-27b2c045efd7?w=600&h=400&fit=crop` },
  { value: 'office', label: 'Office', image: `${U}1497366216548-37526070297c?w=600&h=400&fit=crop` },
  { value: 'kitchen', label: 'Kitchen', image: `${U}1556909114-44d3be0e6e5e?w=600&h=400&fit=crop` },
  { value: 'bathroom', label: 'Bathroom', image: `${U}1584622650111-3e3e3e3e3e3e?w=600&h=400&fit=crop` },
];

const styles: { value: StyleType; label: string }[] = [
  { value: 'modern', label: 'Modern' }, { value: 'minimalist', label: 'Minimalist' },
  { value: 'luxury', label: 'Luxury' }, { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'japanese', label: 'Japanese' }, { value: 'industrial', label: 'Industrial' },
  { value: 'futuristic', label: 'Futuristic' },
];

const lightings: { value: LightingType; label: string }[] = [
  { value: 'warm', label: 'Warm' }, { value: 'natural', label: 'Natural' },
  { value: 'cool', label: 'Cool' }, { value: 'ambient', label: 'Ambient' },
];

const colorThemes = [
  { name: 'Black & Gold', primary: '#0A0A0A', secondary: '#D4AF37', accent: '#9CA3AF' },
  { name: 'Midnight Blue', primary: '#0A192F', secondary: '#D4AF37', accent: '#64FFDA' },
  { name: 'Warm Grey', primary: '#1F1F1F', secondary: '#D4AF37', accent: '#F5F0EB' },
  { name: 'Charcoal', primary: '#2A2A2A', secondary: '#D4AF37', accent: '#FF6B6B' },
  { name: 'Deep Purple', primary: '#1A0A2E', secondary: '#D4AF37', accent: '#E0B0FF' },
  { name: 'Forest', primary: '#0A1A0A', secondary: '#D4AF37', accent: '#90EE90' },
];

export default function AIDesigner() {
  const { formData, setFormData, suggestions, setSuggestions, setTotalCost, totalCost, isGenerating, setIsGenerating, user, addToDesign, pendingAdditions } = useDesignStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const result = await generateDesign(formData);
      setSuggestions(result.suggestions || []);
      setTotalCost(result.totalCost || 0);
    } catch {
      const isBed = formData.roomType === 'bedroom';
      setSuggestions([
        { id: '1', type: 'flooring', name: 'Premium Marble Flooring', cost: Math.round(formData.budget * 0.18), image: `${U}1586023492125-27b2c045efd7?w=400&h=300&fit=crop`, description: 'Italian marble with gold veining — timeless elegance' },
        { id: '2', type: 'lighting', name: 'Crystal Chandelier', cost: Math.round(formData.budget * 0.1), image: `${U}1513504637923-04bf7dad0e5a?w=400&h=300&fit=crop`, description: 'Hand-crafted crystal with gold finish — 60" diameter' },
        { id: '3', type: 'furniture', name: isBed ? 'King Size Platform Bed' : 'Luxury Sectional Sofa', cost: Math.round(formData.budget * 0.35), image: isBed ? `${U}1505693416388-f3c6f5a5e9b8?w=400&h=300&fit=crop` : `${U}1555041467-a600c8d0e220?w=400&h=300&fit=crop`, description: isBed ? 'Premium upholstered headboard with gold legs' : 'Premium velvet upholstery with gold trim' },
        { id: '4', type: 'decor', name: 'Gold Accent Wall Art', cost: Math.round(formData.budget * 0.07), image: `${U}1567098324869-f96d4ce5d7b0?w=400&h=300&fit=crop`, description: 'Abstract gold leaf canvas set — 3-piece collection' },
        { id: '5', type: 'furniture', name: 'Designer Storage Unit', cost: Math.round(formData.budget * 0.15), image: `${U}1597008808545-1efadd7c2068?w=400&h=300&fit=crop`, description: 'Custom modular storage with integrated LED lighting' },
      ]);
      setTotalCost(Math.round(formData.budget * 0.85));
    } finally {
      setIsGenerating(false);
    }
  }, [formData, setIsGenerating, setSuggestions, setTotalCost]);

  if (!user) {
    return (
      <section id="designer" className="section-padding min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="font-heading text-3xl text-light mb-4">Sign In to Design</h2>
          <p className="text-slate mb-8">Create an account or sign in to use the AI Design Studio.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signin" className="btn-gold text-lg px-10 py-4">Sign In</a>
            <a href="/auth/signup" className="btn-glass text-lg px-10 py-4">Create Account</a>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="designer" className="section-padding min-h-screen bg-black">
      <AnimatedBackground>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI <span className="gradient-text">Design Studio</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Customize your room dimensions and colors, then generate a perfect AI design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Customization */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 glass-card p-5 space-y-4 overflow-y-auto max-h-[80vh]">
            <h3 className="font-heading text-xl text-gold mb-3">Customize</h3>

            <div>
              <label className="text-sm text-slate mb-2 block">Room Type</label>
              <select value={formData.roomType} onChange={(e) => setFormData({ roomType: e.target.value as RoomType })} className="input-field">
                {roomTypes.map((rt) => (<option key={rt.value} value={rt.value}>{rt.label}</option>))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Style</label>
              <select value={formData.style} onChange={(e) => setFormData({ style: e.target.value as StyleType })} className="input-field">
                {styles.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Width: {formData.dimensions.width}m</label>
              <input type="range" min={2} max={10} step={0.5} value={formData.dimensions.width}
                onChange={(e) => setFormData({ dimensions: { ...formData.dimensions, width: parseFloat(e.target.value) } })}
                className="w-full accent-gold" />
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Length: {formData.dimensions.length}m</label>
              <input type="range" min={2} max={12} step={0.5} value={formData.dimensions.length}
                onChange={(e) => setFormData({ dimensions: { ...formData.dimensions, length: parseFloat(e.target.value) } })}
                className="w-full accent-gold" />
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Budget: {formatCurrency(formData.budget)}</label>
              <input type="range" min={10000} max={500000} step={5000} value={formData.budget}
                onChange={(e) => setFormData({ budget: parseInt(e.target.value) })} className="w-full accent-gold" />
            </div>

            {/* Color Customization */}
            <div>
              <button onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-2 text-sm text-gold mb-2">
                <span className="w-4 h-4 rounded-full border border-gold/30" style={{ background: formData.colors.primary }} />
                <span className="w-4 h-4 rounded-full border border-gold/30" style={{ background: formData.colors.secondary }} />
                <span className="w-4 h-4 rounded-full border border-gold/30" style={{ background: formData.colors.accent }} />
                <span>Color Themes {showColorPicker ? '▲' : '▼'}</span>
              </button>
              <AnimatePresence>
                {showColorPicker && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="space-y-2 pt-1">
                      {colorThemes.map((theme) => (
                        <button key={theme.name} onClick={() => setFormData({ colors: { primary: theme.primary, secondary: theme.secondary, accent: theme.accent } })}
                          className={`flex items-center gap-3 w-full p-2 rounded-lg text-xs text-left transition-all ${formData.colors.primary === theme.primary ? 'bg-gold/10 border border-gold/30' : 'hover:bg-white/5'}`}>
                          <div className="flex -space-x-1">
                            <span className="w-5 h-5 rounded-full border border-gold/20" style={{ background: theme.primary }} />
                            <span className="w-5 h-5 rounded-full border border-gold/20" style={{ background: theme.secondary }} />
                            <span className="w-5 h-5 rounded-full border border-gold/20" style={{ background: theme.accent }} />
                          </div>
                          <span className="text-light">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Lighting</label>
              <div className="grid grid-cols-2 gap-1.5">
                {lightings.map((l) => (
                  <button key={l.value} onClick={() => setFormData({ lighting: l.value })}
                    className={`px-2 py-1.5 rounded-lg text-xs transition-all ${formData.lighting === l.value ? 'bg-gold text-navy font-semibold' : 'bg-dark-grey/50 text-slate border border-gold/15'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleGenerate} disabled={isGenerating}
              className="btn-gold w-full text-center flex items-center justify-center gap-3 mt-4">
              {isGenerating ? (<><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Generating...</>) : 'Generate Design'}
            </button>
          </motion.div>

          {/* Center - 3D Room Viewer */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 glass-card overflow-hidden" style={{ height: '70vh', minHeight: '500px' }}>
            <RoomScene />
          </motion.div>

          {/* Right Panel - AI Recommendations */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 glass-card p-5 overflow-y-auto max-h-[80vh]">
            <h3 className="font-heading text-xl text-gold mb-4">AI Recommendations</h3>

            {pendingAdditions.length > 0 && (
              <div className="mb-3 p-2 bg-gold/5 rounded-lg border border-gold/15 text-xs text-gold">
                {pendingAdditions.length} item{pendingAdditions.length > 1 ? 's' : ''} added to design
              </div>
            )}

            {suggestions.length === 0 ? (
              <p className="text-slate text-sm">Customize your room and click Generate Design to see AI recommendations with pricing and images.</p>
            ) : (
              <div className="space-y-3">
                {suggestions.map((item) => (
                  <div key={item.id} className="glass rounded-xl overflow-hidden hover:border-gold/30 transition-all border border-gold/10">
                    <div className="h-28 overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-xs text-gold uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded">{item.type}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-light font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-slate text-xs mb-2 line-clamp-1">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gold font-bold text-sm">{formatCurrency(item.cost)}</span>
                        <button onClick={() => addToDesign({ type: item.type, name: item.name, image: item.image })}
                          className="text-xs bg-gold text-navy font-semibold px-3 py-1.5 rounded-lg hover:bg-gold-light transition-all">
                          Add to Design
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gold/15 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate text-sm">Total Cost</span>
                    <span className="text-gold font-bold text-lg">{formatCurrency(totalCost)}</span>
                  </div>
                  <div className="w-full bg-dark-grey/50 rounded-full h-1.5 mt-1.5">
                    <div className="bg-gradient-to-r from-gold to-gold-light h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalCost / formData.budget) * 100, 100)}%` }} />
                  </div>
                  <p className="text-xs text-slate mt-1">
                    {totalCost > formData.budget ? '⚠ Over budget' : `${Math.round((1 - totalCost / formData.budget) * 100)}% under budget`}
                  </p>
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="flex-1 btn-gold text-xs py-2.5">Save Design</button>
                  <button className="flex-1 btn-glass text-xs py-2.5">Share</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      </AnimatedBackground>
    </section>
  );
}
