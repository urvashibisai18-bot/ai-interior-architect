'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import { formatCurrency } from '@/lib/utils';

const DEFAULT_ITEMS = [
  { item: 'Bed', cost: 18000, category: 'Furniture' },
  { item: 'Study Table', cost: 8000, category: 'Furniture' },
  { item: 'Wardrobe', cost: 12000, category: 'Furniture' },
  { item: 'Lighting', cost: 5000, category: 'Lighting' },
  { item: 'Decor', cost: 7000, category: 'Decor' },
  { item: 'Flooring', cost: 12000, category: 'Flooring' },
  { item: 'Curtains', cost: 5000, category: 'Decor' },
  { item: 'Sofa', cost: 25000, category: 'Furniture' },
];

export default function BudgetOptimizer() {
  const formData = useDesignStore((s) => s.formData);
  const [budget, setBudget] = useState(formData.budget);
  const [items] = useState(DEFAULT_ITEMS);

  const totalCost = useMemo(() => items.reduce((s, i) => s + i.cost, 0), [items]);
  const remaining = budget - totalCost;

  const breakdown = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        percentage: Math.round((item.cost / budget) * 100),
      })),
    [items, budget]
  );

  const categoryTotals = useMemo(() => {
    const cats: Record<string, number> = {};
    items.forEach((i) => {
      cats[i.category] = (cats[i.category] || 0) + i.cost;
    });
    return Object.entries(cats).map(([name, cost]) => ({
      name,
      cost,
      percentage: Math.round((cost / budget) * 100),
      color:
        name === 'Furniture'
          ? '#D4AF37'
          : name === 'Lighting'
            ? '#64FFDA'
            : name === 'Decor'
              ? '#8892B0'
              : '#F0D060',
    }));
  }, [items, budget]);

  return (
    <section id="budget" className="section-padding">
      <AnimatedBackground>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AI Budget <span className="gradient-text">Optimizer</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Smart budget allocation for your dream space
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Input & Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h3 className="font-heading text-xl text-gold mb-6">Adjust Budget</h3>

            <div className="mb-8">
              <label className="text-sm text-slate mb-3 block">
                Total Budget: <span className="text-gold font-bold text-lg">{formatCurrency(budget)}</span>
              </label>
              <input
                type="range"
                min={25000}
                max={500000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-xs text-slate mt-1">
                <span>₹25K</span>
                <span>₹5L</span>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                {categoryTotals.map((cat, i) => {
                  const totalDeg = 360;
                  let cumulativeDeg = 0;
                  const segments = categoryTotals.slice(0, i).map((c) => (c.cost / totalCost) * totalDeg);
                  cumulativeDeg = segments.reduce((a, b) => a + b, 0);
                  const degrees = (cat.cost / totalCost) * totalDeg;
                  const startAngle = (cumulativeDeg - 90) * (Math.PI / 180);
                  const endAngle = (cumulativeDeg + degrees - 90) * (Math.PI / 180);
                  const r = 80;
                  const cx = 100;
                  const cy = 100;
                  const x1 = cx + r * Math.cos(startAngle);
                  const y1 = cy + r * Math.sin(startAngle);
                  const x2 = cx + r * Math.cos(endAngle);
                  const y2 = cy + r * Math.sin(endAngle);
                  const largeArc = degrees > 180 ? 1 : 0;

                  return (
                    <path
                      key={cat.name}
                      d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={cat.color}
                      opacity={0.8}
                    />
                  );
                })}
                <circle cx="100" cy="100" r="40" fill="#0A192F" />
              </svg>
            </div>

            <div className="space-y-2">
              {categoryTotals.map((cat) => (
                <div key={cat.name} className="flex items-center gap-3 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                  <span className="text-slate flex-1">{cat.name}</span>
                  <span className="text-light font-medium">{formatCurrency(cat.cost)}</span>
                  <span className="text-gold text-xs">{cat.percentage}%</span>
                </div>
              ))}
            </div>

            {remaining > 0 && (
              <div className="mt-4 p-3 bg-gold/10 rounded-lg border border-gold/20">
                <p className="text-sm text-gold">
                  💡 You have {formatCurrency(remaining)} remaining — consider premium finishes!
                </p>
              </div>
            )}
            {remaining < 0 && (
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-sm text-red-400">
                  ⚠ Over budget by {formatCurrency(Math.abs(remaining))}. Consider adjusting categories.
                </p>
              </div>
            )}
          </motion.div>

          {/* Right: Itemized Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h3 className="font-heading text-xl text-gold mb-6">Cost Breakdown</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20 text-left">
                    <th className="pb-3 text-slate text-sm font-medium">Item</th>
                    <th className="pb-3 text-slate text-sm font-medium text-right">Cost</th>
                    <th className="pb-3 text-slate text-sm font-medium text-right">% of Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map((item, i) => (
                    <motion.tr
                      key={item.item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gold/10"
                    >
                      <td className="py-3 text-light text-sm">{item.item}</td>
                      <td className="py-3 text-gold text-sm text-right">{formatCurrency(item.cost)}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-navy/50 rounded-full h-1.5">
                            <div
                              className="bg-gold h-1.5 rounded-full transition-all"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-slate text-xs w-10 text-right">{item.percentage}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gold/30">
                    <td className="pt-3 text-light font-semibold">Total</td>
                    <td className="pt-3 text-gold font-bold text-right">{formatCurrency(totalCost)}</td>
                    <td className="pt-3 text-gold font-bold text-right">
                      {Math.round((totalCost / budget) * 100)}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 p-4 glass rounded-xl">
              <p className="text-sm text-light font-medium mb-2">🤖 AI Tip</p>
              <p className="text-xs text-slate">
                You&apos;re spending{' '}
                {categoryTotals.find((c) => c.name === 'Furniture')?.percentage || 0}% on furniture —
                consider mid-range options to save{' '}
                {formatCurrency(Math.round(totalCost * 0.15))}.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      </AnimatedBackground>
    </section>
  );
}
