'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import RoomScene from '@/components/3d/RoomScene';
import { generateDesign } from '@/lib/openai';
import { formatCurrency } from '@/lib/utils';
import type { RoomType, StyleType, LightingType } from '@/types';

const roomTypes: { value: RoomType; label: string }[] = [
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'living-room', label: 'Living Room' },
  { value: 'office', label: 'Office' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
];

const styles: { value: StyleType; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'futuristic', label: 'Futuristic' },
];

const lightings: { value: LightingType; label: string }[] = [
  { value: 'warm', label: 'Warm' },
  { value: 'natural', label: 'Natural' },
  { value: 'cool', label: 'Cool' },
  { value: 'ambient', label: 'Ambient' },
];

const furnitureOptions = [
  { key: 'sofa', label: 'Sofa' },
  { key: 'bed', label: 'Bed' },
  { key: 'desk', label: 'Desk' },
  { key: 'lamp', label: 'Lamp' },
  { key: 'studyTable', label: 'Study Table' },
  { key: 'wardrobe', label: 'Wardrobe' },
  { key: 'curtains', label: 'Curtains' },
  { key: 'shelving', label: 'Shelving' },
];

export default function AIDesigner() {
  const { formData, setFormData, suggestions, setSuggestions, setTotalCost, totalCost, isGenerating, setIsGenerating } = useDesignStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateDesign(formData);
      setSuggestions(result.suggestions || []);
      setTotalCost(result.totalCost || 0);
    } catch {
      setSuggestions([
        { id: '1', type: 'flooring', name: 'Wooden flooring', cost: 12000, image: '/images/flooring.jpg', description: 'Premium oak wood flooring' },
        { id: '2', type: 'lighting', name: 'Warm ambient LED strips', cost: 5000, image: '/images/lighting.jpg', description: 'Smart RGB LED strips' },
        { id: '3', type: 'furniture', name: 'Walnut wood study desk', cost: 8500, image: '/images/desk.jpg', description: 'Modern minimalist desk' },
        { id: '4', type: 'decor', name: 'Minimalist wall art set', cost: 3200, image: '/images/art.jpg', description: 'Abstract canvas set' },
      ]);
      setTotalCost(28700);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="designer" className="section-padding min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI <span className="gradient-text">Design Studio</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Configure your room and let AI create the perfect design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 glass-card p-6 space-y-5 overflow-y-auto max-h-[80vh]"
          >
            <h3 className="font-heading text-xl text-gold mb-4">Room Configuration</h3>

            <div>
              <label className="text-sm text-slate mb-2 block">Room Type</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ roomType: e.target.value as RoomType })}
                className="input-field"
              >
                {roomTypes.map((rt) => (
                  <option key={rt.value} value={rt.value}>{rt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Style</label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({ style: e.target.value as StyleType })}
                className="input-field"
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">
                Width: {formData.dimensions.width}m
              </label>
              <input
                type="range"
                min={2}
                max={10}
                step={0.5}
                value={formData.dimensions.width}
                onChange={(e) => setFormData({ dimensions: { ...formData.dimensions, width: parseFloat(e.target.value) } })}
                className="w-full accent-gold"
              />
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">
                Length: {formData.dimensions.length}m
              </label>
              <input
                type="range"
                min={2}
                max={12}
                step={0.5}
                value={formData.dimensions.length}
                onChange={(e) => setFormData({ dimensions: { ...formData.dimensions, length: parseFloat(e.target.value) } })}
                className="w-full accent-gold"
              />
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">
                Budget: {formatCurrency(formData.budget)}
              </label>
              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={formData.budget}
                onChange={(e) => setFormData({ budget: parseInt(e.target.value) })}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-xs text-slate mt-1">
                <span>₹10K</span>
                <span>₹5L</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Lighting</label>
              <div className="grid grid-cols-2 gap-2">
                {lightings.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setFormData({ lighting: l.value })}
                    className={`px-3 py-2 rounded-lg text-xs transition-all ${
                      formData.lighting === l.value
                        ? 'bg-gold text-navy font-semibold'
                        : 'bg-navy/50 text-slate border border-gold/20'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate mb-2 block">Furniture</label>
              <div className="grid grid-cols-2 gap-2">
                {furnitureOptions.map((f) => (
                  <label key={f.key} className="flex items-center gap-2 text-sm text-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData.furniture as any)[f.key]}
                      onChange={(e) =>
                        setFormData({
                          furniture: { ...formData.furniture, [f.key]: e.target.checked },
                        })
                      }
                      className="accent-gold"
                    />
                    {f.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-gold w-full text-center flex items-center justify-center gap-3 mt-6"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Design'
              )}
            </button>
          </motion.div>

          {/* Center - 3D Room Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 glass-card overflow-hidden"
            style={{ height: '70vh', minHeight: '500px' }}
          >
            <RoomScene />
          </motion.div>

          {/* Right Panel - AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 glass-card p-6 overflow-y-auto max-h-[80vh]"
          >
            <h3 className="font-heading text-xl text-gold mb-4">AI Recommendations</h3>

            {suggestions.length === 0 ? (
              <p className="text-slate text-sm">Configure your room and click Generate Design to see AI recommendations.</p>
            ) : (
              <div className="space-y-4">
                {suggestions.map((item) => (
                  <div key={item.id} className="glass rounded-xl p-4 hover:border-gold/40 transition-all">
                    <div className="w-full h-24 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 mb-3 flex items-center justify-center">
                      <span className="text-gold/60 text-xs uppercase tracking-wider">{item.type}</span>
                    </div>
                    <h4 className="text-light font-semibold text-sm mb-1">{item.name}</h4>
                    <p className="text-slate text-xs mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold font-semibold text-sm">{formatCurrency(item.cost)}</span>
                      <button className="text-xs text-gold border border-gold/30 px-3 py-1 rounded-lg hover:bg-gold/10 transition-all">
                        Add to Design
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gold/20 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate">Total Estimated Cost</span>
                    <span className="text-gold font-bold text-lg">{formatCurrency(totalCost)}</span>
                  </div>
                  <div className="w-full bg-navy/50 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-gold to-gold-light h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalCost / formData.budget) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate mt-1">
                    {totalCost > formData.budget
                      ? '⚠ Over budget! Consider adjusting.'
                      : `${Math.round((1 - totalCost / formData.budget) * 100)}% under budget`}
                  </p>
                </div>

                <button className="btn-glass w-full text-sm mt-4">
                  Compare Layouts
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
