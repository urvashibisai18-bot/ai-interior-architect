'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/layout/AnimatedBackground';

export default function ARPreview() {
  const [isActive, setIsActive] = useState(false);
  const [placed, setPlaced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startAR = async () => {
    setIsActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      // Fallback if camera not available
    }
  };

  const stopAR = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
    }
    setIsActive(false);
    setPlaced(false);
  };

  const placeFurniture = () => {
    setPlaced(true);
  };

  return (
    <section id="ar-preview" className="section-padding">
      <AnimatedBackground>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-light mb-4">
            AR <span className="gradient-text">Preview</span>
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            See furniture in your actual room with augmented reality
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card overflow-hidden">
            {!isActive ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-light mb-4">AR Furniture Preview</h3>
                <p className="text-slate mb-8 max-w-md mx-auto">
                  Point your camera at the room to see how furniture looks in your actual space
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={startAR} className="btn-gold">
                    Open AR Preview
                  </button>
                </div>
                <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate">
                  <span>📱 Move phone to scan room</span>
                  <span>👆 Tap to place furniture</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-[500px] object-cover"
                />

                {placed && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2"
                  >
                    <div className="glass px-8 py-4 rounded-2xl text-center">
                      <div className="w-16 h-10 bg-gold/30 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-gold">🛋</span>
                      </div>
                      <p className="text-light text-sm font-medium">Modern Sofa</p>
                      <p className="text-gold text-sm">₹45,000</p>
                    </div>
                  </motion.div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                  {!placed ? (
                    <button onClick={placeFurniture} className="btn-gold text-sm py-3 px-8">
                      👆 Tap to Place Furniture
                    </button>
                  ) : (
                    <button onClick={placeFurniture} className="btn-glass text-sm py-3 px-8">
                      🔄 Try Different Furniture
                    </button>
                  )}
                  <button onClick={stopAR} className="btn-glass text-sm py-3 px-6 text-red-400 border-red-400/30">
                    ✕ Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      </AnimatedBackground>
    </section>
  );
}
