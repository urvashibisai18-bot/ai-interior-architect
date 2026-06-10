'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesignStore } from '@/store/useDesignStore';
import { sendChatMessage } from '@/lib/openai';
import type { ChatMessage } from '@/types';

const suggestions = [
  'Make it look more premium',
  'Add more lighting',
  'Make it minimalist',
  'Change color to blue',
  'Add a gaming setup',
];

export default function AIChat() {
  const { isChatOpen, toggleChat, chatMessages, addChatMessage, formData, setFormData } = useDesignStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async (message?: string) => {
    const text = message || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    addChatMessage(userMsg);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with design changes
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = 'I\'ll update the design based on your request.';
      const changes: any = {};

      if (lower.includes('premium') || lower.includes('luxury')) {
        setFormData({ style: 'luxury', colors: { ...formData.colors, primary: '#1A1A2E', accent: '#D4AF37' } });
        response = 'Upgrading to luxury style with gold accents and premium materials.';
        changes.style = 'luxury';
      } else if (lower.includes('minimalist') || lower.includes('minimal')) {
        setFormData({ style: 'minimalist', colors: { ...formData.colors, primary: '#F5F0EB', accent: '#8892B0' } });
        response = 'Applying minimalist style with clean lines and neutral tones.';
        changes.style = 'minimalist';
      } else if (lower.includes('lighting') || lower.includes('light')) {
        setFormData({ lighting: 'warm' });
        response = 'Adding warm ambient lighting with LED strips and floor lamps.';
        changes.lighting = 'warm';
      } else if (lower.includes('blue')) {
        setFormData({ colors: { ...formData.colors, primary: '#0A192F', accent: '#64FFDA' } });
        response = 'Applying blue color palette with teal accents.';
        changes.colors = { primary: '#0A192F', accent: '#64FFDA' };
      } else if (lower.includes('gaming') || lower.includes('game')) {
        setFormData({ style: 'futuristic', lighting: 'cool', furniture: { ...formData.furniture, desk: true, lamp: true } });
        response = 'Setting up a gaming room with RGB lighting and a premium desk setup.';
        changes.style = 'futuristic';
      } else if (lower.includes('japanese') || lower.includes('zen')) {
        setFormData({ style: 'japanese', lighting: 'natural' });
        response = 'Creating a Japanese-inspired zen space with natural materials.';
        changes.style = 'japanese';
      } else {
        response = 'I understand. Let me adjust the design to match your preferences. Replacing study table with walnut wood finish and adding ambient LED strips.';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        changes,
      };
      addChatMessage(aiMsg);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light text-navy flex items-center justify-center shadow-2xl shadow-gold/30 hover:scale-110 transition-all animate-float"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] h-[600px] max-h-[80vh] glass rounded-2xl shadow-2xl shadow-black/50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                  <span className="text-navy text-xs font-bold">AI</span>
                </div>
                <div>
                  <h3 className="text-light font-semibold text-sm">AI Architect</h3>
                  <p className="text-gold text-xs">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-slate hover:text-light transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate text-sm mb-4">Try asking me:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className="text-xs border border-gold/20 text-gold px-3 py-1.5 rounded-full hover:bg-gold/10 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gold/20 text-light rounded-br-sm'
                        : 'glass text-light rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-slate mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass p-4 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gold/20">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your dream design..."
                  className="input-field flex-1"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="btn-gold px-4 py-2 !rounded-xl disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
