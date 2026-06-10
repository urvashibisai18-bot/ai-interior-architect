export interface RoomDimensions {
  width: number;
  length: number;
  height: number;
}

export interface ColorPreferences {
  primary: string;
  secondary: string;
  accent: string;
}

export interface FurniturePreferences {
  bed: boolean;
  studyTable: boolean;
  wardrobe: boolean;
  sofa: boolean;
  desk: boolean;
  lamp: boolean;
  curtains: boolean;
  shelving: boolean;
}

export type RoomType = 'bedroom' | 'living-room' | 'office' | 'kitchen' | 'bathroom';
export type StyleType = 'modern' | 'minimalist' | 'luxury' | 'scandinavian' | 'japanese' | 'industrial' | 'futuristic';
export type LightingType = 'warm' | 'natural' | 'cool' | 'ambient';

export interface DesignFormData {
  roomType: RoomType;
  dimensions: RoomDimensions;
  budget: number;
  style: StyleType;
  colors: ColorPreferences;
  furniture: FurniturePreferences;
  lighting: LightingType;
}

export interface AIRecommendation {
  id: string;
  type: 'flooring' | 'lighting' | 'furniture' | 'decor';
  name: string;
  cost: number;
  image: string;
  description: string;
}

export interface CostBreakdown {
  item: string;
  cost: number;
  percentage: number;
  category: string;
}

export interface AIAnalysisResult {
  mood: string;
  colors: string[];
  style: string;
  lighting: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  changes?: DesignChanges;
}

export interface DesignChanges {
  furniture?: Partial<FurniturePreferences>;
  style?: StyleType;
  colors?: Partial<ColorPreferences>;
  lighting?: LightingType;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  style: StyleType;
  color: string;
  rating: number;
}

export interface Design {
  id: string;
  userId?: string;
  roomType: RoomType;
  dimensions: RoomDimensions;
  budget: number;
  style: StyleType;
  colors: ColorPreferences;
  furniture: FurniturePreferences;
  lighting: LightingType;
  aiSuggestions: AIRecommendation[];
  totalCost: number;
  createdAt: Date;
}

export type SectionId = 'hero' | 'designer' | 'before-after' | 'gallery' | 'budget' | 'marketplace' | 'ar-preview' | 'features';
