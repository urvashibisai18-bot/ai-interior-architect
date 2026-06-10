'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function MoodDetection() {
  const [result, setResult] = useState<{ mood: string; colors: string[]; style: string; lighting: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        mood: 'Warm & Cozy',
        colors: ['#D4AF37', '#8B7355', '#F5F0EB'],
        style: 'Modern Luxury',
        lighting: 'Warm Ambient',
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-xl text-gold mb-4">🎨 AI Mood Detection</h3>
      <p className="text-slate text-sm mb-4">Upload an inspiration image — AI detects mood, colors, and style</p>

      <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gold/30 rounded-xl cursor-pointer hover:border-gold/60 transition-all bg-navy/30">
        <svg className="w-8 h-8 text-gold/60 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs text-slate">{isAnalyzing ? 'Analyzing...' : 'Click to upload image'}</span>
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      {isAnalyzing && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gold">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Analyzing with AI...
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate">Mood</span>
            <span className="text-light">{result.mood}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate">Style</span>
            <span className="text-light">{result.style}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate">Lighting</span>
            <span className="text-light">{result.lighting}</span>
          </div>
          <div>
            <span className="text-slate text-sm block mb-2">Color Palette</span>
            <div className="flex gap-2">
              {result.colors.map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-gold/30" style={{ background: c }} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function VoiceDesigning() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript('Speech recognition not available in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-xl text-gold mb-4">🎤 Voice Designing</h3>
      <p className="text-slate text-sm mb-4">Speak your design — &ldquo;Create a modern gaming room with blue lighting&rdquo;</p>

      <button
        onClick={startListening}
        className={`w-full py-4 rounded-xl text-center transition-all ${
          isListening ? 'bg-red-500/20 border border-red-400/50' : 'glass border border-gold/20 hover:border-gold/40'
        }`}
      >
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 glass rounded-xl">
          <p className="text-sm text-light">{transcript}</p>
        </motion.div>
      )}
    </div>
  );
}

function SmartHome() {
  const [enabled, setEnabled] = useState(false);

  const devices = [
    { name: 'Alexa Voice Control', price: 4999 },
    { name: 'Smart LED Lights', price: 2999 },
    { name: 'Smart Curtains', price: 8999 },
    { name: 'Temperature Sensor', price: 1999 },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-xl text-gold mb-4">🏠 Smart Home Integration</h3>

      <label className="flex items-center gap-3 cursor-pointer mb-4">
        <div
          onClick={() => setEnabled(!enabled)}
          className={`w-12 h-6 rounded-full transition-all ${enabled ? 'bg-gold' : 'bg-navy border border-gold/30'} relative cursor-pointer`}
        >
          <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${enabled ? 'left-6' : 'left-0.5'}`} />
        </div>
        <span className="text-light text-sm">Add Smart Home Features</span>
      </label>

      {enabled && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
          {devices.map((d) => (
            <div key={d.name} className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-light">{d.name}</span>
              <span className="text-sm text-gold">₹{d.price.toLocaleString()}</span>
            </div>
          ))}
          <p className="text-xs text-slate mt-2">
            Total: ₹{devices.reduce((s, d) => s + d.price, 0).toLocaleString()}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function Sustainability() {
  const scores = [
    { label: 'Energy Efficiency', rating: 4, color: '#64FFDA' },
    { label: 'Material Sustainability', rating: 3, color: '#D4AF37' },
    { label: 'Carbon Footprint', rating: 4, color: '#64FFDA' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-heading text-xl text-gold mb-4">🌱 Sustainability Score</h3>

      <div className="space-y-4">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate">{s.label}</span>
              <span className="text-light">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < s.rating ? 'text-gold' : 'text-slate/20'}>★</span>
                ))}
              </span>
            </div>
            <div className="w-full bg-navy/50 rounded-full h-1.5">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${(s.rating / 5) * 100}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 glass rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-slate">Carbon Footprint</span>
          <span className="text-accent">Low</span>
        </div>
        <div className="w-full bg-navy/50 rounded-full h-2 mt-2">
          <div className="w-1/3 bg-accent h-2 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function AdvancedFeatures() {
  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            Advanced <span className="gradient-text">Features</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Cutting-edge tools powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <MoodDetection />
          <VoiceDesigning />
          <SmartHome />
          <Sustainability />
        </div>
      </div>
    </section>
  );
}
