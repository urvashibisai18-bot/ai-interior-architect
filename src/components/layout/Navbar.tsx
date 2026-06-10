'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SectionId } from '@/types';

const navItems: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'designer', label: 'AI Designer' },
  { id: 'before-after', label: 'Transformations' },
  { id: 'gallery', label: 'Styles' },
  { id: 'budget', label: 'Budget' },
  { id: 'marketplace', label: 'Marketplace' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-gold/5' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
            <span className="text-navy font-bold text-lg">AI</span>
          </div>
          <span className="font-heading text-xl text-light hidden sm:block">
            Interior<span className="text-gold"> Architect</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm tracking-wide uppercase ${
                activeSection === item.id ? 'text-gold' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="btn-gold text-sm py-2 px-5 hidden sm:block">Get Started</button>
          <button
            className="lg:hidden text-light text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass lg:hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link text-left py-2 ${activeSection === item.id ? 'text-gold' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
