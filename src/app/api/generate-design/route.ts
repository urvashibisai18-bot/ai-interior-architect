import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomType, budget } = body;

    const suggestions = [
      { id: '1', type: 'flooring', name: 'Premium Wooden Flooring', cost: Math.round(budget * 0.15), image: '/images/flooring.jpg', description: 'Solid oak wood flooring with matte finish' },
      { id: '2', type: 'lighting', name: 'Smart Ambient LED System', cost: Math.round(budget * 0.08), image: '/images/lighting.jpg', description: 'App-controlled RGB LED strips with warm modes' },
      { id: '3', type: 'furniture', name: roomType === 'bedroom' ? 'Queen Size Platform Bed' : 'Modern Sectional Sofa', cost: Math.round(budget * 0.3), image: '/images/furniture.jpg', description: 'Premium upholstered furniture piece' },
      { id: '4', type: 'decor', name: 'Curated Wall Art Collection', cost: Math.round(budget * 0.05), image: '/images/decor.jpg', description: 'Set of 3 abstract canvas prints' },
      { id: '5', type: 'furniture', name: 'Multipurpose Storage Unit', cost: Math.round(budget * 0.12), image: '/images/storage.jpg', description: 'Modular storage with premium finish' },
    ];

    const totalCost = suggestions.reduce((sum, item) => sum + item.cost, 0);

    return NextResponse.json({
      success: true,
      suggestions,
      totalCost,
      floorPlan: { type: roomType, area: 30 },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to generate design' }, { status: 500 });
  }
}
