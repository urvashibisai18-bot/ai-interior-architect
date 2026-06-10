'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDesignStore } from '@/store/useDesignStore';
import { formatCurrency } from '@/lib/utils';

interface SavedDesign {
  id: string;
  room_type: string;
  style: string;
  budget: number;
  created_at: string;
  thumbnail_url?: string;
}

const roomLabels: Record<string, string> = {
  'bedroom': 'Bedroom', 'living-room': 'Living Room', 'office': 'Office',
  'kitchen': 'Kitchen', 'bathroom': 'Bathroom',
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser } = useDesignStore();
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'session' }),
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          const designRes = await fetch('/api/user/designs');
          const designData = await designRes.json();
          if (designData.designs) setDesigns(designData.designs);
        } else {
          router.push('/auth/signin');
        }
      } catch {
        router.push('/auth/signin');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, setUser]);

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'signout' }),
    });
    setUser(null);
    router.push('/');
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/user/designs?id=${id}`, { method: 'DELETE' });
      setDesigns(designs.filter(d => d.id !== id));
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy pt-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-6">
                <div className="skeleton h-40 w-full mb-4" />
                <div className="skeleton h-6 w-24 mb-2" />
                <div className="skeleton h-4 w-full mb-2" />
                <div className="skeleton h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Mini Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container-custom flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-navy font-bold">AI</span>
            </div>
            <span className="font-heading text-xl text-light hidden sm:block">Interior<span className="text-gold"> Architect</span></span>
          </Link>
          <button onClick={handleLogout} className="btn-glass text-sm py-2 px-5">Sign Out</button>
        </div>
      </nav>

      <div className="pt-32 pb-20 container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-light mb-2">My <span className="gradient-text">Designs</span></h1>
            <p className="text-slate">{user?.email || 'Welcome back'}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="btn-glass text-sm py-3 px-6">Explore</Link>
            <Link href="/#designer" className="btn-gold text-sm py-3 px-6">Create New Design</Link>
          </div>
        </motion.div>

        {designs.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl text-light mb-4">No designs yet</h2>
            <p className="text-slate mb-8 max-w-md mx-auto">Create your first AI-powered interior design and it will appear here.</p>
            <Link href="/#designer" className="btn-gold text-lg px-10 py-4">Create Your First Design</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design, i) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-gold/5 to-gold/10 flex items-center justify-center relative">
                  {design.thumbnail_url ? (
                    <img src={design.thumbnail_url} alt={design.room_type} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <span className="text-5xl text-gold/30">
                        {design.room_type === 'bedroom' ? '🛏' : design.room_type === 'living-room' ? '🛋' : design.room_type === 'office' ? '💼' : '🏠'}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold/90 text-navy text-xs font-bold px-3 py-1 rounded-full">
                      {roomLabels[design.room_type] || design.room_type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gold uppercase tracking-wider">{design.style}</span>
                    <span className="text-slate/30">|</span>
                    <span className="text-xs text-slate">{formatCurrency(design.budget)}</span>
                  </div>
                  <p className="text-xs text-slate mb-4">
                    Created {new Date(design.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 text-sm border border-gold/30 text-gold px-3 py-2 rounded-lg hover:bg-gold/10 transition-all">View</button>
                    <button className="flex-1 text-sm border border-gold/30 text-gold px-3 py-2 rounded-lg hover:bg-gold/10 transition-all">Edit</button>
                    <button onClick={() => handleDelete(design.id)} className="text-sm border border-red-400/30 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Profile Summary */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 glass-card p-8">
          <h3 className="font-heading text-xl text-gold mb-6">Profile Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-slate text-sm mb-1">Email</p>
              <p className="text-light font-medium">{user?.email || '-'}</p>
            </div>
            <div>
              <p className="text-slate text-sm mb-1">Total Designs</p>
              <p className="text-light font-medium">{designs.length}</p>
            </div>
            <div>
              <p className="text-slate text-sm mb-1">Favorite Style</p>
              <p className="text-light font-medium">
                {designs.length > 0
                  ? Object.entries(designs.reduce((acc: Record<string, number>, d) => {
                      acc[d.style] = (acc[d.style] || 0) + 1;
                      return acc;
                    }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
                  : '-'}
              </p>
            </div>
            <div>
              <p className="text-slate text-sm mb-1">Total Budget Spent</p>
              <p className="text-light font-medium">{formatCurrency(designs.reduce((s, d) => s + d.budget, 0))}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
