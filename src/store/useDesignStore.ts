import { create } from 'zustand';
import type {
  DesignFormData, AIRecommendation, ChatMessage, Product,
  RoomType, StyleType, LightingType, RoomDimensions, ColorPreferences, FurniturePreferences
} from '@/types';

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
}

const defaultFormData: DesignFormData = {
  roomType: 'living-room',
  dimensions: { width: 5, length: 6, height: 3 },
  budget: 100000,
  style: 'modern',
  colors: { primary: '#0A192F', secondary: '#D4AF37', accent: '#64FFDA' },
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
}));
