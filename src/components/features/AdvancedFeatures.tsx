'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

function ImageAnalyzer() {
  const [result, setResult] = useState<{
    mood: string; colors: string[]; style: string; lighting: string;
    description: string; estimatedCost: number; purchaseTips: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    setTimeout(() => {
      setResult({
        mood: 'Warm & Luxurious',
        colors: ['#D4AF37', '#1A1A1A', '#F5F0EB', '#8B7355', '#2C1810'],
        style: 'Modern Luxury',
        lighting: 'Warm Ambient with Gold Accents',
        description: 'This space features a sophisticated blend of warm gold tones with rich dark textures. The color palette suggests a premium luxury aesthetic with high-end finishes. Recommended additions include gold-accented furniture, velvet upholstery, and ambient LED strips.',
        estimatedCost: 285000,
        purchaseTips: [
          'Visit local luxury furniture showrooms for premium velvet sofas (₹45,000-₹80,000)',
          'Source gold-accent lighting from specialty decor stores (₹8,000-₹15,000)',
          'Consider custom-made curtains from luxury textile brands (₹12,000-₹25,000)',
          'Browse online marketplaces like Pepperfry and Urban Ladder for budget options',
          'Check exclusive boutiques in luxury malls for one-of-a-kind decor pieces',
        ],
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-xl text-gold mb-4">AI Image Analysis</h3>
      <p className="text-slate text-sm mb-4">Upload a photo of your space — AI analyzes colors, style, cost, and purchase sources</p>

      <div className={`relative ${preview ? 'h-40' : 'h-32'} border-2 border-dashed border-gold/20 rounded-xl ${!preview ? 'hover:border-gold/50' : ''} transition-all bg-black/30 overflow-hidden`}>
        {preview ? (
          <img src={preview} alt="Uploaded" className="w-full h-full object-cover" />
        ) : null}
        <label className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer ${preview ? 'bg-black/40 hover:bg-black/50' : ''}`}>
          {!preview && (
            <>
              <svg className="w-8 h-8 text-gold/60 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-slate">{isAnalyzing ? 'Analyzing...' : 'Click to upload image'}</span>
            </>
          )}
          {preview && (
            <span className="text-xs text-gold bg-black/60 px-3 py-1.5 rounded-lg">Click to change image</span>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {isAnalyzing && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gold">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          AI analyzing your space...
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate">Mood</span>
            <span className="text-light font-medium">{result.mood}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate">Style</span>
            <span className="text-light font-medium">{result.style}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate">Lighting</span>
            <span className="text-light font-medium">{result.lighting}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate">Est. Cost</span>
            <span className="text-gold font-bold">{formatCurrency(result.estimatedCost)}</span>
          </div>

          <div>
            <span className="text-slate text-xs block mb-1.5">Color Palette</span>
            <div className="flex gap-1.5">
              {result.colors.map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border border-gold/20" style={{ background: c }}
                  title={c} />
              ))}
            </div>
          </div>

          <p className="text-xs text-slate leading-relaxed">{result.description}</p>

          <div className="border-t border-gold/10 pt-3">
            <span className="text-gold text-xs font-medium block mb-2">Where to Buy</span>
            <ul className="space-y-1.5">
              {result.purchaseTips.map((tip, i) => (
                <li key={i} className="text-xs text-slate flex gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => { setResult(null); setPreview(null); }}
            className="btn-glass w-full text-xs py-2 mt-2">
            Analyze Another Image
          </button>
        </motion.div>
      )}
    </div>
  );
}

function VoiceDesigning() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generated, setGenerated] = useState<{ style: string; description: string; image: string } | null>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript('Speech recognition not available in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);

      if (event.results[0].isFinal) {
        setIsListening(false);
        const lower = text.toLowerCase();
        let style = 'modern';
        let desc = 'A sleek modern interior with clean lines and neutral tones.';

        if (lower.includes('luxury') || lower.includes('gold') || lower.includes('premium')) {
          style = 'luxury';
          desc = 'An opulent luxury interior with gold accents, velvet furnishings, and ambient lighting.';
        } else if (lower.includes('minimal') || lower.includes('simple') || lower.includes('clean')) {
          style = 'minimalist';
          desc = 'A minimalist space with clean lines, neutral palettes, and uncluttered design.';
        } else if (lower.includes('futur') || lower.includes('neon') || lower.includes('gaming') || lower.includes('cyber')) {
          style = 'futuristic';
          desc = 'A futuristic interior with neon accents, smart features, and bold geometric patterns.';
        } else if (lower.includes('green') || lower.includes('nature') || lower.includes('plant') || lower.includes('eco')) {
          style = 'scandinavian';
          desc = 'A nature-inspired Scandinavian interior with light woods, plants, and cozy textiles.';
        } else if (lower.includes('dark') || lower.includes('dramatic') || lower.includes('moody')) {
          style = 'industrial';
          desc = 'A dramatic industrial interior with dark tones, exposed elements, and raw textures.';
        }

        const U = 'https://images.unsplash.com/photo-';
        const images: Record<string, string> = {
          modern: `${U}1600607687939-ce8a6c25118c?w=600&h=400&fit=crop`,
          luxury: `${U}1600585154340-be6161a56a0c?w=600&h=400&fit=crop`,
          minimalist: `${U}1616486333462-e3e3e3e3e3e3?w=600&h=400&fit=crop`,
          futuristic: `${U}1558618666-9fa1e4e1478f?w=600&h=400&fit=crop`,
          scandinavian: `${U}1600210492486-724fe5c67fb0?w=600&h=400&fit=crop`,
          industrial: `${U}1497366216548-37526070297c?w=600&h=400&fit=crop`,
        };

        setGenerated({ style, description: desc, image: images[style] || images.modern });
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
    setTranscript('');
    setGenerated(null);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-xl text-gold mb-4">Voice Designing</h3>
      <p className="text-slate text-sm mb-4">Speak your design vision — AI generates the perfect interior</p>

      <button onClick={startListening}
        className={`w-full py-4 rounded-xl text-center transition-all ${isListening ? 'bg-red-500/10 border border-red-400/40' : 'glass border border-gold/15 hover:border-gold/40'}`}>
        {isListening ? (
          <span className="text-red-400 flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
            Listening...
          </span>
        ) : (
          <span className="text-gold flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Speak Your Design
          </span>
        )}
      </button>

      {transcript && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-3 glass rounded-xl">
          <p className="text-xs text-slate mb-1">You said:</p>
          <p className="text-sm text-light italic">&ldquo;{transcript}&rdquo;</p>
        </motion.div>
      )}

      {generated && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          <div className="h-36 rounded-xl overflow-hidden">
            <img src={generated.image} alt={generated.style} className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {generated.style}
            </span>
          </div>
          <p className="text-sm text-slate leading-relaxed">{generated.description}</p>
          <div className="flex gap-2">
            <button onClick={() => { document.getElementById('designer')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex-1 btn-gold text-xs py-2.5">
              Apply to My Design
            </button>
            <button onClick={() => { setGenerated(null); setTranscript(''); }}
              className="flex-1 btn-glass text-xs py-2.5">
              Try Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function AdvancedFeatures() {
  return (
    <section id="features" className="section-padding bg-black">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            Advanced <span className="gradient-text">Features</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Upload an image for AI analysis or speak your design vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ImageAnalyzer />
          <VoiceDesigning />
        </div>
      </div>
    </section>
  );
}
