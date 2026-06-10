import { create } from 'zustand';
import type { DesignFormData, AIRecommendation, ChatMessage, Product, RoomType, StyleType, LightingType, RoomDimensions, ColorPreferences, FurniturePreferences, User, SavedDesign } from '@/types';

interface DesignItem {
  type: string;
  name: string;
  image: string;
  addedAt: number;
}

interface DesignState {
  // Form State
  formData: DesignFormData;
  setFormData: (data: Partial<DesignFormData>) => void;
  resetForm: () => void;

  // AI Suggestions
  suggestions: AIRecommendation[];
  setSuggestions: (suggestions: AIRecommendation[]) => void;
  totalCost: number;
  setTotalCost: (cost: number) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  isChatOpen: boolean;
  toggleChat: () => void;

  // Design State
  currentDesign: any;
  setCurrentDesign: (design: any) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  selectedStyle: StyleType;
  setSelectedStyle: (style: StyleType) => void;

  // Marketplace
  products: Product[];
  setProducts: (products: Product[]) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Budget Optimizer
  budgetBreakdown: any[];
  setBudgetBreakdown: (data: any[]) => void;

  // Active Section
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthLoading: boolean;
  setIsAuthLoading: (loading: boolean) => void;
  savedDesigns: SavedDesign[];
  setSavedDesigns: (designs: SavedDesign[]) => void;
  saveDesign: () => void;
  loadSavedDesigns: () => void;

  // Design items added by user
  pendingAdditions: DesignItem[];
  addToDesign: (item: { type: string; name: string; image: string }) => void;
  clearAdditions: () => void;
  removeDesignItem: (index: number) => void;
}

const defaultFormData: DesignFormData = {
  roomType: 'living-room',
  dimensions: { width: 5, length: 6, height: 3 },
  budget: 100000,
  style: 'modern',
  colors: { primary: '#0A0A0A', secondary: '#D4AF37', accent: '#9CA3AF' },
  furniture: { bed: false, studyTable: false, wardrobe: false, sofa: true, desk: false, lamp: true, curtains: true, shelving: false },
  lighting: 'natural',
};

function loadDesigns(): SavedDesign[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('savedDesigns');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function persistDesigns(designs: SavedDesign[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem('savedDesigns', JSON.stringify(designs)); } catch {}
}

export const useDesignStore = create<DesignState>((set, get) => ({
  formData: defaultFormData,
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ formData: defaultFormData }),

  suggestions: [],
  setSuggestions: (suggestions) => set({ suggestions }),
  totalCost: 0,
  setTotalCost: (totalCost) => set({ totalCost }),

  chatMessages: [],
  addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  currentDesign: null,
  setCurrentDesign: (currentDesign) => set({ currentDesign }),
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  selectedStyle: 'modern',
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),

  products: [],
  setProducts: (products) => set({ products }),
  selectedProduct: null,
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),

  budgetBreakdown: [],
  setBudgetBreakdown: (budgetBreakdown) => set({ budgetBreakdown }),

  activeSection: 'hero',
  setActiveSection: (activeSection) => set({ activeSection }),

  user: null,
  setUser: (user) => set({ user }),
  isAuthLoading: true,
  setIsAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  savedDesigns: [],
  setSavedDesigns: (savedDesigns) => set({ savedDesigns }),

  loadSavedDesigns: () => set({ savedDesigns: loadDesigns() }),

  saveDesign: () => {
    const state = get();
    const newDesign: SavedDesign = {
      id: Date.now().toString(36),
      userId: state.user?.id || 'local',
      roomType: state.formData.roomType,
      dimensions: { ...state.formData.dimensions },
      budget: state.formData.budget,
      style: state.formData.style,
      colors: { ...state.formData.colors },
      furniture: { ...state.formData.furniture },
      lighting: state.formData.lighting,
      aiSuggestions: [...state.suggestions],
      totalCost: state.totalCost,
      createdAt: new Date().toISOString(),
    };
    const updated = [newDesign, ...loadDesigns()].slice(0, 20);
    persistDesigns(updated);
    set({ savedDesigns: updated });
  },

  pendingAdditions: [],
  addToDesign: (item) => set((state) => ({
    pendingAdditions: [...state.pendingAdditions, { ...item, addedAt: Date.now() }],
    currentDesign: { items: [...state.pendingAdditions, { ...item, addedAt: Date.now() }], formData: state.formData },
  })),
  clearAdditions: () => set({ pendingAdditions: [] }),
  removeDesignItem: (index) => set((state) => {
    const updated = state.pendingAdditions.filter((_, i) => i !== index);
    return { pendingAdditions: updated, currentDesign: updated.length > 0 ? { items: updated, formData: state.formData } : null };
  }),
}));
