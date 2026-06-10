import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    const lower = message.toLowerCase();
    let response = 'I understand your preference. Let me optimize the design accordingly.';
    const changes: Record<string, string> = {};

    if (lower.includes('premium') || lower.includes('luxury')) {
      response = 'Upgrading to luxury style. Adding gold accents, premium materials, and ambient lighting to create an opulent atmosphere.';
      changes.style = 'luxury';
    } else if (lower.includes('minimalist') || lower.includes('minimal')) {
      response = 'Applying minimalist design. Removing clutter, using neutral tones, and maximizing natural light.';
      changes.style = 'minimalist';
    } else if (lower.includes('lighting') || lower.includes('light') || lower.includes('bright')) {
      response = 'Enhancing the lighting scheme. Adding layered lighting with warm LED strips, statement pendants, and accent spots.';
      changes.lighting = 'warm';
    } else if (lower.includes('blue') || lower.includes('ocean') || lower.includes('calm')) {
      response = 'Introducing a blue color palette. Deep navy walls with teal accents for a sophisticated, calming environment.';
      changes.colors = 'blue';
    } else if (lower.includes('gaming') || lower.includes('game') || lower.includes('setup')) {
      response = 'Setting up a gaming configuration. Adding RGB lighting, ergonomic desk setup, and display shelving.';
      changes.style = 'futuristic';
    } else {
      response = 'Great choice! I will refine the design with enhanced textures, improved lighting, and better furniture arrangement.';
    }

    return NextResponse.json({
      success: true,
      response,
      changes,
    });
  } catch {
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
  }
}
