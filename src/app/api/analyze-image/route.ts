import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const analysis = {
      mood: 'Warm & Inviting',
      colors: ['#D4AF37', '#8B7355', '#F5F0EB', '#2C1810'],
      style: 'Modern Luxury',
      lighting: 'Warm Ambient',
      description: 'This space features a harmonious blend of warm gold tones with rich wooden textures, creating an inviting luxury atmosphere.',
    };

    return NextResponse.json({ success: true, ...analysis });
  } catch {
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
  }
}
