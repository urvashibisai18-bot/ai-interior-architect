'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import AIChat from '@/components/features/AIChat';

const HeroSection = dynamic(() => import('@/components/features/HeroSection'), { ssr: false });
const AIDesigner = dynamic(() => import('@/components/features/AIDesigner'), { ssr: false });
const BeforeAfter = dynamic(() => import('@/components/features/BeforeAfter'), { ssr: false });
const StyleGallery = dynamic(() => import('@/components/features/StyleGallery'), { ssr: false });
const BudgetOptimizer = dynamic(() => import('@/components/features/BudgetOptimizer'), { ssr: false });
const Marketplace = dynamic(() => import('@/components/features/Marketplace'), { ssr: false });
const ARPreview = dynamic(() => import('@/components/features/ARPreview'), { ssr: false });
const AdvancedFeatures = dynamic(() => import('@/components/features/AdvancedFeatures'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <HeroSection />
      <AIDesigner />
      <BeforeAfter />
      <StyleGallery />
      <BudgetOptimizer />
      <Marketplace />
      <ARPreview />
      <AdvancedFeatures />

      {/* Footer */}
      <footer className="border-t border-gold/10 py-12">
        <div className="container-custom text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-navy font-bold">AI</span>
            </div>
            <span className="font-heading text-xl text-light">
              Interior<span className="text-gold"> Architect</span>
            </span>
          </div>
          <p className="text-slate text-sm max-w-md mx-auto mb-8">
            AI-powered interior design studio. Transform any space with the power of artificial intelligence.
          </p>
          <div className="flex justify-center gap-6 text-sm text-slate">
            <span>© 2026 AI Interior Architect</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>

      <AIChat />
    </main>
  );
}
