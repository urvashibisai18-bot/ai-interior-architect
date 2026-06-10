import { create } from 'zustand';
import type { DesignFormData, AIRecommendation, ChatMessage, Product, RoomType, StyleType, LightingType, RoomDimensions, ColorPreferences, FurniturePreferences, User, SavedDesign } from '@/types';

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

  // Add to Design queue
  pendingAdditions: { type: string; name: string; image: string }[];
  addToDesign: (item: { type: string; name: string; image: string }) => void;
  clearAdditions: () => void;
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

export const useDesignStore = create<DesignState>((set) => ({
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

  // Auth
  user: null,
  setUser: (user) => set({ user }),
  isAuthLoading: true,
  setIsAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  savedDesigns: [],
  setSavedDesigns: (savedDesigns) => set({ savedDesigns }),

  // Add to Design
  pendingAdditions: [],
  addToDesign: (item) => set((state) => ({ pendingAdditions: [...state.pendingAdditions, item] })),
  clearAdditions: () => set({ pendingAdditions: [] }),
}));
